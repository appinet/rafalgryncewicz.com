export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig().public
  const pages = [
    { en: '/', pl: '/pl', priority: '1.0' },
    { en: '/privacy', pl: '/pl/privacy', priority: '0.3' },
    { en: '/cookies', pl: '/pl/cookies', priority: '0.3' }
  ]
  const alt = (p: typeof pages[number]) =>
    `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${p.en}"/><xhtml:link rel="alternate" hreflang="pl" href="${siteUrl}${p.pl}"/>`
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap(p => [p.en, p.pl].map(loc => `  <url><loc>${siteUrl}${loc}</loc>${alt(p)}<priority>${p.priority}</priority></url>`)).join('\n')}
</urlset>`
})
