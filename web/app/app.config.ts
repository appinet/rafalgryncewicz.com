export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'zinc'
    }
  },

  // ---------------------------------------------------------------------------
  // Personal data – edit in one place. Items marked TODO must be checked before launch.
  // Page copy (EN/PL) lives in app/content/en.ts and app/content/pl.ts.
  // ---------------------------------------------------------------------------
  site: {
    name: 'Rafał Gryncewicz',
    location: 'Poland · CET (UTC+1)',
    email: 'hello@rafalgryncewicz.com', // TODO
    linkedin: 'https://www.linkedin.com/in/', // TODO
    github: 'https://github.com/', // TODO
    // Booking link (Cal.com / Calendly). Empty string hides the "Book a call" box.
    bookingUrl: 'https://cal.com/rafalgryncewicz/intro', // TODO
    // One-page profile PDF in /public (regenerate with `npm run profile`). Empty hides the link.
    profileUrl: '/rafal-gryncewicz-profile.pdf',
    // Shown in the privacy policy as the data controller
    legalEntity: 'Rafał Gryncewicz (company name, address, VAT ID – to be completed)', // TODO

    // Starting prices per language. Empty string hides the price on that card. TODO: confirm
    pricing: {
      en: { project: '€3,000', hourly: '€50 / hour', retainer: '€500 / month' },
      pl: { project: '12 000 zł', hourly: '200 zł / h', retainer: '2 000 zł / mies.' }
    },

    // Real client quotes only (with permission). Empty array hides the section.
    // { quote: { en: '…', pl: '…' }, name: 'Jane Smith', role: 'CTO, Company' }
    testimonials: [] as { quote: { en: string, pl: string }, name: string, role: string }[],

    // Client / partner names shown as a text logo row (with permission). Empty array hides it.
    clients: [] as string[]
  }
})
