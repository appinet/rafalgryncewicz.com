  <script setup lang="ts">
const config = useRuntimeConfig().public
const site = useAppConfig().site
const { t, locale, alternate } = useContent()
const route = useRoute()

const gtmId = config.gtmId as string
const gaId = config.gaId as string
const plausibleDomain = config.plausibleDomain as string
// Basic consent mode: Google tags are injected by useConsent() only after consent
const googleInHead = config.consentMode !== 'basic'

// Google Consent Mode v2 – defaults MUST be declared before any Google tag loads.
const consentBootstrap = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',personalization_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
try{var c=JSON.parse(localStorage.getItem('rg_consent'));if(c&&c.v===1&&Date.now()-c.ts<31536e6){var g=function(b){return b?'granted':'denied'};gtag('consent','update',{analytics_storage:g(c.analytics),ad_storage:g(c.marketing),ad_user_data:g(c.marketing),ad_personalization:g(c.marketing)});}}catch(e){}
`.trim()

const scripts: any[] = [
  { key: 'consent-default', innerHTML: consentBootstrap, tagPriority: 'critical' }
]
if (googleInHead && gtmId) {
  scripts.push({
    key: 'gtm',
    innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
  })
}
if (googleInHead && gaId) {
  scripts.push({ key: 'gtag-src', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true })
  scripts.push({ key: 'gtag-cfg', innerHTML: `gtag('js',new Date());gtag('config','${gaId}');` })
}
// Plausible: cookieless analytics, no consent needed
if (plausibleDomain) {
  scripts.push({ key: 'plausible', src: 'https://plausible.io/js/script.tagged-events.outbound-links.js', defer: true, 'data-domain': plausibleDomain })
}

const canonicalPath = computed(() => (route.path !== '/' ? route.path.replace(/\/$/, '') : '/'))

useHead({
  htmlAttrs: { lang: locale },
  titleTemplate: (title?: string) => (title ? `${title} · ${site.name}` : t.value.meta.title),
  script: scripts,
  link: computed(() => [
    { rel: 'canonical', href: config.siteUrl + (canonicalPath.value === '/' ? '/' : canonicalPath.value) },
    { rel: 'alternate', hreflang: 'en', href: config.siteUrl + alternate(route.path, 'en') },
    { rel: 'alternate', hreflang: 'pl', href: config.siteUrl + alternate(route.path, 'pl') },
    { rel: 'alternate', hreflang: 'x-default', href: config.siteUrl + alternate(route.path, 'en') }
  ])
})

useSeoMeta({
  description: () => t.value.meta.description,
  ogType: 'website',
  ogSiteName: site.name,
  ogLocale: () => t.value.meta.ogLocale,
  ogTitle: () => t.value.meta.title,
  ogDescription: () => t.value.meta.description,
  ogUrl: () => config.siteUrl + canonicalPath.value,
  ogImage: `${config.siteUrl}/og.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => t.value.meta.title,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t.value.meta.title,
  twitterDescription: () => t.value.meta.description,
  twitterImage: `${config.siteUrl}/og.png`
})
</script>

<template>
  <div>
    <noscript v-if="googleInHead && gtmId">
      <iframe :src="`https://www.googletagmanager.com/ns.html?id=${gtmId}`" height="0" width="0" style="display:none;visibility:hidden" />
    </noscript>
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black">{{ t.nav.skip }}</a>
    <AppHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <LazyAppFooter hydrate-on-visible />
    <LazyCookieConsent hydrate-on-idle />
  </div>
</template>
