<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Receives Content-Security-Policy violation reports and writes them to storage/logs/csp.log.
 *
 * Accepts both formats browsers send: the legacy `report-uri` body (application/csp-report,
 * {"csp-report": {...}}) and the Reporting API (`report-to`, application/reports+json, a list of
 * {"type": "csp-violation", "body": {...}}). Only the violation fields are logged, no IP.
 */
class CspReportController extends Controller
{
    private const MAX_REPORTS = 20;

    /** Reporting API (camelCase) field => legacy (kebab-case) field, logged under the legacy name */
    private const FIELDS = [
        'documentURL' => 'document-uri',
        'effectiveDirective' => 'effective-directive',
        'blockedURL' => 'blocked-uri',
        'sourceFile' => 'source-file',
        'lineNumber' => 'line-number',
        'columnNumber' => 'column-number',
        'sample' => 'script-sample',
        'disposition' => 'disposition',
        'referrer' => 'referrer',
    ];

    public function __invoke(Request $request): Response
    {
        $payload = json_decode($request->getContent(), true);

        $reports = match (true) {
            is_array($payload['csp-report'] ?? null) => [$payload['csp-report']],
            is_array($payload) && array_is_list($payload) => collect($payload)
                ->filter(fn ($r) => ($r['type'] ?? null) === 'csp-violation' && is_array($r['body'] ?? null))
                ->pluck('body')->all(),
            default => [],
        };

        foreach (array_slice($reports, 0, self::MAX_REPORTS) as $report) {
            Log::channel('csp')->info('CSP violation', $this->normalize($report));
        }

        return response()->noContent();
    }

    private function normalize(array $report): array
    {
        $out = [];
        foreach (self::FIELDS as $modern => $legacy) {
            $value = $report[$modern] ?? $report[$legacy] ?? null;
            if ($value === null || $value === '') {
                continue;
            }
            $out[$legacy] = is_scalar($value) ? Str::limit((string) $value, 300) : null;
        }
        $out['effective-directive'] ??= isset($report['violated-directive'])
            ? Str::limit((string) $report['violated-directive'], 100)
            : null;

        return array_filter($out, fn ($v) => $v !== null);
    }
}
