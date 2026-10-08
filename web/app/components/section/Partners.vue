<script setup lang="ts">
const { t } = useContent()
const c = computed(() => t.value.partners)
</script>

<template>
  <section id="partners" class="relative py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" aria-hidden="true" />
    <div class="container-page grid gap-16 lg:grid-cols-2 lg:gap-20">
      <div v-reveal>
        <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
        <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-zinc-400">{{ c.accent }}</span></h2>
        <p class="mt-5 text-lg text-zinc-400">{{ c.lead }}</p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <div v-for="p in c.points" :key="p.title">
            <UIcon :name="p.icon" class="size-5 text-emerald-300" />
            <h3 class="mt-3 font-semibold text-white">{{ p.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-zinc-400">{{ p.text }}</p>
          </div>
        </div>
      </div>

      <div v-reveal="120" class="card self-start p-7 sm:p-9">
        <p class="eyebrow text-zinc-400">{{ c.business.eyebrow }}</p>
        <h3 class="mt-4 text-2xl font-semibold tracking-tight text-white">{{ c.business.title }}</h3>
        <ul class="mt-7 space-y-4">
          <li v-for="b in c.business.items" :key="b" class="flex gap-3 text-zinc-300">
            <UIcon name="i-lucide-circle-check" class="mt-0.5 size-5 shrink-0 text-emerald-400" />
            <span class="leading-relaxed">{{ b }}</span>
          </li>
        </ul>
        <AppButton to="#contact" icon="i-lucide-arrow-right" class="mt-9">{{ c.business.cta }}</AppButton>
      </div>
    </div>
  </section>
</template>
