<script setup lang="ts">
const site = useAppConfig().site
const { t } = useContent()
const h = computed(() => t.value.hero)
</script>

<template>
  <section class="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44">
    <div class="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    <div class="glow pointer-events-none absolute -top-40 left-1/2 -z-10 h-[34rem] w-[48rem] -translate-x-1/2" aria-hidden="true" />

    <div class="container-page">
      <div class="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-2.5 text-xs text-zinc-300">
        <span class="pulse-dot size-2 rounded-full bg-emerald-400" />
        {{ h.availability }}
      </div>

      <h1 class="heading-xl mt-6 max-w-5xl">
        <span class="text-gradient">{{ h.title }}</span>{{ ' ' }}<span class="serif-accent block text-emerald-300/95 sm:inline">{{ h.accent }}</span>
      </h1>

      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">{{ h.lead }}</p>

      <div class="mt-9 flex flex-col gap-3 sm:flex-row">
        <AppButton to="#contact" size="lg" icon="i-lucide-arrow-right">{{ h.primary }}</AppButton>
        <AppButton to="#partners" size="lg" variant="outline">{{ h.secondary }}</AppButton>
      </div>
      <a v-if="site.profileUrl" :href="site.profileUrl" target="_blank" class="mt-5 inline-flex items-center gap-2 text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline">
        <UIcon name="i-lucide-file-down" class="size-4" />{{ h.profile }}
      </a>

      <div class="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:items-end">
        <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
          <div v-for="f in h.facts" :key="f.label" class="bg-zinc-950 p-5 sm:p-6">
            <dt class="sr-only">{{ f.label }}</dt>
            <dd>
              <span class="block text-2xl font-semibold tracking-tight text-white sm:text-3xl">{{ f.value }}</span>
              <span class="mt-1 block text-xs leading-snug text-zinc-400 sm:text-sm">{{ f.label }}</span>
            </dd>
          </div>
        </dl>

        <!-- Terminal card -->
        <div class="card overflow-hidden font-mono text-[0.78rem] leading-relaxed sm:text-[0.82rem]" aria-hidden="true">
          <div class="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
            <span class="size-2.5 rounded-full bg-zinc-700" /><span class="size-2.5 rounded-full bg-zinc-700" /><span class="size-2.5 rounded-full bg-zinc-700" />
            <span class="ml-3 text-zinc-400">rafal@prod-01: ~/client-app</span>
          </div>
          <div class="space-y-1.5 p-4 sm:p-5">
            <p><span class="text-emerald-400">$</span> <span class="text-zinc-200">git push origin main</span></p>
            <p class="text-zinc-400">→ CI: tests <span class="text-emerald-400">passed</span> (412) · lint <span class="text-emerald-400">ok</span></p>
            <p><span class="text-emerald-400">$</span> <span class="text-zinc-200">php artisan migrate --force</span></p>
            <p class="text-zinc-400">→ 3 migrations applied, zero downtime</p>
            <p><span class="text-emerald-400">$</span> <span class="text-zinc-200">sync:erp --orders --since=1h</span></p>
            <p class="text-zinc-400">→ 128 orders pushed · stock levels updated</p>
            <p><span class="text-emerald-400">$</span> <span class="text-zinc-200">lighthouse https://client.shop</span></p>
            <p class="text-zinc-400">→ performance <span class="text-emerald-400">99</span> · a11y <span class="text-emerald-400">100</span> · seo <span class="text-emerald-400">100</span></p>
            <p><span class="text-emerald-400">$</span> <span class="caret inline-block h-4 w-2 translate-y-0.5 bg-emerald-400/80" /></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
