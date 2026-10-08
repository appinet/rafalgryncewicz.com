<?php

use Illuminate\Support\Facades\Route;

// API-only app: the website itself is the static Nuxt build in ../web
Route::get('/', fn () => response()->json(['service' => 'rafalgryncewicz.com API']));
