<script setup lang="ts">
// Lightweight button/link (no Nuxt UI runtime) used above the fold and in the cookie banner.
const props = withDefaults(defineProps<{
  to?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  block?: boolean
  type?: 'button' | 'submit'
}>(), { variant: 'primary', size: 'md', type: 'button' })

const cls = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:opacity-60',
  {
    primary: 'bg-white text-zinc-950 hover:bg-zinc-200',
    outline: 'border border-white/15 text-white hover:bg-white/5',
    ghost: 'text-zinc-300 hover:bg-white/5 hover:text-white'
  }[props.variant],
  { sm: 'h-9 px-4 text-sm', md: 'h-10 px-5 text-sm', lg: 'h-13 px-7 text-base' }[props.size],
  props.block && 'w-full'
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="cls">
    <slot />
    <UIcon v-if="icon" :name="icon" class="size-[1.1em] shrink-0" />
  </NuxtLink>
  <button v-else :type="type" :class="cls">
    <slot />
    <UIcon v-if="icon" :name="icon" class="size-[1.1em] shrink-0" />
  </button>
</template>
