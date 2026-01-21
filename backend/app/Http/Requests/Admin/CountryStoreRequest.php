<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CountryStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'iso2' => ['required', 'string', 'size:2'],
            'flag_emoji' => ['nullable', 'string', 'max:8'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer'],
        ];
    }
}
