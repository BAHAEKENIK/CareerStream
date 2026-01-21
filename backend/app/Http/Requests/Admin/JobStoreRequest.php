<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class JobStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // ADMIN ENTERS NAMES — BACKEND RESOLVES IDS
            'category_name' => ['required', 'string', 'max:255'],
            'country_name' => ['required', 'string', 'max:255'],
            'city_name' => ['nullable', 'string', 'max:255'],

            'company_name' => ['required', 'string', 'max:255'],
            'company_logo_path' => ['nullable', 'string', 'max:255'],

            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'requirements' => ['nullable', 'string'],

            'location_text' => ['nullable', 'string', 'max:255'],
            'apply_url' => ['required', 'url', 'max:255'],

            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],

            'published_at' => ['nullable', 'date'],
        ];
    }
}
