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

Artisan::command('leads:renotify', function () {
    if (blank(config('contact.recipient'))) {
        $this->warn('CONTACT_RECIPIENT is not set, nothing to send.');

        return;
    }

    // Skip leads from the last few minutes (their request may still be sending the mail) and stop
    // retrying after a week, so a permanently failing lead does not log an error forever
    $leads = Lead::whereNull('notified_at')
        ->whereBetween('created_at', [now()->subDays(7), now()->subMinutes(5)])
        ->get();
    $sent = $leads->filter->sendNotification()->count();

    $this->info("Sent {$sent} of {$leads->count()} pending lead notification(s).");
})->purpose('Retry the email for leads whose notification failed');

// Needs the system cron entry: * * * * * cd /path/to/api && php artisan schedule:run >> /dev/null 2>&1
Schedule::command('leads:renotify')->everyFifteenMinutes()->withoutOverlapping();
Schedule::command('leads:anonymize')->daily();
Schedule::command('model:prune')->daily();
