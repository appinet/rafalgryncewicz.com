// Builds the Content-Security-Policy for the generated site and writes the server config that sends it:
//   .output/nginx/csp.conf          Nginx snippet (VPS, see deploy/nginx.conf)
//   .output/public/.htaccess        Apache / LiteSpeed rules from deploy/apache.htaccess (shared hosting)
//   .output/public/_nuxt/.htaccess  long-term caching for the hashed build assets
// Runs after `nuxt generate` (see package.json). Usage: node scripts/csp.mjs
//
// Inline scripts (consent bootstrap, Nuxt config, import map, GTM / gtag) are allowed by their
// SHA-256 hash, computed from the generated HTML, so the policy needs no 'unsafe-inline' for scripts.
// The hashes change with every build: deploy the snippet together with .output/public.
//
// Third-party hosts are only allowed when the matching feature is configured, read from the same
// env vars the build uses: NUXT_PUBLIC_GTM_ID / NUXT_PUBLIC_GA_ID, NUXT_PUBLIC_TURNSTILE_SITE_KEY,
// NUXT_PUBLIC_PLAUSIBLE_DOMAIN, NUXT_PUBLIC_FORM_ENDPOINT. Reports go to CSP_REPORT_URI, by default
// <form endpoint origin>/api/csp-report (the Laravel API), or nowhere when neither is set.
//
// Set CSP_ENFORCE=1 to emit an enforcing Content-Security-Policy header instead of Report-Only.
import { createHash } from 'node:crypto'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const publicDir = join(root, '.output/public')
const outFile = join(root, '.output/nginx/csp.conf')
// `nuxt generate` reads web/.env itself; this separate process must too, or the policy would miss
// the hosts configured there. Variables already set in the environment win, as they do for Nuxt.
try { process.loadEnvFile(join(root, '.env')) } catch { /* no .env file */ }
const env = process.env

// ---- 1. Hash every inline script the browser executes -------------------------------------------
// Data blocks (JSON payload, JSON-LD) are not executed, so CSP ignores them.
const NOT_EXECUTED = new Set(['application/json', 'application/ld+json'])
const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
const typeRe = /\btype\s*=\s*["']?([^"'\s>]+)/i

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* htmlFiles(path)
    else if (entry.name.endsWith('.html')) yield path
  }
}

const hashes = new Set()
let pages = 0
for (const file of htmlFiles(publicDir)) {
  pages++
  for (const [, attrs, body] of readFileSync(file, 'utf8').matchAll(scriptRe)) {
    if (/\bsrc\s*=/i.test(attrs) || !body) continue
    if (NOT_EXECUTED.has(attrs.match(typeRe)?.[1]?.toLowerCase())) continue
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  }
}
if (!pages) throw new Error(`No HTML found in ${publicDir}. Run \`nuxt generate\` first.`)

// ---- 2. Allow third parties only for the features that are switched on ---------------------------
const google = env.NUXT_PUBLIC_GTM_ID || env.NUXT_PUBLIC_GA_ID
const turnstile = env.NUXT_PUBLIC_TURNSTILE_SITE_KEY
const plausible = env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN
const origin = (url) => { try { return new URL(url).origin } catch { return '' } }
const formOrigin = origin(env.NUXT_PUBLIC_FORM_ENDPOINT)
const reportUri = env.CSP_REPORT_URI ?? (formOrigin ? `${formOrigin}/api/csp-report` : '')

const googleHosts = ['https://www.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.analytics.google.com']
const cloudflare = 'https://challenges.cloudflare.com'

const directives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", ...hashes, ...(google ? ['https://www.googletagmanager.com'] : []), ...(turnstile ? [cloudflare] : []), ...(plausible ? ['https://plausible.io'] : [])],
  // Vue style bindings and Nuxt's inlined critical CSS need inline styles
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', ...(google ? googleHosts : [])],
  'font-src': ["'self'"],
  'connect-src': ["'self'", ...(formOrigin ? [formOrigin] : []), ...(google ? googleHosts : []), ...(turnstile ? [cloudflare] : []), ...(plausible ? ['https://plausible.io'] : [])],
  'frame-src': [...(turnstile ? [cloudflare] : []), ...(google ? ['https://www.googletagmanager.com'] : [])],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  ...(reportUri ? { 'report-uri': [reportUri], 'report-to': ['csp'] } : {})
}
if (!directives['frame-src'].length) directives['frame-src'] = ["'none'"]

const policy = Object.entries(directives).map(([name, values]) => `${name} ${[...new Set(values)].join(' ')}`).join('; ')

// ---- 3. Server config ---------------------------------------------------------------------------
const header = env.CSP_ENFORCE === '1' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only'
const generated = `Generated by scripts/csp.mjs on ${new Date().toISOString()} – do not edit, regenerate with the build.`

// Nginx (VPS)
const nginx = [
  `# ${generated}`,
  `# Copy to /etc/nginx/snippets/rafalgryncewicz-csp.conf on every deploy (inline script hashes change per build).`,
  `add_header ${header} "${policy}" always;`
]
if (reportUri) nginx.push(`add_header Reporting-Endpoints 'csp="${reportUri}"' always;`)
mkdirSync(join(root, '.output/nginx'), { recursive: true })
writeFileSync(outFile, nginx.join('\n') + '\n')

// Apache / LiteSpeed (shared hosting): fill the CSP into the template, keeping the placeholder's indent
const apache = [`Header always set ${header} "${policy}"`]
if (reportUri) apache.push(`Header always set Reporting-Endpoints "csp=\\"${reportUri}\\""`)
const template = readFileSync(join(root, 'deploy/apache.htaccess'), 'utf8')
if (!/^[ \t]*# @CSP@$/m.test(template)) throw new Error('deploy/apache.htaccess: missing the "# @CSP@" placeholder line')
const htaccess = template.replace(/^([ \t]*)# @CSP@$/m, (_, indent) => apache.map(line => indent + line).join('\n'))
writeFileSync(join(publicDir, '.htaccess'), `# ${generated}\n${htaccess}`)
writeFileSync(join(publicDir, '_nuxt/.htaccess'), [
  `# ${generated}`,
  '# Hashed build assets: cache for a year',
  '<IfModule mod_headers.c>',
  '  Header set Cache-Control "public, max-age=31536000, immutable"',
  '</IfModule>',
  ''
].join('\n'))

console.log(`✓ CSP (${header}): ${hashes.size} inline script hash(es) from ${pages} page(s)${reportUri ? `, reports → ${reportUri}` : ', no report endpoint'}`)
console.log('  → .output/nginx/csp.conf, .output/public/.htaccess, .output/public/_nuxt/.htaccess')
