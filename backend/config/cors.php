<?php

return [

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_filter([
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        env('FRONTEND_URL'), // set on Railway, e.g. https://your-site.vercel.app or https://yourdomain.com
    ])),

    'allowed_origins_patterns' => [
        '^https:\/\/.*\.vercel\.app$',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // we use Bearer tokens for admin
];
