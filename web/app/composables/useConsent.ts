/**
 * Cookie consent + Google Consent Mode v2.
 *
 * Defaults (all non-essential storage denied) are set by an inline <head> script in app.vue,
 * before Google Tag Manager / gtag.js loads. This composable reads/writes the user's choice and
 * sends `gtag('consent', 'update', …)`. In basic consent mode it also loads the Google tags, and
 * only once analytics or marketing has been accepted.
 */
export interface ConsentChoice {
  analytics: boolean
  marketing: boolean
}

interface StoredConsent extends ConsentChoice {
  v: number
  ts: number
}

export const CONSENT_KEY = 'rg_consent'
export const CONSENT_VERSION = 1
// Re-ask after 12 months, as recommended by most EU DPAs
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

export function toGoogleConsent(c: ConsentChoice) {
  const v = (b: boolean) => (b ? 'granted' : 'denied')
  return {
    analytics_storage: v(c.analytics),
    ad_storage: v(c.marketing),
    ad_user_data: v(c.marketing),
    ad_personalization: v(c.marketing)
  }
}

function read(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed.v !== CONSENT_VERSION || Date.now() - parsed.ts > MAX_AGE_MS) return null
    return parsed
  } catch {
    return null
  }
}

let googleLoaded = false

/** Basic consent mode: inject GTM / gtag.js after consent (advanced mode has them in <head> already). */
function loadGoogleTags(c: ConsentChoice, ids: { gtmId: string, gaId: string }) {
  if (googleLoaded || !(c.analytics || c.marketing) || !(ids.gtmId || ids.gaId)) return
  googleLoaded = true
  const w = window as any
  const add = (src: string) => {
    const s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }
  if (ids.gtmId) {
    w.dataLayer.push({ 'gtm.start': Date.now(), 'event': 'gtm.js' })
    add(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.gtmId)}`)
  }
  if (ids.gaId) {
    w.gtag('js', new Date())
    w.gtag('config', ids.gaId)
    add(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.gaId)}`)
  }
}

export function useConsent() {
  const config = useRuntimeConfig().public
  const basicMode = config.consentMode === 'basic'
  const googleIds = { gtmId: config.gtmId as string, gaId: config.gaId as string }
  const choice = useState<ConsentChoice | null>('consent-choice', () => null)
  const bannerOpen = useState('consent-banner', () => false)
  const settingsOpen = useState('consent-settings', () => false)

  function init() {
    const stored = read()
    choice.value = stored ? { analytics: stored.analytics, marketing: stored.marketing } : null
    bannerOpen.value = !stored
    if (basicMode && stored) loadGoogleTags(stored, googleIds)
  }

  function save(c: ConsentChoice) {
    choice.value = { ...c }
    const record: StoredConsent = { ...c, v: CONSENT_VERSION, ts: Date.now() }
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
    } catch { /* private mode – choice still applies for this page view */ }

    const w = window as any
    w.dataLayer = w.dataLayer || []
    if (typeof w.gtag === 'function') w.gtag('consent', 'update', toGoogleConsent(c))
    w.dataLayer.push({ event: 'consent_update', consent_analytics: c.analytics, consent_marketing: c.marketing })
    if (basicMode) loadGoogleTags(c, googleIds)

    bannerOpen.value = false
    settingsOpen.value = false
  }

  const acceptAll = () => save({ analytics: true, marketing: true })
  const rejectAll = () => save({ analytics: false, marketing: false })
  const openSettings = () => { settingsOpen.value = true }

  return { choice, bannerOpen, settingsOpen, init, save, acceptAll, rejectAll, openSettings }
}
