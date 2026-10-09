// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  modules: ['@nuxt/ui'],
  css: [
    '@fontsource-variable/geist/wght.css',
    '@fontsource/instrument-serif/latin-400-italic.css',
    '@fontsource/instrument-serif/latin-ext-400-italic.css',
    '~/assets/css/main.css'
  ],
  devtools: { enabled: false },

  // Fully static output (nuxt generate) – deploy .output/public to any CDN / VPS
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/privacy', '/cookies', '/pl', '/pl/privacy', '/pl/cookies', '/sitemap.xml'],
      crawlLinks: true
    },
    // Windows build fix: Nitro matches its inline list against the resolved path without normalising
    // backslashes, so Nuxt's renderer (`nuxt/internal/*` → node_modules\nuxt\dist) ends up external and
    // resolves `nuxt/internal/precomputed` to an empty stub → every prerendered page fails with
    // "Either manifest or precomputed data must be provided". Harmless on Linux/macOS (already inlined there).
    externals: {
      inline: ['nuxt/internal', /[\\/]node_modules[\\/](?:nuxt[\\/]dist|@nuxt)[\\/]/]
    }
  },

  // Dark-only premium theme, no colour-mode script needed
  ui: {
    colorMode: false,
    // Only generate CSS variants for colours actually used (smaller CSS)
    theme: { colors: ['primary', 'neutral', 'error'] },
    // Fonts are self-hosted from @fontsource (no request to Google Fonts = GDPR-friendly, faster)
    fonts: false
  },

  // Bundle icons locally – no runtime requests to the Iconify API
  icon: {
    provider: 'none',
    mode: 'svg',
    serverBundle: 'local',
    clientBundle: { scan: { globInclude: ['app/**/*.{vue,ts}'] }, sizeLimitKb: 256 }
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://rafalgryncewicz.com',
      // Google Tag Manager container (GTM-XXXX) and/or GA4 measurement id (G-XXXX).
      // Leave empty to ship without any tracking. Set via NUXT_PUBLIC_GTM_ID / NUXT_PUBLIC_GA_ID.
      gtmId: '',
      gaId: '',
      // Google Consent Mode: 'advanced' (default) loads GTM / gtag right away with everything denied
      // (cookieless pings until consent); 'basic' loads no Google script at all until the visitor
      // accepts analytics or marketing. Set via NUXT_PUBLIC_CONSENT_MODE.
      consentMode: 'advanced',
      // Where the contact form POSTs JSON. Empty = falls back to opening the mail client.
      // Set via NUXT_PUBLIC_FORM_ENDPOINT (e.g. your Laravel endpoint, Formspree, Web3Forms...).
      formEndpoint: '',
      // Cloudflare Turnstile site key (spam protection on the form). Empty = no captcha.
      turnstileSiteKey: '',
      // Plausible Analytics domain (cookieless, no consent banner needed for it). Empty = off.
      plausibleDomain: ''
    }
  },

  app: {
    head: {
      htmlAttrs: { class: 'dark' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#09090b' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  hooks: {
    // An empty endpoint is valid (the form opens the visitor's mail app), but in a production build it is
    // almost always a missing web/.env, and the form would silently stop reaching the API
    ready: (nuxt) => {
      if (nuxt.options.dev || process.env.NUXT_PUBLIC_FORM_ENDPOINT || nuxt.options.runtimeConfig.public.formEndpoint) return
      console.warn('\n⚠ NUXT_PUBLIC_FORM_ENDPOINT is empty: the contact form will open the visitor\'s mail app instead of '
        + 'sending to the API.\n  Set it in web/.env (see .env.example) unless that is intended.\n')
    },
    // Don't preload/prefetch JS chunks: the HTML is fully rendered, JS is only needed for interactivity.
    // Keeps the network free for HTML + fonts during first paint.
    'build:manifest': (manifest) => {
      for (const item of Object.values(manifest)) {
        item.preload = false
        item.prefetch = false
      }
    }
  },

  experimental: {
    inlineRouteRules: false
  },

  features: {
    inlineStyles: true
  }
})
