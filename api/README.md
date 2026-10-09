# rafalgryncewicz.com – API

Laravel 13 app with a single endpoint used by the website's contact form.

## `POST /api/contact`

JSON body: `name`, `email`, `company?`, `clientType?`, `projectType`, `budget?`, `timeline?`, `message` (min 20),
`privacy` (must be true), `locale?` (`en`/`pl`), `turnstileToken?`, `website` (honeypot, must be empty).

* `201 {"ok":true,"id":…}` – lead stored in `leads` and emailed to `CONTACT_RECIPIENT` (reply-to = sender);
  the sender gets an auto-reply in their language (fixed text without anything they typed, at most one per address per day)
* `422` – validation errors (incl. failed Turnstile check or filled honeypot)
* `429` – rate limited (`CONTACT_RATE_PER_MINUTE`, `CONTACT_RATE_PER_DAY` per IP)

If sending the email fails, the lead is still saved (`notified_at` stays `null`) and the error is logged.
`leads:renotify` (scheduled every 15 minutes) retries leads from the last 7 days that were not emailed yet.

## Configuration (`.env`)

| Key | Purpose |
| --- | --- |
| `CONTACT_RECIPIENT` | Where leads are emailed (also the reply-to of the auto-reply) |
| `CONTACT_CONFIRMATION` | Auto-reply to the sender (default `true`); signed `CONTACT_SIGNATURE`, links to `CONTACT_SITE_URL` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins allowed to call the API (the website) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret; empty disables the check |
| `MAIL_*` | SMTP settings (`MAIL_TIMEOUT`: seconds, default 10) |
| `DB_*` | SQLite by default; MySQL works too |

## Development

```bash
composer install && cp .env.example .env && php artisan key:generate
touch database/database.sqlite && php artisan migrate
php artisan serve
php artisan test
```

Health check for uptime monitoring: `GET /up`.
