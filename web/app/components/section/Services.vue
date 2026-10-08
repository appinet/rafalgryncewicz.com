<script setup lang="ts">
const { t } = useContent()
const c = computed(() => t.value.services)
</script>

<template>
  <section id="services" class="py-24 sm:py-32">
    <div class="container-page">
      <div class="max-w-2xl" v-reveal>
        <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
        <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-zinc-400">{{ c.accent }}</span></h2>
        <p class="mt-5 text-lg text-zinc-400">{{ c.lead }}</p>
      </div>

      <div class="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(s, i) in c.items" :key="s.title" v-reveal="(i % 3) * 80" v-spotlight
          class="card group flex flex-col p-6 transition-colors hover:border-white/[0.12] sm:p-7"
          :class="s.wide ? 'lg:col-span-2' : ''"
        >
          <div class="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent">
            <UIcon :name="s.icon" class="size-5 text-emerald-300" />
          </div>
          <h3 class="mt-6 text-xl font-semibold tracking-tight text-white">{{ s.title }}</h3>
          <p class="mt-3 flex-1 leading-relaxed text-zinc-400">{{ s.text }}</p>
          <ul class="mt-6 flex flex-wrap gap-1.5">
            <li v-for="t in s.tags" :key="t" class="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[0.7rem] text-zinc-400">{{ t }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
