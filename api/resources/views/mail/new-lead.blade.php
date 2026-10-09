<x-mail::message>
# New enquiry from rafalgryncewicz.com

<x-mail::table>
| | |
|:--|:--|
| **Name** | {{ $safe['name'] }} |
| **Email** | {{ $safe['email'] }} |
| **Company** | {{ $safe['company'] }} |
| **Client type** | {{ $safe['client_type'] }} |
| **Project** | {{ $safe['project_type'] }} |
| **Budget** | {{ $safe['budget'] }} |
| **Timeline** | {{ $safe['timeline'] }} |
| **Language** | {{ strtoupper($lead->locale) }} |
</x-mail::table>

**Message**

{{ $safe['message'] }}

<x-mail::button :url="'mailto:'.$lead->email">
Reply to {{ $lead->name }}
</x-mail::button>

{{-- No IP here: the privacy policy keeps IPs for 30 days (`leads:anonymize`), a mailbox keeps them forever --}}
<small>Lead #{{ $lead->id }} · {{ $lead->created_at->toDayDateTimeString() }}</small>
</x-mail::message>
