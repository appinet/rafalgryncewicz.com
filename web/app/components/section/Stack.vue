<script setup lang="ts">
const { t } = useContent()
const stack = [
  { name: 'PHP', icon: 'i-simple-icons-php' },
  { name: 'Laravel', icon: 'i-simple-icons-laravel' },
  { name: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
  { name: 'Nuxt', icon: 'i-simple-icons-nuxt' },
  { name: 'Nuxt UI', icon: 'i-simple-icons-nuxt' },
  { name: 'Tailwind CSS', icon: 'i-simple-icons-tailwindcss' },
  { name: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
  { name: 'JavaScript', icon: 'i-simple-icons-javascript' },
  { name: 'MySQL', icon: 'i-simple-icons-mysql' },
  { name: 'Linux', icon: 'i-simple-icons-linux' },
  { name: 'Nginx', icon: 'i-simple-icons-nginx' },
  { name: 'WordPress', icon: 'i-simple-icons-wordpress' },
  { name: 'WooCommerce', icon: 'i-simple-icons-woocommerce' },
  { name: 'PrestaShop', icon: 'i-simple-icons-prestashop' },
  { name: 'Shopify', icon: 'i-simple-icons-shopify' },
  { name: 'HTML5', icon: 'i-simple-icons-html5' },
  { name: 'CSS', icon: 'i-simple-icons-css' }
]
</script>

<template>
  <section aria-label="Technologies" class="border-y border-white/[0.06] py-8">
    <p class="container-page mb-6 text-center font-mono text-[0.7rem] uppercase tracking-[0.2em] text-zinc-400">{{ t.stack.label }}</p>
    <div class="marquee-wrap relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <ul class="marquee flex w-max gap-10 pr-10 sm:gap-14 sm:pr-14">
        <li v-for="(t, i) in [...stack, ...stack]" :key="i" class="flex items-center gap-2.5 text-zinc-400" :aria-hidden="i >= stack.length">
          <UIcon :name="t.icon" class="size-5 opacity-80" />
          <span class="text-sm font-medium whitespace-nowrap">{{ t.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
