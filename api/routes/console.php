<?php

use App\Models\Lead;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('leads:anonymize', function () {
    $count = Lead::where('created_at', '<', now()->subDays(config('contact.ip_retention_days')))
        ->where(fn ($q) => $q->whereNotNull('ip')->orWhereNotNull('user_agent'))
        ->update(['ip' => null, 'user_agent' => null]);

    $this->info("Cleared IP / user agent on {$count} lead(s).");
})->purpose('Remove IP addresses and user agents from leads older than the retention period');

// Needs the system cron entry: * * * * * cd /path/to/api && php artisan schedule:run >> /dev/null 2>&1
Schedule::command('leads:anonymize')->daily();
Schedule::command('model:prune')->daily();
