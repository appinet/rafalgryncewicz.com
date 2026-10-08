<x-mail::message>
# New enquiry from rafalgryncewicz.com

<x-mail::table>
| | |
|:--|:--|
| **Name** | {{ $lead->name }} |
| **Email** | {{ $lead->email }} |
| **Company** | {{ $lead->company ?: '–' }} |
| **Client type** | {{ $lead->client_type ?: '–' }} |
| **Project** | {{ $lead->project_type }} |
| **Budget** | {{ $lead->budget ?: '–' }} |
| **Timeline** | {{ $lead->timeline ?: '–' }} |
| **Language** | {{ strtoupper($lead->locale) }} |
</x-mail::table>

**Message**

{{ $lead->message }}

<x-mail::button :url="'mailto:'.$lead->email">
Reply to {{ $lead->name }}
</x-mail::button>

<small>Lead #{{ $lead->id }} · {{ $lead->created_at->toDayDateTimeString() }} · IP {{ $lead->ip }}</small>
</x-mail::message>
