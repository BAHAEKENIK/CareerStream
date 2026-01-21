<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email:rfc,dns', 'max:255'],
            'token' => ['required', 'string', 'min:10', 'max:255'],
            'password' => ['required', 'string', 'min:10', 'confirmed', 'max:255'],
        ];
    }
}
