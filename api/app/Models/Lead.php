<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;

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

    /** Deleted by `php artisan model:prune` (scheduled daily) once the retention period is over. */
    public function prunable(): Builder
    {
        return static::where('created_at', '<', now()->subMonths(config('contact.retention_months')));
    }
}
