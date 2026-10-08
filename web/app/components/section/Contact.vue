<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const site = useAppConfig().site
const { formEndpoint, turnstileSiteKey } = useRuntimeConfig().public
const { t, locale, lp } = useContent()
const c = computed(() => t.value.contact)

const state = reactive({
  name: '',
  email: '',
  company: '',
  clientType: undefined as string | undefined,
  projectType: undefined as string | undefined,
  budget: undefined as string | undefined,
  timeline: undefined as string | undefined,
  message: '',
  privacy: false,
  website: '' // honeypot
})
const loading = ref(false)
const sent = ref(false)
// Why the last submit failed: rejected input (422), rate limited (429) or anything else (network, 5xx)
const failure = ref<'' | 'invalid' | 'rateLimited' | 'generic'>('')
const form = useTemplateRef('form')
// Live validation only after the first submit attempt (no error flicker / layout shift while filling in)
const attempted = ref(false)
const startedAt = ref(0)

// ---- Cloudflare Turnstile (only when a site key is configured) ----
const captchaEl = ref<HTMLElement | null>(null)
const captchaToken = ref('')
// 'missing' = not completed yet, 'failed' = rejected by the server
const captchaError = ref<'' | 'missing' | 'failed'>('')
let widgetId: string | undefined

function renderTurnstile() {
  const ts = (window as any).turnstile
  if (!ts || !captchaEl.value || widgetId !== undefined) return
  widgetId = ts.render(captchaEl.value, {
    sitekey: turnstileSiteKey,
    theme: 'dark',
    language: locale.value,
    callback: (token: string) => { captchaToken.value = token; captchaError.value = '' },
    'expired-callback': () => { captchaToken.value = '' }
  })
}

onMounted(() => {
  startedAt.value = Date.now()
  if (!turnstileSiteKey) return
  const w = window as any
  if (w.turnstile) return renderTurnstile()
  w.onTurnstileLoad = renderTurnstile
  const s = document.createElement('script')
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad'
  s.async = true
  document.head.appendChild(s)
})

function validate(s: typeof state): FormError[] {
  const e: FormError[] = []
  const m = c.value.errors
  if (!s.name.trim()) e.push({ name: 'name', message: m.name })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.email.trim())) e.push({ name: 'email', message: m.email })
  if (!s.projectType) e.push({ name: 'projectType', message: m.projectType })
  if (s.message.trim().length < 20) e.push({ name: 'message', message: m.message })
  if (!s.privacy) e.push({ name: 'privacy', message: m.privacy })
  return e
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  const data = event.data
  // Silently drop obvious bots: honeypot filled or submitted in under 3 s
  if (data.website || Date.now() - startedAt.value < 3000) { sent.value = true; return }
  if (turnstileSiteKey && !captchaToken.value) { captchaError.value = 'missing'; return }

  loading.value = true
  failure.value = ''
  try {
    if (formEndpoint) {
      const { website, ...payload } = data
      await $fetch(formEndpoint as string, {
        method: 'POST',
        body: { ...payload, locale: locale.value, turnstileToken: captchaToken.value || undefined },
        headers: { Accept: 'application/json' }
      })
    } else {
      const body = [
        `Name: ${data.name}`, `Email: ${data.email}`, `Company: ${data.company || '-'}`,
        `Client: ${data.clientType || '-'}`, `Project: ${data.projectType}`, `Budget: ${data.budget || '-'}`,
        `Timeline: ${data.timeline || '-'}`, '', data.message
      ].join('\n')
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${c.value.mailSubject}: ${data.projectType}`)}&body=${encodeURIComponent(body)}`
    }
    sent.value = true
    const w = window as any
    w.dataLayer?.push({ event: 'generate_lead', form: 'contact', project_type: data.projectType, locale: locale.value })
    w.plausible?.('Lead', { props: { project_type: data.projectType } })
  } catch (err: any) {
    showServerError(err?.statusCode ?? err?.status, err?.data?.errors)
    // A Turnstile token is single-use, so get a new one for the retry
    captchaToken.value = ''
    if (widgetId !== undefined) (window as any).turnstile?.reset(widgetId)
  } finally {
    loading.value = false
  }
}

function showServerError(status: number | undefined, errors: Record<string, string[]> | undefined) {
  if (status === 429) { failure.value = 'rateLimited'; return }
  if (status !== 422 || !errors) { failure.value = 'generic'; return }

  if (errors.turnstileToken) captchaError.value = 'failed'
  // Show rejected fields inline, using the same translated messages as client-side validation
  const m = c.value.errors as Record<string, string>
  const fieldErrors = Object.keys(errors)
    .filter(name => name !== 'turnstileToken' && name in state)
    .map(name => ({ name, message: m[name] ?? c.value.errors.invalid }))
  if (fieldErrors.length) {
    attempted.value = true
    form.value?.setErrors(fieldErrors)
    failure.value = 'invalid'
  }
}

const fieldUi = { label: 'text-zinc-300 text-sm', error: 'text-red-400 text-xs', hint: 'text-zinc-400' }
const inputUi = { base: 'bg-white/[0.03] ring-white/10 text-white placeholder:text-zinc-400 focus-visible:ring-emerald-400/70 py-2.5' }
</script>

<template>
  <section id="contact" class="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
    <div class="glow pointer-events-none absolute top-20 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 opacity-70" aria-hidden="true" />
    <div class="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div v-reveal>
        <p class="eyebrow"><span class="h-px w-6 bg-emerald-400/60" />{{ c.eyebrow }}</p>
        <h2 class="heading-lg mt-4">{{ c.title }} <span class="serif-accent text-emerald-300/95">{{ c.accent }}</span></h2>
        <p class="mt-5 text-lg text-zinc-400">{{ c.lead }}</p>

        <a v-if="site.bookingUrl" :href="site.bookingUrl" target="_blank" rel="noopener" class="card group mt-10 flex items-center gap-4 p-5 transition-colors hover:border-emerald-400/30">
          <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10"><UIcon name="i-lucide-calendar-check" class="size-5 text-emerald-300" /></span>
          <span class="flex-1">
            <span class="block font-medium text-white">{{ c.book.title }}</span>
            <span class="block text-sm text-zinc-400">{{ c.book.text }}</span>
          </span>
          <span class="inline-flex items-center gap-1 text-sm font-medium text-emerald-300 group-hover:text-emerald-200">{{ c.book.cta }}<UIcon name="i-lucide-arrow-up-right" class="size-4" /></span>
        </a>

        <ul class="mt-10 space-y-5">
          <li>
            <a :href="`mailto:${site.email}`" class="group flex items-center gap-4">
              <span class="flex size-11 items-center justify-center rounded-xl border border-white/10"><UIcon name="i-lucide-mail" class="size-5 text-emerald-300" /></span>
              <span><span class="block text-xs text-zinc-400">{{ c.channels.email }}</span><span class="text-white group-hover:text-emerald-200">{{ site.email }}</span></span>
            </a>
          </li>
          <li>
            <a :href="site.linkedin" target="_blank" rel="noopener" class="group flex items-center gap-4">
              <span class="flex size-11 items-center justify-center rounded-xl border border-white/10"><UIcon name="i-simple-icons-linkedin" class="size-4.5 text-emerald-300" /></span>
              <span><span class="block text-xs text-zinc-400">{{ c.channels.linkedin }}</span><span class="text-white group-hover:text-emerald-200">{{ c.channels.linkedinText }}</span></span>
            </a>
          </li>
          <li class="flex items-center gap-4">
            <span class="flex size-11 items-center justify-center rounded-xl border border-white/10"><UIcon name="i-lucide-map-pin" class="size-5 text-emerald-300" /></span>
            <span><span class="block text-xs text-zinc-400">{{ c.channels.based }}</span><span class="text-white">{{ site.location }}</span></span>
          </li>
        </ul>
      </div>

      <div v-reveal="100" class="card p-6 sm:p-9">
        <div v-if="sent" class="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
          <div class="flex size-14 items-center justify-center rounded-full bg-emerald-400/10"><UIcon name="i-lucide-check" class="size-7 text-emerald-400" /></div>
          <h3 class="mt-6 text-2xl font-semibold tracking-tight text-white">{{ c.sent.title }}</h3>
          <p class="mt-3 max-w-sm text-zinc-400">{{ c.sent.text }} <a :href="`mailto:${site.email}`" class="text-white underline underline-offset-2">{{ site.email }}</a>.</p>
        </div>

        <UForm v-else ref="form" :state="state" :validate="validate" :validate-on="['input']" class="grid gap-5 sm:grid-cols-2" @submit="onSubmit" @error="attempted = true">
          <UFormField :eager-validation="attempted" :label="c.fields.name" name="name" required :ui="fieldUi">
            <UInput id="cf-name" v-model="state.name" :aria-label="c.fields.name" autocomplete="name" :placeholder="c.fields.namePh" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.email" name="email" required :ui="fieldUi">
            <UInput id="cf-email" v-model="state.email" :aria-label="c.fields.email" type="email" autocomplete="email" inputmode="email" :placeholder="c.fields.emailPh" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.company" name="company" :hint="c.fields.optional" :ui="fieldUi">
            <UInput id="cf-company" v-model="state.company" :aria-label="c.fields.company" autocomplete="organization" :placeholder="c.fields.companyPh" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.clientType" name="clientType" :ui="fieldUi">
            <USelect id="cf-clientType" v-model="state.clientType" :aria-label="c.fields.clientType" :items="c.options.clientTypes" :placeholder="c.fields.select" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.projectType" name="projectType" required class="sm:col-span-2" :ui="fieldUi">
            <USelect id="cf-projectType" v-model="state.projectType" :aria-label="c.fields.projectType" :items="c.options.projectTypes" :placeholder="c.fields.projectPh" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.budget" name="budget" :ui="fieldUi">
            <USelect id="cf-budget" v-model="state.budget" :aria-label="c.fields.budget" :items="c.options.budgets" :placeholder="c.fields.select" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.timeline" name="timeline" :ui="fieldUi">
            <USelect id="cf-timeline" v-model="state.timeline" :aria-label="c.fields.timeline" :items="c.options.timelines" :placeholder="c.fields.select" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>
          <UFormField :eager-validation="attempted" :label="c.fields.message" name="message" required class="sm:col-span-2" :ui="fieldUi">
            <UTextarea id="cf-message" v-model="state.message" :aria-label="c.fields.message" :rows="5" autoresize :placeholder="c.fields.messagePh" size="lg" class="w-full" :ui="inputUi" />
          </UFormField>

          <!-- Honeypot: hidden from people and assistive tech -->
          <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" v-model="state.website" type="text" name="website" tabindex="-1" autocomplete="off">
          </div>

          <UFormField :eager-validation="attempted" name="privacy" class="sm:col-span-2" :ui="fieldUi">
            <UCheckbox id="cf-privacy" v-model="state.privacy" :ui="{ label: 'text-sm text-zinc-400 font-normal', base: 'ring-white/20' }">
              <template #label>
                {{ c.fields.privacyA }}
                <NuxtLink :to="lp('/privacy')" target="_blank" class="text-zinc-200 underline underline-offset-2">{{ c.fields.privacyLink }}</NuxtLink>.
              </template>
            </UCheckbox>
          </UFormField>

          <div v-if="turnstileSiteKey" class="sm:col-span-2">
            <div ref="captchaEl" class="min-h-[65px]" />
            <p v-if="captchaError" class="mt-1 text-xs text-red-400">{{ captchaError === 'failed' ? c.errors.captchaFailed : c.errors.captcha }}</p>
          </div>

          <div class="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p class="flex items-center gap-2 text-xs text-zinc-400"><UIcon name="i-lucide-lock" class="size-3.5" />{{ c.trust }}</p>
            <AppButton type="submit" size="lg" :icon="loading ? 'i-lucide-loader-circle' : 'i-lucide-send'" :disabled="loading" :class="loading && '[&_.iconify]:animate-spin'">
              {{ loading ? c.sending : c.submit }}
            </AppButton>
          </div>
          <p v-if="failure" role="alert" class="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300 sm:col-span-2">
            <template v-if="failure === 'invalid'">{{ c.errors.invalid }}</template>
            <template v-else>
              {{ failure === 'rateLimited' ? c.errors.rateLimited : c.failed }} <a :href="`mailto:${site.email}`" class="underline">{{ site.email }}</a>.
            </template>
          </p>
        </UForm>
      </div>
    </div>
  </section>
</template>
