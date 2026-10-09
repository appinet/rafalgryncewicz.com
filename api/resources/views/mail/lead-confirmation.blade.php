{{-- Own header and footer: the default ones show APP_NAME / APP_URL, i.e. the API, not the website --}}
<x-mail::layout>
<x-slot:header>
<x-mail::header :url="$siteUrl">
{{ parse_url($siteUrl, PHP_URL_HOST) }}
</x-mail::header>
</x-slot:header>

{{ $text['greeting'] }}

{{ $text['body'] }}

{{ $text['reply'] }}

{{ $text['signoff'] }}<br>
{{ $signature }}

<x-slot:subcopy>
<x-mail::subcopy>
{{ $notice }}
</x-mail::subcopy>
</x-slot:subcopy>

<x-slot:footer>
<x-mail::footer>
[{{ parse_url($siteUrl, PHP_URL_HOST) }}]({{ $siteUrl }})
</x-mail::footer>
</x-slot:footer>
</x-mail::layout>
