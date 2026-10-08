<script setup lang="ts">
const { t } = useContent()
const c = computed(() => t.value.work)
</script>

<template>
  <section id="work" class="border-t border-white/[0.06] py-24 sm:py-32">
    <div class="container-page">
      <div class="max-w-2xl" v-reveal>
        <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
        <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-zinc-400">{{ c.accent }}</span></h2>
        <p class="mt-5 text-lg text-zinc-400">{{ c.lead }}</p>
      </div>

      <div class="mt-14 grid gap-4 lg:grid-cols-3">
        <article v-for="(w, i) in c.items" :key="w.title" v-reveal="i * 80" v-spotlight class="card flex flex-col p-6 sm:p-7">
          <p class="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-emerald-400">{{ w.sector }}</p>
          <h3 class="mt-4 text-xl font-semibold tracking-tight text-balance text-white">{{ w.title }}</h3>
          <dl class="mt-6 flex-1 space-y-4 text-sm leading-relaxed">
            <div>
              <dt class="text-zinc-400">{{ c.labels.challenge }}</dt>
              <dd class="mt-1 text-zinc-300">{{ w.challenge }}</dd>
            </div>
            <div>
              <dt class="text-zinc-400">{{ c.labels.solution }}</dt>
              <dd class="mt-1 text-zinc-300">{{ w.solution }}</dd>
            </div>
            <div class="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4">
              <dt class="flex items-center gap-1.5 text-emerald-300"><UIcon name="i-lucide-trending-up" class="size-4" />{{ c.labels.result }}</dt>
              <dd class="mt-1 font-medium text-white">{{ w.result }}</dd>
            </div>
          </dl>
          <ul class="mt-6 flex flex-wrap gap-1.5">
            <li v-for="tag in w.tags" :key="tag" class="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[0.7rem] text-zinc-400">{{ tag }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
