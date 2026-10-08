<script setup lang="ts">
const site = useAppConfig().site
const { t, lp } = useContent()
const { openSettings } = useConsent()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/[0.06]">
    <div class="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
      <div class="max-w-sm">
        <AppLogo />
        <p class="mt-4 text-sm leading-relaxed text-zinc-400">{{ t.meta.role }}. {{ t.footer.about }}</p>
      </div>
      <div class="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
        <div>
          <p class="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-400">{{ t.footer.site }}</p>
          <ul class="space-y-2">
            <li><NuxtLink :to="`${lp('/')}#services`" class="text-zinc-400 hover:text-white">{{ t.footer.links.services }}</NuxtLink></li>
            <li><NuxtLink :to="`${lp('/')}#partners`" class="text-zinc-400 hover:text-white">{{ t.footer.links.partners }}</NuxtLink></li>
            <li><NuxtLink :to="`${lp('/')}#contact`" class="text-zinc-400 hover:text-white">{{ t.footer.links.contact }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <p class="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-400">{{ t.footer.elsewhere }}</p>
          <ul class="space-y-2">
            <li><a :href="site.linkedin" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">LinkedIn</a></li>
            <li><a :href="site.github" target="_blank" rel="noopener" class="text-zinc-400 hover:text-white">GitHub</a></li>
            <li><a :href="`mailto:${site.email}`" class="text-zinc-400 hover:text-white">{{ t.footer.links.email }}</a></li>
          </ul>
        </div>
        <div>
          <p class="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-400">{{ t.footer.legal }}</p>
          <ul class="space-y-2">
            <li><NuxtLink :to="lp('/privacy')" class="text-zinc-400 hover:text-white">{{ t.footer.links.privacy }}</NuxtLink></li>
            <li><NuxtLink :to="lp('/cookies')" class="text-zinc-400 hover:text-white">{{ t.footer.links.cookies }}</NuxtLink></li>
            <li><button type="button" class="cursor-pointer text-zinc-400 hover:text-white" @click="openSettings">{{ t.footer.links.settings }}</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-page flex flex-col gap-2 border-t border-white/[0.06] py-6 text-xs text-zinc-400 sm:flex-row sm:justify-between">
      <p>© {{ year }} {{ site.name }}. {{ t.footer.rights }}</p>
      <p>{{ site.location }}</p>
    </div>
  </footer>
</template>
