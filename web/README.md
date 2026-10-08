# rafalgryncewicz.com – website

Static site: **Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4**, generated to plain HTML (`nuxt generate`).
English at `/`, Polish at `/pl` (with `hreflang`, per-language sitemap entries and only the current language's copy loaded).

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build -> .output/public
npm run profile    # regenerate public/rafal-gryncewicz-profile.pdf (needs Chromium: npx playwright install chromium)
```

## Where to edit

| What | File |
| --- | --- |
| All page copy (EN / PL) | `app/content/en.ts`, `app/content/pl.ts` |
| Email, links, booking URL, prices, testimonials, client names, legal entity | `app/app.config.ts` → `site` |
| Profile PDF content | `scripts/profile.mjs` |
| Privacy / cookie policy text | `app/components/PrivacyPage.vue`, `app/components/CookiesPage.vue` |

Sections with no data hide themselves (testimonials, client names, booking box, prices).

## Build-time environment variables

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_FORM_ENDPOINT` | Contact form POST URL (the Laravel API in `../api`). Empty = opens the visitor's mail client |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key. Empty = no captcha widget |
| `NUXT_PUBLIC_GTM_ID` | Google Tag Manager `GTM-XXXX` (optional, behind the cookie banner) |
| `NUXT_PUBLIC_GA_ID` | GA4 `G-XXXX` if you don't use GTM (optional, behind the cookie banner) |
| `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain, cookieless analytics (optional) |
| `NUXT_PUBLIC_SITE_URL` | Canonical URL (default `https://rafalgryncewicz.com`) |

With none of these set the site makes **zero** third-party requests.

## Cookie consent / Google Consent Mode v2

* `app/app.vue` – inline `<head>` script sets `gtag('consent','default', …)` to **denied** for
  `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` *before* GTM/gtag loads,
  and restores a previous choice on later visits.
* `app/composables/useConsent.ts` – stores the choice (`localStorage: rg_consent`, re-asked after 12 months),
  sends `gtag('consent','update', …)` and pushes a `consent_update` event to the dataLayer.
* `app/components/CookieConsent.vue` – banner (Accept all / Reject all / Customize) and settings modal;
  reopen any time via "Cookie settings" in the footer.

## Conversion tracking

A successful form submission pushes `{ event: 'generate_lead', project_type, locale }` to the dataLayer
(use it as a GA4 key event / Google Ads conversion in GTM) and sends a `Lead` custom event to Plausible.

## Performance notes

* Fonts self-hosted (`@fontsource`), no Google Fonts request (also GDPR-friendly).
* Icons inlined as SVG at build time, no Iconify API calls.
* No JS preloading; below-the-fold sections hydrate only when visible (`hydrate-on-visible`).
* Lighthouse (mobile, local): Performance 95–98 · Accessibility 100 · Best practices 100 · SEO 100.

## Deploy

Upload `.output/public` to any static host (Nginx on your VPS, Cloudflare Pages, Netlify…).
Example Nginx vhost with caching, compression and security headers: `deploy/nginx.conf`.
