<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

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

        $this->notify($lead);

        return response()->json(['ok' => true, 'id' => $lead->id], 201);
    }

    /** The lead is already stored, so a mail failure must not lose it or fail the request. */
    private function notify(Lead $lead): void
    {
        $recipient = config('contact.recipient');
        if (blank($recipient)) {
            Log::warning('Lead notification skipped: CONTACT_RECIPIENT is not set', ['lead_id' => $lead->id]);

            return;
        }

        try {
            Mail::to($recipient)->send(new NewLeadMail($lead));
            $lead->forceFill(['notified_at' => now()])->save();
        } catch (Throwable $e) {
            Log::error('Lead notification failed', ['lead_id' => $lead->id, 'error' => $e->getMessage()]);
        }
    }
}
