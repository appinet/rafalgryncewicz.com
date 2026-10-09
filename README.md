# rafalgryncewicz.com

Personal landing page of Rafał Gryncewicz, senior full-stack developer.

| Folder | What | Stack |
| --- | --- | --- |
| [`web/`](web) | The website (EN at `/`, PL at `/pl`), generated to static HTML | Nuxt 4, Nuxt UI 4, Tailwind CSS 4 |
| [`api/`](api) | Contact form endpoint: stores leads, emails them, Turnstile + rate limiting | Laravel 13, PHP 8.3 |

CI (`.github/workflows/ci.yml`) builds the site and runs the API tests on every push and pull request.

## Quick start

```bash
# website
cd web && npm install && npm run dev            # http://localhost:3000

# API
cd api && composer install && cp .env.example .env && php artisan key:generate
touch database/database.sqlite && php artisan migrate
php artisan serve                                # http://localhost:8000
# point the site at it:
NUXT_PUBLIC_FORM_ENDPOINT=http://localhost:8000/api/contact npm run dev
```

## Before launch checklist

- [ ] `web/app/app.config.ts` → `site`: email, LinkedIn, GitHub, booking link (Cal.com / Calendly), company details for the privacy policy, prices
- [ ] `web/app/content/en.ts` + `pl.ts` → `work.items`: replace the three draft case studies with real ones
- [ ] Testimonials / client names in `app.config.ts` (only with permission; the section is hidden while empty)
- [ ] Regenerate the profile PDF after edits: `cd web && npm run profile` (name, email, role and location are read from `app.config.ts` / `content/en.ts`; needs Chromium: `npx playwright install chromium` or `CHROME_PATH`)
- [ ] Choose analytics: GTM / GA4 (`NUXT_PUBLIC_GTM_ID` / `NUXT_PUBLIC_GA_ID`, cookie banner applies) and/or Plausible (`NUXT_PUBLIC_PLAUSIBLE_DOMAIN`, cookieless). With Google, pick the consent mode: `advanced` (default, tags load at once with storage denied) or `NUXT_PUBLIC_CONSENT_MODE=basic` (no Google request at all before consent; the stricter reading of EU guidance)
- [ ] Create a Cloudflare Turnstile widget: site key → `NUXT_PUBLIC_TURNSTILE_SITE_KEY`, secret → `api/.env TURNSTILE_SECRET_KEY`
- [ ] Deploy the API (e.g. `api.rafalgryncewicz.com`), set SMTP and `CONTACT_RECIPIENT` in `api/.env` (no default: without it leads are stored but not emailed), then `NUXT_PUBLIC_FORM_ENDPOINT=https://api.rafalgryncewicz.com/api/contact`. If it sits behind Cloudflare / a proxy, set `TRUSTED_PROXIES` or the Nginx `realip` block
- [ ] Mail deliverability: SPF, DKIM and DMARC records for the sending domain, then a 9/10+ score on mail-tester.com (see the deploy guide)
- [ ] Uptime monitoring: add `https://rafalgryncewicz.com` and `https://api.rafalgryncewicz.com/up` to UptimeRobot / Better Stack (free tiers are enough)
- [ ] Submit `https://rafalgryncewicz.com/sitemap.xml` in Google Search Console

## Deploy (shared hosting)

Step-by-step guide for cyber_Folks (DirectAdmin, Apache / LiteSpeed, SSH): [`docs/deploy-cyberfolks.md`](docs/deploy-cyberfolks.md) (in Polish).
`npm run generate` writes the Apache rules (`.htaccess` with clean URLs, 404, security headers, caching and the CSP) into `web/.output/public`, so the build works on any Apache / LiteSpeed host as uploaded.

## Deploy (VPS)

* Website: `cd web && npm ci && npm run generate`, upload `web/.output/public`. Nginx example: `web/deploy/nginx.conf`.
* Website Nginx: copy `web/deploy/security-headers.conf` to `/etc/nginx/snippets/rafalgryncewicz-security-headers.conf` (included by every `location`).
* CSP: `npm run generate` also writes `web/.output/nginx/csp.conf` (`scripts/csp.mjs`): a `Content-Security-Policy-Report-Only` header with SHA-256 hashes of the inline scripts and only the third-party hosts that are configured. The hashes change with every build, so copy it to `/etc/nginx/snippets/rafalgryncewicz-csp.conf` and `nginx -s reload` **on every deploy**. Violation reports go to `CSP_REPORT_URI` (default: `<form endpoint origin>/api/csp-report`, logged by the API to `storage/logs/csp.log`, 14 days). After a few clean weeks of reports, build with `CSP_ENFORCE=1` to switch to the enforcing header.
* API: standard Laravel deploy (PHP-FPM 8.3, `composer install --no-dev -o`, `php artisan migrate --force`, `php artisan config:cache`). Nginx example: `api/deploy/nginx.conf`.
* API cron (mail retry: `leads:renotify`, every 15 min; GDPR retention: `leads:anonymize` + `model:prune`, daily): `* * * * * cd /var/www/rafalgryncewicz.com/api && php artisan schedule:run >> /dev/null 2>&1`
