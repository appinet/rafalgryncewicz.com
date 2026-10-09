<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * Auto-reply to the visitor. Anyone can type any address into the form, so the text is fixed and
 * contains nothing the visitor entered (no name, no message): it cannot carry someone else's spam.
 */
class LeadConfirmationMail extends Mailable
{
    use Queueable;

    private const TEXT = [
        'en' => [
            'subject' => 'Thank you for your message',
            'greeting' => 'Hello,',
            'body' => 'thank you for getting in touch. Your message has arrived and I will reply within one business day, usually with a few questions and a time for a short call.',
            'reply' => 'If you would like to add something, simply reply to this email.',
            'signoff' => 'Best regards,',
            'notice' => 'You are receiving this email because this address was entered in the contact form on :site. If it was not you, please ignore it.',
        ],
        'pl' => [
            'subject' => 'Dziękuję za wiadomość',
            'greeting' => 'Dzień dobry,',
            'body' => 'dziękuję za kontakt. Wiadomość dotarła i odpowiem w ciągu jednego dnia roboczego, zwykle z kilkoma pytaniami i propozycją krótkiej rozmowy.',
            'reply' => 'Jeśli chcesz coś dodać, po prostu odpowiedz na tego maila.',
            'signoff' => 'Pozdrawiam,',
            'notice' => 'Ten e-mail został wysłany, ponieważ ten adres podano w formularzu kontaktowym na :site. Jeśli to nie Ty, zignoruj go.',
        ],
    ];

    private array $text;

    public function __construct(string $locale)
    {
        $this->text = self::TEXT[$locale] ?? self::TEXT['en'];
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.from.address'), config('contact.signature')),
            replyTo: [new Address(config('contact.recipient'), config('contact.signature'))],
            subject: $this->text['subject'],
        );
    }

    public function content(): Content
    {
        $site = config('contact.site_url');

        return new Content(markdown: 'mail.lead-confirmation', with: [
            'text' => $this->text,
            'notice' => str_replace(':site', parse_url($site, PHP_URL_HOST), $this->text['notice']),
            'siteUrl' => $site,
            'signature' => config('contact.signature'),
        ]);
    }
}
