import type { Content } from '~/content/en'

// Load only the current language's copy (each locale is its own JS chunk).
const loaders = {
  en: () => import('~/content/en'),
  pl: () => import('~/content/pl')
}
export const localeOf = (path: string): 'en' | 'pl' => (path === '/pl' || path.startsWith('/pl/') ? 'pl' : 'en')

export default defineNuxtPlugin({
  name: 'content',
  enforce: 'pre',
  async setup() {
    const store = shallowReactive<Partial<Record<'en' | 'pl', Content>>>({})
    const load = async (l: 'en' | 'pl') => {
      if (!store[l]) store[l] = (await loaders[l]()).default
    }
    const router = useRouter()
    await load(localeOf(useRequestURL().pathname))
    router.beforeEach(async (to) => { await load(localeOf(to.path)) })
    return { provide: { content: store } }
  }
})
