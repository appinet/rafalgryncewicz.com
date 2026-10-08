<script setup lang="ts">
const site = useAppConfig().site
const { t, locale } = useContent()
const { siteUrl } = useRuntimeConfig().public

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: site.name,
          jobTitle: t.value.meta.role,
          url: siteUrl,
          email: `mailto:${site.email}`,
          address: { '@type': 'PostalAddress', addressCountry: 'PL' },
          knowsAbout: ['PHP', 'Laravel', 'Vue.js', 'Nuxt', 'Tailwind CSS', 'Node.js', 'MySQL', 'REST API', 'ERP integration', 'WordPress', 'WooCommerce', 'PrestaShop', 'Shopify', 'Linux server administration'],
          sameAs: [site.linkedin, site.github]
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${siteUrl}/#service`,
          name: `${site.name} — Software Development`,
          url: siteUrl,
          inLanguage: locale.value,
          provider: { '@id': `${siteUrl}/#person` },
          areaServed: 'Worldwide',
          serviceType: ['Web application development', 'API & ERP integration', 'E-commerce development', 'Linux server administration']
        }
      ]
    })
  }]
})
</script>

<template>
  <div>
    <SectionHero />
    <SectionStack />
    <!-- Below-the-fold sections hydrate only when they scroll into view -->
    <LazySectionServices hydrate-on-visible />
    <LazySectionWork hydrate-on-visible />
    <LazySectionTestimonials hydrate-on-visible />
    <LazySectionPartners hydrate-on-visible />
    <LazySectionProcess hydrate-on-visible />
    <LazySectionPrinciples hydrate-on-visible />
    <LazySectionFaq hydrate-on-visible />
    <LazySectionContact hydrate-on-visible />
  </div>
</template>
