<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class NewLeadMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Lead $lead) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [new Address($this->lead->email, $this->lead->name)],
            subject: "New enquiry: {$this->lead->project_type} – {$this->lead->name}",
        );
    }

    public function content(): Content
    {
        $lead = $this->lead;
        // Table cells must stay on one line
        $cell = fn (?string $value) => self::markdownText(Str::squish($value ?? '')) ?: '–';

        return new Content(markdown: 'mail.new-lead', with: [
            'safe' => [
                'name' => $cell($lead->name),
                'email' => $cell($lead->email),
                'company' => $cell($lead->company),
                'client_type' => $cell($lead->client_type),
                'project_type' => $cell($lead->project_type),
                'budget' => $cell($lead->budget),
                'timeline' => $cell($lead->timeline),
                'message' => self::markdownText($lead->message),
            ],
        ]);
    }

    /**
     * Visitor input as literal Markdown text: punctuation is backslash-escaped so it cannot create
     * links, emphasis or break the table (`|`), and line breaks are kept. HTML is escaped by {{ }}.
     */
    public static function markdownText(string $text): string
    {
        $text = preg_replace('/([\\\\`*_{}\[\]()#+\-.!|~])/', '\\\\$1', trim($text));

        return preg_replace('/\R/', "  \n", $text);
    }
}
