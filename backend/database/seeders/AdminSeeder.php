<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::query()->updateOrCreate(
            ['email' => 'bahaekenik@gmail.com'],
            [
                'name' => 'CareerStream Admin',
                'password' => Hash::make('ChangeMeNow!!2026'),
                'force_password_change' => true,
            ]
        );
    }
}
