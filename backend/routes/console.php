<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Schedule::command('jobs:prune-old --days=60')
    ->dailyAt('03:15')
    ->timezone('Africa/Casablanca');

Artisan::command('careerstrem:ping', function () {
    $this->comment('CareerStream console is working.');
})->purpose('Verify console routes are loaded');
