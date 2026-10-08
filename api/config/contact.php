<?php

return [
    // Where new leads are emailed (required; leads are still stored when it is missing)
    'recipient' => env('CONTACT_RECIPIENT'),

    // Rate limits for POST /api/contact (per IP)
    'per_minute' => (int) env('CONTACT_RATE_PER_MINUTE', 3),
    'per_day' => (int) env('CONTACT_RATE_PER_DAY', 20),

    // GDPR retention (see the privacy policy): leads are deleted after this many months
    // (`model:prune`), IP address and user agent are cleared after this many days (`leads:anonymize`).
    'retention_months' => (int) env('CONTACT_RETENTION_MONTHS', 36),
    'ip_retention_days' => (int) env('CONTACT_IP_RETENTION_DAYS', 30),
];
