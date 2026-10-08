<script setup lang="ts">
const site = useAppConfig().site
const { t, locale, lp } = useContent()
useSeoMeta({ title: () => t.value.legal.privacyTitle, robots: 'noindex, follow' })
</script>

<template>
  <LegalPage :title="t.legal.privacyTitle" :updated="locale === 'pl' ? '8 października 2026' : '8 October 2026'">
    <template v-if="locale === 'pl'">
      <p>Ta polityka wyjaśnia, jak przetwarzane są dane osobowe w serwisie <strong>rafalgryncewicz.com</strong>, zgodnie z RODO.</p>
      <h2>Administrator danych</h2>
      <p>{{ site.legalEntity }}. Kontakt: <a :href="`mailto:${site.email}`">{{ site.email }}</a>.</p>
      <h2>Jakie dane i w jakim celu</h2>
      <ul>
        <li><strong>Formularz kontaktowy i e-mail</strong>: imię i nazwisko, e-mail, firma i treść wiadomości, w celu odpowiedzi na zapytanie i przygotowania oferty (art. 6 ust. 1 lit. b i f RODO). Przechowywane tak długo, jak to potrzebne do obsługi zapytania, i do 3 lat później na potrzeby ewentualnych roszczeń, chyba że dojdzie do zawarcia umowy.</li>
        <li><strong>Analityka</strong> (tylko za Twoją zgodą): pseudonimowe dane o korzystaniu ze strony zbierane przez Google Analytics 4 (art. 6 ust. 1 lit. a RODO). GA4 nie zapisuje adresów IP.</li>
        <li><strong>Zabezpieczenie formularza</strong>: Cloudflare Turnstile sprawdza, czy formularz wysyła człowiek (art. 6 ust. 1 lit. f RODO).</li>
        <li><strong>Logi serwera</strong>: dane techniczne, takie jak adres IP, przeglądarka i czas żądania, przechowywane do 30 dni ze względów bezpieczeństwa (art. 6 ust. 1 lit. f RODO).</li>
      </ul>
      <h2>Odbiorcy</h2>
      <p>Dane mogą być przetwarzane przez dostawców hostingu i poczty działających na moje zlecenie, Cloudflare oraz, jeśli wyrazisz zgodę na analitykę, Google Ireland Ltd. Przekazanie poza EOG odbywa się na podstawie EU–US Data Privacy Framework lub standardowych klauzul umownych.</p>
      <h2>Twoje prawa</h2>
      <p>Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przenoszenia, prawo sprzeciwu oraz prawo do wycofania zgody w dowolnym momencie bez wpływu na wcześniejsze przetwarzanie. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).</p>
      <h2>Cookies</h2>
      <p>Szczegóły i zmiana ustawień: <NuxtLink :to="lp('/cookies')">polityka cookies</NuxtLink>.</p>
    </template>
    <template v-else>
      <p>This policy explains how personal data is processed on <strong>rafalgryncewicz.com</strong>, in line with the EU General Data Protection Regulation (GDPR).</p>
      <h2>Data controller</h2>
      <p>{{ site.legalEntity }}. Contact: <a :href="`mailto:${site.email}`">{{ site.email }}</a>.</p>
      <h2>What data I process and why</h2>
      <ul>
        <li><strong>Contact form and email</strong>: name, email, company and the content of your message, to reply to your enquiry and prepare an offer (Art. 6(1)(b) and (f) GDPR). Kept for as long as needed to handle the enquiry and up to 3 years afterwards for potential claims, unless a contract follows.</li>
        <li><strong>Analytics</strong> (only with your consent): pseudonymous usage data collected by Google Analytics 4 (Art. 6(1)(a) GDPR). IP addresses are not stored by GA4.</li>
        <li><strong>Form protection</strong>: Cloudflare Turnstile checks that the form is sent by a human (Art. 6(1)(f) GDPR).</li>
        <li><strong>Server logs</strong>: technical data such as IP address, browser and time of request, kept for up to 30 days for security (Art. 6(1)(f) GDPR).</li>
      </ul>
      <h2>Recipients</h2>
      <p>Data may be processed by hosting and email providers acting on my behalf, Cloudflare and, if you consent to analytics, Google Ireland Ltd. Transfers outside the EEA rely on the EU–US Data Privacy Framework or Standard Contractual Clauses.</p>
      <h2>Your rights</h2>
      <p>You have the right to access, rectify, erase, restrict and port your data, to object to processing, and to withdraw consent at any time without affecting earlier processing. You can also lodge a complaint with the supervisory authority (in Poland: Prezes Urzędu Ochrony Danych Osobowych, uodo.gov.pl).</p>
      <h2>Cookies</h2>
      <p>See the <NuxtLink :to="lp('/cookies')">cookie policy</NuxtLink> for details and to change your settings.</p>
    </template>
  </LegalPage>
</template>
