<script setup lang="ts">
const { choice, bannerOpen, settingsOpen, init, save, acceptAll, rejectAll } = useConsent()

const draft = reactive({ analytics: false, marketing: false })
watch(settingsOpen, (open) => {
  if (open) Object.assign(draft, choice.value ?? { analytics: false, marketing: false })
})

onMounted(init)

const { t, lp } = useContent()
const c = computed(() => t.value.cookies)
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 translate-y-6"
      leave-active-class="transition duration-200 ease-in" leave-to-class="opacity-0 translate-y-6"
    >
      <section
        v-if="bannerOpen && !settingsOpen"
        role="dialog" aria-live="polite" aria-labelledby="cc-title" aria-describedby="cc-desc"
        class="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-white/10 bg-zinc-900/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:p-6"
        style="padding-bottom: max(1.25rem, env(safe-area-inset-bottom))"
      >
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-cookie" class="mt-0.5 size-5 shrink-0 text-emerald-400" />
          <div>
            <h2 id="cc-title" class="text-sm font-semibold text-white">{{ c.title }}</h2>
            <p id="cc-desc" class="mt-1.5 text-[0.82rem] leading-relaxed text-zinc-400">
              {{ c.text }}
              <NuxtLink :to="lp('/cookies')" class="text-zinc-200 underline underline-offset-2 hover:text-white">{{ c.policy }}</NuxtLink>.
            </p>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
          <AppButton variant="ghost" size="sm" class="col-span-2 sm:col-span-1" @click="settingsOpen = true">{{ c.customize }}</AppButton>
          <AppButton variant="outline" size="sm" @click="rejectAll">{{ c.reject }}</AppButton>
          <AppButton size="sm" @click="acceptAll">{{ c.accept }}</AppButton>
        </div>
      </section>
    </Transition>

    <LazyUModal
      v-if="settingsOpen"
      v-model:open="settingsOpen"
      :title="c.modalTitle"
      :description="c.modalDesc"
      :ui="{ content: 'bg-zinc-900 ring-white/10', header: 'border-white/10', footer: 'border-white/10' }"
    >
      <template #body>
        <ul class="divide-y divide-white/[0.06]">
          <li v-for="(cat, key) in c.categories" :key="key" class="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0">
            <div>
              <p class="text-sm font-medium text-white">{{ cat.title }}</p>
              <p class="mt-1 text-[0.82rem] leading-relaxed text-zinc-400">{{ cat.desc }}</p>
            </div>
            <LazyUSwitch v-if="key === 'necessary'" :model-value="true" disabled :aria-label="cat.title" />
            <LazyUSwitch v-else v-model="draft[key]" :aria-label="cat.title" />
          </li>
        </ul>
      </template>
      <template #footer>
        <div class="grid w-full grid-cols-2 gap-2 sm:flex sm:justify-end">
          <AppButton variant="outline" size="sm" @click="rejectAll">{{ c.reject }}</AppButton>
          <AppButton variant="outline" size="sm" @click="save({ ...draft })">{{ c.save }}</AppButton>
          <AppButton size="sm" class="col-span-2 sm:col-span-1" @click="acceptAll">{{ c.accept }}</AppButton>
        </div>
      </template>
    </LazyUModal>
  </div>
</template>
