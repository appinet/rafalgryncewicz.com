<script setup lang="ts">
const site = useAppConfig().site
const { t, locale } = useContent()
const c = computed(() => t.value.process)
const prices = computed(() => site.pricing[locale.value] as Record<string, string>)
</script>

<template>
  <section id="process" class="border-t border-white/[0.06] py-24 sm:py-32">
    <div class="container-page">
      <div class="max-w-2xl" v-reveal>
        <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
        <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-zinc-400">{{ c.accent }}</span></h2>
      </div>

      <ol class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(s, i) in c.steps" :key="s.title" v-reveal="i * 80" class="bg-zinc-950 p-6 sm:p-7">
          <span class="font-mono text-sm text-emerald-400">0{{ i + 1 }}</span>
          <h3 class="mt-8 text-lg font-semibold tracking-tight text-white">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-zinc-400">{{ s.text }}</p>
        </li>
      </ol>

      <h3 class="mt-20 text-sm font-medium text-zinc-400" v-reveal>{{ c.modelsTitle }}</h3>
      <div class="mt-5 grid gap-4 md:grid-cols-3">
        <div v-for="(m, i) in c.models" :key="m.key" v-reveal="i * 80" v-spotlight class="card flex flex-col p-6">
          <UIcon :name="m.icon" class="size-5 text-zinc-400" />
          <h4 class="mt-4 font-semibold text-white">{{ m.title }}</h4>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{{ m.text }}</p>
          <p v-if="prices[m.key]" class="mt-6 border-t border-white/[0.06] pt-4 text-white">
            <span class="text-sm text-zinc-400">{{ c.from }}</span>
            <span class="ml-1.5 text-xl font-semibold tracking-tight tabular-nums">{{ prices[m.key] }}</span>
          </p>
        </div>
      </div>
      <p v-if="Object.values(prices).some(Boolean)" class="mt-4 text-xs text-zinc-400">{{ c.vat }}</p>
    </div>
  </section>
</template>
