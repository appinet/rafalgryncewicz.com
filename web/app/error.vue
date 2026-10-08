<script setup lang="ts">
import type { NuxtError } from '#app'

// Replaces Nuxt's default error page, which injects an inline script the generated CSP can't hash.
const props = defineProps<{ error: NuxtError }>()
const { t, locale, lp } = useContent()
const notFound = computed(() => props.error.statusCode === 404)
const title = computed(() => (notFound.value ? t.value.error.notFound : t.value.error.generic))

useHead({ htmlAttrs: { lang: locale } })
useSeoMeta({ title: () => `${props.error.statusCode} · ${title.value}`, robots: 'noindex, follow' })
</script>

<template>
  <div>
    <AppHeader />
    <main id="main" class="container-page flex min-h-[70vh] max-w-3xl flex-col justify-center pt-32 pb-24">
      <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ error.statusCode }}</p>
      <h1 class="heading-lg mt-4">{{ title }}</h1>
      <p class="mt-5 text-lg text-zinc-400">{{ notFound ? t.error.notFoundText : t.error.genericText }}</p>
      <div class="mt-10 flex flex-wrap gap-3">
        <AppButton :to="lp('/')" icon="i-lucide-arrow-right">{{ t.error.home }}</AppButton>
        <AppButton :to="`${lp('/')}#contact`" variant="outline">{{ t.error.contact }}</AppButton>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
