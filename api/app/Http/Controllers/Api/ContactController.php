<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __invoke(ContactRequest $request): JsonResponse
    {
        $data = $request->validated();

        $lead = Lead::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'company' => $data['company'] ?? null,
            'client_type' => $data['clientType'] ?? null,
            'project_type' => $data['projectType'],
            'budget' => $data['budget'] ?? null,
            'timeline' => $data['timeline'] ?? null,
            'message' => $data['message'],
            'locale' => $data['locale'] ?? 'en',
            'ip' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 255),
            'privacy_accepted_at' => now(),
        ]);

        // A failed mail is retried by `leads:renotify`, so the visitor still gets a success response
        $lead->sendNotification();
        $lead->sendConfirmation();

        return response()->json(['ok' => true, 'id' => $lead->id], 201);
    }
}
