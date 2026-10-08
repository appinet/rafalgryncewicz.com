import type { Content } from '~/content/en'

export type Locale = 'en' | 'pl'

/** Locale comes from the URL: /pl/... is Polish, everything else English. */
export function useLocale() {
  const route = useRoute()
  return computed<Locale>(() => (route.path === '/pl' || route.path.startsWith('/pl/') ? 'pl' : 'en'))
}

export function useContent() {
  const locale = useLocale()
  const store = useNuxtApp().$content as Partial<Record<Locale, Content>>
  const t = computed(() => (store[locale.value] ?? store.en ?? store.pl) as Content)
  /** Prefix a path with the current locale: lp('/privacy') -> '/pl/privacy' */
  const lp = (path: string) => (locale.value === 'pl' ? (path === '/' ? '/pl' : `/pl${path}`) : path)
  /** Same page in the other language */
  const alternate = (path: string, target: Locale) => {
    const bare = path.replace(/^\/pl(?=\/|$)/, '') || '/'
    return target === 'pl' ? (bare === '/' ? '/pl' : `/pl${bare}`) : bare
  }
  return { t, locale, lp, alternate }
}
