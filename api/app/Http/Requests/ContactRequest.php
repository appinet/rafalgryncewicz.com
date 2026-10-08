<?php

namespace App\Http\Requests;

use App\Services\Turnstile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'company' => ['nullable', 'string', 'max:160'],
            'clientType' => ['nullable', 'string', 'max:80'],
            'projectType' => ['required', 'string', 'max:80'],
            'budget' => ['nullable', 'string', 'max:80'],
            'timeline' => ['nullable', 'string', 'max:80'],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
            'privacy' => ['accepted'],
            'locale' => ['nullable', 'in:en,pl'],
            'turnstileToken' => ['nullable', 'string', 'max:2048'],
            // Honeypot – must stay empty
            'website' => ['prohibited'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }
                $turnstile = app(Turnstile::class);
                if ($turnstile->enabled() && ! $turnstile->verify($this->input('turnstileToken'), $this->ip())) {
                    $validator->errors()->add('turnstileToken', 'Security check failed. Please try again.');
                }
            },
        ];
    }
}
