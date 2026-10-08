<?php

namespace Tests\Feature;

use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactEndpointTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Jane Tester',
            'email' => 'jane@example.com',
            'company' => 'Acme',
            'clientType' => 'Software house',
            'projectType' => 'API or ERP integration',
            'budget' => '€5k – €15k',
            'timeline' => 'Within a month',
            'message' => 'We need a PrestaShop to ERP integration for orders and stock.',
            'privacy' => true,
            'locale' => 'en',
        ], $overrides);
    }

    public function test_valid_enquiry_is_stored_and_emailed(): void
    {
        Mail::fake();

        $this->postJson('/api/contact', $this->payload())
            ->assertCreated()
            ->assertJson(['ok' => true]);

        $lead = Lead::sole();
        $this->assertSame('jane@example.com', $lead->email);
        $this->assertNotNull($lead->privacy_accepted_at);
        $this->assertNotNull($lead->notified_at);
        Mail::assertSent(NewLeadMail::class, fn ($mail) => $mail->hasTo(config('contact.recipient')) && $mail->hasReplyTo('jane@example.com'));
    }

    public function test_invalid_enquiry_is_rejected(): void
    {
        Mail::fake();

        $this->postJson('/api/contact', $this->payload(['email' => 'nope', 'message' => 'short', 'privacy' => false]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'message', 'privacy']);

        $this->assertDatabaseCount('leads', 0);
        Mail::assertNothingSent();
    }

    public function test_honeypot_blocks_bots(): void
    {
        $this->postJson('/api/contact', $this->payload(['website' => 'http://spam.example']))
            ->assertUnprocessable();

        $this->assertDatabaseCount('leads', 0);
    }

    public function test_turnstile_is_required_when_configured(): void
    {
        Mail::fake();
        config(['services.turnstile.secret' => 'test-secret']);
        Http::fake(['challenges.cloudflare.com/*' => Http::sequence()
            ->push(['success' => false])
            ->push(['success' => true])]);

        $this->postJson('/api/contact', $this->payload(['turnstileToken' => 'bad']))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['turnstileToken']);

        $this->postJson('/api/contact', $this->payload(['turnstileToken' => 'good']))
            ->assertCreated();
    }

    public function test_requests_are_rate_limited(): void
    {
        Mail::fake();
        config(['contact.per_minute' => 2]);

        $this->postJson('/api/contact', $this->payload())->assertCreated();
        $this->postJson('/api/contact', $this->payload())->assertCreated();
        $this->postJson('/api/contact', $this->payload())->assertTooManyRequests();
    }

    public function test_lead_is_kept_when_mail_fails(): void
    {
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('SMTP down'));

        $this->postJson('/api/contact', $this->payload())->assertCreated();

        $this->assertNull(Lead::sole()->notified_at);
    }

    public function test_lead_is_kept_without_a_configured_recipient(): void
    {
        Mail::fake();
        config(['contact.recipient' => null]);

        $this->postJson('/api/contact', $this->payload())->assertCreated();

        $this->assertNull(Lead::sole()->notified_at);
        Mail::assertNothingSent();
    }

    public function test_visitor_input_cannot_inject_markdown_into_the_mail(): void
    {
        $lead = Lead::create([
            'name' => 'Eve | Admin', 'email' => 'eve@example.com', 'project_type' => 'Web application',
            'message' => "Hi [click here](https://phish.example) and **urgent**\n<script>x</script>\nsecond line",
            'privacy_accepted_at' => now(),
        ]);

        $html = (new NewLeadMail($lead))->render();

        $this->assertStringNotContainsString('href="https://phish.example"', $html);
        $this->assertStringNotContainsString('<strong>urgent</strong>', $html);
        $this->assertStringNotContainsString('<script>', $html);
        $this->assertStringContainsString('[click here](https://phish.example)', $html);
        $this->assertStringContainsString('Eve | Admin', $html);
        $this->assertStringContainsString('<br', $html);
    }

    public function test_cors_allows_the_site_origin(): void
    {
        config(['cors.allowed_origins' => ['https://rafalgryncewicz.com']]);

        $this->call('OPTIONS', '/api/contact', [], [], [], [
            'HTTP_ORIGIN' => 'https://rafalgryncewicz.com',
            'HTTP_ACCESS_CONTROL_REQUEST_METHOD' => 'POST',
        ])->assertHeader('Access-Control-Allow-Origin', 'https://rafalgryncewicz.com');
    }

    public function test_forwarded_ip_is_ignored_unless_the_proxy_is_trusted(): void
    {
        Mail::fake();
        $headers = ['X-Forwarded-For' => '203.0.113.7'];

        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1'])
            ->postJson('/api/contact', $this->payload(), $headers)->assertCreated();
        $this->assertSame('10.0.0.1', Lead::latest('id')->first()->ip);

        config(['trustedproxy.proxies' => '10.0.0.1']);
        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1'])
            ->postJson('/api/contact', $this->payload(), $headers)->assertCreated();
        $this->assertSame('203.0.113.7', Lead::latest('id')->first()->ip);
    }

    public function test_rate_limit_is_per_visitor_behind_a_trusted_proxy(): void
    {
        Mail::fake();
        config(['contact.per_minute' => 1, 'trustedproxy.proxies' => '10.0.0.1']);
        $proxy = $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1']);

        $proxy->postJson('/api/contact', $this->payload(), ['X-Forwarded-For' => '203.0.113.7'])->assertCreated();
        $proxy->postJson('/api/contact', $this->payload(), ['X-Forwarded-For' => '198.51.100.9'])->assertCreated();
        $proxy->postJson('/api/contact', $this->payload(), ['X-Forwarded-For' => '203.0.113.7'])->assertTooManyRequests();
    }

    public function test_old_leads_are_pruned_and_ips_anonymized(): void
    {
        Mail::fake();
        $this->postJson('/api/contact', $this->payload())->assertCreated();
        $this->postJson('/api/contact', $this->payload())->assertCreated();
        $this->postJson('/api/contact', $this->payload())->assertCreated();
        [$fresh, $month, $expired] = Lead::orderBy('id')->get();
        $month->forceFill(['created_at' => now()->subDays(31)])->save();
        $expired->forceFill(['created_at' => now()->subMonths(37)])->save();

        $this->artisan('leads:anonymize')->assertSuccessful();
        $this->artisan('model:prune', ['--model' => [Lead::class]])->assertSuccessful();

        $this->assertNotNull($fresh->fresh()->ip);
        $this->assertNull($month->fresh()->ip);
        $this->assertNull($month->fresh()->user_agent);
        $this->assertNull($expired->fresh());
    }
}
