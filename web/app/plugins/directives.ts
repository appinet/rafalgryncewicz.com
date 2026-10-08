// v-reveal: fade/slide in elements that start below the fold (SSR output stays fully visible).
// v-spotlight: pointer-follow highlight on cards.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null
  const reduce = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const observer = () => {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io!.unobserve(e.target)
          }
        }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    }
    return io
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (reduce || !('IntersectionObserver' in window)) return
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.classList.add('reveal')
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      observer().observe(el)
    }
  })

  nuxtApp.vueApp.directive('spotlight', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement) {
      el.classList.add('spotlight')
      el.addEventListener('pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }, { passive: true })
    }
  })
})
