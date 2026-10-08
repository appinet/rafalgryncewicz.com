<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('contact', fn (Request $request) => [
            Limit::perMinute(config('contact.per_minute'))->by('min:'.$request->ip()),
            Limit::perDay(config('contact.per_day'))->by('day:'.$request->ip()),
        ]);

        // A page with several violations sends a burst of reports; keep one visitor from flooding the log
        RateLimiter::for('csp-report', fn (Request $request) => Limit::perMinute(30)->by('csp:'.$request->ip()));
    }
}
