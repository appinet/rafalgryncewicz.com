// English copy. Keep the shape in sync with pl.ts (typed via `Content`).
const en = {
  meta: {
    title: 'Rafał Gryncewicz — Senior Full-Stack Developer & Linux Engineer',
    description: '15 years of full-stack engineering: Laravel & PHP, Vue / Nuxt, Node.js, REST API and ERP integrations, WooCommerce, PrestaShop & Shopify, and Linux VPS / dedicated server administration. For companies, agencies and software houses.',
    ogLocale: 'en_GB',
    role: 'Senior Full-Stack Developer & Linux Engineer'
  },
  nav: {
    links: [
      { label: 'Services', hash: 'services' },
      { label: 'Work', hash: 'work' },
      { label: 'Software houses', hash: 'partners' },
      { label: 'Pricing', hash: 'process' },
      { label: 'FAQ', hash: 'faq' }
    ],
    cta: 'Start a project',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    home: 'home'
  },
  hero: {
    availability: 'Available for new projects',
    title: 'Senior full-stack engineering',
    accent: 'for products that have to work.',
    lead: 'I’m Rafał, a developer with 15 years of experience building Laravel and Nuxt applications, integrating APIs and ERP systems, shipping e-commerce and running the Linux servers underneath. One senior engineer, from database to deployment.',
    primary: 'Start a project',
    secondary: 'For software houses',
    profile: 'Download profile (PDF)',
    facts: [
      { value: '15+', label: 'years in production' },
      { value: 'DB → UI', label: 'and the server under it' },
      { value: 'EN · PL', label: 'working languages' },
      { value: 'CET', label: 'EU-based, overlap with UK & US East' }
    ]
  },
  stack: { label: 'Daily toolkit' },
  services: {
    eyebrow: 'Services',
    title: 'Everything a web product needs,',
    accent: 'under one roof.',
    lead: 'From the first database table to the server it runs on. You work with the person who writes the code, not with an account manager.',
    items: [
      { icon: 'i-lucide-code-xml', title: 'Web applications', text: 'Custom systems, SaaS products, client portals and internal tools built on Laravel and PHP, with clean architecture, tests and documentation you can hand over.', tags: ['Laravel', 'PHP 8', 'MySQL', 'Queues'], wide: true },
      { icon: 'i-lucide-layout-template', title: 'Front-end & UI', text: 'Fast, accessible interfaces in Vue 3 and Nuxt with Nuxt UI and Tailwind CSS, mobile first and tuned for Core Web Vitals.', tags: ['Vue', 'Nuxt', 'Tailwind'] },
      { icon: 'i-lucide-plug-zap', title: 'API & ERP integrations', text: 'REST APIs designed and documented, third-party services connected, and two-way sync with ERP, WMS, accounting, payment and shipping systems.', tags: ['REST', 'Webhooks', 'ERP', 'Node.js'] },
      { icon: 'i-lucide-shopping-bag', title: 'E-commerce', text: 'WooCommerce, PrestaShop and Shopify stores: custom modules and themes, migrations, checkout and feed integrations, and performance fixes that move conversion.', tags: ['WooCommerce', 'PrestaShop', 'Shopify', 'WordPress'], wide: true },
      { icon: 'i-lucide-server-cog', title: 'Linux servers & DevOps', text: 'VPS and dedicated servers set up, secured and maintained: Nginx, PHP-FPM, MySQL tuning, backups, monitoring, SSL, CI/CD and zero-downtime deployments.', tags: ['Linux', 'Nginx', 'CI/CD', 'Backups'], wide: true },
      { icon: 'i-lucide-life-buoy', title: 'Rescue & maintenance', text: 'Taking over legacy or abandoned projects: audits, upgrades, security patches, bug fixing and long-term care under a monthly retainer.', tags: ['Audits', 'Upgrades', 'SLA'] }
    ]
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Real problems,',
    accent: 'measurable results.',
    lead: 'A few recent projects. Client names are withheld under NDA; details are happy to be shared on a call.',
    labels: { challenge: 'Challenge', solution: 'What I did', result: 'Result' },
    // DRAFT examples – replace with real projects before launch
    items: [
      {
        sector: 'B2B wholesale · PrestaShop + ERP',
        title: 'Real-time order and stock sync with the ERP',
        challenge: 'Orders were retyped into the ERP by hand and stock levels drifted, causing overselling.',
        solution: 'A queued, two-way integration between PrestaShop and the ERP API with retries, logging and an admin dashboard.',
        result: 'Manual order entry eliminated, stock in sync within minutes.',
        tags: ['PrestaShop', 'REST API', 'Laravel queues']
      },
      {
        sector: 'SaaS · Laravel + Nuxt',
        title: 'Client portal rebuilt from a legacy PHP monolith',
        challenge: 'A 10-year-old PHP app nobody wanted to touch, slow pages and no tests.',
        solution: 'Incremental rewrite to Laravel API + Nuxt front-end, behind the same URLs, module by module.',
        result: 'Pages load in under a second, releases every week instead of every quarter.',
        tags: ['Laravel', 'Nuxt', 'MySQL']
      },
      {
        sector: 'E-commerce · WooCommerce + Linux',
        title: 'Store moved to a tuned VPS before peak season',
        challenge: 'Shared hosting timing out during campaigns and a checkout that took several seconds.',
        solution: 'Migration to a hardened VPS with Nginx, PHP-FPM, Redis object cache, tuned MySQL, backups and monitoring.',
        result: 'Stable through peak traffic, noticeably faster checkout.',
        tags: ['WooCommerce', 'Nginx', 'Redis']
      }
    ]
  },
  testimonials: {
    eyebrow: 'Clients say',
    trustedBy: 'Trusted by teams at'
  },
  partners: {
    eyebrow: 'For software houses & agencies',
    title: 'A senior pair of hands,',
    accent: 'without the hiring process.',
    lead: 'I’ve worked with agencies and software houses as a long-term contractor. You get someone who reads the brief, asks the right questions and delivers to your standards.',
    points: [
      { icon: 'i-lucide-users', title: 'Team extension', text: 'A senior developer who joins your sprint, your Jira and your Slack, and is productive in the first week.' },
      { icon: 'i-lucide-handshake', title: 'White-label delivery', text: 'I build under your brand and stay invisible to your client. NDA as standard, your contracts and processes.' },
      { icon: 'i-lucide-git-branch', title: 'Your workflow', text: 'Git flow, code review, pull requests, CI pipelines and coding standards. I adapt to yours.' },
      { icon: 'i-lucide-zap', title: 'Overflow & deadlines', text: 'Extra capacity when a project spikes, or a specialist for the PHP, integration or server part nobody on the team owns.' }
    ],
    business: {
      eyebrow: 'For companies & founders',
      title: 'What working with me looks like',
      items: [
        'A clear proposal with scope, timeline and fixed price or estimate',
        'Direct contact with the engineer building your product',
        'Weekly progress updates and a staging environment you can click through',
        'Full source code and documentation, you own everything',
        'Hosting and maintenance after launch, if you want it'
      ],
      cta: 'Tell me about your project'
    }
  },
  process: {
    eyebrow: 'How I work',
    title: 'A simple process,',
    accent: 'no surprises.',
    steps: [
      { title: 'Discovery call', text: 'A 30-minute call to understand the goal, constraints and existing systems. Free and without obligation.' },
      { title: 'Proposal', text: 'Within a few working days you get scope, architecture, timeline and a fixed price or a transparent estimate.' },
      { title: 'Build', text: 'Short iterations, a staging environment from week one and progress you can see, not just status reports.' },
      { title: 'Launch & care', text: 'Deployment, monitoring and handover documentation, then optional maintenance and server care.' }
    ],
    modelsTitle: 'Ways to work together',
    from: 'from',
    vat: 'Net prices. Final quote depends on scope.',
    models: [
      { key: 'project', title: 'Fixed-scope project', text: 'Defined deliverables, a fixed price and a timeline. Best for new builds and clearly specified features.', icon: 'i-lucide-file-text' },
      { key: 'hourly', title: 'Time & materials', text: 'Hourly or daily rate, billed monthly. Best for team extension, evolving products and agency work.', icon: 'i-lucide-clock' },
      { key: 'retainer', title: 'Monthly retainer', text: 'Reserved hours for maintenance, updates, server administration and priority support.', icon: 'i-lucide-refresh-cw' }
    ]
  },
  principles: {
    eyebrow: 'Principles',
    title: 'Fifteen years teaches you',
    accent: 'what matters.',
    lead: 'I’ve seen projects succeed and fail for the same few reasons. These are the ones I don’t compromise on.',
    items: [
      { icon: 'i-lucide-gauge', title: 'Performance is a feature', text: 'Lean pages, cached queries, tuned servers. Speed is part of the spec, not an afterthought.' },
      { icon: 'i-lucide-shield-check', title: 'Secure by default', text: 'Hardened servers, OWASP-aware code, backups that are actually tested, GDPR-friendly setups.' },
      { icon: 'i-lucide-book-open', title: 'Built to be handed over', text: 'Readable code, tests, README and runbooks. Your next developer will thank you.' },
      { icon: 'i-lucide-message-square', title: 'Straight communication', text: 'Honest estimates, early warnings and answers within one business day.' }
    ]
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions',
    accent: 'I often hear.',
    more: 'Something else on your mind?',
    ask: 'Just ask.',
    items: [
      { label: 'Do you work with clients outside Poland?', content: 'Yes. Most of my communication happens in English, remotely, and I work in CET with good overlap with the UK, the rest of Europe and the US East Coast. Invoices are issued in EUR, USD or PLN.' },
      { label: 'Can you join our existing team or project?', content: 'Yes, that is a large part of my work. I can join as a contractor in your tools and processes, take over a specific area (back-end, integrations, servers) or deliver a project white-label under your brand.' },
      { label: 'Do you sign NDAs?', content: 'Of course. I sign NDAs before discussing details, and confidentiality is standard in every contract.' },
      { label: 'How do you price projects?', content: 'Either a fixed price for a clearly defined scope, or time & materials at an hourly or daily rate. For ongoing work there is a monthly retainer. You always get a written estimate before any work starts.' },
      { label: 'Can you take over an existing or legacy project?', content: 'Yes. I start with a short paid audit of the code and infrastructure, then propose a plan: fix and stabilise, upgrade step by step, or rebuild only where it pays off.' },
      { label: 'Do you also host and maintain what you build?', content: 'If you want, yes. I can set up and administer a VPS or dedicated server for you, or work with your existing hosting. Maintenance includes updates, backups, monitoring and security patches.' },
      { label: 'How quickly can you start?', content: 'Usually within one to three weeks, depending on current commitments. Urgent fixes and server issues for existing clients are handled faster.' }
    ]
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build',
    accent: 'something solid.',
    lead: 'Tell me about the project, the problem or the team you need help with. I reply within one business day, usually with a few questions and a time for a short call.',
    book: { title: 'Prefer to talk?', text: 'Book a free 30-minute intro call.', cta: 'Book a call' },
    channels: { email: 'Email', linkedin: 'LinkedIn', linkedinText: 'Connect with me', based: 'Based in' },
    sent: { title: 'Thank you, message received.', text: 'I’ll get back to you within one business day. If it’s urgent, email me at' },
    // Shown when no form endpoint is configured and the message is handed to the visitor's email app
    mailto: { title: 'Almost there: send it from your email app.', text: 'A pre-filled email should have opened. If nothing happened, please write to me directly at' },
    failed: 'The message could not be sent. Please email me directly at',
    fields: {
      name: 'Name', namePh: 'Jane Smith',
      email: 'Email', emailPh: 'jane@company.com',
      company: 'Company', companyPh: 'Acme Ltd.', optional: 'Optional',
      clientType: 'I am a…', select: 'Select',
      projectType: 'What do you need?', projectPh: 'Select a service',
      budget: 'Budget', timeline: 'Timeline',
      message: 'Project details', messagePh: 'What are you building, what’s the current state, and what does success look like?',
      privacyA: 'I agree to the processing of my data to answer this enquiry, as described in the',
      privacyLink: 'privacy policy'
    },
    options: {
      clientTypes: ['Company / founder', 'Software house', 'Agency', 'Other'],
      projectTypes: ['Web application', 'Front-end / UI', 'API or ERP integration', 'E-commerce store', 'Server administration / DevOps', 'Maintenance / takeover', 'Team extension', 'Something else'],
      budgets: ['Under €5k', '€5k – €15k', '€15k – €40k', '€40k+', 'Hourly / ongoing', 'Not sure yet'],
      timelines: ['ASAP', 'Within a month', '1–3 months', 'Flexible']
    },
    errors: {
      name: 'Please enter your name',
      email: 'Please enter a valid email',
      projectType: 'Please choose one',
      message: 'A few more words, please (min. 20 characters)',
      privacy: 'Required to reply to your message',
      captcha: 'Please complete the security check',
      captchaFailed: 'The security check failed. Please complete it again.',
      invalid: 'Some details were rejected by the server. Please check the form and try again.',
      rateLimited: 'Too many messages in a short time. Please wait a few minutes and try again, or email me at'
    },
    trust: 'Your details are never shared. NDA on request.',
    submit: 'Send message',
    sending: 'Sending…',
    mailSubject: 'Project enquiry'
  },
  footer: {
    about: 'Building and running web applications, integrations and infrastructure since 2010.',
    site: 'Site', elsewhere: 'Elsewhere', legal: 'Legal',
    links: { services: 'Services', partners: 'Software houses', contact: 'Contact', privacy: 'Privacy policy', cookies: 'Cookie policy', settings: 'Cookie settings', email: 'Email' },
    rights: 'All rights reserved.'
  },
  cookies: {
    title: 'Your privacy, your choice',
    text: 'I use optional cookies for anonymous analytics. Nothing is set until you agree. Read the',
    policy: 'cookie policy',
    customize: 'Customize', reject: 'Reject all', accept: 'Accept all', save: 'Save choices',
    modalTitle: 'Cookie settings',
    modalDesc: 'Choose which optional cookies you allow. You can change this at any time from the footer.',
    categories: {
      necessary: { title: 'Strictly necessary', desc: 'Required for the site to work and to remember your cookie choice. Always on.' },
      analytics: { title: 'Analytics', desc: 'Anonymous statistics (Google Analytics 4) that help me understand which content is useful.' },
      marketing: { title: 'Marketing', desc: 'Measurement of ad campaigns (Google Ads). Used only if campaigns are running.' }
    }
  },
  legal: { back: 'Back to home', updated: 'Last updated', privacyTitle: 'Privacy policy', cookiesTitle: 'Cookie policy', change: 'Change cookie settings' },
  lang: { label: 'Language', switchTo: 'Polski', short: 'PL' },
  error: {
    notFound: 'Page not found',
    notFoundText: 'The page you are looking for doesn’t exist or has moved.',
    generic: 'Something went wrong',
    genericText: 'An unexpected error occurred. Please try again in a moment.',
    home: 'Back to home',
    contact: 'Contact me'
  }
}

export default en
export type Content = typeof en
