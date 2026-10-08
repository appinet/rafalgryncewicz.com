<script setup lang="ts">
const { t, locale } = useContent()
const { openSettings } = useConsent()
useSeoMeta({ title: () => t.value.legal.cookiesTitle, robots: 'noindex, follow' })
const pl = computed(() => locale.value === 'pl')
</script>

<template>
  <LegalPage :title="t.legal.cookiesTitle" :updated="pl ? '8 października 2026' : '8 October 2026'">
    <p v-if="pl">Strona korzysta z Google Consent Mode v2. Dopóki nie dokonasz wyboru, wszystkie nieniezbędne zapisy są <strong>zablokowane</strong> i nie są ustawiane żadne cookies analityczne ani reklamowe.</p>
    <p v-else>This site uses Google Consent Mode v2. Until you make a choice, all non-essential storage is <strong>denied</strong> and no analytics or advertising cookies are set.</p>
    <AppButton icon="i-lucide-cookie" @click="openSettings">{{ t.legal.change }}</AppButton>

    <h2>{{ pl ? 'Używane cookies i pamięć przeglądarki' : 'Cookies and storage used' }}</h2>
    <div class="overflow-x-auto">
      <table>
        <thead><tr><th>{{ pl ? 'Nazwa' : 'Name' }}</th><th>{{ pl ? 'Cel' : 'Purpose' }}</th><th>{{ pl ? 'Kategoria' : 'Category' }}</th><th>{{ pl ? 'Czas' : 'Duration' }}</th></tr></thead>
        <tbody>
          <tr><td><code>rg_consent</code> (local storage)</td><td>{{ pl ? 'Zapamiętuje Twój wybór dotyczący cookies' : 'Remembers your cookie choice' }}</td><td>{{ pl ? 'Niezbędne' : 'Necessary' }}</td><td>{{ pl ? '12 miesięcy' : '12 months' }}</td></tr>
          <tr><td><code>cf_*</code> (Turnstile)</td><td>{{ pl ? 'Ochrona formularza przed spamem' : 'Protects the contact form from spam' }}</td><td>{{ pl ? 'Niezbędne' : 'Necessary' }}</td><td>{{ pl ? 'Sesja' : 'Session' }}</td></tr>
          <tr><td><code>_ga</code>, <code>_ga_*</code></td><td>{{ pl ? 'Google Analytics 4, rozróżnia odwiedzających' : 'Google Analytics 4, distinguishes visitors' }}</td><td>{{ pl ? 'Analityczne' : 'Analytics' }}</td><td>{{ pl ? 'Do 2 lat' : 'Up to 2 years' }}</td></tr>
          <tr><td><code>_gcl_*</code></td><td>{{ pl ? 'Pomiar konwersji Google Ads' : 'Google Ads conversion measurement' }}</td><td>{{ pl ? 'Marketingowe' : 'Marketing' }}</td><td>{{ pl ? '90 dni' : '90 days' }}</td></tr>
        </tbody>
      </table>
    </div>

    <h2>{{ pl ? 'Sygnały Consent Mode' : 'Consent Mode signals' }}</h2>
    <p v-if="pl">Twój wybór jest przekazywany do Google jako <code>analytics_storage</code> (analityczne) oraz <code>ad_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code> (marketingowe). Bez zgody tagi Google mogą wysyłać jedynie anonimowe sygnały bez cookies.</p>
    <p v-else>Your choice is passed to Google as <code>analytics_storage</code> (Analytics) and <code>ad_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code> (Marketing). Without consent, Google tags may send cookieless, anonymous pings only.</p>

    <h2>{{ pl ? 'Wycofanie zgody' : 'Withdrawing consent' }}</h2>
    <p v-if="pl">Możesz zmienić lub wycofać zgodę w każdej chwili przez „Ustawienia cookies” w stopce albo przycisk powyżej.</p>
    <p v-else>You can change or withdraw your consent at any time via “Cookie settings” in the footer or the button above.</p>
  </LegalPage>
</template>
