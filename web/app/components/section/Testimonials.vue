<script setup lang="ts">
// Renders only when app.config.ts → site.testimonials / site.clients are filled in.
const site = useAppConfig().site
const { t, locale } = useContent()
</script>

<template>
  <section v-if="site.testimonials.length || site.clients.length" class="py-24 sm:py-28">
    <div class="container-page">
      <div v-if="site.clients.length" v-reveal class="text-center">
        <p class="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-400">{{ t.testimonials.trustedBy }}</p>
        <ul class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <li v-for="name in site.clients" :key="name" class="text-lg font-semibold tracking-tight text-zinc-400">{{ name }}</li>
        </ul>
      </div>

      <div v-if="site.testimonials.length" :class="site.clients.length ? 'mt-16' : ''">
        <p class="eyebrow" v-reveal><span class="h-px w-6 bg-emerald-400/60" />{{ t.testimonials.eyebrow }}</p>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <figure v-for="(q, i) in site.testimonials" :key="q.name" v-reveal="i * 80" class="card flex flex-col p-7">
            <UIcon name="i-lucide-quote" class="size-6 text-emerald-400/70" />
            <blockquote class="mt-4 flex-1 text-lg leading-relaxed text-zinc-200">{{ q.quote[locale] }}</blockquote>
            <figcaption class="mt-6 text-sm"><span class="font-medium text-white">{{ q.name }}</span><span class="text-zinc-400"> · {{ q.role }}</span></figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
