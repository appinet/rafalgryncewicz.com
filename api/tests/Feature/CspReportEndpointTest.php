<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

class CspReportEndpointTest extends TestCase
{
    private function sendReport(string $contentType, array $body)
    {
        return $this->call('POST', '/api/csp-report', [], [], [], ['CONTENT_TYPE' => $contentType], json_encode($body));
    }

    private function expectLogged(array $context, int $times = 1): void
    {
        Log::shouldReceive('channel')->with('csp')->andReturnSelf();
        Log::shouldReceive('info')->times($times)->with('CSP violation', Mockery::subset($context));
    }

    public function test_legacy_report_uri_format_is_logged(): void
    {
        $this->expectLogged([
            'document-uri' => 'https://rafalgryncewicz.com/',
            'effective-directive' => 'script-src-elem',
            'blocked-uri' => 'https://evil.example/x.js',
        ]);

        $this->sendReport('application/csp-report', ['csp-report' => [
            'document-uri' => 'https://rafalgryncewicz.com/',
            'violated-directive' => 'script-src-elem',
            'effective-directive' => 'script-src-elem',
            'blocked-uri' => 'https://evil.example/x.js',
            'disposition' => 'report',
        ]])->assertNoContent();
    }

    public function test_reporting_api_format_is_logged_and_other_report_types_ignored(): void
    {
        $this->expectLogged([
            'document-uri' => 'https://rafalgryncewicz.com/pl',
            'effective-directive' => 'connect-src',
            'blocked-uri' => 'https://tracker.example',
        ]);

        $this->sendReport('application/reports+json', [
            ['type' => 'csp-violation', 'body' => [
                'documentURL' => 'https://rafalgryncewicz.com/pl',
                'effectiveDirective' => 'connect-src',
                'blockedURL' => 'https://tracker.example',
                'disposition' => 'report',
            ]],
            ['type' => 'deprecation', 'body' => ['id' => 'x']],
        ])->assertNoContent();
    }

    public function test_garbage_is_accepted_but_not_logged(): void
    {
        Log::shouldReceive('channel')->never();

        $this->call('POST', '/api/csp-report', [], [], [], ['CONTENT_TYPE' => 'application/csp-report'], 'not json')
            ->assertNoContent();
    }

    public function test_reports_are_rate_limited(): void
    {
        Log::shouldReceive('channel')->andReturnSelf();
        Log::shouldReceive('info');

        for ($i = 0; $i < 30; $i++) {
            $this->sendReport('application/csp-report', ['csp-report' => ['blocked-uri' => 'inline']])->assertNoContent();
        }
        $this->sendReport('application/csp-report', ['csp-report' => ['blocked-uri' => 'inline']])->assertTooManyRequests();
    }

    public function test_reporting_api_preflight_is_allowed_from_the_site(): void
    {
        config(['cors.allowed_origins' => ['https://rafalgryncewicz.com']]);

        $this->call('OPTIONS', '/api/csp-report', [], [], [], [
            'HTTP_ORIGIN' => 'https://rafalgryncewicz.com',
            'HTTP_ACCESS_CONTROL_REQUEST_METHOD' => 'POST',
            'HTTP_ACCESS_CONTROL_REQUEST_HEADERS' => 'content-type',
        ])->assertHeader('Access-Control-Allow-Origin', 'https://rafalgryncewicz.com');
    }
}
