<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\CspReportController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', ContactController::class)
    ->middleware('throttle:contact')
    ->name('contact');

Route::post('/csp-report', CspReportController::class)
    ->middleware('throttle:csp-report')
    ->name('csp-report');
