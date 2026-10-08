<script setup lang="ts">
const { t } = useContent()
const c = computed(() => t.value.principles)
</script>

<template>
  <section class="py-24 sm:py-32">
    <div class="container-page">
      <div class="card overflow-hidden p-7 sm:p-12">
        <div class="glow pointer-events-none absolute -right-20 -bottom-40 h-96 w-96 opacity-60" aria-hidden="true" />
        <div class="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div v-reveal>
            <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
            <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-zinc-400">{{ c.accent }}</span></h2>
            <p class="mt-5 text-zinc-400">{{ c.lead }}</p>
          </div>
          <div class="grid gap-8 sm:grid-cols-2">
            <div v-for="(it, i) in c.items" :key="it.title" v-reveal="i * 80">
              <UIcon :name="it.icon" class="size-5 text-emerald-300" />
              <h3 class="mt-3 font-semibold text-white">{{ it.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-zinc-400">{{ it.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
