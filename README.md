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
- [ ] Regenerate the profile PDF after edits: `cd web && npm run profile`
- [ ] Choose analytics: GTM / GA4 (`NUXT_PUBLIC_GTM_ID` / `NUXT_PUBLIC_GA_ID`, cookie banner applies) and/or Plausible (`NUXT_PUBLIC_PLAUSIBLE_DOMAIN`, cookieless)
- [ ] Create a Cloudflare Turnstile widget: site key → `NUXT_PUBLIC_TURNSTILE_SITE_KEY`, secret → `api/.env TURNSTILE_SECRET_KEY`
- [ ] Deploy the API (e.g. `api.rafalgryncewicz.com`), set SMTP in `api/.env`, then `NUXT_PUBLIC_FORM_ENDPOINT=https://api.rafalgryncewicz.com/api/contact`
- [ ] Uptime monitoring: add `https://rafalgryncewicz.com` and `https://api.rafalgryncewicz.com/up` to UptimeRobot / Better Stack (free tiers are enough)
- [ ] Submit `https://rafalgryncewicz.com/sitemap.xml` in Google Search Console

## Deploy (VPS)

* Website: `cd web && npm ci && npm run generate`, upload `web/.output/public`. Nginx example: `web/deploy/nginx.conf`.
* API: standard Laravel deploy (PHP-FPM 8.3, `composer install --no-dev -o`, `php artisan migrate --force`, `php artisan config:cache`). Nginx example: `api/deploy/nginx.conf`.
