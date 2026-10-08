<script setup lang="ts">
const { t } = useContent()
const c = computed(() => t.value.faq)
</script>

<template>
  <section id="faq" class="border-t border-white/[0.06] py-24 sm:py-32">
    <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div v-reveal>
        <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
        <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-zinc-400">{{ c.accent }}</span></h2>
        <p class="mt-5 text-zinc-400">{{ c.more }} <NuxtLink to="#contact" class="text-white underline decoration-emerald-400/60 underline-offset-4">{{ c.ask }}</NuxtLink></p>
      </div>
      <UAccordion
        v-reveal="100"
        :items="c.items"
        :unmount-on-hide="false"
        :ui="{
          item: 'border-white/[0.07]',
          trigger: 'py-5 text-base sm:text-lg font-medium text-white hover:text-emerald-200 cursor-pointer',
          body: 'pb-5 text-zinc-400 leading-relaxed text-[0.95rem]',
          trailingIcon: 'text-zinc-400'
        }"
      />
    </div>
  </section>
</template>
