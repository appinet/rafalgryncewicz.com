<script setup lang="ts">
const { t, locale, lp, alternate } = useContent()
const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const home = computed(() => lp('/'))
const links = computed(() => t.value.nav.links.map(l => ({ label: l.label, to: `${home.value}#${l.hash}` })))
const otherLang = computed(() => alternate(route.path, locale.value === 'pl' ? 'en' : 'pl'))

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 8 }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

watch(open, (v) => { document.documentElement.style.overflow = v ? 'hidden' : '' })
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="scrolled || open ? 'border-b border-white/[0.06] bg-zinc-950/75 backdrop-blur-xl' : 'border-b border-transparent'"
  >
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink :to="home" :aria-label="`Rafał Gryncewicz – ${t.nav.home}`" class="rounded-md focus-visible:outline-2 focus-visible:outline-emerald-400">
        <AppLogo />
      </NuxtLink>

      <nav aria-label="Main" class="hidden items-center gap-0.5 lg:flex">
        <NuxtLink
          v-for="l in links" :key="l.to" :to="l.to"
          class="rounded-full px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >{{ l.label }}</NuxtLink>
      </nav>

      <div class="flex items-center gap-1.5">
        <NuxtLink
          :to="otherLang" :hreflang="locale === 'pl' ? 'en' : 'pl'" :title="t.lang.switchTo"
          class="inline-flex h-9 items-center rounded-full px-3 font-mono text-xs tracking-wider text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >{{ t.lang.short }}<span class="sr-only"> – {{ t.lang.switchTo }}</span></NuxtLink>
        <div class="hidden sm:block">
          <AppButton :to="`${home}#contact`" size="sm" icon="i-lucide-arrow-up-right">{{ t.nav.cta }}</AppButton>
        </div>
        <button
          type="button"
          class="inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/5 lg:hidden"
          :aria-expanded="open" aria-controls="mobile-nav" :aria-label="open ? t.nav.closeMenu : t.nav.openMenu"
          @click="open = !open"
        >
          <UIcon :name="open ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="open" id="mobile-nav" aria-label="Mobile" class="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-zinc-950 lg:hidden">
        <ul class="container-page flex flex-col py-6">
          <li v-for="(l, i) in links" :key="l.to">
            <NuxtLink :to="l.to" class="flex items-center justify-between border-b border-white/[0.06] py-5 text-2xl font-medium tracking-tight text-white" @click="open = false">
              {{ l.label }}
              <span class="font-mono text-xs text-zinc-500">0{{ i + 1 }}</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="container-page pb-8">
          <AppButton :to="`${home}#contact`" size="lg" block icon="i-lucide-arrow-up-right" @click="open = false">{{ t.nav.cta }}</AppButton>
        </div>
      </nav>
    </Transition>
  </header>
</template>
