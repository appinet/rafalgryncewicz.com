// Generates public/rafal-gryncewicz-profile.pdf (one-page A4 profile for clients and software houses).
// Usage: npm run profile   (needs Chromium: `npx playwright install chromium` or set CHROME_PATH)
import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const font = (p) => readFileSync(root + 'node_modules/' + p).toString('base64')
const geist = font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')
const geistExt = font('@fontsource-variable/geist/files/geist-latin-ext-wght-normal.woff2')
const serif = font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')

// Name, contact details and role come from the site's own config / copy, so the PDF never drifts
// from the website. (app.config.ts calls Nuxt's global defineAppConfig, stubbed here.)
globalThis.defineAppConfig = (config) => config
const { site: config } = (await import('../app/app.config.ts')).default
const { meta } = (await import('../app/content/en.ts')).default
const site = {
  name: config.name,
  role: meta.role,
  email: config.email,
  web: 'rafalgryncewicz.com',
  location: `${config.location} · EN / PL`
}

// Condensed copy for the one-page print layout (the website versions are longer)
const services = [
  ['Web applications', 'Custom systems, SaaS, client portals and internal tools in Laravel / PHP with tests and documentation.'],
  ['Front-end & UI', 'Vue 3, Nuxt, Nuxt UI and Tailwind CSS. Mobile first, accessible, tuned for Core Web Vitals.'],
  ['API & ERP integrations', 'REST API design, webhooks, two-way sync with ERP, WMS, accounting, payment and shipping systems.'],
  ['E-commerce', 'WooCommerce, PrestaShop, Shopify and WordPress: modules, themes, migrations, feeds, performance.'],
  ['Linux servers & DevOps', 'VPS and dedicated servers: Nginx, PHP-FPM, MySQL tuning, backups, monitoring, SSL, CI/CD.'],
  ['Rescue & maintenance', 'Taking over legacy projects: audits, upgrades, security patches and long-term care.']
]
const stack = {
  'Back-end': 'PHP 8, Laravel, Node.js, REST, queues',
  'Front-end': 'JavaScript, Vue.js, Nuxt, Nuxt UI, Tailwind CSS, HTML, CSS',
  'Data': 'MySQL / MariaDB, SQL, Redis',
  'Platforms': 'WordPress, WooCommerce, PrestaShop, Shopify',
  'Infrastructure': 'Linux (Debian / Ubuntu), Nginx, Git, CI/CD, backups, monitoring'
}
const models = [
  ['Fixed-scope project', 'Defined deliverables, fixed price and timeline.'],
  ['Time & materials', 'Hourly or daily rate, team extension, white-label for agencies.'],
  ['Monthly retainer', 'Maintenance, server administration, priority support.']
]

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(data:font/woff2;base64,${geist}) format('woff2');font-weight:100 900;unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2122,U+2190-21FF}
@font-face{font-family:G;src:url(data:font/woff2;base64,${geistExt}) format('woff2');font-weight:100 900;unicode-range:U+0100-02AF}
@font-face{font-family:S;font-style:italic;src:url(data:font/woff2;base64,${serif}) format('woff2')}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:G,system-ui,sans-serif;color:#18181b;font-size:9.6pt;line-height:1.45;width:210mm;height:297mm;padding:16mm 16mm 14mm;display:flex;flex-direction:column}
header{display:flex;justify-content:space-between;align-items:flex-end;padding-bottom:7mm;border-bottom:1px solid #e4e4e7}
h1{font-size:25pt;letter-spacing:-.03em;line-height:1;font-weight:600}
.role{margin-top:2.5mm;font-family:S;font-style:italic;font-size:15pt;color:#047857}
.contact{text-align:right;font-size:8.8pt;color:#52525b;line-height:1.6}
.contact b{color:#18181b;font-weight:500}
.lead{margin-top:6mm;font-size:10.6pt;line-height:1.55;color:#3f3f46;max-width:165mm}
h2{margin-top:7mm;margin-bottom:3mm;font-size:7.6pt;letter-spacing:.16em;text-transform:uppercase;color:#047857;font-weight:600}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:3.2mm 7mm}
.grid b{display:block;font-weight:600;font-size:10pt;color:#18181b}
.grid span{color:#52525b}
table{width:100%;border-collapse:collapse}
td{padding:1.6mm 0;border-bottom:1px solid #f0f0f2;vertical-align:top}
td:first-child{width:32mm;color:#71717a}
.models{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.models div{border:1px solid #e4e4e7;border-radius:3mm;padding:3.5mm}
.models b{display:block;font-weight:600;margin-bottom:1mm}
.models span{color:#52525b;font-size:8.8pt}
footer{margin-top:auto;padding-top:5mm;border-top:1px solid #e4e4e7;display:flex;justify-content:space-between;font-size:8.4pt;color:#71717a}
footer b{color:#047857;font-weight:600}
</style></head><body>
<header><div><h1>${site.name}</h1><p class="role">${site.role}</p></div>
<div class="contact"><b>${site.email}</b><br>${site.web}<br>${site.location}</div></header>
<p class="lead">15 years of building and running web products end to end: Laravel and Nuxt applications, API and ERP integrations, e-commerce platforms and the Linux servers underneath. I work directly with companies and as a senior contractor for software houses and agencies, under NDA and white-label when needed.</p>
<h2>Services</h2><div class="grid">${services.map(([t, d]) => `<p><b>${t}</b><span>${d}</span></p>`).join('')}</div>
<h2>Technology</h2><table>${Object.entries(stack).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
<h2>Ways to work together</h2><div class="models">${models.map(([t, d]) => `<div><b>${t}</b><span>${d}</span></div>`).join('')}</div>
<h2>How I work</h2><div class="grid">
<p><b>Clear proposals</b><span>Scope, architecture, timeline and a fixed price or transparent estimate up front.</span></p>
<p><b>Visible progress</b><span>Short iterations, a staging environment from week one, weekly updates.</span></p>
<p><b>Built to hand over</b><span>Readable code, tests, README and runbooks. You own everything.</span></p>
<p><b>Your workflow</b><span>Git flow, code review, CI pipelines, Jira and Slack. I adapt to your team.</span></p></div>
<footer><span>Available for new projects · Remote, EU-based</span><b>${site.web}</b></footer>
</body></html>`

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'load' })
await page.pdf({ path: root + 'public/rafal-gryncewicz-profile.pdf', format: 'A4', printBackground: true })
await browser.close()
console.log('✓ public/rafal-gryncewicz-profile.pdf')
