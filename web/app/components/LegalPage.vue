<script setup lang="ts">
defineProps<{ title: string, updated: string }>()
const { t, lp } = useContent()
</script>

<template>
  <article class="container-page max-w-3xl pt-32 pb-24 sm:pt-40">
    <NuxtLink :to="lp('/')" class="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white"><UIcon name="i-lucide-arrow-right" class="size-4 rotate-180" />{{ t.legal.back }}</NuxtLink>
    <h1 class="heading-lg mt-6">{{ title }}</h1>
    <p class="mt-3 font-mono text-xs text-zinc-400">{{ t.legal.updated }}: {{ updated }}</p>
    <div class="legal mt-10 space-y-5 leading-relaxed text-zinc-400 [&_a]:text-white [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-zinc-200 [&_table]:w-full [&_table]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_td]:py-2.5 [&_td]:pr-4 [&_td]:align-top [&_th]:border-b [&_th]:border-white/20 [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:text-zinc-200">
      <slot />
    </div>
  </article>
</template>
