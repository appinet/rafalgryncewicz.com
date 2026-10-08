<?php

return [
    // Proxies / load balancers in front of the app (read by the TrustProxies middleware), so that
    // $request->ip() – used for rate limiting and stored with leads – is the visitor's IP, not the proxy's.
    // Comma-separated IPs / CIDR ranges, or "*" to trust the calling IP (only when the server is
    // reachable exclusively through the proxy). Empty = trust nobody (direct connections).
    'proxies' => env('TRUSTED_PROXIES') ?: null,
];
