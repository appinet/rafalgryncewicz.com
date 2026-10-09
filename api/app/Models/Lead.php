<?php

namespace App\Models;

use App\Mail\LeadConfirmationMail;
use App\Mail\NewLeadMail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Throwable;

class Lead extends Model
{
    use Prunable;

    protected $fillable = [
        'name', 'email', 'company', 'client_type', 'project_type', 'budget', 'timeline',
        'message', 'locale', 'ip', 'user_agent', 'privacy_accepted_at', 'notified_at',
    ];

    protected function casts(): array
    {
        return [
            'privacy_accepted_at' => 'datetime',
            'notified_at' => 'datetime',
        ];
    }

    /**
     * Emails the lead to CONTACT_RECIPIENT and marks it notified. The lead is already stored, so a
     * mail failure is only logged (`leads:renotify` retries it) and never thrown.
     */
    public function sendNotification(): bool
    {
        $recipient = config('contact.recipient');
        if (blank($recipient)) {
            Log::warning('Lead notification skipped: CONTACT_RECIPIENT is not set', ['lead_id' => $this->id]);

            return false;
        }

        try {
            Mail::to($recipient)->send(new NewLeadMail($this));
            $this->forceFill(['notified_at' => now()])->save();

            return true;
        } catch (Throwable $e) {
            Log::error('Lead notification failed', ['lead_id' => $this->id, 'error' => $e->getMessage()]);

            return false;
        }
    }

    /**
     * Sends the visitor the auto-reply, at most once per address per day. Not retried: unlike the
     * lead mail, nothing is lost when it fails.
     */
    public function sendConfirmation(): bool
    {
        if (! config('contact.confirmation') || blank(config('contact.recipient'))) {
            return false;
        }

        $key = 'lead-confirmation:'.sha1(Str::lower($this->email));
        if (RateLimiter::tooManyAttempts($key, 1)) {
            return false;
        }
        RateLimiter::hit($key, 86400);

        try {
            Mail::to($this->email)->send(new LeadConfirmationMail($this->locale));

            return true;
        } catch (Throwable $e) {
            Log::warning('Lead confirmation failed', ['lead_id' => $this->id, 'error' => $e->getMessage()]);

            return false;
        }
    }

    /** Deleted by `php artisan model:prune` (scheduled daily) once the retention period is over. */
    public function prunable(): Builder
    {
        return static::where('created_at', '<', now()->subMonths(config('contact.retention_months')));
    }
}
