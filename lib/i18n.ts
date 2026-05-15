export const LANGS = ['en', 'uk', 'ru'] as const
export type Lang = typeof LANGS[number]

export const LANG_META: Record<Lang, { label: string; flag: string; locale: string }> = {
  en: { label: 'English', flag: '🇬🇧', locale: 'en_US' },
  uk: { label: 'Українська', flag: '🇺🇦', locale: 'uk_UA' },
  ru: { label: 'Русский', flag: 'ua', locale: 'ru_RU' },
}

export function getLangPath(lang: Lang, slug = '') {
  const base = lang === 'en' ? '' : `/${lang}`
  return slug ? `${base}/${slug}` : base || '/'
}

export function getAlternateLangs(slug = '') {
  return LANGS.map((l) => ({
    lang: l,
    url: getLangPath(l, slug),
  }))
}

export function getAlternates(lang: Lang, slug = '') {
  const base = 'https://hostpro.apartner.pro'
  const pathEn = slug ? `/${slug}` : ''
  const canonicalPath = lang === 'en' ? pathEn : `/${lang}${pathEn}`
  return {
    canonical: `${base}${canonicalPath}`,
    languages: {
      'en': `${base}${pathEn}`,
      'uk': `${base}/uk${pathEn}`,
      'ru': `${base}/ru${pathEn}`,
      'x-default': `${base}${pathEn}`,
    },
  }
}

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

export const t = {
  en: {
    siteName: 'HostPro',
    siteTagline: 'Modern hosting for modern projects.',

    nav: {
      features: 'Features',
      pricing: 'Pricing',
      reviews: 'Reviews',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      status: 'Status',
      cta: 'Get Started',
      chat: 'AI Assistant',
    },

    footer: {
      tagline: 'Modern hosting for modern projects.',
      copy: '© 2025 HostPro. All rights reserved.',
      cols: {
        products: 'Products',
        services: 'Services',
        resources: 'Resources',
        legal: 'Legal',
      },
      links: {
        pricing: 'Pricing',
        faq: 'FAQ',
        status: 'System Status',
        wpHosting: 'WordPress Hosting',
        vpsHosting: 'VPS Hosting',
        dedicated: 'Dedicated Servers',
        laravelHosting: 'Laravel Hosting',
        phpHosting: 'PHP Hosting',
        prestashopHosting: 'PrestaShop Hosting',
        freeHosting: 'Free Hosting',
        kb: 'Knowledge Base',
        blog: 'Blog',
        about: 'About Us',
        reviews: 'Reviews',
        contact: 'Contact',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        refund: 'Refund Policy',
      },
    },

    hero: {
      badge: '⚡ NVMe SSD · Node.js · 99.9% Uptime · cPanel',
      title1: 'Hosting that',
      title2: 'just works',
      sub: 'Fast SSD servers, free SSL, cPanel and 24/7 support. Launch your site in minutes.',
      cta: 'Get Started',
      ctaSub: 'No hidden fees · Cancel anytime',
      stat1: 'Active websites',
      stat2: 'Load time',
      stat3: 'Uptime SLA',
    },

    features: {
      title: 'Everything you need to succeed',
      sub: 'We handle the infrastructure — you focus on your business',
      items: [
        { icon: '⚡', title: 'NVMe SSD', desc: '3× faster than regular SSD. Your website loads instantly, every time.' },
        { icon: '🔒', title: 'Free SSL', desc: "Let's Encrypt SSL for every domain. Automatic and always free." },
        { icon: '📋', title: 'cPanel', desc: 'Industry-standard control panel for all your sites and email accounts.' },
        { icon: '💾', title: 'Daily Backups', desc: 'Automatic daily backups. One-click restore whenever you need it.' },
        { icon: '🌐', title: '99.9% Uptime', desc: 'Guaranteed uptime with SLA agreement included in every plan.' },
        { icon: '🎧', title: '24/7 Support', desc: 'Real humans every day. Average response time under 5 minutes.' },
        { icon: '📧', title: 'Email Accounts', desc: 'Create professional email addresses on your own domain. Full IMAP/POP3/SMTP support.' },
        { icon: '🚀', title: '1-Click Install', desc: 'Instantly install WordPress, Joomla, and 400+ other apps via Softaculous auto-installer.' },
      ],
    },
    tech: {
      title: 'Built with Modern Technology',
      sub: 'Every plan includes premium features and the latest server stack for maximum performance.',
      softaculous: {
        title: 'Softaculous Auto-installer',
        desc: '300+ one-click software installers including WordPress, Joomla, and more.',
      },
      features: {
        title: 'TECHNICAL FEATURES',
        items: [
          { title: 'Performance', desc: 'LiteSpeed WebServer, LSCache, and NVMe SSD storage.' },
          { title: 'Reliability', desc: 'Anycast DNS and CloudLinux for account isolation.' },
          { title: 'Security', desc: 'Free SSL certificates and daily backups for everyone.' },
          { title: 'Support', desc: '24/7 technical assistance and free migrations.' },
        ],
      },
      server: {
        title: 'SERVER TECHNOLOGIES',
        items: [
          { title: 'LiteSpeed Web Server', desc: 'Significantly faster than Apache, optimized for WordPress.' },
          { title: 'CloudLinux (LVE)', desc: 'Ensures dedicated resources and total account isolation.' },
          { title: 'NVMe SSD Storage', desc: 'Next-gen storage for ultra-fast data read/write speeds.' },
          { title: 'Anycast DNS', desc: 'Global network for lightning-fast domain resolution.' },
        ],
      },
      databases: {
        title: 'DATABASES',
        items: [
          { title: 'MySQL / MariaDB', desc: 'Industry standard for WordPress and PHP applications.' },
          { title: 'phpMyAdmin', desc: 'Powerful database management tool in every cPanel.' },
          { title: 'Remote MySQL', desc: 'Connect to your databases from external applications.' },
        ],
      },
      dev: {
        title: 'Coding & Development',
        desc: 'We support PHP (multiple versions), Python, and Node.js. Every account includes auto-renewing SSL certificates.',
      }
    },

    billing: {
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      threeYears: '3 Years',
      save10: '−10%',
      save20: '−20%',
      save30: '−30%',
      monthTerm: '1 month',
      quarterTerm: '3 months',
      yearTerm: '1 year',
      threeYearTerm: '3 years',
      payToday: 'Pay',
      today: 'today',
      for: 'For',
      then: 'then',
      onRenewal: 'on renewal',
      savings: 'Save',
      renewsAt: 'Renews at',
      prepaidFor: 'Prepaid for',
      months: 'months',
      exVat: 'Ex. VAT',
    },

    pricing: {
      title: 'Transparent pricing',
      sub: 'Pick a plan and scale without limits',
      popular: 'Most Popular',
      mo: '/mo',
      cta: 'Choose Plan',
      featLabel: 'Included:',
      customTitle: "Can't find the right plan?",
      customSub: 'Contact us — we will find a custom solution for your needs and budget.',
      customBtn: '✉️ Contact Us',
      plans: [
        {
          name: 'Personal', desc: 'Perfect for your first website', price: 0.99, color: '#6EE7B7', popular: false,
          extras: [
            '1 Website', '1 GB NVMe SSD', '1 Email Account', '1 MySQL Database',
            'Free SSL Certificate', 'cPanel Control Panel', 'Node.js Support',
            'Malware Protection', 'Standard Backups', 'Standard Support', '99.9% Uptime Guarantee'
          ]
        },
        {
          name: 'Starter', desc: 'For multiple websites & growth', price: 4.99, color: '#60A5FA', popular: false,
          extras: [
            'Up to 3 Websites', '3 GB NVMe SSD', '3 Email Accounts', '3 MySQL Databases',
            'Free SSL Certificate', 'cPanel Control Panel', 'Node.js Support',
            'Malware Protection', 'Standard Backups', 'Standard Support', '99.9% Uptime Guarantee'
          ]
        },
        {
          name: 'Business', desc: 'For business sites & stores', price: 9.99, color: '#A78BFA', popular: false,
          extras: [
            'Up to 10 Websites', '10 GB NVMe SSD', '10 Email Accounts', '10 MySQL Databases',
            'Free SSL Certificate', 'cPanel Control Panel', 'Site Accelerator', 'Node.js Support',
            'Malware Protection', 'Priority Backups', 'Priority Support', '99.9% Uptime Guarantee'
          ]
        },
        {
          name: 'Agency', desc: 'For agencies & online stores', price: 19.99, color: '#FB923C', popular: true,
          extras: [
            'Up to 25 Websites', '25 GB NVMe SSD', 'Unlimited Email Accounts', '25 MySQL Databases',
            'Wildcard SSL Certificate', 'cPanel Control Panel', 'Site Accelerator', 'Node.js Support',
            'Malware Protection', 'Priority Backups', 'Priority Support 24/7', '99.9% Uptime Guarantee'
          ]
        },
        {
          name: 'Agency Pro', desc: 'For large-scale projects & teams', price: 39.99, color: '#F472B6', popular: false,
          extras: [
            'Unlimited Websites', '50 GB NVMe SSD', 'Unlimited Email Accounts', 'Unlimited MySQL Databases',
            'Wildcard SSL Certificate', 'Dedicated IP Address', 'cPanel Control Panel', 'Site Accelerator', 'Node.js Support',
            'Pro Malware Protection', 'Dedicated Manager', 'VIP Support 24/7', '99.9% Uptime Guarantee'
          ]
        },
      ],
    },

    who: {
      title: 'Who is it for?',
      sub: 'Scalable solution for every business size',
      items: [
        { icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Businesses', desc: 'Corporate sites, landing pages, CRM. Reliability and speed for your brand.' },
        { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)', title: 'Developers', desc: 'Resell hosting to clients. Powerful infrastructure for your business.' },
        { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Online Stores', desc: 'WooCommerce, PrestaShop, OpenCart. Fast hosting for e-commerce.' },
        { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)', title: 'Startups', desc: 'Start small and scale instantly. No migrations, no downtime.' },
      ],
    },

    cta: {
      title: 'Ready to launch?',
      sub: 'Launch your first site today — no technical skills required.',
      btn: 'Get Started →',
    },
    chat: {
      title: 'AI Chat Assistant',
      sub: 'Powered by OpenRouter Models. Knows everything about HostPro!',
      welcome: 'Hello! I am the HostPro AI assistant. How can I help you with our hosting?',
      inputPlaceholder: 'Ask something about hosting...',
      send: 'Send',
      typing: 'HostPro AI is typing...',
      error: 'Error',
      apiError: 'All models are currently unavailable. Please try again shortly.',
      tryAgain: 'Try again',
      contactFormTitle: 'Leave your contact:',
      contactFormPlaceholder: 'Email or Telegram...',
      contactFormSubmit: 'Send',
      contactFormPrefix: 'My contact for the manager: ',
      homeTitle: 'Meet your new AI Assistant',
      homeSub: 'Get instant answers to technical questions, help with migrations, or plan selection advice. Available 24/7.',
      homeBtn: 'Try AI Chat →',
      chips: [
        'How to migrate?',
        'Help me choose a plan',
        'Are there any discounts?',
      ],
    },

    order: {
      label: 'Order Plan',
      nameLbl: 'Your name',
      namePh: 'John Doe',
      domainLbl: 'Domain / Website (optional)',
      domainPh: 'yourdomain.com',
      msgLbl: 'Message (optional)',
      msgPh: 'Any questions or special requests...',
      send: 'Send order request →',
      note: 'We will contact you as soon as possible to confirm your order.',
      success: '✅ Request sent! We will contact you shortly.',
    },

    about: {
      meta: 'Learn about the HostPro team — who we are, our mission and values.',
      label: 'About Us',
      title: 'About Us',
      h1p1: 'We build',
      h1p2: 'reliable internet',
      sub: 'A team of enthusiasts who believe quality hosting should be accessible to everyone.',
      stats: [
        { val: '12K+', label: 'Active websites' },
        { val: '99.9%', label: 'Uptime SLA' },
        { val: '5 min', label: 'Avg. response time' },
        { val: '2019', label: 'Founded' },
      ],
      missionLabel: 'Our Mission',
      missionTitle: 'Hosting that just works',
      mission1: 'We started as a small team of developers tired of unreliable hosting. Instead of complaining we decided to do it better. Today HostPro serves thousands of clients worldwide.',
      mission2: 'Our servers are in certified Tier III data centres with redundant power, cooling and dual internet connectivity. We never compromise on reliability.',
      valuesLabel: 'Our Values',
      valuesTitle: 'What drives us',
      values: [
        { icon: '⚡', title: 'Speed above all', desc: 'NVMe SSD, optimised configs and CDN — your site loads in milliseconds.' },
        { icon: '🔒', title: 'Security without compromise', desc: 'Auto SSL, daily backups, DDoS protection and 24/7 monitoring.' },
        { icon: '🤝', title: 'Honesty & transparency', desc: 'No hidden fees. What you see on the site is what you get.' },
        { icon: '🚀', title: 'Growing together', desc: 'Start small, scale instantly. No migrations, no downtime.' },
      ],
      teamLabel: 'Team',
      teamTitle: 'The people behind HostPro',
      team: [
        { avatar: '👨‍💻', name: 'Alex M.', role: 'Founder & CEO' },
        { avatar: '👩‍🔧', name: 'Natalia V.', role: 'Head of Infrastructure' },
        { avatar: '👨‍🎨', name: 'Denis K.', role: 'Lead Developer' },
        { avatar: '👩‍💼', name: 'Maria L.', role: 'Customer Success' },
      ],
    },

    testimonials: {
      title: 'What our clients say',
      sub: 'Trusted by over 12,000 customers worldwide',
      reviewsLink: 'Read all reviews →',
      items: [
        { name: 'Sarah J.', role: 'E-commerce Owner', text: 'Switching to HostPro was the best decision for my store. The speed is incredible and the support team is always there when I need them.', stars: 5 },
        { name: 'Michael R.', role: 'Full-stack Developer', text: 'Finally a hosting that understands developers. SSH access, Node.js support, and NVMe SSD make my workflow so much smoother.', stars: 5 },
        { name: 'Elena B.', role: 'Marketing Agency', text: 'We manage dozens of client sites here. The Agency Pro plan with the dedicated manager has been a game-changer for us.', stars: 5 },
        { name: 'David W.', role: 'SaaS Founder', text: 'The uptime is exactly as promised. Our application has been running without a single hiccup for over a year.', stars: 5 },
        { name: 'Julia K.', role: 'Blogger', text: 'Setup was so easy. One-click WordPress installation and the free SSL made everything simple for someone who is not a techie.', stars: 5 },
        { name: 'Robert T.', role: 'Creative Director', text: 'Beautiful performance at a great price. The NVMe SSD storage really makes a difference for our image-heavy portfolio.', stars: 5 }
      ]
    },

    faq: {
      meta: 'Answers to the most common questions about HostPro hosting.',
      label: 'FAQ',
      title: 'FAQ',
      h1p1: 'Frequently asked',
      h1p2: 'questions',
      sub: 'Answers to the most common questions about our hosting.',
      items: [
        { q: 'What is cPanel and why do I need it?', a: "cPanel is the most popular hosting control panel. Through it you manage files, databases, email accounts, SSL certificates and statistics. The interface is intuitive even for beginners." },
        { q: 'How quickly will my account be activated?', a: 'After payment, your account is activated automatically. Usually, it takes 1-3 minutes, but in some cases (depending on load), it may take up to 5 hours. You will receive an email with your cPanel login details.' },
        { q: 'Is there a money-back guarantee?', a: 'Yes — 14 days. If for any reason you are unsatisfied we refund 100% with no questions asked. Applies to new accounts only.' },
        { q: 'Can I transfer my existing website?', a: 'Yes, migration is free. Contact support with your current hosting credentials and we handle everything, usually within 24 hours.' },
        { q: "What is included in free SSL?", a: "Let's Encrypt SSL is installed automatically for every domain and subdomain, renewing every 90 days. Agency plans include Wildcard SSL." },
        { q: 'How often are backups created?', a: 'Business plans and above: daily automatic backups retained for 7 days with one-click restore in cPanel.' },
        { q: 'Do you support WordPress?', a: 'Fully. Install WordPress in one click via Softaculous in cPanel. We also support WooCommerce, PrestaShop, Joomla, Drupal and others.' },
        { q: 'What happens if I exceed resource limits?', a: "We email you in advance. Your site won't go offline immediately — you'll have time to optimise or upgrade." },
        { q: 'Can I change my plan?', a: 'Yes. Upgrades are instant and all data is preserved. You only pay the difference for the remaining billing period.' },
        { q: 'Where are your servers?', a: 'Certified Tier III data centres across multiple geographic locations for redundancy and minimal latency.' },
      ],
    },

    contact: {
      meta: 'Contact HostPro support — 24/7 availability, average response in 5 minutes.',
      label: 'Contact',
      title: 'Contact',
      h1p1: 'We are here',
      h1p2: 'to help',
      sub: 'Average response time — as soon as possible. Support available 24/7.',
      channels: [
        { icon: '✉️', title: 'Email', desc: 'General questions & suggestions', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' },
        { icon: '🛠️', title: 'Technical Support', desc: 'Site issues, cPanel, configuration', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' },
        { icon: '💬', title: 'Live Chat', desc: 'Fastest way to get an answer', link: 'Open chat →', href: '#' },
        { icon: '🤝', title: 'Partnerships', desc: 'Resellers, enterprise solutions', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' },
      ],
      formLabel: 'Contact form',
      formTitle: 'Send us a message',
      nameLbl: 'Name', namePh: 'Your name',
      emailLbl: 'Email', emailPh: 'your@email.com',
      topicLbl: 'Topic',
      msgLbl: 'Message', msgPh: 'Describe your question or issue...',
      sendBtn: 'Send message →',
      topics: ['General question', 'Technical support', 'Billing & payments', 'Website migration', 'Partnership', 'Other'],
      success: '✅ Thank you! We will reply within 5 minutes.',
    },

    status: {
      meta: 'Real-time HostPro server and service status. 99.9% uptime.',
      label: 'System Status',
      title: 'System Status',
      h1p1: 'All systems',
      h1p2: 'operational',
      okText: 'All systems operating normally',
      okSub: 'No active incidents · 99.98% uptime over the last 90 days',
      metrics: [
        { val: '99.98%', label: 'Uptime (90 days)' },
        { val: '0.3s', label: 'Avg. response' },
        { val: '0', label: 'Active incidents' },
      ],
      svcTitle: 'Service status',
      svcSub: 'Real time · updated every minute',
      services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'],
      badge: 'Operational',
      incTitle: 'Incident log',
      incSub: 'Last 90 days',
      incidents: [
        { date: 'Feb 12 2025, 03:14 UTC', title: 'Mail Server EU-1 slowdown', badge: 'Resolved', desc: 'Elevated load on mail server. Resolved in 18 min. No messages lost.' },
        { date: 'Jan 28 2025, 11:40 UTC', title: 'Planned maintenance', badge: 'Completed', desc: 'Kernel update. Maintenance window: 23 min. All services restored on schedule.' },
      ],
      noMore: 'No further incidents recorded during this period',
    },

    terms: {
      meta: 'HostPro Terms of Service.',
      label: 'Legal',
      title: 'Terms of Service',
      date: 'Last updated: January 1, 2025',
      sections: [
        { title: 'General Provisions', body: 'These Terms govern access to and use of HostPro services. By using the service you agree to these Terms. HostPro may update these Terms at any time, notifying users by email at least 14 days in advance.' },
        { title: 'Description of Services', body: 'HostPro provides web hosting on NVMe SSD servers including: cPanel access, email mailboxes, SSL certificates (free and Wildcard), daily backups on eligible plans, and 24/7 technical support.' },
        { title: 'Account & Responsibility', body: 'You are responsible for the confidentiality of your account credentials and all content hosted through the service. Notify us immediately of any unauthorised access.' },
        { title: 'Prohibited Use', body: 'You may not use the service for illegal content, spam, phishing or fraud, copyright infringement, cryptocurrency mining, or DDoS attacks. Violations result in immediate termination without refund.' },
        { title: 'Payment & Billing', body: 'Payment is made in advance for the chosen period. Accounts may be suspended after 7 days of non-payment. Data is retained for 30 days post-suspension.' },
        { title: 'Uptime SLA', body: 'We guarantee 99.9% monthly uptime. Credits: 99.0–99.9% = 10%; 95.0–99.0% = 25%; below 95% = 50% of monthly fee.' },
        { title: 'Limitation of Liability', body: 'HostPro is not liable for indirect or consequential damages. Maximum liability is limited to amounts paid in the last 3 months.' },
        { title: 'Termination', body: 'You may cancel at any time by email. Data is retained 30 days after termination, then permanently deleted.' },
        { title: 'Governing Law', body: "These Terms are governed by applicable law. Disputes are resolved in courts at HostPro's location." },
        { title: 'Contact', body: 'Legal questions: hostpro@apartner.pro' },
      ],
    },

    privacy: {
      meta: 'How HostPro collects, uses and protects your personal data. GDPR compliant.',
      label: 'Privacy',
      title: 'Privacy Policy',
      date: 'Last updated: January 1, 2025',
      sections: [
        { title: 'Data We Collect', body: 'We collect: identity data (name, email, phone); payment data (via secure gateways — we never store card details); technical data (IP, browser, OS, cookies); usage data (access logs, load stats).' },
        { title: 'How We Use Your Data', body: 'Data is used solely to provide the service, process payments, deliver technical support, and prevent fraud. We never sell personal data to third parties for marketing.' },
        { title: 'Cookies', body: 'We use essential cookies (session, auth) and optional analytics cookies. You can disable analytics cookies in your browser settings.' },
        { title: 'Data Security', body: 'Data is stored on secure EU servers with TLS in transit and AES-256 at rest. Access is restricted to employees who need it.' },
        { title: 'Your Rights (GDPR)', body: 'You have the right to: access, rectify, erase, restrict processing, object to processing, and data portability. Contact: hostpro@apartner.pro' },
        { title: 'Third Parties', body: 'Data is shared only with trusted technical partners (payment processors, CDN). Each signs a GDPR-compliant data processing agreement.' },
        { title: 'Retention', body: 'Active account data is retained for the service duration. After closure, data is deleted within 30 days unless legally required otherwise.' },
        { title: 'Policy Changes', body: 'Material changes are communicated by email at least 30 days in advance.' },
        { title: 'DPO Contact', body: 'hostpro@apartner.pro' },
      ],
    },

    refund: {
      meta: 'HostPro refund policy — 14-day money-back guarantee.',
      label: 'Refund Policy',
      title: 'Refund Policy',
      date: 'Last updated: January 1, 2025',
      sections: [
        { title: '14-Day Money-Back Guarantee', body: 'If for any reason you are not satisfied within the first 14 days of your first payment, we refund 100% — no questions asked. Applies to new accounts only, one per customer.' },
        { title: 'Plan Change Credits', body: 'When upgrading, unused balance is credited toward the new plan. When downgrading, the price difference is credited as account balance for future payments.' },
        { title: 'Subscription Renewals', body: 'Automatic renewals are non-refundable if the service has been used. Cancel at least 24 hours before the renewal date.' },
        { title: 'Non-Refundable Cases', body: 'Violations of Terms of Service, accounts suspended for abuse, domain registrations and SSL certificates after issuance, and renewal requests after the 14-day window.' },
        { title: 'Refund Process', body: 'Email hostpro@apartner.pro with your account email. We process within 1 business day; funds return in 3–7 business days.' },
        { title: 'Account Credits', body: 'Instead of a card refund you may choose instant account credits usable for any future service.' },
        { title: 'Disputes', body: 'If you feel a refund was unfairly denied: hostpro@apartner.pro' },
      ],
    },

    notFound: {
      title: 'Page not found',
      sub: "Looks like this page doesn't exist or has been moved. Let's get you back on track.",
      home: '← Go to Homepage',
      back: 'Go back',
    },

    cookies: {
      title: 'We use cookies',
      desc: "We use essential cookies to make the site work and analytics cookies to understand how you use it. You can accept all or only essential cookies.",
      acceptAll: 'Accept all',
      acceptEssential: 'Essential only',
      more: 'Privacy Policy',
    },
    wp: {
      meta: 'Managed WordPress hosting — fast, secure and reliable. Optimized servers, auto-updates and staging.',
      badge: '⚡ WordPress Optimized · auto-updates · staging',
      title1: 'WordPress hosting',
      title2: 'that is actually fast',
      sub: 'Everything you need to build and scale your WordPress site with ease. Pre-configured for peak performance.',
      features: [
        { icon: '🚀', title: 'Speed Optimized', desc: 'Pre-configured LiteSpeed caching and NVMe SSD for blazing fast load times.' },
        { icon: '🔒', title: 'Secure by Default', desc: 'Auto SSL, malware scanning and web application firewall (WAF) included.' },
        { icon: '🔄', title: 'Auto Updates', desc: 'Keep your WordPress core, themes and plugins up to date automatically.' },
        { icon: '🛠️', title: 'Staging Environment', desc: 'Test changes on a clone of your site before pushing to live in one click.' },
      ],
      pricingSub: 'WordPress specific plans with extra resources and support.',
    },
    laravel: {
      meta: 'High-performance Laravel hosting — optimized for PHP 8+, Memcached, and Meilisearch. Git integration and SSH access.',
      badge: '🚀 Laravel Optimized · Git · Memcached · SSH',
      title1: 'Hosting built for',
      title2: 'Laravel apps',
      sub: 'The perfect environment for your Laravel projects. High performance, developer-friendly tools, and instant deployment.',
      features: [
        { icon: '🛠️', title: 'PHP 8.x Optimized', desc: 'Pre-configured for the latest PHP versions with OPcache and JIT enabled.' },
        { icon: '💾', title: 'Memcached', desc: 'Ultra-fast in-memory caching for sessions, queues, and performance.' },
        { icon: '🌿', title: 'Git Integration', desc: 'Deploy directly from GitHub, GitLab or Bitbucket. Easy CI/CD workflows.' },
        { icon: '🔒', title: 'SSH & Composer', desc: 'Full SSH access, Composer, and Artisan commands pre-installed for developers.' },
      ],
      pricingSub: 'Scale your applications with dedicated resources and peak performance.',
    },
    php: {
      meta: 'Optimized PHP hosting — multiple PHP versions, OPcache, Composer, SSH access and NVMe SSD storage.',
      badge: '🐘 PHP 8.x · OPcache · Composer · cPanel',
      title1: 'PHP Hosting built for',
      title2: 'developers',
      sub: 'Blazing-fast PHP hosting with full developer tooling. Run any PHP framework or CMS with ease.',
      features: [
        { icon: '🐘', title: 'PHP 8.x Ready', desc: 'Switch between PHP versions (7.4, 8.0, 8.1, 8.2, 8.3) instantly via cPanel without any downtime.' },
        { icon: '⚡', title: 'OPcache & JIT', desc: 'Pre-enabled OPcache and JIT compilation for maximum PHP execution speed on every plan.' },
        { icon: '📦', title: 'Composer Included', desc: 'Composer pre-installed on all accounts. Manage your dependencies with a single command.' },
        { icon: '🔒', title: 'SSH Access', desc: 'Full SSH terminal access for advanced configuration, scripts and secure file management.' },
      ],
      pricingSub: 'PHP-optimized plans with multi-version support and developer tools included.',
    },
    prestashop: {
      meta: 'High-performance PrestaShop hosting — optimized server stack, one-click install, free SSL and daily backups.',
      badge: '🛒 PrestaShop Optimized · SSL · Backups · cPanel',
      title1: 'PrestaShop hosting',
      title2: 'that sells faster',
      sub: 'Launch your online store on a server stack optimized for PrestaShop. Speed, security and scalability included.',
      features: [
        { icon: '🛒', title: '1-Click Install', desc: 'Install PrestaShop in seconds via Softaculous in cPanel. No technical skills required.' },
        { icon: '⚡', title: 'Speed Optimized', desc: 'LiteSpeed cache and NVMe SSD ensure your store loads instantly and converts more visitors.' },
        { icon: '🔒', title: 'Security Built-In', desc: 'Free SSL certificate, daily backups and malware scanning keep your store and customers safe.' },
        { icon: '📈', title: 'Scale With You', desc: 'Start on a budget plan and upgrade seamlessly as your store grows — zero downtime.' },
      ],
      pricingSub: 'E-commerce optimized plans with the resources your PrestaShop store needs.',
    },
    freeHosting: {
      meta: 'Free hosting for partners — bring a client and get free hosting for your website.',
      badge: '🎁 Partner Program · Free Hosting',
      title1: 'Free hosting for',
      title2: 'our partners',
      sub: 'Bring at least one client to HostPro and get free hosting for your own website as a reward.',
      howItWorks: 'How it works',
      steps: [
        { icon: '🤝', title: 'Recommend Us', desc: 'Tell your friends or clients about HostPro and help them choose a plan.' },
        { icon: '💳', title: 'Client Signs Up', desc: 'The client must purchase any hosting plan for at least 1 year.' },
        { icon: '🎁', title: 'Get Your Reward', desc: 'After 14 days of the client using the service, you get free hosting on the same plan and term.' }
      ],
      termsTitle: 'Program Terms',
      terms: [
        'Client must be new to HostPro.',
        'Hosting must be purchased for at least 1 year.',
        'Reward is available after 14 days of client usage.',
        'If the client requests a refund within 14 days, the reward is canceled.',
        'The reward plan and duration match the client\'s purchase.',
        'You can get a reward for every new client you bring.',
        'General Terms of Service apply to free hosting accounts.',
        'Self-referrals are not allowed (partner and client must be different).'
      ],
      formTitle: 'Apply for Reward',
      form: {
        partnerName: 'Your Name',
        partnerEmail: 'Your Contact Email',
        clientEmail: 'Referrer Client Email',
        partnerDomain: 'Your Domain (for free hosting)',
        notes: 'Additional Notes (optional)',
        submit: 'Send Application →',
        success: '✅ Application sent! Our manager will verify it and contact you soon.',
        error: '❌ Something went wrong. Please try again or contact support.'
      }
    },
    freePhp: {
      meta: 'Free Starter hosting for non-profit projects — 6 months free from HostPro.',
      title: 'Free Starter Hosting',
      sub: 'Take advantage of free hosting from HostPro for 6 months, no upfront payments or obligations.',
      whoCanGet: {
        title: 'Who can get free hosting?',
        text: 'This is a real offer for hosting websites of non-profit projects. Our project HostPro can provide free hosting services for websites that do not aim to make a profit, and also for valid reasons cannot pay for standard hosting services.',
        target: 'Services are provided to non-profit organizations (charitable foundations, schools, universities, public projects), as well as individuals to support non-profit initiatives and projects related to scientific or social topics (research, education).',
      },
      whatIsIncluded: {
        title: 'What is included in this service?',
        text: 'As part of this free hosting service, you can get a service similar to the "Personal" plan with the cPanel hosting control panel. You can install WordPress or any other system in 1 click, you will have the opportunity to use your own domain name registered earlier, and you can also get a free domain name in the *.apartner.pro zone.',
        domains: 'If you do not have your own domain name yet, and do not want to use a domain in the *.apartner.pro zone, we offer to register a domain with us in one of the many domain zones. Domain name registration will be paid.',
      },
      conditions: {
        title: 'Conditions for providing free hosting',
        text1: 'To get free hosting, first send a request in free form from a non-profit organization asking to provide free hosting through the contact form below.',
        text2: 'Individuals who have their own scientific or educational projects can also use a similar method to send a request for free hosting.',
        text3: 'Describe your project in a few words and the reasons why you cannot use paid hosting services.',
      },
      application: {
        title: 'Application for free hosting',
        text: 'After your application is approved, you will be sent a promo code that must be entered when ordering the "Personal" hosting plan, which gives a 100% discount for 6 months of using the service.',
        form: {
          name: 'Your Name',
          email: 'Email',
          project: 'Project Description',
          submit: 'Send Application →',
          success: '✅ Application successfully sent! We will contact you shortly.',
          error: '❌ Error sending. Try again later or write to us by email.',
        }
      },
      features: {
        title: 'Free hosting includes:',
        text: 'The conditions and resources of the free hosting provided do not differ from the conditions of the paid plan: the site will be hosted on powerful servers, guaranteed professional support from our technical service, backups, cPanel, free SSL certificate, and other benefits.',
        notice: 'Please note, we reserve the right to refuse free hosting without explanation. The number of free plans is limited.',
      },
      restrictions: {
        title: 'Restrictions',
        link: 'The service is provided under the conditions described in the public offer:',
        list: [
          'The site must not place commercial advertising in any form on its pages;',
          'The site must not place articles and links of various exchanges on its pages;',
          'No SPAM mailing should be done from the hosting account;',
          'On the main page, "about the project" or "contacts", the logo of our project and a mention in free form that the hosting is provided by "HostPro" with a link to the main page of our site HostPro must be placed',
        ],
        footer: 'In case of violation of any of the listed conditions, we reserve the right to refuse to provide services without explanation.',
        note: 'We sincerely root for people who invest their strength, time and talent in the development of socially useful deeds, education, science, engage in charity, so we will happily provide the described hosting service for free.',
      },
      benefits: [
        { icon: '💰', title: 'Truly $0 hosting', desc: 'Use it for free. Everything is transparent, no hidden conditions.' },
        { icon: '🛡️', title: 'Antivirus scan', desc: 'We regularly check your files with antivirus and notify if necessary' },
        { icon: '🔒', title: 'Free SSL', desc: 'Free certificate for all your sites and subdomains' },
        { icon: '⚙️', title: 'PHP of your choice', desc: 'Change PHP version in a couple of clicks. Versions 5.x - 8.x are available' }
      ],
      promo: {
        title: 'Take advantage of promo conditions',
        text1: 'You can also take advantage of our promotional offers to purchase services on very favorable terms and cancel restrictions on advertising on site pages and links to our project.',
        text2: 'We regularly hold promotions and sales, offer free domains along with hosting services and low prices for hosting as part of special offers.',
        text3: 'We also have a 30-day money back guarantee. Check out hosting promotions and choose yours.',
      },
      uniqueDomain: {
        title: 'Unique domain for your site',
        text: "Get for free\n✅ .pp.ua — free with any order!\n✅ .com.ua — as a gift when paying for a year (from Starter plan).",
      },
      faq: {
        title: 'Questions and answers about free hosting',
        sub: 'We believe that quality is the main component of any service. That is why we offer Hosting in an optimized technical environment, ideal for installing WordPress or other systems.',
        items: [
          { q: 'Is there a test hosting, what are the restrictions?', a: 'Yes, we provide a free trial period. During testing, there may be restrictions on sending mail.' },
          { q: 'Is this hosting suitable for WordPress?', a: 'Absolutely. Our servers are optimized for fast PHP and database performance.' },
          { q: 'Are there any additional optimizations?', a: 'Yes, we use LiteSpeed and NVMe SSD drives for maximum speed.' },
          { q: 'Is an SSL certificate provided?', a: 'Yes, we provide free Let\'s Encrypt certificates.' },
          { q: 'What software is used?', a: 'We use CloudLinux, LiteSpeed, cPanel, and Softaculous.' },
          { q: 'Can I change PHP, what PHP versions are available?', a: 'Of course. You can choose versions from 5.x to 8.x directly in cPanel.' },
          { q: 'What can I host on the site?', a: 'Any legal content for non-commercial purposes that does not contain advertising.' }
        ]
      },
      interlink: {
        title: 'Looking for WordPress hosting specifically?',
        desc: 'Learn about our special offer for social and volunteer projects built on WordPress.',
        btn: 'Free WordPress Hosting →',
        href: '/free-wordpress-hosting'
      },
      upgrade: {
        title: 'Need more resources?',
        desc: 'If your project is growing and the free plan is no longer enough — upgrade to a paid plan and remove all limits. Starting from just $1.99/month.',
        btn: 'See Paid Plans →',
        href: '/#pricing'
      }
    },
    freePersonal: {
      meta: 'Free Starter hosting for non-profit projects — 6 months free from HostPro.',
      title: 'Free Starter Hosting',
      sub: 'Take advantage of free hosting from HostPro for 6 months, no upfront payments or obligations.',
      whoCanGet: {
        title: 'Who can get free hosting?',
        text: 'This is a real offer for hosting websites of non-profit projects. Our project HostPro can provide free hosting services for websites that do not aim to make a profit, and also for valid reasons cannot pay for standard hosting services.',
        target: 'Services are provided to non-profit organizations (charitable foundations, schools, universities, public projects), as well as individuals to support non-profit initiatives and projects related to scientific or social topics (research, education).',
      },
      whatIsIncluded: {
        title: 'What is included in this service?',
        text: 'As part of this free hosting service, you can get a service similar to the "Personal" plan with the cPanel hosting control panel. You can install WordPress or any other system in 1 click, you will have the opportunity to use your own domain name registered earlier, and you can also get a free domain name in the *.apartner.pro zone.',
        domains: 'If you do not have your own domain name yet, and do not want to use a domain in the *.apartner.pro zone, we offer to register a domain with us in one of the many domain zones. Domain name registration will be paid.',
      },
      conditions: {
        title: 'Conditions for providing free hosting',
        text1: 'To get free hosting, first send a request in free form from a non-profit organization asking to provide free hosting through the contact form below.',
        text2: 'Individuals who have their own scientific or educational projects can also use a similar method to send a request for free hosting.',
        text3: 'Describe your project in a few words and the reasons why you cannot use paid hosting services.',
      },
      application: {
        title: 'Application for free hosting',
        text: 'After your application is approved, you will be sent a promo code that must be entered when ordering the "Personal" hosting plan, which gives a 100% discount for 6 months of using the service.',
        form: {
          name: 'Your Name',
          email: 'Email',
          project: 'Project Description',
          submit: 'Send Application →',
          success: '✅ Application successfully sent! We will contact you shortly.',
          error: '❌ Error sending. Try again later or write to us by email.',
        }
      },
      features: {
        title: 'Free hosting includes:',
        text: 'The conditions and resources of the free hosting provided do not differ from the conditions of the paid plan: the site will be hosted on powerful servers, guaranteed professional support from our technical service, backups, cPanel, free SSL certificate, and other benefits.',
        notice: 'Please note, we reserve the right to refuse free hosting without explanation. The number of free plans is limited.',
      },
      restrictions: {
        title: 'Restrictions',
        link: 'The service is provided under the conditions described in the public offer:',
        list: [
          'The site must not place commercial advertising in any form on its pages;',
          'The site must not place articles and links of various exchanges on its pages;',
          'No SPAM mailing should be done from the hosting account;',
          'On the main page, "about the project" or "contacts", the logo of our project and a mention in free form that the hosting is provided by "HostPro" with a link to the main page of our site HostPro must be placed',
        ],
        footer: 'In case of violation of any of the listed conditions, we reserve the right to refuse to provide services without explanation.',
        note: 'We sincerely root for people who invest their strength, time and talent in the development of socially useful deeds, education, science, engage in charity, so we will happily provide the described hosting service for free.',
      },
      benefits: [
        { icon: '💰', title: 'Truly $0 hosting', desc: 'Use it for free. Everything is transparent, no hidden conditions.' },
        { icon: '🛡️', title: 'Antivirus scan', desc: 'We regularly check your files with antivirus and notify if necessary' },
        { icon: '🔒', title: 'Free SSL', desc: 'Free certificate for all your sites and subdomains' },
        { icon: '⚙️', title: 'Personal of your choice', desc: 'Change Personal version in a couple of clicks. Versions 5.x - 8.x are available' }
      ],
      promo: {
        title: 'Take advantage of promo conditions',
        text1: 'You can also take advantage of our promotional offers to purchase services on very favorable terms and cancel restrictions on advertising on site pages and links to our project.',
        text2: 'We regularly hold promotions and sales, offer free domains along with hosting services and low prices for hosting as part of special offers.',
        text3: 'We also have a 30-day money back guarantee. Check out hosting promotions and choose yours.',
      },
      uniqueDomain: {
        title: 'Unique domain for your site',
        text: "Get for free\n✅ .pp.ua — free with any order!\n✅ .com.ua — as a gift when paying for a year (from Starter plan).",
      },
      faq: {
        title: 'Questions and answers about free hosting',
        sub: 'We believe that quality is the main component of any service. That is why we offer Hosting in an optimized technical environment, ideal for installing WordPress or other systems.',
        items: [
          { q: 'Is there a test hosting, what are the restrictions?', a: 'Yes, we provide a free trial period. During testing, there may be restrictions on sending mail.' },
          { q: 'Is this hosting suitable for WordPress?', a: 'Absolutely. Our servers are optimized for fast Personal and database performance.' },
          { q: 'Are there any additional optimizations?', a: 'Yes, we use LiteSpeed and NVMe SSD drives for maximum speed.' },
          { q: 'Is an SSL certificate provided?', a: 'Yes, we provide free Let\'s Encrypt certificates.' },
          { q: 'What software is used?', a: 'We use CloudLinux, LiteSpeed, cPanel, and Softaculous.' },
          { q: 'Can I change Personal, what Personal versions are available?', a: 'Of course. You can choose versions from 5.x to 8.x directly in cPanel.' },
          { q: 'What can I host on the site?', a: 'Any legal content for non-commercial purposes that does not contain advertising.' }
        ]
      },
      interlink: {
        title: 'Looking for WordPress hosting specifically?',
        desc: 'Learn about our special offer for social and volunteer projects built on WordPress.',
        btn: 'Free WordPress Hosting →',
        href: '/free-wordpress-hosting'
      },
      upgrade: {
        title: 'Need more resources?',
        desc: 'If your project is growing and the free plan is no longer enough — upgrade to a paid plan and remove all limits. Starting from just $1.99/month.',
        btn: 'See Paid Plans →',
        href: '/#pricing'
      }
    },
    freeWp: {
      meta: 'Free WordPress hosting for social and charity organizations. Get 6 months free from HostPro.',
      title: 'Free WordPress Hosting',
      sub: 'Launch your charity or social project on WordPress for free for 6 months.',
      whoCanGet: {
        title: 'Who is free WP hosting available for?',
        text: 'This is a unique opportunity to host WordPress-based websites for non-profit initiatives. HostPro provides special conditions for projects that have no commercial benefit.',
        target: 'We support charitable foundations, educational institutions, public and volunteer organizations, as well as individual scientific and socially significant initiatives.',
      },
      whatIsIncluded: {
        title: 'Technical capabilities and WordPress installation',
        text: 'You get full access to the "Personal" plan with the intuitive cPanel. Thanks to the built-in Softaculous installer, you can install WordPress or another CMS in 1 click. You can attach your own domain or get a free *.apartner.pro subdomain.',
        domains: 'You also have the opportunity to purchase and register a unique domain name with us at standard registration rates if the free *.apartner.pro option does not suit you.',
      },
      conditions: {
        title: 'How to get free WordPress hosting?',
        text1: 'Official organizations just need to fill out the application form below, briefly describing the essence and goals of your non-profit project.',
        text2: 'If you are a private individual and run a volunteer, scientific or educational blog on WordPress, you also have the right to free hosting.',
        text3: 'The main thing is to clearly explain the purpose of the project and why you need technical support on a free basis.',
      },
      application: {
        title: 'Request for free hosting',
        text: 'After a quick check of your application by a manager, we will send you a unique promo code. Use it when ordering the "Personal" plan to get a 100% discount for half a year.',
        form: {
          name: 'Full Name or Organization Name',
          email: 'Contact Email',
          project: 'Project Details (why WordPress?)',
          submit: 'Send Request →',
          success: '✅ Your request has been successfully received! Wait for an email from our team.',
          error: '❌ A technical error occurred. Please try again later.',
        }
      },
      features: {
        title: 'Advantages of our WP hosting:',
        text: 'Our free plan is not a stripped-down version. Your WordPress site will run on fast servers with NVMe drives, you will get 24/7 technical support, automatic backups, cPanel and a free SSL certificate.',
        notice: 'HostPro reserves the right to refuse participation in the program without explanation if the project violates the rules. The number of free plans is limited.',
      },
      restrictions: {
        title: 'Terms of Use',
        link: 'Hosting is regulated by the general offer agreement with the following additions:',
        list: [
          'It is forbidden to place any commercial advertising, banners or paid links;',
          'Participation in link exchanges is prohibited;',
          'Strict ban on spamming or mass unauthorized email newsletters;',
          'On the main page or the "Contacts/About us" page, it must necessarily be indicated that the site is powered by HostPro hosting with an active link.',
        ],
        footer: 'In case of non-compliance with these simple rules, the provision of the service may be terminated.',
        note: 'We deeply respect the work of volunteers, scientists and public figures. This offer is created so that your voice can be heard on the internet without extra costs.',
      },
      benefits: [
        { icon: '🚀', title: 'Fast WordPress', desc: 'Servers are configured specifically for fast PHP and database operation.' },
        { icon: '🛡️', title: 'Hack protection', desc: 'Automatic blocking of malicious bots and checking files with antivirus.' },
        { icon: '🔒', title: '1-click SSL', desc: 'Secure HTTPS connection for all your domains and subdomains for free.' },
        { icon: '🛠️', title: 'Convenient cPanel', desc: 'Manage files, mail and databases through the most convenient panel.' }
      ],
      promo: {
        title: 'Commercial projects and discounts',
        text1: 'If your project has a commercial component, this free offer will not suit you. However, you can choose a standard paid plan.',
        text2: 'We regularly provide discounts of up to 30% for long-term payments and often give a domain name as a gift when paying for a year.',
        text3: 'In addition, there is a 30-day money back guarantee. Your investments are protected.',
      },
      uniqueDomain: {
        title: 'Domain as a gift (for commercial)',
        text: "Get for free\n✅ .pp.ua — free with any order!\n✅ .com.ua — as a gift when paying for a year (from Starter plan).",
      },
      faq: {
        title: 'FAQ: Free WordPress hosting',
        sub: 'Answers to frequently asked questions regarding the deployment of social and charitable projects.',
        items: [
          { q: 'What resources are allocated for free WordPress?', a: 'You get a full-fledged "Personal" plan with 1 GB of space on ultra-fast NVMe SSDs and the ability to host 1 website.' },
          { q: 'Can I install another CMS instead of WordPress?', a: 'Of course. Although this plan is optimized for WordPress, you can install any other system via Softaculous or manually.' },
          { q: 'How fast is free hosting activated?', a: 'After manual review of your application (usually 1-2 business days), you will receive a promo code for instant activation.' },
          { q: 'Is a free SSL included in the plan?', a: 'Yes, each of your domains and subdomains automatically receives a free Let\'s Encrypt certificate.' },
          { q: 'How to set up mail with your own domain?', a: 'You can create mailboxes right in cPanel and use them via web interface or connect to Gmail/Outlook.' },
          { q: 'What PHP versions are supported for WordPress?', a: 'We support all current versions, including PHP 7.4, 8.0, 8.1, 8.2, and 8.3.' },
          { q: 'What to do after the end of 6 free months?', a: 'You will be able to continue using it at the standard price of the "Personal" plan or submit a new application for review.' }
        ]
      },
      interlink: {
        title: 'Need hosting for a different CMS?',
        desc: 'Consider our Free PHP hosting, perfect for any non-profit projects.',
        btn: 'Free PHP Hosting →',
        href: '/free-php-hosting'
      },
      upgrade: {
        title: 'Need more resources?',
        desc: 'If the free plan is not enough for your growing project — upgrade to a paid plan and get more websites, storage and databases. Starting from just $1.99/month.',
        btn: 'See Paid Plans →',
        href: '/#pricing'
      }
    },
    freeHostingHub: {
      title: 'Choose a free hosting program',
      sub: 'HostPro offers several options for free hosting for different needs. Choose the one that suits you best.',
      php: {
        title: 'PHP hosting for NPOs',
        desc: '6 months of free hosting for social projects. cPanel, PHP, any CMS.',
        btn: 'PHP Plan Details →'
      },
      personal: {
        title: 'Personal hosting for Projects',
        desc: '6 months of free hosting for personal projects. cPanel, PHP, any CMS.',
        btn: 'Personal Plan Details →'
      },
      wp: {
        title: 'WordPress hosting for NPOs',
        desc: 'Optimized WP hosting for 6 months for charities and volunteers. 1-click install.',
        btn: 'WordPress Hosting Details →'
      },
      partner: {
        title: 'Partner Program',
        desc: 'Bring one client and get the same hosting for yourself absolutely free.',
        btn: 'How to become a partner →'
      },
      seo: {
        title: 'Why Choose Our Free Hosting?',
        text: 'HostPro offers reliable and fast free hosting for social, charitable, and non-profit projects. We believe that good initiatives deserve support, which is why we provide high-quality SSD servers, cPanel, and free SSL without hidden fees. Choose the plan that best fits your needs, whether it is WordPress, generic PHP hosting, or a personal project, and get started today.'
      }
    },
    kb: {
      meta: 'Knowledge Base — find guides, tutorials and answers to your hosting questions.',
      title: 'Knowledge Base',
      sub: 'Search our library of help articles and tutorials.',
      searchPh: 'Search for articles...',
      helpful: 'Was this article helpful?',
      yes: 'Yes',
      no: 'No',
      supportTitle: 'Still need help?',
      supportSub: 'Our support team is available 24/7 to help you with any issues.',
      supportBtn: 'Contact Support',
      backToKb: '← Back to Knowledge Base',
      articleCount: 'articles', articleSingular: 'Article',
      categories: [
        { title: 'Getting Started', count: 12, icon: '🚀', slug: 'getting-started' },
        { title: 'cPanel & Hosting', count: 24, icon: '📋', slug: 'cpanel' },
        { title: 'Domains & DNS', count: 15, icon: '🌐', slug: 'dns' },
        { title: 'Email Setup', count: 18, icon: '📧', slug: 'email' },
        { title: 'WordPress Guides', count: 21, icon: '📝', slug: 'wordpress' },
        { title: 'Security & SSL', count: 10, icon: '🔒', slug: 'security' },
      ],
      popular: 'Popular Articles',
      popularItems: [
        { title: 'How to login to cPanel', slug: 'how-to-login-to-cpanel', cat: 'cPanel & Hosting' },
        { title: 'Changing your nameservers', slug: 'changing-your-nameservers', cat: 'Domains & DNS' },
        { title: 'Setting up email on iPhone', slug: 'setting-up-email-on-iphone', cat: 'Email Setup' },
        { title: 'Installing WordPress via Softaculous', slug: 'installing-wordpress-via-softaculous', cat: 'WordPress Guides' },
        { title: 'Optimizing WordPress with LiteSpeed Cache', slug: 'wordpress-optimization-litespeed', cat: 'WordPress Guides' },
      ],
      articles: [
        {
          slug: 'installing-wordpress-via-softaculous',
          title: 'Installing WordPress via Softaculous',
          cat: 'WordPress Guides',
          content: `<p>Softaculous is a powerful auto-installer that allows you to install WordPress in just a few clicks. Here is a step-by-step guide:</p>
<ol>
  <li><strong>Login to your cPanel account.</strong> You can usually do this by going to yourdomain.com/cpanel.</li>
  <li>Scroll down to the <strong>"Software"</strong> section and click on <strong>"Softaculous Apps Installer"</strong>.</li>
  <li>In the Softaculous interface, find <strong>WordPress</strong> and click the <strong>"Install"</strong> button.</li>
  <li>Choose the <strong>"Quick Install"</strong> or <strong>"Custom Install"</strong>. We recommend Custom Install for more control.</li>
  <li><strong>Software Setup:</strong>
    <ul>
      <li>Choose the protocol (https:// is recommended).</li>
      <li>Choose your domain.</li>
      <li>In Directory: leave empty if you want WordPress on the main site (e.g., yourdomain.com).</li>
    </ul>
  </li>
  <li><strong>Site Settings:</strong> Enter your Site Name and Site Description.</li>
  <li><strong>Admin Account:</strong> Create a strong Admin Username and Password. <em>Do not use "admin" as username for security reasons.</em></li>
  <li>Scroll down and click <strong>"Install"</strong>.</li>
</ol>
<p>Wait for the progress bar to finish. Once completed, you will receive links to your new website and the admin dashboard (/wp-admin).</p>`
        },
        {
          slug: 'wordpress-optimization-litespeed',
          title: 'Optimizing WordPress with LiteSpeed Cache',
          cat: 'WordPress Guides',
          content: `<p>LiteSpeed Cache (LSCache) is a high-performance caching plugin built specifically for the LiteSpeed Web Server used at HostPro. Here is how to set it up:</p>
<ol>
  <li><strong>Install the Plugin:</strong> Login to your WordPress admin dashboard, go to <strong>Plugins > Add New</strong>, and search for "LiteSpeed Cache". Install and Activate it.</li>
  <li><strong>Presets:</strong> We recommend starting with a Preset. Go to <strong>LiteSpeed Cache > Presets</strong> and select "Advanced (Recommended)". Click <strong>Apply Preset</strong>.</li>
  <li><strong>Image Optimization:</strong> Go to <strong>LiteSpeed Cache > Image Optimization</strong>. Click "Gather Image Data" and then "Send Optimization Request". This will compress your images without losing quality.</li>
  <li><strong>Minification:</strong> Under <strong>Page Optimization > CSS Settings</strong>, turn on CSS Minify. Do the same for JS and HTML in their respective tabs.</li>
  <li><strong>CDN:</strong> If you use Cloudflare or QUIC.cloud, you can configure it under the <strong>CDN</strong> tab for even better global performance.</li>
</ol>
<p>After applying these settings, your website should load significantly faster. You can verify this using tools like PageSpeed Insights or GTmetrix.</p>`
        },
        {
          slug: 'changing-php-version-cpanel',
          title: 'How to Change PHP Version in cPanel',
          cat: 'WordPress Guides',
          content: `<p>Different versions of WordPress and its plugins may require different PHP versions. Here is how to change it:</p>
<ol>
  <li><strong>Login to cPanel.</strong></li>
  <li>In the <strong>Software</strong> section, click on <strong>"Select PHP Version"</strong>.</li>
  <li>You will see your current PHP version. Click on the version number to see a dropdown of available versions.</li>
  <li>Select the desired version (e.g., PHP 8.1 or 8.2) and click <strong>"Set as current"</strong>.</li>
  <li>Check your website to ensure everything is working correctly.</li>
</ol>
<p>If you see errors after changing the version, you can always switch back to the previous one in the same menu.</p>`
        },
        {
          slug: 'reset-wordpress-password-phpmyadmin',
          title: 'Resetting WordPress Password via phpMyAdmin',
          cat: 'WordPress Guides',
          content: `<p>If you lost access to your admin email and cannot reset your password normally, you can do it directly in the database:</p>
<ol>
  <li>Login to <strong>cPanel</strong> and open <strong>phpMyAdmin</strong>.</li>
  <li>Select your WordPress database from the left sidebar.</li>
  <li>Find the table named <code>wp_users</code> (the prefix might be different, e.g., <code>wp123_users</code>).</li>
  <li>Click <strong>Edit</strong> next to your admin user record.</li>
  <li>Find the <code>user_pass</code> field. In the <strong>Function</strong> column, select <strong>MD5</strong>.</li>
  <li>In the <strong>Value</strong> column, type your new password.</li>
  <li>Click <strong>Go</strong> at the bottom.</li>
</ol>
<p>Now you can login to WordPress with your new password.</p>`
        },
        {
          slug: 'fix-wordpress-database-connection-error',
          title: 'Fixing "Error Establishing a Database Connection"',
          cat: 'WordPress Guides',
          content: `<p>This error occurs when WordPress cannot connect to its database. Follow these steps to fix it:</p>
<ol>
  <li><strong>Check wp-config.php:</strong> Login to cPanel > File Manager and find <code>wp-config.php</code> in your site root.</li>
  <li>Verify that <code>DB_NAME</code>, <code>DB_USER</code>, <code>DB_PASSWORD</code>, and <code>DB_HOST</code> are correct.</li>
  <li><strong>Verify Database User:</strong> In cPanel > MySQL Databases, ensure the user is added to the database with "All Privileges".</li>
  <li><strong>Check Database Corruption:</strong> Add <code>define('WP_ALLOW_REPAIR', true);</code> to <code>wp-config.php</code>, then visit <code>yourdomain.com/wp-admin/maint/repair.php</code>.</li>
</ol>
<p>Don't forget to remove the repair line from <code>wp-config.php</code> after you're done!</p>`
        },
        {
          slug: 'wordpress-white-screen-of-death',
          title: 'How to Fix the WordPress White Screen of Death',
          cat: 'WordPress Guides',
          content: `<p>The "White Screen of Death" (WSoD) is usually caused by a plugin or theme conflict, or a memory limit issue. Here is how to fix it:</p>
<ol>
  <li><strong>Enable Debug Mode:</strong> Edit <code>wp-config.php</code> and change <code>define('WP_DEBUG', false);</code> to <code>true</code>. This will show the actual error message.</li>
  <li><strong>Deactivate All Plugins:</strong> If you cannot access the dashboard, use File Manager to rename the <code>wp-content/plugins</code> folder to <code>plugins_old</code>. If the site works, rename it back and deactivate plugins one by one.</li>
  <li><strong>Switch to Default Theme:</strong> Rename your active theme folder in <code>wp-content/themes</code>. WordPress will fall back to a default theme like Twenty Twenty-Four.</li>
  <li><strong>Increase Memory Limit:</strong> Add <code>define('WP_MEMORY_LIMIT', '256M');</code> to <code>wp-config.php</code>.</li>
</ol>
<p>If none of these work, check the <strong>Error Log</strong> in your cPanel for more details.</p>`
        },
        {
          slug: 'wordpress-staging-guide',
          title: 'How to Use WordPress Staging in cPanel',
          cat: 'WordPress Guides',
          content: `<p>Staging allows you to test changes on a clone of your site before making them live. At HostPro, this is easily done via Softaculous:</p>
<ol>
  <li>Login to <strong>cPanel</strong> and open <strong>Softaculous</strong>.</li>
  <li>Click on the <strong>Installations</strong> icon (top right).</li>
  <li>Find your WordPress installation and click the <strong>"Create Staging"</strong> icon (looks like two papers).</li>
  <li>Choose the staging URL (e.g., <code>staging.yourdomain.com</code>).</li>
  <li>Click <strong>"Create Staging"</strong>.</li>
  <li>Make your changes on the staging site. Once satisfied, go back to Softaculous and click <strong>"Push to Live"</strong> next to the staging installation.</li>
</ol>
<p>This ensures your live site stays functional while you experiment with new features or designs.</p>`
        }
      ],
    },
    blog: {
        meta: 'HostPro Blog — insights on web hosting, security, and performance.',
        title: 'Our Blog',
        sub: 'Expert advice and industry insights to help you grow your online presence.',
        readMore: 'Read more →',
        backToBlog: '← Back to Blog',
        publishedAt: 'Published on',
        helpful: 'Was this article helpful?',
        yes: 'Yes',
        no: 'No',
        posts: [
          {
            slug: 'why-nvme-ssd-hosting-matters',
            title: 'Why NVMe SSD Hosting is a Game Changer for Your Website',
            desc: 'Discover how next-gen storage can boost your SEO and user experience by reducing load times.',
            image: '/blog/nvme-speed.jpg',
            date: 'May 1, 2025',
            content: `
              <p>In the world of web hosting, speed isn't just a luxury — it's a critical factor for success. Google has long confirmed that page speed is a ranking factor, and users expect websites to load in under 2 seconds. This is where NVMe SSD hosting comes in.</p>
              <h3>What is NVMe?</h3>
              <p>NVMe (Non-Volatile Memory Express) is a storage protocol designed specifically for high-speed flash memory. Unlike traditional SSDs that use the older SATA interface (limited to 600MB/s), NVMe can reach speeds of over 3,500MB/s.</p>
              <h3>How it benefits you:</h3>
              <ul>
                <li><strong>Faster Page Loads:</strong> Your database queries and file access happen almost instantly.</li>
                <li><strong>Better SEO:</strong> Search engines reward fast websites with higher rankings.</li>
                <li><strong>Higher Conversion Rates:</strong> Users are less likely to abandon a site that feels snappy and responsive.</li>
              </ul>
              <p>At HostPro, we use NVMe SSDs across all our plans because we believe every website deserves the best performance possible.</p>
            `
          },
          {
            slug: 'how-to-choose-hosting-plan',
            title: '5 Tips to Choose the Best Hosting Plan for Your Growing Business',
            desc: 'Avoid common pitfalls and pick a plan that scales with your business goals.',
            image: '/blog/hosting-plan.jpg',
            date: 'April 28, 2025',
            content: `
              <p>Choosing a hosting plan can be overwhelming with so many options available. Here are five tips to help you make the right choice:</p>
              <ol>
                <li><strong>Assess Your Traffic:</strong> If you're just starting, our Personal or Starter plans are great. If you have high traffic, look at Business or Agency plans.</li>
                <li><strong>Check Technical Requirements:</strong> Do you need Node.js, Python, or a specific PHP version? HostPro supports them all, but check the resource limits.</li>
                <li><strong>Look for Scalability:</strong> Your host should allow you to upgrade your plan instantly without downtime.</li>
                <li><strong>Security is Key:</strong> Ensure your plan includes free SSL and automatic backups.</li>
                <li><strong>Don't Ignore Support:</strong> 24/7 support is essential when things go wrong.</li>
              </ol>
              <p>Remember, the cheapest option isn't always the best. Look for the value provided in terms of speed, uptime, and reliability.</p>
            `
          },
          {
            slug: 'securing-website-2025',
            title: 'Securing Your Website in 2025: A Practical Guide',
            desc: 'How HostPro’s built-in security features protect your brand from modern online threats.',
            image: '/blog/security-guide.jpg',
            date: 'April 25, 2025',
            content: `
              <p>Cyber threats are evolving every day. In 2025, a simple password is no longer enough to protect your online assets. Here is how we keep your site safe:</p>
              <h3>1. Automatic SSL Certificates</h3>
              <p>Every site on HostPro gets a free Let’s Encrypt SSL. This encrypts data between your server and your visitors, which is vital for trust and security.</p>
              <h3>2. Daily Backups</h3>
              <p>If your site is hacked or you make a mistake, our daily backups allow you to restore everything to a previous state in just one click.</p>
              <h3>3. Account Isolation</h3>
              <p>We use CloudLinux to isolate accounts. This means if another user on the same server has a security breach, your account remains unaffected.</p>
              <p>Stay vigilant, keep your plugins updated, and let us handle the server-side security for you.</p>
            `
          }
        ]
      },

    },

  // ── UKRAINIAN ──────────────────────────────────────────────────────────────
  uk: {
    siteName: 'HostPro',
    siteTagline: 'Сучасний хостинг для сучасних проєктів.',
    nav: { features: 'Переваги', pricing: 'Тарифи', reviews: 'Відгуки', about: 'Про нас', faq: 'FAQ', contact: 'Контакти', status: 'Статус', cta: 'Розпочати', chat: 'AI Асистент' },
    footer: { tagline: 'Сучасний хостинг для сучасних проєктів.', copy: '© 2025 HostPro. Усі права захищені.', cols: { products: 'Продукти', services: 'Послуги', resources: 'Ресурси', legal: 'Юридична інформація' }, links: { pricing: 'Тарифи', faq: 'FAQ', status: 'Статус системи', wpHosting: 'WordPress хостинг', vpsHosting: 'VPS хостинг', dedicated: 'Виділені сервери', laravelHosting: 'Laravel хостинг', phpHosting: 'PHP хостинг', prestashopHosting: 'PrestaShop хостинг', freeHosting: 'Безкоштовний хостинг', kb: 'База знань', blog: 'Блог', about: 'Про нас', reviews: 'Відгуки', contact: 'Контакти', terms: 'Умови використання', privacy: 'Конфіденційність', refund: 'Повернення коштів' } },
    hero: { badge: '⚡ NVMe SSD · Node.js · 99.9% Uptime · cPanel', title1: 'Хостинг, який', title2: 'просто працює', sub: 'Швидкі SSD-сервери, безкоштовний SSL, cPanel та підтримка 24/7. Запустіть свій сайт за хвилини.', cta: 'Почати зараз', ctaSub: 'Без прихованих платежів · Скасування в будь-який час', stat1: 'Активних сайтів', stat2: 'Час завантаження', stat3: 'Uptime SLA' },
    features: {
      title: 'Все, що потрібно для успіху', sub: 'Ми подбали про інфраструктуру — ви зосередьтесь на бізнесі', items: [
        { icon: '⚡', title: 'NVMe SSD', desc: 'Швидкість у 3× швидша за звичайний SSD. Ваш сайт завантажується миттєво.' },
        { icon: '🔒', title: 'SSL безкоштовно', desc: "Let's Encrypt SSL для кожного домену. Автоматично й без доплат." },
        { icon: '📋', title: 'cPanel', desc: 'Зручна панель управління для всіх ваших сайтів і поштових скриньок.' },
        { icon: '💾', title: 'Щоденний бекап', desc: 'Автоматичні резервні копії щодня. Відновлення в один клік.' },
        { icon: '🌐', title: '99.9% Uptime', desc: 'Гарантована доступність. SLA-угода з кожним тарифом.' },
        { icon: '🎧', title: 'Підтримка 24/7', desc: 'Живі спеціалісти щодня. Середній час відповіді — 5 хвилин.' },
        { icon: '📧', title: 'Поштові скриньки', desc: 'Створюйте професійні email-адреси на вашому домені. Безлімітний доступ по IMAP/POP3/SMTP.' },
        { icon: '🚀', title: 'Встановлення в 1 клік', desc: 'Автоматичне встановлення WordPress, Joomla та ще 400+ скриптів через Softaculous.' },
      ]
    },
    tech: {
      title: 'Побудовано на сучасних технологіях',
      sub: 'Кожен тариф включає преміальні функції та найсучасніший серверний стек для максимальної продуктивності.',
      softaculous: {
        title: 'Softaculous: Встановлення в 1 клік',
        desc: '300+ автоінсталяторів програм (WordPress, Joomla та ін.).',
      },
      features: {
        title: 'ТЕХНІЧНІ ОСОБЛИВОСТІ',
        items: [
          { title: 'Продуктивність', desc: 'LiteSpeed WebServer, LSCache та NVMe SSD сховище.' },
          { title: 'Надійність', desc: 'Anycast DNS та CloudLinux для ізоляції акаунтів.' },
          { title: 'Безпека', desc: 'Безкоштовні SSL-сертифікати та щоденні бекапи для всіх.' },
          { title: 'Підтримка', desc: '24/7 технічна допомога та безкоштовні міграції.' },
        ],
      },
      server: {
        title: 'СЕРВЕРНІ ТЕХНОЛОГІЇ',
        items: [
          { title: 'LiteSpeed Web Server', desc: 'Значно швидший за Apache, оптимізований для WordPress.' },
          { title: 'CloudLinux (LVE)', desc: 'Гарантує виділені ресурси та повну ізоляцію акаунту.' },
          { title: 'NVMe SSD Storage', desc: 'Сховище нового покоління для надшвидкого читання/запису.' },
          { title: 'Anycast DNS', desc: 'Глобальна мережа для миттєвого розв\'язання доменів.' },
        ],
      },
      databases: {
        title: 'БАЗИ ДАНИХ',
        items: [
          { title: 'MySQL / MariaDB', desc: 'Стандарт індустрії для WordPress та PHP додатків.' },
          { title: 'phpMyAdmin', desc: 'Потужний інструмент керування базами в кожній cPanel.' },
          { title: 'Remote MySQL', desc: 'Можливість підключення до баз із зовнішніх додатків.' },
        ],
      },
      dev: {
        title: 'Кодування та розробка',
        desc: 'Ми підтримуємо PHP (різні версії), Python та Node.js. Безкоштовні SSL з автооновленням для кожного акаунту.',
      }
    },
    billing: { monthly: 'Щомісяця', quarterly: 'Щоквартально', yearly: 'Щорічно', threeYears: 'На 3 роки', save10: '−10%', save20: '−20%', save30: '−30%', monthTerm: '1 місяць', quarterTerm: '3 місяці', yearTerm: '1 рік', threeYearTerm: '3 роки', payToday: 'Оплатити', today: 'сьогодні', for: 'На', then: 'потім', onRenewal: 'при поновленні', savings: 'Економія', renewsAt: 'Поновлення', prepaidFor: 'Передплата на', months: 'місяців', exVat: 'Без ПДВ' },
    pricing: {
      title: 'Прозорі тарифи', sub: 'Оберіть план і масштабуйтесь без обмежень', popular: 'Найпопулярніший', mo: '/міс', cta: 'Обрати план', featLabel: 'Включено:', customTitle: 'Не знайшли потрібний тариф?', customSub: 'Напишіть нам — ми підберемо індивідуальне рішення під ваші потреби та бюджет.', customBtn: '✉️ Написати нам',
      plans: [
        { name: 'Personal', desc: 'Ідеально для першого сайту', price: 0.99, color: '#6EE7B7', popular: false, extras: ['1 сайт', '1 GB NVMe SSD', '1 Email акаунт', '1 база даних MySQL', 'Безкоштовний SSL сертифікат', 'Панель керування cPanel', 'Підтримка Node.js', 'Захист від шкідливого ПЗ', 'Стандартні бекапи', 'Звичайна підтримка', 'Гарантія аптайму 99.9%'] },
        { name: 'Starter', desc: 'Для кількох сайтів і росту', price: 4.99, color: '#60A5FA', popular: false, extras: ['до 3 сайтів', '3 GB NVMe SSD', '3 Email акаунтів', '3 бази даних MySQL', 'Безкоштовний SSL сертифікат', 'Панель керування cPanel', 'Підтримка Node.js', 'Захист від шкідливого ПЗ', 'Стандартні бекапи', 'Звичайна підтримка', 'Гарантія аптайму 99.9%'] },
        { name: 'Business', desc: 'Для бізнес-сайтів і магазинів', price: 9.99, color: '#A78BFA', popular: false, extras: ['до 10 сайтів', '10 GB NVMe SSD', '10 Email акаунтів', '10 баз даних MySQL', 'Безкоштовний SSL сертифікат', 'Панель керування cPanel', 'Прискорювач сайту', 'Підтримка Node.js', 'Захист від шкідливого ПЗ', 'Пріоритетний бекап', 'Пріоритетна підтримка', 'Гарантія аптайму 99.9%'] },
        { name: 'Agency', desc: 'Для агентств та інтернет-магазинів', price: 19.99, color: '#FB923C', popular: true, extras: ['до 25 сайтів', '25 GB NVMe SSD', 'Необмежено Email', '25 баз даних MySQL', 'Wildcard SSL сертифікат', 'Панель керування cPanel', 'Прискорювач сайту', 'Підтримка Node.js', 'Захист від шкідливого ПЗ', 'Пріоритетний бекап', 'Пріоритетна підтримка 24/7', 'Гарантія аптайму 99.9%'] },
        { name: 'Agency Pro', desc: 'Для масштабних проєктів і команд', price: 39.99, color: '#F472B6', popular: false, extras: ['Необмежено сайтів', '50 GB NVMe SSD', 'Необмежено Email', 'Необмежено баз даних MySQL', 'Wildcard SSL сертифікат', 'Виділена IP-адреса', 'Панель керування cPanel', 'Прискорювач сайту', 'Підтримка Node.js', 'Pro захист від шкідливого ПЗ', 'Виділений менеджер', 'VIP підтримка 24/7', 'Гарантія аптайму 99.9%'] },
      ],
    },
    who: {
      title: 'Для кого підходить?', sub: 'Масштабоване рішення для будь-якого розміру бізнесу', items: [
        { icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Бізнес', desc: 'Корпоративні сайти, лендинги, CRM. Надійність і швидкість для вашого бренду.' },
        { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)', title: 'Розробники', desc: 'Перепродавайте хостинг клієнтам. Потужна інфраструктура для вашого бізнесу.' },
        { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Інтернет-магазини', desc: 'WooCommerce, PrestaShop, OpenCart. Швидкий хостинг для e-commerce.' },
        { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)', title: 'Стартапи', desc: 'Почніть малим і масштабуйтесь миттєво. Без переїздів і простоїв.' },
      ]
    },
    cta: { title: 'Готові розпочати?', sub: 'Запустіть перший сайт вже сьогодні — без технічних знань.', btn: 'Розпочати →' },
    order: { label: 'Замовлення плану', nameLbl: "Ваше ім'я", namePh: "Ваше ім'я", domainLbl: 'Домен / сайт (необов\'язково)', domainPh: 'yourdomain.com', msgLbl: 'Повідомлення (необов\'язково)', msgPh: 'Будь-які питання або побажання...', send: 'Надіслати замовлення →', note: 'Зв’яжемося з вами якомога швидше.', success: '✅ Замовлення відправлено! Ми зв\'яжемось з вами невдовзі.' },
    about: { meta: 'Дізнайтесь більше про команду HostPro — хто ми, наша місія та цінності.', label: 'Про нас', title: 'Про нас', h1p1: 'Ми будуємо', h1p2: 'надійний інтернет', sub: 'Команда ентузіастів, яка вірить що якісний хостинг має бути доступним кожному.', stats: [{ val: '12K+', label: 'Активних сайтів' }, { val: '99.9%', label: 'Uptime SLA' }, { val: '5 хв', label: 'Серед. відповідь' }, { val: '2019', label: 'Рік заснування' }], missionLabel: 'Наша місія', missionTitle: 'Хостинг, який просто працює', mission1: 'Ми починали як невелика команда розробників, яка втомилася від ненадійних хостинг-провайдерів. Замість скарг — вирішили зробити краще. Сьогодні HostPro обслуговує тисячі клієнтів.', mission2: 'Наші сервери в сертифікованих Tier III дата-центрах з резервним живленням та подвійним підключенням до інтернету.', valuesLabel: 'Наші цінності', valuesTitle: 'Що нас рухає', values: [{ icon: '⚡', title: 'Швидкість понад усе', desc: 'NVMe SSD, оптимізовані конфігурації та CDN — сайт завантажується миттєво.' }, { icon: '🔒', title: 'Безпека без компромісів', desc: 'Автоматичний SSL, щоденні бекапи, захист від DDoS та моніторинг 24/7.' }, { icon: '🤝', title: 'Чесність і прозорість', desc: 'Без прихованих платежів. Те що на сайті — те ви й отримуєте.' }, { icon: '🚀', title: 'Зростання разом з вами', desc: 'Починаєте з малого — чудово. Масштабуємось разом без переїздів.' }], teamLabel: 'Команда', teamTitle: 'Люди за HostPro', team: [{ avatar: '👨‍💻', name: 'Олексій М.', role: 'Засновник & CEO' }, { avatar: '👩‍🔧', name: 'Наталія В.', role: 'Head of Infrastructure' }, { avatar: '👨‍🎨', name: 'Денис К.', role: 'Lead Developer' }, { avatar: '👩‍💼', name: 'Марія Л.', role: 'Customer Success' }] },
    testimonials: {
      title: 'Що кажуть наші клієнти',
      sub: 'Нам довіряють понад 12,000 клієнтів по всьому світу',
      reviewsLink: 'Читати всі відгуки →',
      items: [
        { name: 'Олександр П.', role: 'Власник інтернет-магазину', text: 'Перехід на HostPro став найкращим рішенням для мого бізнесу. Швидкість вражає, а техпідтримка завжди на зв’язку.', stars: 5 },
        { name: 'Дмитро К.', role: 'Full-stack розробник', text: 'Нарешті хостинг, який розуміє розробників. SSH, підтримка Node.js та NVMe SSD роблять роботу значно приємнішою.', stars: 5 },
        { name: 'Ольга С.', role: 'Маркетингова агенція', text: 'Ми керуємо десятками сайтів клієнтів тут. Тариф Agency Pro з персональним менеджером став справжнім проривом для нас.', stars: 5 },
        { name: 'Максим В.', role: 'Засновник SaaS', text: 'Аптайм саме такий, як обіцяли. Наш додаток працює без жодного збою вже понад рік.', stars: 5 },
        { name: 'Юлія К.', role: 'Блогер', text: 'Налаштування було дуже простим. Встановлення WordPress в один клік та безкоштовний SSL дуже допомогли.', stars: 5 },
        { name: 'Артем Т.', role: 'Креативний директор', text: 'Чудова продуктивність за вигідною ціною. NVMe SSD накопичувачі дійсно мають значення для нашого портфоліо.', stars: 5 }
      ]
    },
    faq: { meta: 'Відповіді на найчастіші питання про хостинг HostPro.', label: 'FAQ', title: 'FAQ', h1p1: 'Часті', h1p2: 'запитання', sub: 'Відповіді на найпоширеніші питання про наш хостинг.', items: [{ q: 'Що таке cPanel і навіщо він потрібен?', a: 'cPanel — найпоширеніша панель керування хостингом. Через неї керуєте файлами, базами даних, поштою, SSL та статистикою. Інтуїтивний інтерфейс навіть для початківців.' }, { q: 'Як швидко активується мій акаунт?', a: 'Після оплати акаунт активується автоматично. Зазвичай це займає 1-3 хвилини, але в окремих випадках (залежно від навантаження) може тривати до 5 годин. Ви отримаєте email з даними для входу в cPanel.' }, { q: 'Чи є гарантія повернення коштів?', a: 'Так — 14 днів. Якщо незадоволені — повертаємо 100% без зайвих питань. Тільки для нових акаунтів.' }, { q: 'Чи можу я перенести свій поточний сайт?', a: 'Так, міграція безкоштовна. Напишіть у підтримку з даними поточного хостингу — ми зробимо все самі за 24 години.' }, { q: 'Що входить до безкоштовного SSL?', a: "Let's Encrypt SSL для кожного домену та субдомену, оновлюється кожні 90 днів. На Agency тарифах — Wildcard SSL." }, { q: 'Як часто робляться бекапи?', a: 'На тарифах Business та вище — щоденні бекапи зберігаються 7 днів. Відновлення в один клік через cPanel.' }, { q: 'Чи підтримуєте WordPress?', a: 'Так, повністю. Встановлення в один клік через Softaculous в cPanel. Також WooCommerce, PrestaShop, Joomla, Drupal.' }, { q: 'Що буде якщо я перевищу ліміти?', a: 'Ми попередимо по email заздалегідь. Сайт не відключиться одразу — буде час оптимізувати або перейти на вищий тариф.' }, { q: 'Чи можу я змінити тариф?', a: 'Звісно. Апгрейд миттєво, дані збережено. Платите лише різницю до кінця поточного циклу.' }, { q: 'Де знаходяться ваші сервери?', a: 'Сертифіковані Tier III дата-центри в кількох географічних локаціях для резервування та мінімальних затримок.' }] },
    contact: { meta: "Зв'яжіться з командою HostPro — підтримка 24/7, відповідь якомога швидше.", label: 'Контакти', title: 'Контакти', h1p1: 'Ми тут,', h1p2: 'щоб допомогти', sub: 'Середній час відповіді — якомога швидше. Підтримка доступна 24/7.', channels: [{ icon: '✉️', title: 'Email', desc: 'Загальні питання та пропозиції', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '🛠️', title: 'Технічна підтримка', desc: 'Проблеми з сайтом, cPanel, налаштування', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '💬', title: 'Live Chat', desc: 'Найшвидший способ отримати відповідь', link: 'Відкрити чат →', href: '#' }, { icon: '🤝', title: 'Партнерство', desc: 'Реселери, корпоративні рішення', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }], formLabel: "Форма зворотнього зв'язку", formTitle: 'Напишіть нам', nameLbl: "Ім'я", namePh: "Ваше ім'я", emailLbl: 'Email', emailPh: 'your@email.com', topicLbl: 'Тема', msgLbl: 'Повідомлення', msgPh: 'Опишіть ваше питання або проблему...', sendBtn: 'Надіслати повідомлення →', topics: ['Загальне питання', 'Технічна підтримка', 'Білінг та оплата', 'Міграція сайту', 'Партнерство', 'Інше'], success: '✅ Дякуємо! Ми відповімо якомога швидше.' },
    status: { meta: 'Реальний стан серверів та сервісів HostPro. Uptime 99.9%.', label: 'Статус системи', title: 'Статус системи', h1p1: 'Все', h1p2: 'працює', okText: 'Всі системи працюють нормально', okSub: 'Жодних активних інцидентів · Uptime 99.98% за 90 днів', metrics: [{ val: '99.98%', label: 'Uptime (90 днів)' }, { val: '0.3s', label: 'Серед. відповідь' }, { val: '0', label: 'Активних інцидентів' }], svcTitle: 'Статус сервісів', svcSub: 'Реальний час · оновлюється щохвилини', services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'], badge: 'Operational', incTitle: 'Журнал інцидентів', incSub: 'Останні 90 днів', incidents: [{ date: '12 лютого 2025, 03:14 UTC', title: 'Уповільнення Mail Server EU-1', badge: 'Вирішено', desc: 'Підвищене навантаження. Усунено за 18 хв. Жодного втраченого листа.' }, { date: '28 січня 2025, 11:40 UTC', title: 'Планове обслуговування', badge: 'Завершено', desc: 'Оновлення ядра. Вікно 23 хв. Всі сервіси відновлено за планом.' }], noMore: 'Більше інцидентів не зафіксовано за цей період' },
    terms: { meta: 'Умови використання послуг хостингу HostPro.', label: 'Юридична інформація', title: 'Умови використання', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: 'Загальні положення', body: 'Ці Умови регулюють доступ і використання послуг HostPro. Використовуючи сервіс, ви погоджуєтесь з Умовами. HostPro може оновлювати їх, повідомляючи по email за 14 днів.' }, { title: 'Опис послуг', body: 'HostPro надає хостинг на NVMe SSD серверах, включаючи: доступ до cPanel, поштові скриньки, SSL-сертифікати, щоденні бекапи та підтримку 24/7.' }, { title: 'Акаунт і відповідальність', body: 'Ви відповідаєте за конфіденційність даних акаунту та весь контент, розміщений через сервіс.' }, { title: 'Заборонене використання', body: 'Забороняється: незаконний контент, спам, фішинг, порушення авторських прав, майнінг криптовалюти, DDoS-атаки.' }, { title: 'Оплата та білінг', body: 'Оплата авансом за обраний період. Акаунт може бути призупинений через 7 днів несплати. Дані зберігаються 30 днів після призупинення.' }, { title: 'Гарантія доступності (SLA)', body: 'Гарантуємо 99.9% доступності на місяць. Кредити: 99.0–99.9% = 10%; 95.0–99.0% = 25%; нижче 95% = 50%.' }, { title: 'Обмеження відповідальності', body: 'HostPro не відповідає за непрямі збитки. Максимальна відповідальність — сума, сплачена за останні 3 місяці.' }, { title: 'Розірвання договору', body: 'Ви можете скасувати в будь-який час по email. Дані зберігаються 30 днів, потім видаляються.' }, { title: 'Застосовне право', body: 'Ці Умови регулюються законодавством України. Спори — в судах за місцем знаходження HostPro.' }, { title: 'Контакти', body: 'Юридичні питання: hostpro@apartner.pro' }] },
    privacy: { meta: 'Як HostPro збирає, використовує та захищає ваші персональні дані. GDPR.', label: 'Конфіденційність', title: 'Політика конфіденційності', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: 'Які дані ми збираємо', body: "Ми збираємо: ідентифікаційні дані (ім'я, email, телефон); платіжні дані (обробляються через захищені шлюзи — дані карток не зберігаємо); технічні дані (IP, браузер, ОС, cookies); дані використання." }, { title: 'Як ми використовуємо ваші дані', body: 'Дані використовуються виключно для надання сервісу, обробки платежі, підтримки та безпеки. Ми не продаємо персональні дані третім особам.' }, { title: 'Cookies', body: 'Ми використовуємо необхідні cookies та аналітичні cookies. Аналітичні можна відключити в налаштуваннях браузера.' }, { title: 'Безпека даних', body: 'Дані зберігаються на захищених серверах в ЄС. TLS для передачі, AES-256 для зберігання чутливих даних.' }, { title: 'Ваші права (GDPR)', body: 'Ви маєте право на: доступ, виправлення, видалення, обмеження обробки, заперечення, перенесення даних. Контакт: hostpro@apartner.pro' }, { title: 'Треті особи', body: 'Дані передаються лише надійним технічним партнерам, які підписують угоду про обробку даних відповідно до GDPR.' }, { title: 'Строки зберігання', body: 'Дані активних акаунтів зберігаються весь термін послуг. Після закриття — видаляються через 30 днів.' }, { title: 'Зміни Політики', body: 'Суттєві зміни повідомляємо по email за 30 днів.' }, { title: 'Контакти DPO', body: 'hostpro@apartner.pro' }] },
    refund: { meta: 'Умови повернення коштів HostPro. 14-денна гарантія.', label: 'Повернення коштів', title: 'Політика повернення коштів', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: '14-денна гарантія повернення', body: 'Якщо протягом перших 14 днів ви незадоволені — повертаємо 100% без жодних питань. Тільки для нових акаунтів, один раз на клієнта.' }, { title: 'Кредити при зміні тарифу', body: 'При апгрейді залишок зараховується як кредит. При даунгрейді різниця зараховується як кредит на майбутні платежі.' }, { title: 'Поновлення підписки', body: 'Автоматичні поновлення не підлягають поверненню, якщо послуга використовувалась. Скасуйте за 24 години до дати поновлення.' }, { title: 'Випадки без повернення', body: 'Порушення Умов використання, акаунт призупинений через зловживання, домени та SSL-сертифікати після реєстрації, запити після 14-денного терміну.' }, { title: 'Процес повернення', body: 'Напишіть на hostpro@apartner.pro. Обробляємо за 1 робочий день; кошти повертаються за 3–7 банківських днів.' }, { title: 'Кредити на акаунт', body: 'Замість повернення на картку можна обрати миттєвий кредит на акаунт.' }, { title: 'Суперечки', body: 'Якщо вважаєте відмову несправедливою: hostpro@apartner.pro' }] },
    notFound: { title: 'Сторінку не знайдено', sub: 'Здається, цієї сторінки не існує або вона була переміщена. Повернімось на потрібний шлях.', home: '← На головну', back: 'Назад' },
    cookies: { title: 'Ми використовуємо cookies', desc: 'Ми використовуємо необхідні cookies для роботи сайту та аналітичні cookies, щоб розуміти як ви ним користуєтесь.', acceptAll: 'Прийняти всі', acceptEssential: 'Лише необхідні', more: 'Конфіденційність' },
    wp: {
      meta: 'Керований WordPress хостинг — швидкий, безпечний та надійний. Оптимізовані сервери, автооновлення та стейджинг.',
      badge: '⚡ WordPress Optimized · автооновлення · стейджинг',
      title1: 'WordPress хостинг,',
      title2: 'який дійсно літає',
      sub: 'Все необхідне для легкого створення та масштабування вашого сайту на WordPress. Оптимізовано для максимальної швидкості.',
      features: [
        { icon: '🚀', title: 'Максимальна швидкість', desc: 'Попередньо налаштоване кешування LiteSpeed та NVMe SSD для миттєвого завантаження.' },
        { icon: '🔒', title: 'Безпека з коробки', desc: 'Автоматичний SSL, сканування на віруси та брандмауер (WAF) включені.' },
        { icon: '🔄', title: 'Автооновлення', desc: 'Підтримуйте ядро WordPress, теми та плагіни в актуальному стані автоматично.' },
        { icon: '🛠️', title: 'Стейджинг (Staging)', desc: 'Тестуйте зміни на клоні сайту перед публікацією в один клік.' },
      ],
      pricingSub: 'Спеціальні тарифи для WordPress з додатковими ресурсами.',
    },
    laravel: {
      meta: 'Високопродуктивний Laravel хостинг — оптимізовано для PHP 8+, Memcached та Git. SSH доступ та Composer.',
      badge: '🚀 Laravel Optimized · Git · Memcached · SSH',
      title1: 'Хостинг, створений для',
      title2: 'Laravel проєктів',
      sub: 'Ідеальне середовище для ваших Laravel проєктів. Висока швидкість, інструменти для розробників та миттєве розгортання.',
      features: [
        { icon: '🛠️', title: 'Оптимізація PHP 8.x', desc: 'Попередньо налаштовано для останніх версій PHP з OPcache та JIT.' },
        { icon: '💾', title: 'Memcached', desc: 'Надшвидке кешування в пам\'яті для сесій, черг та продуктивності.' },
        { icon: '🌿', title: 'Інтеграція з Git', desc: 'Деплой напряму з GitHub, GitLab або Bitbucket. Прості CI/CD процеси.' },
        { icon: '🔒', title: 'SSH та Composer', desc: 'Повний SSH доступ, Composer та Artisan команди вже встановлені.' },
      ],
      pricingSub: 'Масштабуйте свої додатки з виділеними ресурсами та максимальною швидкістю.',
    },
    php: {
      meta: 'Оптимізований PHP хостинг — кілька версій PHP, OPcache, Composer, SSH та NVMe SSD сховище.',
      badge: '🐘 PHP 8.x · OPcache · Composer · cPanel',
      title1: 'PHP хостинг для',
      title2: 'розробників',
      sub: 'Надшвидкий PHP хостинг з повним набором інструментів для розробників. Запускайте будь-який PHP фреймворк або CMS.',
      features: [
        { icon: '🐘', title: 'PHP 8.x готовий', desc: 'Перемикайтесь між версіями PHP (7.4, 8.0, 8.1, 8.2, 8.3) миттєво через cPanel без простоїв.' },
        { icon: '⚡', title: 'OPcache та JIT', desc: 'Попередньо ввімкнені OPcache та JIT для максимальної швидкості виконання PHP на кожному тарифі.' },
        { icon: '📦', title: 'Composer включений', desc: 'Composer попередньо встановлений на всіх акаунтах. Керуйте залежностями однією командою.' },
        { icon: '🔒', title: 'SSH доступ', desc: 'Повний SSH доступ для розширеного налаштування, скриптів та безпечного управління файлами.' },
      ],
      pricingSub: 'PHP-оптимізовані тарифи з підтримкою кількох версій та інструментами розробника.',
    },
    prestashop: {
      meta: 'Високопродуктивний PrestaShop хостинг — оптимізований стек, встановлення в 1 клік, SSL та щоденні бекапи.',
      badge: '🛒 PrestaShop Optimized · SSL · Backups · cPanel',
      title1: 'PrestaShop хостинг,',
      title2: 'що продає швидше',
      sub: 'Запустіть свій інтернет-магазин на сервері, оптимізованому для PrestaShop. Швидкість, безпека та масштабованість включені.',
      features: [
        { icon: '🛒', title: 'Встановлення в 1 клік', desc: 'Встановіть PrestaShop за секунди через Softaculous в cPanel. Технічні знання не потрібні.' },
        { icon: '⚡', title: 'Оптимізація швидкості', desc: 'LiteSpeed кеш та NVMe SSD забезпечують миттєве завантаження магазину та вищу конверсію.' },
        { icon: '🔒', title: 'Безпека з коробки', desc: 'Безкоштовний SSL, щоденні бекапи та сканування на шкідливе ПЗ захищають ваш магазин.' },
        { icon: '📈', title: 'Масштабування разом з вами', desc: 'Починайте з бюджетного тарифу та плавно переходьте на вищий по мірі зростання магазину.' },
      ],
      pricingSub: 'Тарифи для e-commerce з ресурсами, що потрібні вашому магазину PrestaShop.',
    },
    freeHosting: {
      meta: 'Безкоштовний хостинг для партнерів — приведіть клієнта та отримайте хостинг для свого сайту безкоштовно.',
      badge: '🎁 Партнерська програма · Free Hosting',
      title1: 'Безкоштовний хостинг',
      title2: 'для наших партнерів',
      sub: 'Залучіть хоча б одного клієнта на HostPro та отримайте безкоштовний хостинг для свого сайту як винагороду.',
      howItWorks: 'Як це працює',
      steps: [
        { icon: '🤝', title: 'Рекомендуйте нас', desc: 'Розкажіть друзям або клієнтам про HostPro та допоможіть їм обрати тариф.' },
        { icon: '💳', title: 'Клієнт замовляє', desc: 'Клієнт повинен придбати будь-який тариф хостингу на термін від 1 року.' },
        { icon: '🎁', title: 'Отримуйте бонус', desc: 'Після 14 днів користування сервісом клієнтом, ви отримуєте хостинг на той самий тариф і термін.' }
      ],
      termsTitle: 'Умови програми',
      terms: [
        'Клієнт має бути новим для HostPro.',
        'Хостинг має бути замовлений на термін від 1 року включно.',
        'Винагорода доступна після 14 днів користування хостингом приведеним клієнтом.',
        'Нагорода анулюється при поверненні коштів клієнтом протягом перших 14 днів.',
        'Тариф та термін безкоштовного хостингу відповідають замовленню клієнта.',
        'Ви отримуєте винагороду за кожного нового залученого клієнта.',
        'Умови користування безкоштовним хостингом ідентичні загальним умовам надання послуг.',
        'Рекомендувати самого себе (самореферал) заборонено.'
      ],
      formTitle: 'Заявка на отримання',
      form: {
        partnerName: 'Ваше ім\'я',
        partnerEmail: 'Ваш Email для зв\'язку',
        clientEmail: 'Email клієнта, якого ви привели',
        partnerDomain: 'Ваш домен (де запустити хостинг)',
        notes: 'Додаткові нотатки (необов\'язково)',
        submit: 'Надіслати заявку →',
        success: '✅ Заявку відправлено! Менеджер перевірить дані та зв\'яжеться з вами найближчим часом.',
        error: '❌ Щось пішло не так. Спробуйте ще раз або напишіть у підтримку.'
      }
    },
    freePhp: {
      meta: 'Безкоштовний Стартовий хостинг для некомерційних проектів — 6 місяців безкоштовно від HostPro.',
      title: 'Безкоштовний Стартовий хостинг',
      sub: 'Скористайтесь безкоштовним хостингом від HostPro протягом 6 місяців, без передплат та зобов\'язань.',
      whoCanGet: {
        title: 'Хто може отримати безкоштовний хостинг?',
        text: 'Це реальна пропозиція для розміщення сайтів некомерційних проектів. Наш проект HostPro може надати безкоштовні послуги хостингу для сайтів, що не мають за мету отримання прибутку від самого сайту чи з його допомогою, а також з певних поважних причин не можуть оплачувати стандартні послуги хостингу.',
        target: 'Послуги надаються як некомерційним організаціям (благодійним фондам, школам, університетам, громадським проектам), так і приватним особам, для підтримки некомерційних ініціатив та проектів, які стосуються зокрема наукової чи соціальної тематики (дослідженням, освіті та вихованню).',
      },
      whatIsIncluded: {
        title: 'Що включено у таку послугу?',
        text: 'В рамках даної безкоштовної послуги хостингу ви можете отримати послугу аналогічну тарифу "Personal" з панеллю керування хостингом cPanel. Ви можете в 1 клік встановити WordPress або будь-яку іншу систему, у Вас буде можливість використовувати власне доменне ім’я, зареєстроване раніше, а також ви можете отримати безкоштовно доменне ім’я в зоні *.apartner.pro.',
        domains: 'Якщо ви ще не маєте власного доменного імені, та не бажаєте використовувати домен в зоні *.apartner.pro – ми пропонуємо зареєструвати домен у нас в одній з багатьох доменних зон (на зразок, .com, .net, .org, .info, .biz, .com.ua, .in.ua, .kiev.ua та інші). Реєстрація доменного імені буде платною.',
      },
      conditions: {
        title: 'Умови надання безкоштовного хостингу',
        text1: 'Для отримання безкоштовного хостингу в першу чергу надішліть запит у вільній формі від некомерційної організації з проханням надати безкоштовний хостинг через форму контактів нижче.',
        text2: 'Приватним особам, які мають свої наукові або навчально-освітні проекти, можна також скористатися аналогічним способом, аби надіслати запит на надання безкоштовного хостингу.',
        text3: 'Опишіть в двох словах Ваш проект та причини, з яких Ви не можете використати платні послуги хостингу.',
      },
      application: {
        title: 'Заявка на безкоштовний хостинг',
        text: 'Після схвалення заявки вам буде відправлений промо-код, який необхідно ввести при замовленні послуги хостингу за тарифом "Personal", що дає 100% знижку на 6 місяців користування послугою.',
        form: {
          name: 'Ваше ім’я',
          email: 'Email',
          project: 'Опис Вашого проекту',
          submit: 'Надіслати заявку →',
          success: '✅ Заявка успішно надіслана! Ми зв\'яжемося з вами найближчим часом.',
          error: '❌ Помилка при відправці. Спробуйте пізніше або напишіть нам на email.',
        }
      },
      features: {
        title: 'Безкоштовний хостинг включає:',
        text: 'Умови та ресурси безкоштовно наданого хостингу нічим не відрізняються від умов платного тарифу: сайт буде розміщено на потужних серверах, гарантована професійна підтримка від нашої технічної служби, резервне копіювання, панель cPanel, безкоштовний SSL сертифікат та інші переваги.',
        notice: 'Зауважте, ми залишаємо за собою право відмовити в безкоштовному розміщенні без пояснення причин. Кількість безкоштовних тарифів обмежена.',
      },
      restrictions: {
        title: 'Обмеження',
        link: 'Послуга надається на умовах, описаних в публічній оферті (посилання)',
        list: [
          'Сайт не повинен розміщувати на своїх сторінках комерційну рекламу в будь-якому вигляді;',
          'Сайт не повинен розміщувати на своїх сторінках статті та посилання різних бірж (liex.ru, sape.ru та подібних);',
          'З хостинг-акаунту не повинно бути зроблено жодної СПАМ-розсилки;',
          'На перерахованих далі сторінках: на головній, «про проект» або «контакти», має бути розміщено логотип нашого проекту і згадка у вільній формі про те, що хостинг надано «HostPro» з посиланням на головну сторінку нашого сайту HostPro',
        ],
        footer: 'При порушенні будь-якого з перерахованих умов ми залишаємо за собою право на відмову від надання послуг без пояснень.',
        note: 'Ми щиро вболіваємо за людей, які вкладають свої сили, час і талант в розвиток суспільно корисних справ, освіти, науки, займаються благодійністю, тому з радістю надамо у користування описану послугу хостингу безкоштовно.',
      },
      benefits: [
        { icon: '💰', title: 'Дійсно хостинг за 0грн', desc: 'Користуйтесь безкоштовно. Усе прозоро, без прихованих умов.' },
        { icon: '🛡️', title: 'Антивірусна перевірка', desc: 'Регулярно перевіряємо ваші файли антивірусом і сповіщаємо за потреби' },
        { icon: '🔒', title: 'SSL безкоштовно', desc: 'Безкоштовний сертифікат для усіх ваших сайтів та піддоменів' },
        { icon: '⚙️', title: 'PHP на вибір', desc: 'В пару кліків змінюйте версію PHP. Вам доступні на вибір версії 5.x - 8.x' }
      ],
      promo: {
        title: 'Скористайтесь акційними умовами',
        text1: 'Ви також можете скористатися нашими акційними пропозиціями, аби придбати послуги на дуже вигідних умовах і скасувати обмеження щодо реклами на сторінках сайту та посилань на наш проект.',
        text2: 'Ми регулярно проводимо акції та розпродажі, пропонуємо безкоштовні домени разом з послугами хостингу та низькі ціни на хостинг в рамках спеціальних пропозицій.',
        text3: 'Ми маємо також 30-денну гарантію повернення грошей - це наш спосіб забезпечити повне задоволення від наших послуг. Перегляньте акції на хостинг та оберіть свою.',
      },
      uniqueDomain: {
        title: 'Унікальний домен для Вашого сайту',
        text: "Отримай безкоштовно\n✅ .pp.ua — безкоштовно до будь-якого замовлення!\n✅ .com.ua — у подарунок при оплаті за рік (від тарифу Starter).",
      },
      faq: {
        title: 'Питання та відповіді про безкоштовний хостинг',
        sub: 'Ми віримо, що якість - це основна складова будь-яких послуг. Саме тому ми пропонуємо Хостинг у оптимізованому технічному середовищі, ідеальному для встановлення WordPress або інших систем.',
        items: [
          { q: 'Чи є тестовий хостинг, які обмеження?', a: 'Так, ми надаємо безкоштовний тестовий період. Під час тестування можуть бути обмеження на відправку пошти.' },
          { q: 'Чи підходить цей хостинг для WordPress?', a: 'Абсолютно. Наші сервери оптимізовані для швидкої роботи PHP та баз даних.' },
          { q: 'Чи є якісь додаткові оптимізації?', a: 'Так, ми використовуємо LiteSpeed та NVMe SSD накопичувачі для максимальної швидкості.' },
          { q: 'SSL сертифікат надається?', a: 'Так, ми надаємо безкоштовні сертифікати Let\'s Encrypt.' },
          { q: 'Яке програмне забезпечення використовується?', a: 'Ми використовуємо CloudLinux, LiteSpeed, cPanel та Softaculous.' },
          { q: 'Чи можна змінити PHP, які версії PHP достуні?', a: 'Звісно. Ви можете обрати версії від 5.x до 8.x безпосередньо у cPanel.' },
          { q: 'Що я можу розмістити на сайті?', a: 'Будь-який законний контент для некомерційних цілей, що не містить реклами.' }
        ]
      },
      interlink: {
        title: 'Шукаєте хостинг саме для WordPress?',
        desc: 'Дізнайтесь про нашу спеціальну пропозицію для соціальних та волонтерських проектів, створених на базі WordPress.',
        btn: 'Безкоштовний WordPress хостинг →',
        href: '/free-wordpress-hosting'
      },
      upgrade: {
        title: 'Потрібно більше ресурсів?',
        desc: 'Якщо ваш проект зростає і безкоштовного тарифу вже не вистачає — перейдіть на платний план та зніміть усі обмеження. Від $1.99/місяць.',
        btn: 'Переглянути платні тарифи →',
        href: '/#pricing'
      }
    },
    freePersonal: {
      meta: 'Безкоштовний Personal хостинг для некомерційних проектів — 6 місяців безкоштовно від HostPro.',
      title: 'Безкоштовний Personal хостинг',
      sub: 'Скористайтесь безкоштовним хостингом від HostPro протягом 6 місяців, без передплат та зобов\'язань.',
      whoCanGet: {
        title: 'Хто може отримати безкоштовний хостинг?',
        text: 'Це реальна пропозиція для розміщення сайтів некомерційних проектів. Наш проект HostPro може надати безкоштовні послуги хостингу для сайтів, що не мають за мету отримання прибутку від самого сайту чи з його допомогою, а також з певних поважних причин не можуть оплачувати стандартні послуги хостингу.',
        target: 'Послуги надаються як некомерційним організаціям (благодійним фондам, школам, університетам, громадським проектам), так і приватним особам, для підтримки некомерційних ініціатив та проектів, які стосуються зокрема наукової чи соціальної тематики (дослідженням, освіті та вихованню).',
      },
      whatIsIncluded: {
        title: 'Що включено у таку послугу?',
        text: 'В рамках даної безкоштовної послуги хостингу ви можете отримати послугу аналогічну тарифу "Personal" з панеллю керування хостингом cPanel. Ви можете в 1 клік встановити WordPress або будь-яку іншу систему, у Вас буде можливість використовувати власне доменне ім’я, зареєстроване раніше, а також ви можете отримати безкоштовно доменне ім’я в зоні *.apartner.pro.',
        domains: 'Якщо ви ще не маєте власного доменного імені, та не бажаєте використовувати домен в зоні *.apartner.pro – ми пропонуємо зареєструвати домен у нас в одній з багатьох доменних зон (на зразок, .com, .net, .org, .info, .biz, .com.ua, .in.ua, .kiev.ua та інші). Реєстрація доменного імені буде платною.',
      },
      conditions: {
        title: 'Умови надання безкоштовного хостингу',
        text1: 'Для отримання безкоштовного хостингу в першу чергу надішліть запит у вільній формі від некомерційної організації з проханням надати безкоштовний хостинг через форму контактів нижче.',
        text2: 'Приватним особам, які мають свої наукові або навчально-освітні проекти, можна також скористатися аналогічним способом, аби надіслати запит на надання безкоштовного хостингу.',
        text3: 'Опишіть в двох словах Ваш проект та причини, з яких Ви не можете використати платні послуги хостингу.',
      },
      application: {
        title: 'Заявка на безкоштовний хостинг',
        text: 'Після схвалення заявки вам буде відправлений промо-код, який необхідно ввести при замовленні послуги хостингу за тарифом "Personal", що дає 100% знижку на 6 місяців користування послугою.',
        form: {
          name: 'Ваше ім’я',
          email: 'Email',
          project: 'Опис Вашого проекту',
          submit: 'Надіслати заявку →',
          success: '✅ Заявка успішно надіслана! Ми зв\'яжемося з вами найближчим часом.',
          error: '❌ Помилка при відправці. Спробуйте пізніше або напишіть нам на email.',
        }
      },
      features: {
        title: 'Безкоштовний хостинг включає:',
        text: 'Умови та ресурси безкоштовно наданого хостингу нічим не відрізняються від умов платного тарифу: сайт буде розміщено на потужних серверах, гарантована професійна підтримка від нашої технічної служби, резервне копіювання, панель cPanel, безкоштовний SSL сертифікат та інші переваги.',
        notice: 'Зауважте, ми залишаємо за собою право відмовити в безкоштовному розміщенні без пояснення причин. Кількість безкоштовних тарифів обмежена.',
      },
      restrictions: {
        title: 'Обмеження',
        link: 'Послуга надається на умовах, описаних в публічній оферті (посилання)',
        list: [
          'Сайт не повинен розміщувати на своїх сторінках комерційну рекламу в будь-якому вигляді;',
          'Сайт не повинен розміщувати на своїх сторінках статті та посилання різних бірж (liex.ru, sape.ru та подібних);',
          'З хостинг-акаунту не повинно бути зроблено жодної СПАМ-розсилки;',
          'На перерахованих далі сторінках: на головній, «про проект» або «контакти», має бути розміщено логотип нашого проекту і згадка у вільній формі про те, що хостинг надано «HostPro» з посиланням на головну сторінку нашого сайту HostPro',
        ],
        footer: 'При порушенні будь-якого з перерахованих умов ми залишаємо за собою право на відмову від надання послуг без пояснень.',
        note: 'Ми щиро вболіваємо за людей, які вкладають свої сили, час і талант в розвиток суспільно корисних справ, освіти, науки, займаються благодійністю, тому з радістю надамо у користування описану послугу хостингу безкоштовно.',
      },
      benefits: [
        { icon: '💰', title: 'Дійсно хостинг за 0грн', desc: 'Користуйтесь безкоштовно. Усе прозоро, без прихованих умов.' },
        { icon: '🛡️', title: 'Антивірусна перевірка', desc: 'Регулярно перевіряємо ваші файли антивірусом і сповіщаємо за потреби' },
        { icon: '🔒', title: 'SSL безкоштовно', desc: 'Безкоштовний сертифікат для усіх ваших сайтів та піддоменів' },
        { icon: '⚙️', title: 'Personal на вибір', desc: 'В пару кліків змінюйте версію Personal. Вам доступні на вибір версії 5.x - 8.x' }
      ],
      promo: {
        title: 'Скористайтесь акційними умовами',
        text1: 'Ви також можете скористатися нашими акційними пропозиціями, аби придбати послуги на дуже вигідних умовах і скасувати обмеження щодо реклами на сторінках сайту та посилань на наш проект.',
        text2: 'Ми регулярно проводимо акції та розпродажі, пропонуємо безкоштовні домени разом з послугами хостингу та низькі ціни на хостинг в рамках спеціальних пропозицій.',
        text3: 'Ми маємо також 30-денну гарантію повернення грошей - це наш спосіб забезпечити повне задоволення від наших послуг. Перегляньте акції на хостинг та оберіть свою.',
      },
      uniqueDomain: {
        title: 'Унікальний домен для Вашого сайту',
        text: "Отримай безкоштовно\n✅ .pp.ua — безкоштовно до будь-якого замовлення!\n✅ .com.ua — у подарунок при оплаті за рік (від тарифу Starter).",
      },
      faq: {
        title: 'Питання та відповіді про безкоштовний хостинг',
        sub: 'Ми віримо, що якість - це основна складова будь-яких послуг. Саме тому ми пропонуємо Хостинг у оптимізованому технічному середовищі, ідеальному для встановлення WordPress або інших систем.',
        items: [
          { q: 'Чи є тестовий хостинг, які обмеження?', a: 'Так, ми надаємо безкоштовний тестовий період. Під час тестування можуть бути обмеження на відправку пошти.' },
          { q: 'Чи підходить цей хостинг для WordPress?', a: 'Абсолютно. Наші сервери оптимізовані для швидкої роботи Personal та баз даних.' },
          { q: 'Чи є якісь додаткові оптимізації?', a: 'Так, ми використовуємо LiteSpeed та NVMe SSD накопичувачі для максимальної швидкості.' },
          { q: 'SSL сертифікат надається?', a: 'Так, ми надаємо безкоштовні сертифікати Let\'s Encrypt.' },
          { q: 'Яке програмне забезпечення використовується?', a: 'Ми використовуємо CloudLinux, LiteSpeed, cPanel та Softaculous.' },
          { q: 'Чи можна змінити Personal, які версії Personal достуні?', a: 'Звісно. Ви можете обрати версії від 5.x до 8.x безпосередньо у cPanel.' },
          { q: 'Що я можу розмістити на сайті?', a: 'Будь-який законний контент для некомерційних цілей, що не містить реклами.' }
        ]
      },
      interlink: {
        title: 'Шукаєте хостинг саме для WordPress?',
        desc: 'Дізнайтесь про нашу спеціальну пропозицію для соціальних та волонтерських проектів, створених на базі WordPress.',
        btn: 'Безкоштовний WordPress хостинг →',
        href: '/free-wordpress-hosting'
      },
      upgrade: {
        title: 'Потрібно більше ресурсів?',
        desc: 'Якщо ваш проект зростає і безкоштовного тарифу вже не вистачає — перейдіть на платний план та зніміть усі обмеження. Від $1.99/місяць.',
        btn: 'Переглянути платні тарифи →',
        href: '/#pricing'
      }
    },
    freeWp: {
      meta: 'Безкоштовний WordPress хостинг для соціальних і благодійних організацій. Отримайте 6 місяців без оплати від HostPro.',
      title: 'Безкоштовний WordPress хостинг',
      sub: 'Запустіть свій благодійний чи соціальний проект на WordPress безкоштовно на 6 місяців.',
      whoCanGet: {
        title: 'Для кого доступний безкоштовний WP-хостинг?',
        text: 'Це унікальна можливість розмістити сайти, створені на базі WordPress, для некомерційних ініціатив. HostPro надає спеціальні умови для проектів, які не мають комерційної вигоди та потребують якісного технічного майданчика для своєї діяльності.',
        target: 'Ми підтримуємо благодійні фонди, навчальні заклади (школи, університети), громадські та волонтерські організації, а також індивідуальні наукові та соціально значущі ініціативи.',
      },
      whatIsIncluded: {
        title: 'Технічні можливості та встановлення WordPress',
        text: 'Ви отримуєте повноцінний доступ до тарифу "Personal" з інтуїтивною панеллю cPanel. Завдяки вбудованому інсталятору Softaculous, ви можете встановити WordPress або іншу CMS в 1 клік. Можна прив\'язати власний домен або безкоштовно отримати субдомен формату *.apartner.pro.',
        domains: 'Також у вас є змога придбати та зареєструвати унікальне доменне ім\'я у нас (наприклад, .com.ua, .org.ua, .net) за стандартними тарифами реєстрації, якщо вас не влаштовує безкоштовний варіант *.apartner.pro.',
      },
      conditions: {
        title: 'Як отримати безкоштовний WordPress хостинг?',
        text1: 'Офіційним організаціям достатньо заповнити форму заявки нижче, коротко описавши суть та цілі вашого некомерційного проекту.',
        text2: 'Якщо ви приватна особа і ведете волонтерський, науковий або освітній блог на WordPress, ви також маєте право на безкоштовне розміщення.',
        text3: 'Головне — чітко поясніть мету проекту та чому вам необхідна технічна підтримка на безоплатній основі.',
      },
      application: {
        title: 'Запит на безкоштовний хостинг',
        text: 'Після швидкої перевірки вашої заявки менеджером, ми надішлемо вам унікальний промо-код. Використайте його при замовленні тарифу "Personal", щоб отримати 100% знижку на півроку.',
        form: {
          name: 'ПІБ або Назва організації',
          email: 'Контактний Email',
          project: 'Деталі проекту (чому обрали WordPress?)',
          submit: 'Відправити запит →',
          success: '✅ Ваш запит успішно отримано! Очікуйте на лист від нашої команди.',
          error: '❌ Виникла технічна помилка. Будь ласка, спробуйте пізніше.',
        }
      },
      features: {
        title: 'Переваги нашого WP-хостингу:',
        text: 'Наш безкоштовний тариф не є урізаною версією. Ваш WordPress-сайт працюватиме на швидких серверах з NVMe-накопичувачами, ви отримаєте цілодобову технічну підтримку, автоматичні бекапи, cPanel та безкоштовний SSL сертифікат.',
        notice: 'HostPro залишає за собою право відмовити в участі у програмі без пояснення причин, якщо проект порушує правила. Кількість безкоштовних тарифів обмежена.',
      },
      restrictions: {
        title: 'Правила користування',
        link: 'Розміщення регулюється загальним договором-офертою з наступними доповненнями:',
        list: [
          'Заборонено розміщувати будь-яку комерційну рекламу, банери або платні посилання;',
          'Заборонено участь у біржах посилань (sape.ru, liex та аналогах);',
          'Сувора заборона на розсилку спаму або масових несанкціонованих email-розсилок;',
          'На головній сторінці або сторінці "Контакти/Про нас" обов\'язково має бути вказано, що сайт працює на хостингу від HostPro з активним посиланням.',
        ],
        footer: 'У разі недотримання цих простих правил, надання послуги може бути припинено.',
        note: 'Ми глибоко поважаємо роботу волонтерів, науковців та громадських діячів. Ця пропозиція створена для того, щоб ваш голос був почутий в інтернеті без зайвих витрат.',
      },
      benefits: [
        { icon: '🚀', title: 'Швидкий WordPress', desc: 'Сервери налаштовані спеціально для швидкої роботи PHP та баз даних.' },
        { icon: '🛡️', title: 'Захист від зломів', desc: 'Автоматичне блокування шкідливих ботів та перевірка файлів антивірусом.' },
        { icon: '🔒', title: 'SSL за 1 клік', desc: 'Безпечне з\'єднання HTTPS для всіх ваших доменів та піддоменів безкоштовно.' },
        { icon: '🛠️', title: 'Зручна cPanel', desc: 'Керуйте файлами, поштою та базами даних через найзручнішу панель.' }
      ],
      promo: {
        title: 'Комерційні проекти та знижки',
        text1: 'Якщо ваш проект має комерційну складову (продаж товарів, реклама), ця безкоштовна пропозиція вам не підійде. Однак, ви можете обрати стандартний платний тариф.',
        text2: 'Ми регулярно надаємо знижки до 30% на довгострокові оплати та часто даруємо доменне ім\'я у подарунок при оплаті на рік.',
        text3: 'Крім того, діє 30-денна гарантія повернення коштів. Ваші інвестиції захищені.',
      },
      uniqueDomain: {
        title: 'Домен у подарунок (для комерційних)',
        text: "Отримай безкоштовно\n✅ .pp.ua — безкоштовно до будь-якого замовлення!\n✅ .com.ua — у подарунок при оплаті за рік (від тарифу Starter).",
      },
      faq: {
        title: 'FAQ: Безкоштовний WordPress хостинг',
        sub: 'Відповіді на часті запитання щодо розгортання соціальних та благодійних проектів.',
        items: [
          { q: 'Які ресурси виділяються для безкоштовного WordPress?', a: 'Ви отримуєте повноцінний тариф "Personal" з 1 ГБ простору на надшвидких NVMe SSD дисках та можливістю розміщення 1 сайту.' },
          { q: 'Чи можу я встановити іншу CMS замість WordPress?', a: 'Звісно. Хоча цей тариф оптимізовано для WordPress, ви можете встановити будь-яку іншу систему через Softaculous або вручну.' },
          { q: 'Як швидко активується безкоштовний хостинг?', a: 'Після ручної перевірки вашої заявки (зазвичай 1-2 робочих дні) ви отримаєте промо-код для миттєвої активації.' },
          { q: 'Чи входить у тариф безкоштовний SSL?', a: 'Так, кожен ваш домен і піддомен автоматично отримує безкоштовний сертифікат Let\'s Encrypt.' },
          { q: 'Як налаштувати пошту зі своїм доменом?', a: 'Ви можете створити поштові скриньки прямо в cPanel і користуватись ними через веб-інтерфейс або підключити до Gmail/Outlook.' },
          { q: 'Які версії PHP підтримуються для WordPress?', a: 'Ми підтримуємо всі актуальні версії, включаючи PHP 7.4, 8.0, 8.1, 8.2 та 8.3.' },
          { q: 'Що робити після закінчення 6 безкоштовних місяців?', a: 'Ви зможете продовжити використання за стандартною ціною тарифу "Personal" або подати нову заявку на розгляд.' }
        ]
      },
      interlink: {
        title: 'Потрібен хостинг для іншої CMS?',
        desc: 'Розгляньте наш Безкоштовний PHP хостинг, який ідеально підійде для будь-яких некомерційних проектів.',
        btn: 'Безкоштовний PHP хостинг →',
        href: '/free-php-hosting'
      },
      upgrade: {
        title: 'Потрібно більше ресурсів?',
        desc: 'Якщо ваш сайт на WordPress виріс і безкоштовного тарифу вже не вистачає — перейдіть на платний план та зніміть усі обмеження. Від $1.99/місяць.',
        btn: 'Переглянути платні тарифи →',
        href: '/#pricing'
      }
    },
    freeHostingHub: {
      title: 'Оберіть програму безкоштовного хостингу',
      sub: 'HostPro пропонує декілька варіантів безкоштовного розміщення для різних потреб. Оберіть той, що підходить вам найбільше.',
      php: {
        title: 'PHP хостинг для НКО',
        desc: '6 місяців безкоштовного хостингу для соціальних проектів. cPanel, PHP, будь-яка CMS.',
        btn: 'Деталі PHP тарифу →'
      },
      personal: {
        title: 'Personal хостинг для проектів',
        desc: '6 місяців безкоштовного хостингу для персональних проектів. cPanel, PHP, будь-яка CMS.',
        btn: 'Деталі Personal тарифу →'
      },
      wp: {
        title: 'WordPress хостинг для НКО',
        desc: 'Оптимізований WP-хостинг на 6 місяців для благодійних фондів та волонтерів. 1-click install.',
        btn: 'Деталі WordPress хостингу →'
      },
      partner: {
        title: 'Партнерська програма',
        desc: 'Приведіть одного клієнта та отримайте такий самий хостинг для себе абсолютно безкоштовно.',
        btn: 'Як стати партнером →'
      },
      seo: {
        title: 'Чому варто обрати наш безкоштовний хостинг?',
        text: 'HostPro пропонує надійний та швидкий безкоштовний хостинг для соціальних, благодійних та некомерційних проектів. Ми віримо, що хороші ініціативи заслуговують на підтримку, тому надаємо високоякісні SSD сервери, cPanel та безкоштовний SSL без прихованих платежів. Оберіть тариф, який найкраще підходить для ваших потреб, будь то WordPress, звичайний PHP хостинг або персональний проект, і починайте роботу вже сьогодні.'
      }
    },
    kb: {
      meta: 'База знань — інструкції, посібники та відповіді на питання про хостинг.',
      title: 'База знань',
      sub: 'Шукайте відповіді у нашій бібліотеці інструкцій.',
      searchPh: 'Шукати статті...',
      helpful: 'Чи була ця стаття корисною?',
      yes: 'Так',
      no: 'Ні',
      supportTitle: 'Все ще потрібна допомога?',
      supportSub: 'Наша команда підтримки доступна 24/7, щоб допомогти вам з будь-якими питаннями.',
      supportBtn: 'Зв’язатися з підтримкою',
      backToKb: '← Назад до бази знань',
      articleCount: 'статей', articleSingular: 'Стаття',
      categories: [
        { title: 'З чого почати', count: 12, icon: '🚀', slug: 'getting-started' },
        { title: 'cPanel та хостинг', count: 24, icon: '📋', slug: 'cpanel' },
        { title: 'Домени та DNS', count: 15, icon: '🌐', slug: 'dns' },
        { title: 'Налаштування пошти', count: 18, icon: '📧', slug: 'email' },
        { title: 'WordPress інструкції', count: 21, icon: '📝', slug: 'wordpress' },
        { title: 'Безпека та SSL', count: 10, icon: '🔒', slug: 'security' },
      ],
      popular: 'Популярні статті',
      popularItems: [
        { title: 'Як увійти в cPanel', slug: 'how-to-login-to-cpanel', cat: 'cPanel та хостинг' },
        { title: 'Як змінити DNS сервери', slug: 'changing-your-nameservers', cat: 'Домени та DNS' },
        { title: 'Налаштування пошти на iPhone', slug: 'setting-up-email-on-iphone', cat: 'Налаштування пошти' },
        { title: 'Встановлення WordPress через Softaculous', slug: 'installing-wordpress-via-softaculous', cat: 'WordPress інструкції' },
        { title: 'Оптимізація WordPress за допомогою LiteSpeed Cache', slug: 'wordpress-optimization-litespeed', cat: 'WordPress інструкції' },
      ],
      articles: [
        {
          slug: 'installing-wordpress-via-softaculous',
          title: 'Встановлення WordPress через Softaculous',
          cat: 'WordPress інструкції',
          content: `<p>Softaculous — це потужний автоінсталятор, який дозволяє встановити WordPress всього за кілька кліків. Ось покрокова інструкція:</p>
<ol>
  <li><strong>Увійдіть у свій акаунт cPanel.</strong> Зазвичай це можна зробити за адресою yourdomain.com/cpanel.</li>
  <li>Прокрутіть вниз до розділу <strong>"Програмне забезпечення"</strong> та натисніть <strong>"Softaculous Apps Installer"</strong>.</li>
  <li>В інтерфейсі Softaculous знайдіть <strong>WordPress</strong> і натисніть кнопку <strong>"Install" (Встановити)</strong>.</li>
  <li>Оберіть <strong>"Quick Install"</strong> або <strong>"Custom Install"</strong>. Ми рекомендуємо Custom Install для більшого контролю.</li>
  <li><strong>Налаштування ПЗ:</strong>
    <ul>
      <li>Оберіть протокол (рекомендується https://).</li>
      <li>Оберіть ваш домен.</li>
      <li>В полі "Directory" (Директорія): залиште порожнім, якщо хочете встановити WordPress в корінь сайту.</li>
    </ul>
  </li>
  <li><strong>Налаштування сайту:</strong> Введіть назву сайту та його опис.</li>
  <li><strong>Акаунт адміністратора:</strong> Створіть надійне ім'я користувача та пароль. <em>Не використовуйте "admin" як логін з міркувань безпеки.</em></li>
  <li>Прокрутіть вниз і натисніть <strong>"Install" (Встановити)</strong>.</li>
</ol>
<p>Зачекайте завершення встановлення. Після завершення ви отримаєте посилання на ваш сайт та панель керування (/wp-admin).</p>`
        },
        {
          slug: 'wordpress-optimization-litespeed',
          title: 'Оптимізація WordPress за допомогою LiteSpeed Cache',
          cat: 'WordPress інструкції',
          content: `<p>LiteSpeed Cache (LSCache) — це високоефективний плагін кешування, створений спеціально для веб-сервера LiteSpeed, який використовується в HostPro. Ось як його налаштувати:</p>
<ol>
  <li><strong>Встановіть плагін:</strong> Увійдіть в адмін-панель WordPress, перейдіть у розділ <strong>Плагіни > Додати новий</strong>, знайдіть "LiteSpeed Cache". Встановіть та активуйте його.</li>
  <li><strong>Пресети (Presets):</strong> Ми рекомендуємо почати з готового налаштування. Перейдіть у <strong>LiteSpeed Cache > Presets</strong> і оберіть "Advanced (Recommended)". Натисніть <strong>Apply Preset</strong>.</li>
  <li><strong>Оптимізація зображень:</strong> Перейдіть у <strong>LiteSpeed Cache > Image Optimization</strong>. Натисніть "Gather Image Data", а потім "Send Optimization Request". Це стисне ваші зображення без втрати якості.</li>
  <li><strong>Мініфікація:</strong> У розділі <strong>Page Optimization > CSS Settings</strong> увімкніть "CSS Minify". Зробіть те саме для JS та HTML у відповідних вкладках.</li>
  <li><strong>CDN:</strong> Якщо ви використовуєте Cloudflare або QUIC.cloud, ви можете налаштувати їх у вкладці <strong>CDN</strong> для ще кращої глобальної продуктивності.</li>
</ol>
<p>Після застосування цих налаштувань ваш сайт працюватиме значно швидше. Перевірити результат можна за допомогою PageSpeed Insights або GTmetrix.</p>`
        },
        {
          slug: 'changing-php-version-cpanel',
          title: 'Як змінити версію PHP у cPanel',
          cat: 'WordPress інструкції',
          content: `<p>Різні версії WordPress та його плагінів можуть потребувати різних версій PHP. Ось як змінити її:</p>
<ol>
  <li><strong>Увійдіть у cPanel.</strong></li>
  <li>У розділі <strong>"Програмне забезпечення"</strong> натисніть на <strong>"Select PHP Version"</strong>.</li>
  <li>Ви побачите поточну версію PHP. Натисніть на номер версії, щоб відкрити спадне меню.</li>
  <li>Оберіть потрібну версію (наприклад, PHP 8.1 або 8.2) та натисніть <strong>"Set as current"</strong>.</li>
  <li>Перевірте свій сайт, щоб переконатися, що все працює правильно.</li>
</ol>
<p>Якщо після зміни версії ви помітили помилки, ви завжди можете повернутися до попередньої версії в тому ж меню.</p>`
        },
        {
          slug: 'reset-wordpress-password-phpmyadmin',
          title: 'Скидання пароля WordPress через phpMyAdmin',
          cat: 'WordPress інструкції',
          content: `<p>Якщо ви втратили доступ до пошти адміністратора і не можете скинути пароль звичайним способом, це можна зробити безпосередньо в базі даних:</p>
<ol>
  <li>Увійдіть у <strong>cPanel</strong> і відкрийте <strong>phpMyAdmin</strong>.</li>
  <li>Оберіть вашу базу даних WordPress у лівій колонці.</li>
  <li>Знайдіть таблицю з назвою <code>wp_users</code> (префікс може відрізнятися, наприклад, <code>wp123_users</code>).</li>
  <li>Натисніть <strong>Edit (Редактировать)</strong> поруч із вашим записом адміністратора.</li>
  <li>Знайдіть поле <code>user_pass</code>. У колонці <strong>Function</strong> оберіть <strong>MD5</strong>.</li>
  <li>У колонці <strong>Value</strong> введіть свій новий пароль.</li>
  <li>Натисніть <strong>Go (Вперед)</strong> внизу сторінки.</li>
</ol>
<p>Тепер ви можете увійти в WordPress з новим паролем.</p>`
        },
        {
          slug: 'fix-wordpress-database-connection-error',
          title: 'Виправлення помилки "Error Establishing a Database Connection"',
          cat: 'WordPress інструкції',
          content: `<p>Ця помилка виникає, коли WordPress не може підключитися до бази даних. Ось як це виправити:</p>
<ol>
  <li><strong>Перевірте wp-config.php:</strong> Відкрийте File Manager у cPanel і знайдіть файл <code>wp-config.php</code> у корені сайту.</li>
  <li>Переконайтеся, що параметри <code>DB_NAME</code>, <code>DB_USER</code>, <code>DB_PASSWORD</code> та <code>DB_HOST</code> вказані правильно.</li>
  <li><strong>Перевірте користувача бази даних:</strong> У cPanel > MySQL Databases переконайтеся, що користувач доданий до бази з усіма правами (All Privileges).</li>
  <li><strong>Відновлення бази даних:</strong> Додайте рядок <code>define('WP_ALLOW_REPAIR', true);</code> у <code>wp-config.php</code>, потім перейдіть за адресою <code>vash-domen.com/wp-admin/maint/repair.php</code>.</li>
</ol>
<p>Не забудьте видалити рядок відновлення з <code>wp-config.php</code> після завершення робіт!</p>`
        },
        {
          slug: 'wordpress-white-screen-of-death',
          title: 'Як виправити "Білий екран смерті" у WordPress',
          cat: 'WordPress інструкції',
          content: `<p>"Білий екран смерті" (WSoD) зазвичай викликаний конфліктом плагінів або тем, або обмеженням пам'яті. Ось як це виправити:</p>
<ol>
  <li><strong>Увімкніть режим налагодження:</strong> Відредагуйте <code>wp-config.php</code> і змініть <code>define('WP_DEBUG', false);</code> на <code>true</code>. Це покаже реальну помилку.</li>
  <li><strong>Деактивуйте всі плагіни:</strong> Якщо немає доступу до адмінки, перейменуйте папку <code>wp-content/plugins</code> на <code>plugins_old</code> через File Manager. Якщо сайт запрацював, поверніть назву назад і вимикайте плагіни по одному.</li>
  <li><strong>Перемкніться на стандартну тему:</strong> Перейменуйте папку вашої активної теми у <code>wp-content/themes</code>. WordPress автоматично активує стандартну тему.</li>
  <li><strong>Збільште ліміт пам'яті:</strong> Додайте <code>define('WP_MEMORY_LIMIT', '256M');</code> у <code>wp-config.php</code>.</li>
</ol>
<p>Якщо нічого не допомогло, перевірте <strong>Error Log</strong> у вашій cPanel для детальної інформації.</p>`
        },
        {
          slug: 'wordpress-staging-guide',
          title: 'Як використовувати Стейджинг (Staging) WordPress',
          cat: 'WordPress інструкції',
          content: `<p>Стейджинг дозволяє тестувати зміни на клоні сайту перед їх публікацією. У HostPro це легко робиться через Softaculous:</p>
<ol>
  <li>Увійдіть у <strong>cPanel</strong> і відкрийте <strong>Softaculous</strong>.</li>
  <li>Натисніть на іконку <strong>Installations</strong> (вгорі праворуч).</li>
  <li>Знайдіть вашу установку WordPress і натисніть іконку <strong>"Create Staging"</strong> (схожа на два аркуші).</li>
  <li>Оберіть URL для стейджингу (наприклад, <code>staging.yourdomain.com</code>).</li>
  <li>Натисніть <strong>"Create Staging"</strong>.</li>
  <li>Робіть зміни на тестовому сайті. Коли все буде готово, поверніться в Softaculous і натисніть <strong>"Push to Live"</strong> поруч із цією установкою.</li>
</ol>
<p>Це гарантує стабільну роботу основного сайту, поки ви експериментуєте з новим дизайном чи функціями.</p>`
        }
      ],
    },
    blog: {
        meta: 'Блог HostPro — корисні статті про хостинг, безпеку та продуктивність.',
        title: 'Наш блог',
        sub: 'Поради експертів та інсайти індустрії, які допоможуть вашому бізнесу зростати.',
        readMore: 'Читати далі →',
        backToBlog: '← Назад до блогу',
        publishedAt: 'Опубліковано',
        helpful: 'Чи була ця стаття корисною?',
        yes: 'Так',
        no: 'Ні',
        posts: [
          {
            slug: 'why-nvme-ssd-hosting-matters',
            title: 'Чому NVMe SSD хостинг — це прорив для вашого сайту',
            desc: 'Дізнайтеся, як сховище нового покоління може покращити SEO та користувацький досвід.',
            image: '/blog/nvme-speed.jpg',
            date: '1 травня 2025',
            content: `
            <p>У світі веб-хостингу швидкість — це не розкіш, а критичний фактор успіху. Google давно підтвердив, що швидкість завантаження сторінки є фактором ранжування. Саме тут на допомогу приходить NVMe SSD хостинг.</p>
            <h3>Що таке NVMe?</h3>
          <p>NVMe (Non-Volatile Memory Express) — це протокол передачі даних, розроблений спеціально для швидкої флеш-пам'яті. На відміну від традиційних SSD, швидкість NVMe може перевищувати 3500 МБ/с.</p>
            <h3>Ваші переваги:</h3>
            <ul>
              <li><strong>Миттєве завантаження:</strong> Запити до бази даних та доступ до файлів відбуваються майже миттєво.</li>
              <li><strong>Краще SEO:</strong> Пошукові системи надають перевагу швидким сайтам.</li>
              <li><strong>Вища конверсія:</strong> Користувачі не люблять чекати — швидкий сайт утримує клієнтів.</li>
            </ul>
            <p>В HostPro ми використовуємо NVMe SSD на всіх тарифах, тому що віримо: кожен сайт заслуговує на найкращу продуктивність.</p>
          `
          },
          {
            slug: 'how-to-choose-hosting-plan',
            title: '5 порад, як обрати найкращий тариф для вашого бізнесу',
            desc: 'Уникайте поширених помилок та обирайте план, який буде зростати разом з вами.',
            image: '/blog/hosting-plan.jpg',
            date: '28 квітня 2025',
            content: `
            <p>Вибір хостингу може бути складним. Ось 5 порад, які допоможуть вам не помилитися:</p>
            <ol>
              <li><strong>Оцініть трафік:</strong> Для старту підійдуть тарифи Personal або Starter. Для великих проектів — Business або Agency.</li>
              <li><strong>Технічні вимоги:</strong> Вам потрібен Node.js, Python чи специфічна версія PHP? HostPro підтримує все це.</li>
              <li><strong>Можливість масштабування:</strong> Ваш хостинг повинен дозволяти миттєвий перехід на вищий тариф без простоїв.</li>
              <li><strong>Безпека понад усе:</strong> Переконайтеся, що SSL та бекапи вже включені у вартість.</li>
              <li><strong>Якість підтримки:</strong> Доступність 24/7 є критичною, коли виникають питання.</li>
            </ol>
            <p>Пам'ятайте, найдешевший варіант — не завжди найкращий. Обирайте надійність та швидкість.</p>
          `
          },
          {
            slug: 'securing-website-2025',
            title: 'Безпека сайту у 2025 році: практичний посібник',
            desc: 'Як вбудовані функції безпеки HostPro захищають ваш бренд від сучасних загроз.',
            image: '/blog/security-guide.jpg',
            date: '25 квітня 2025',
            content: `
            <p>Кіберзагрози еволюціонують щодня. У 2025 році простого пароля вже недостатньо. Ось як ми захищаємо ваші сайти:</p>
            <h3>1. Автоматичні SSL-сертифікати</h3>
            <p>Кожен сайт на HostPro отримує безкоштовний Let’s Encrypt SSL. Це шифрує дані між сервером та відвідувачами.</p>
            <h3>2. Щоденні бекапи</h3>
            <p>Якщо щось піде не так, ви зможете відновити сайт до попереднього стану в один клік.</p>
            <h3>3. Ізоляція акаунтів</h3>
            <p>Ми використовуємо CloudLinux. Навіть якщо інший користувач на сервері матиме проблеми з безпекою, ваш сайт залишиться в безпеці.</p>
            <p>Будьте пильними, оновлюйте плагіни, а ми подбаємо про безпеку на рівні сервера.</p>
          `
          }
        ]
      },
      chat: {
        title: 'AI Чат-асистент',
        sub: 'Працює на моделях OpenRouter. Знає все про HostPro!',
        welcome: 'Привіт! Я AI-асистент HostPro. Чим можу допомогти вам з нашим хостингом?',
        inputPlaceholder: 'Запитайте щось про хостинг...',
        send: 'Надіслати',
        typing: 'HostPro AI друкує...',
        error: 'Помилка',
        apiError: 'Наразі всі моделі недоступні. Будь ласка, спробуйте пізніше.',
        tryAgain: 'Спробувати ще раз',
        contactFormTitle: 'Залишіть ваш контакт:',
        contactFormPlaceholder: 'Email або Telegram...',
        contactFormSubmit: 'Відправити',
        contactFormPrefix: 'Мій контакт для зв\'язку з менеджером: ',
      homeTitle: 'Зустрічайте вашого AI-асистента',
      homeSub: 'Отримуйте миттєві відповіді на технічні питання, допомогу з міграцією або пораду щодо вибору тарифу. Доступний 24/7.',
      homeBtn: 'Спробувати AI Чат →',
      chips: [
        'Як перенести сайт?',
        'Допоможи обрати тариф',
        'Чи є знижки?',
      ],
      },
    },

  // ── RUSSIAN ────────────────────────────────────────────────────────────────
  ru: {
    siteName: 'HostPro',
    siteTagline: 'Современный хостинг для современных проектов.',
    nav: { features: 'Преимущества', pricing: 'Тарифы', reviews: 'Отзывы', about: 'О нас', faq: 'FAQ', contact: 'Контакты', status: 'Статус', cta: 'Начать', chat: 'AI Ассистент' },
    footer: { tagline: 'Современный хостинг для современных проектов.', copy: '© 2025 HostPro. Все права защищены.', cols: { products: 'Продукты', services: 'Услуги', resources: 'Ресурсы', legal: 'Юридическая информация' }, links: { pricing: 'Тарифы', faq: 'FAQ', status: 'Статус системы', wpHosting: 'WordPress хостинг', vpsHosting: 'VPS хостинг', dedicated: 'Выделенные серверы', laravelHosting: 'Laravel хостинг', phpHosting: 'PHP хостинг', prestashopHosting: 'PrestaShop хостинг', freeHosting: 'Бесплатный хостинг', kb: 'База знаний', blog: 'Блог', about: 'О нас', reviews: 'Отзывы', contact: 'Контакты', terms: 'Условия использования', privacy: 'Конфиденциальность', refund: 'Возврат средств' } },
    hero: { badge: '⚡ NVMe SSD · Node.js · 99.9% Uptime · cPanel', title1: 'Хостинг, который', title2: 'просто работает', sub: 'Быстрые SSD-серверы, бесплатный SSL, cPanel и поддержка 24/7. Запустите сайт за минуты.', cta: 'Начать сейчас', ctaSub: 'Без скрытых платежей · Отмена в любое время', stat1: 'Активных сайтов', stat2: 'Время загрузки', stat3: 'Uptime SLA' },
    features: { title: 'Всё, что нужно для успеха', sub: 'Мы позаботились об инфраструктуре — вы сосредоточьтесь на бизнесе', items: [{ icon: '⚡', title: 'NVMe SSD', desc: 'Скорость в 3× быстрее обычного SSD. Ваш сайт загружается мгновенно.' }, { icon: '🔒', title: 'SSL бесплатно', desc: "Let's Encrypt SSL для каждого домена. Автоматически и без доплат." }, { icon: '📋', title: 'cPanel', desc: 'Удобная панель управления для всех сайтов и почтовых ящиков.' }, { icon: '💾', title: 'Ежедневный бекап', desc: 'Автоматические резервные копии каждый день. Восстановление в один клик.' }, { icon: '🌐', title: '99.9% Uptime', desc: 'Гарантированная доступность. SLA-соглашение с каждым тарифом.' }, { icon: '🎧', title: 'Поддержка 24/7', desc: 'Живые специалисты каждый день. Среднее время ответа — 5 минут.' }, { icon: '📧', title: 'Почтовые ящики', desc: 'Создавайте профессиональные email-адреса на вашем домене. Полная поддержка IMAP/POP3/SMTP.' }, { icon: '🚀', title: 'Установка в 1 клик', desc: 'Автоматическая установка WordPress, Joomla и еще 400+ скриптов через Softaculous.' }] },
    tech: {
      title: 'Построено на современных технологиях',
      sub: 'Каждый тариф включает премиальные функции и современный серверный стек для максимальной производительности.',
      softaculous: {
        title: 'Softaculous: Установка в 1 клик',
        desc: '300+ автоинсталляторов программ (WordPress, Joomla и др.).',
      },
      features: {
        title: 'ТЕХНИЧЕСКИЕ ОСОБЕННОСТИ',
        items: [
          { title: 'Производительность', desc: 'LiteSpeed WebServer, LSCache и NVMe SSD хранилище.' },
          { title: 'Надежность', desc: 'Anycast DNS и CloudLinux для изоляции аккаунтов.' },
          { title: 'Безопасность', desc: 'Бесплатные SSL-сертификаты и ежедневные бекапы для всех.' },
          { title: 'Поддержка', desc: '24/7 техническая помощь и бесплатные миграции.' },
        ],
      },
      server: {
        title: 'СЕРВЕРНЫЕ ТЕХНОЛОГИИ',
        items: [
          { title: 'LiteSpeed Web Server', desc: 'Значительно быстрее Apache, оптимизирован для WordPress.' },
          { title: 'CloudLinux (LVE)', desc: 'Гарантирует выделенные ресурсы и полную изоляцию аккаунта.' },
          { title: 'NVMe SSD Storage', desc: 'Хранилище нового поколения для сверхбыстрого чтения/записи.' },
          { title: 'Anycast DNS', desc: 'Глобальная сеть для мгновенного разрешения доменов.' },
        ],
      },
      databases: {
        title: 'БАЗЫ ДАННЫХ',
        items: [
          { title: 'MySQL / MariaDB', desc: 'Стандарт индустрии для WordPress и PHP приложений.' },
          { title: 'phpMyAdmin', desc: 'Мощный инструмент управления базами в каждой cPanel.' },
          { title: 'Remote MySQL', desc: 'Возможность подключения к базам из внешних приложений.' },
        ],
      },
      dev: {
        title: 'Кодирование и разработка',
        desc: 'Мы поддерживаем PHP (разные версии), Python и Node.js. Бесплатные SSL с автообновлением для каждого аккаунта.',
      }
    },
    billing: { monthly: 'Ежемесячно', quarterly: 'Ежеквартально', yearly: 'Ежегодно', threeYears: 'На 3 года', save10: '−10%', save20: '−20%', save30: '−30%', monthTerm: '1 месяц', quarterTerm: '3 месяца', yearTerm: '1 год', threeYearTerm: '3 года', payToday: 'Оплатить', today: 'сегодня', for: 'На', then: 'затем', onRenewal: 'при возобновлении', savings: 'Экономия', renewsAt: 'Продление', prepaidFor: 'Предоплата за', months: 'месяцев', exVat: 'Без НДС' },
    pricing: {
      title: 'Прозрачные тарифы', sub: 'Выберите план и масштабируйтесь без ограничений', popular: 'Самый популярный', mo: '/мес', cta: 'Выбрать план', featLabel: 'Включено:', customTitle: 'Не нашли нужный тариф?', customSub: 'Напишите нам — мы подберём индивидуальное решение под ваши нужды и бюджет.', customBtn: '✉️ Написать нам',
      plans: [
        { name: 'Personal', desc: 'Идеально для первого сайта', price: 0.99, color: '#6EE7B7', popular: false, extras: ['1 сайт', '1 GB NVMe SSD', '1 Email аккаунт', '1 база данных MySQL', 'Бесплатный SSL сертификат', 'Панель управления cPanel', 'Поддержка Node.js', 'Защита от вредоносного ПО', 'Стандартные бекапы', 'Обычная поддержка', 'Гарантия аптайма 99.9%'] },
        { name: 'Starter', desc: 'Для нескольких сайтов и роста', price: 4.99, color: '#60A5FA', popular: false, extras: ['до 3 сайтов', '3 GB NVMe SSD', '3 Email аккаунтов', '3 базы данных MySQL', 'Бесплатный SSL сертификат', 'Панель управления cPanel', 'Поддержка Node.js', 'Защита от вредоносного ПО', 'Стандартные бекапы', 'Обычная поддержка', 'Гарантия аптайма 99.9%'] },
        { name: 'Business', desc: 'Для бизнес-сайтов и магазинов', price: 9.99, color: '#A78BFA', popular: false, extras: ['до 10 сайтов', '10 GB NVMe SSD', '10 Email аккаунтов', '10 базы данных MySQL', 'Бесплатный SSL сертификат', 'Панель управления cPanel', 'Ускоритель сайта', 'Поддержка Node.js', 'Защита от вредоносного ПО', 'Приоритетный бекап', 'Приоритетная поддержка', 'Гарантия аптайма 99.9%'] },
        { name: 'Agency', desc: 'Для агентств и интернет-магазинов', price: 19.99, color: '#FB923C', popular: true, extras: ['до 25 сайтов', '25 GB NVMe SSD', 'Безлимитный Email', '25 баз данных MySQL', 'Wildcard SSL сертификат', 'Панель управления cPanel', 'Ускоритель сайта', 'Поддержка Node.js', 'Защита от вредоносного ПО', 'Приоритетный бекап', 'Приоритетная поддержка 24/7', 'Гарантия аптайма 99.9%'] },
        { name: 'Agency Pro', desc: 'Для масштабных проектов и команд', price: 39.99, color: '#F472B6', popular: false, extras: ['Безлимитно сайтов', '50 GB NVMe SSD', 'Безлимитный Email', 'Безлимитно баз данных MySQL', 'Wildcard SSL сертификат', 'Выделенный IP-адрес', 'Панель управления cPanel', 'Ускоритель сайта', 'Поддержка Node.js', 'Pro защита от вредоносного ПО', 'Персональный менеджер', 'VIP поддержка 24/7', 'Гарантия аптайма 99.9%'] },
      ],
    },
    who: { title: 'Для кого подходит?', sub: 'Масштабируемое решение для любого размера бизнеса', items: [{ icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Бизнес', desc: 'Корпоративные сайты, лендинги, CRM. Надёжность и скорость для вашего бренда.' }, { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)', title: 'Разработчики', desc: 'Перепродавайте хостинг клиентам под своим брендом. Мощная инфраструктура для вашего бизнеса.' }, { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Интернет-магазины', desc: 'WooCommerce, PrestaShop, OpenCart. Быстрый хостинг для e-commerce.' }, { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)', title: 'Стартапы', desc: 'Начните малым и масштабируйтесь мгновенно. Без переездов и простоев.' }] },
    cta: { title: 'Готовы начать?', sub: 'Запустите первый сайт уже сегодня — без технических знаний.', btn: 'Начать →' },
    order: { label: 'Заказ плана', nameLbl: 'Имя', namePh: 'Ваше имя', domainLbl: 'Домен / сайт (необязательно)', domainPh: 'yourdomain.com', msgLbl: 'Сообщение (необязательно)', msgPh: 'Любые вопросы или пожелания...', send: 'Отправить заказ →', note: 'Свяжемся с вами как можно быстрее.', success: '✅ Заказ отправлен! Мы свяжемся с вами в ближайшее время.' },
    about: { meta: 'Узнайте больше о команде HostPro — кто мы, наша миссия и ценности.', label: 'О нас', title: 'О нас', h1p1: 'Мы строим', h1p2: 'надёжный интернет', sub: 'Команда энтузиастов, которая верит что качественный хостинг должен быть доступен каждому.', stats: [{ val: '12K+', label: 'Активных сайтов' }, { val: '99.9%', label: 'Uptime SLA' }, { val: '5 мин', label: 'Среднее время ответа' }, { val: '2019', label: 'Год основания' }], missionLabel: 'Наша миссия', missionTitle: 'Хостинг, который просто работает', mission1: 'Мы начинали как небольшая команда разработчиков, уставших от ненадёжных провайдеров. Вместо жалоб — решили сделать лучше. Сегодня HostPro обслуживает тысячи клиентов.', mission2: 'Наши серверы в сертифицированных Tier III датацентрах с резервным питанием и двойным интернет-подключением.', valuesLabel: 'Наши ценности', valuesTitle: 'Что нас движет', values: [{ icon: '⚡', title: 'Скорость прежде всего', desc: 'NVMe SSD, оптимизированные конфигурации и CDN — сайт загружается мгновенно.' }, { icon: '🔒', title: 'Безопасность без компромиссов', desc: 'Авто-SSL, ежедневные бекапы, защита от DDoS и мониторинг 24/7.' }, { icon: '🤝', title: 'Честность и прозрачность', desc: 'Без скрытых платежей. То что на сайте — то вы и получаете.' }, { icon: '🚀', title: 'Рост вместе с вами', desc: 'Начинаете с малого — отлично. Масштабируемся вместе без переездов.' }], teamLabel: 'Команда', teamTitle: 'Люди за HostPro', team: [{ avatar: '👨‍💻', name: 'Алексей М.', role: 'Основатель & CEO' }, { avatar: '👩‍🔧', name: 'Наталья В.', role: 'Head of Infrastructure' }, { avatar: '👨‍🎨', name: 'Денис К.', role: 'Lead Developer' }, { avatar: '👩‍💼', name: 'Мария Л.', role: 'Customer Success' }] },
    testimonials: {
      title: 'Что говорят наши клиенты',
      sub: 'Нам доверяют более 12,000 клиентов по всему миру',
      reviewsLink: 'Читать все отзывы →',
      items: [
        { name: 'Александр П.', role: 'Владелец интернет-магазина', text: 'Переход на HostPro стал лучшим решением для моего бизнеса. Скорость впечатляет, а техподдержка всегда на связи.', stars: 5 },
        { name: 'Дмитрий К.', role: 'Full-stack разработчик', text: 'Наконец-то хостинг, который понимает разработчиков. SSH, поддержка Node.js и НVМе SSD делают работу намного приятнее.', stars: 5 },
        { name: 'Ольга С.', role: 'Маркетинговое агентство', text: 'Мы управляем десятками сайтов клиентов здесь. Тариф Agency Pro с персональным менеджером стал настоящим прорывом для нас.', stars: 5 },
        { name: 'Максим В.', role: 'Основатель SaaS', text: 'Аптайм именно такой, как обещали. Наше приложение работает без единого сбоя уже более года.', stars: 5 },
        { name: 'Юлия К.', role: 'Блогер', text: 'Настройка была очень простой. Установка WordPress в один клик и бесплатный SSL очень помогли.', stars: 5 },
        { name: 'Артем Т.', role: 'Креативный директор', text: 'Отличная производительность по выгодной цене. NVMe SSD накопители действительно имеют значение для нашего портфолио.', stars: 5 }
      ]
    },
    faq: { meta: 'Ответы на самые частые вопросы о хостинге HostPro.', label: 'FAQ', title: 'FAQ', h1p1: 'Ответы на', h1p2: 'вопросы', sub: 'Ответы на самые распространённые вопросы о нашем хостинге.', items: [{ q: 'Что такое cPanel и зачем он нужен?', a: 'cPanel — самая популярная панель управления хостингом. Управляйте файлами, базами данных, почтой, SSL и статистикой. Интуитивный интерфейс даже для новичков.' }, { q: 'Как быстро активируется аккаунт?', a: 'После оплаты аккаунт активируется автоматически. Обычно это занимает 1-3 минуты, но в отдельных случаях (в зависимости от нагрузки) может длиться до 5 часов. Вы получите email с данными для входа в cPanel.' }, { q: 'Есть ли гарантия возврата денег?', a: 'Да — 14 дней. Если недовольны — возвращаем 100% без лишних вопросов. Только для новых аккаунтов.' }, { q: 'Можно ли перенести существующий сайт?', a: 'Да, миграция бесплатна. Напишите в поддержку с данными текущего хостинга — сделаем всё сами за 24 часа.' }, { q: 'Что входит в бесплатный SSL?', a: "Let's Encrypt SSL для каждого домена и субдомена, обновляется каждые 90 дней. На тарифах Agency — Wildcard SSL." }, { q: 'Как часто делаются бекапы?', a: 'На тарифах Business и выше — ежедневные бекапы хранятся 7 дней. Восстановление одним кликом в cPanel.' }, { q: 'Поддерживаете ли WordPress?', a: 'Да, полностью. Установка в один клик через Softaculous в cPanel. Также WooCommerce, PrestaShop, Joomla, Drupal.' }, { q: 'Что будет если я превышу лимиты?', a: 'Предупредим по email заранее. Сайт не отключится сразу — будет время оптимизировать или перейти на тариф выше.' }, { q: 'Можно ли изменить тариф?', a: 'Конечно. Апгрейд мгновенно, данные сохраняются. Платите только разницу до конца текущего цикла.' }, { q: 'Где находятся серверы?', a: 'Сертифицированные Tier III датацентры в нескольких географических локациях для резервирования и минимальных задержек.' }] },
    contact: { meta: 'Свяжитесь с командой HostPro — поддержка 24/7, ответ как можно быстрее.', label: 'Контакты', title: 'Контакты', h1p1: 'Мы здесь,', h1p2: 'чтобы помочь', sub: 'Среднее время ответа — как можно быстрее. Поддержка доступна 24/7.', channels: [{ icon: '✉️', title: 'Email', desc: 'Общие вопросы и предложения', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '🛠️', title: 'Техническая поддержка', desc: 'Проблемы с сайтом, cPanel, настройка', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '💬', title: 'Live Chat', desc: 'Самый быстрый способ получить ответ', link: 'Открыть чат →', href: '#' }, { icon: '🤝', title: 'Партнёрство', desc: 'Реселеры, корпоративные решения', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }], formLabel: 'Форма обратной связи', formTitle: 'Напишите нам', nameLbl: 'Имя', namePh: 'Ваше имя', emailLbl: 'Email', emailPh: 'your@email.com', topicLbl: 'Тема', msgLbl: 'Сообщение', msgPh: 'Опишите ваш вопрос или проблему...', sendBtn: 'Отправить сообщение →', topics: ['Общий вопрос', 'Техническая поддержка', 'Биллинг и оплата', 'Миграция сайта', 'Партнёрство', 'Другое'], success: '✅ Спасибо! Мы ответим как можно быстрее.' },
    status: { meta: 'Реальное состояние серверов и сервисов HostPro. Uptime 99.9%.', label: 'Статус системы', title: 'Статус системы', h1p1: 'Всё', h1p2: 'работает', okText: 'Все системы работают нормально', okSub: 'Нет активных инцидентов · Uptime 99.98% за 90 дней', metrics: [{ val: '99.98%', label: 'Uptime (90 дней)' }, { val: '0.3s', label: 'Среднее время ответа' }, { val: '0', label: 'Активных инцидентов' }], svcTitle: 'Статус сервисов', svcSub: 'Реальное время · обновляется каждую минуту', services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'], badge: 'Operational', incTitle: 'Журнал инцидентов', incSub: 'Последние 90 дней', incidents: [{ date: '12 февраля 2025, 03:14 UTC', title: 'Замедление Mail Server EU-1', badge: 'Решено', desc: 'Повышенная нагрузка. Устранено за 18 мин. Ни одного потерянного письма.' }, { date: '28 января 2025, 11:40 UTC', title: 'Плановое обслуживание', badge: 'Завершено', desc: 'Обновление ядра. Окно 23 мин. Все сервисы восстановлены по плану.' }], noMore: 'Больше инцидентов не зафиксировано за этот период' },
    terms: { meta: 'Условия использования услуг хостинга HostPro.', label: 'Юридическая информация', title: 'Условия использования', date: 'Последнее обновление: 1 января 2025', sections: [{ title: 'Общие положения', body: 'Настоящие Условия регулируют доступ и использование услуг HostPro. Используя сервис, вы соглашаетесь с Условиями. HostPro может обновлять их, уведомляя по email за 14 дней.' }, { title: 'Описание услуг', body: 'HostPro предоставляет хостинг на NVMe SSD серверах, включая: доступ к cPanel, почтовые ящики, SSL-сертифициты, ежедневные бекапы и поддержку 24/7.' }, { title: 'Аккаунт и ответственность', body: 'Вы несёте ответственность за конфиденциальность данных аккаунта и весь размещённый контент.' }, { title: 'Запрещённое использование', body: 'Запрещено: незаконный контент, спам, фишинг, нарушение авторских прав, майнинг криптовалюты, DDoS-атаки.' }, { title: 'Оплата и биллинг', body: 'Оплата авансом за выбранный период. Аккаунт может быть приостановлен через 7 дней неоплаты. Данные хранятся 30 дней.' }, { title: 'Гарантия доступности (SLA)', body: 'Гарантируем 99.9% доступности в месяц. Кредиты: 99.0–99.9% = 10%; 95.0–99.0% = 25%; ниже 95% = 50%.' }, { title: 'Ограничение ответственности', body: 'HostPro не несёт ответственности за косвенные убытки. Максимальная ответственность — сумма, уплаченная за последние 3 месяца.' }, { title: 'Расторжение договора', body: 'Вы можете отменить в любое время по email. Данные хранятся 30 дней, затем удаляются.' }, { title: 'Применимое право', body: 'Настоящие Условия регулируются применимым законодательством. Споры — в судах по месту нахождения HostPro.' }, { title: 'Контакты', body: 'Юридические вопросы: hostpro@apartner.pro' }] },
    privacy: { meta: 'Как HostPro собирает, использует и защищает ваши данные. GDPR.', label: 'Конфиденциальность', title: 'Политика конфиденциальности', date: 'Последнее обновление: 1 января 2025', sections: [{ title: 'Какие данные мы собираем', body: 'Мы собираем: идентификационные данные (имя, email, телефон); платёжные данные (обрабатываются через защищённые шлюзы — данные карт не хранятся); технические данные (IP, браузер, ОС, cookies); данные использования.' }, { title: 'Как мы используем данные', body: 'Данные используются исключительно для предоставления сервиса, обработки платежей, поддержки и безопасности. Мы не продаём данные третьим лицам.' }, { title: 'Cookies', body: 'Мы используем необходимые cookies и аналитические cookies. Аналитические можно отключить в настройках браузера.' }, { title: 'Безопасность данных', body: 'Данные хранятся на защищённых серверах в ЕС. TLS для передачи, AES-256 для хранения чувствительных данных.' }, { title: 'Ваши права (GDPR)', body: 'Вы имеете право на: доступ, исправление, удаление, ограничение обработки, возражение, перенос данных. Контакт: hostpro@apartner.pro' }, { title: 'Третьи лица', body: 'Данные передаются только доверенным техническим партнёрам, которые подписывают соглашение по GDPR.' }, { title: 'Сроки хранения', body: 'Данные активных аккаунтов хранятся весь срок услуг. После закрытия — удаляются через 30 дней.' }, { title: 'Изменения Политики', body: 'Существенные изменения сообщаем по email за 30 дней.' }, { title: 'Контакты DPO', body: 'hostpro@apartner.pro' }] },
    refund: { meta: 'Условия возврата средств HostPro. 14-дневная гарантия.', label: 'Возврат средств', title: 'Политика возврата средств', date: 'Последнее обновление: 1 января 2025', sections: [{ title: '14-дневная гарантия возврата', body: 'Если в течение первых 14 дней вы недовольны — возвращаем 100% без лишних вопросов. Только для новых аккаунтов, один раз на клиента.' }, { title: 'Кредиты при смене тарифа', body: 'При апгрейде остаток зачисляется как кредит. При даунгрейде разница зачисляется как кредит на будущие платежи.' }, { title: 'Продление подписки', body: 'Автоматические продления не возвращаются, если услуга использовалась. Отмените за 24 часа до даты продления.' }, { title: 'Случаи без возврата', body: 'Нарушение Условий использования, аккаунт заблокирован из-за злоупотреблений, домены и SSL-сертификаты после регистрации, запросы после 14-дневного срока.' }, { title: 'Процесс возврата', body: 'Напишите на hostpro@apartner.pro. Обрабатываем за 1 рабочий день; средства возвращаются за 3–7 банковских дней.' }, { title: 'Кредиты на аккаунт', body: 'Вместо возврата на карту можно выбрать мгновенный кредит на аккаунт.' }, { title: 'Споры', body: 'Если считаете отказ несправедливою: hostpro@apartner.pro' }] },
    notFound: { title: 'Страница не найдена', sub: 'Похоже, этой страницы не существует или она была перемещена. Вернёмся на нужный путь.', home: '← На главную', back: 'Назад' },
    cookies: { title: 'Мы используем cookies', desc: 'Мы используем необходимые cookies для работы сайта и аналитические cookies, чтобы понимать как вы им пользуетесь.', acceptAll: 'Принять все', acceptEssential: 'Только необходимые', more: 'Конфиденциальность' },
    wp: {
      meta: 'Управляемый WordPress хостинг — быстрый, безопасный и надежный. Оптимизированные серверы, автообновления и стейджинг.',
      badge: '⚡ WordPress Optimized · автообновления · стейджинг',
      title1: 'WordPress хостинг,',
      title2: 'который реально летает',
      sub: 'Все необходимое для легкого создания и масштабирования вашего сайта на WordPress. Оптимизировано для максимальной скорости.',
      features: [
        { icon: '🚀', title: 'Максимальная скорость', desc: 'Предустановленное кэширование LiteSpeed и NVMe SSD для мгновенной загрузки.' },
        { icon: '🔒', title: 'Безопасность из коробки', desc: 'Автоматический SSL, сканирование на вирусы и брандмауэр (WAF) включены.' },
        { icon: '🔄', title: 'Автообновления', desc: 'Поддерживайте ядро WordPress, темы и плагини в актуальном состоянии автоматически.' },
        { icon: '🛠️', title: 'Стейджинг (Staging)', desc: 'Тестируйте изменения на клоне сайта перед публикацией в один клик.' },
      ],
      pricingSub: 'Специальные тарифы для WordPress с дополнительными ресурсами.',
    },
    laravel: {
      meta: 'Высокопроизводительный Laravel хостинг — оптимизирован для PHP 8+, Memcached и Git. SSH доступ и Composer.',
      badge: '🚀 Laravel Optimized · Git · Memcached · SSH',
      title1: 'Хостинг, созданный для',
      title2: 'Laravel проектов',
      sub: 'Идеальная среда для ваших Laravel проектов. Высокая скорость, инструменты для разработчиков и мгновенное развертывание.',
      features: [
        { icon: '🛠️', title: 'Оптимизация PHP 8.x', desc: 'Предварительно настроено для последних версий PHP с OPcache и JIT.' },
        { icon: '💾', title: 'Memcached', desc: 'Сверхбыстрое кэширование в памяти для сессий, очередей и производительности.' },
        { icon: '🌿', title: 'Интеграция с Git', desc: 'Деплой напрямую из GitHub, GitLab или Bitbucket. Простые CI/CD процессы.' },
        { icon: '🔒', title: 'SSH и Composer', desc: 'Полный SSH доступ, Composer и Artisan команды уже установлены.' },
      ],
      pricingSub: 'Масштабируйте свои приложения с выделенными ресурсами и максимальной скоростью.',
    },
    php: {
      meta: 'Оптимизированный PHP хостинг — несколько версий PHP, OPcache, Composer, SSH и NVMe SSD хранилище.',
      badge: '🐘 PHP 8.x · OPcache · Composer · cPanel',
      title1: 'PHP хостинг для',
      title2: 'разработчиков',
      sub: 'Сверхбыстрый PHP хостинг с полным набором инструментов разработчика. Запускайте любой PHP фреймворк или CMS.',
      features: [
        { icon: '🐘', title: 'PHP 8.x готов', desc: 'Переключайтесь между версиями PHP (7.4, 8.0, 8.1, 8.2, 8.3) мгновенно через cPanel без простоев.' },
        { icon: '⚡', title: 'OPcache и JIT', desc: 'Предвключённые OPcache и JIT для максимальной скорости выполнения PHP на каждом тарифе.' },
        { icon: '📦', title: 'Composer включён', desc: 'Composer предустановлен на всех аккаунтах. Управляйте зависимостями одной командой.' },
        { icon: '🔒', title: 'SSH доступ', desc: 'Полный SSH доступ для расширенной настройки, скриптов и безопасного управления файлами.' },
      ],
      pricingSub: 'PHP-оптимизированные тарифы с поддержкой нескольких версий и инструментами разработчика.',
    },
    prestashop: {
      meta: 'Высокопроизводительный PrestaShop хостинг — оптимизированный стек, установка в 1 клик, SSL и ежедневные бекапы.',
      badge: '🛒 PrestaShop Optimized · SSL · Backups · cPanel',
      title1: 'PrestaShop хостинг,',
      title2: 'который продаёт быстрее',
      sub: 'Запустите интернет-магазин на сервере, оптимизированном для PrestaShop. Скорость, безопасность и масштабируемость включены.',
      features: [
        { icon: '🛒', title: 'Установка в 1 клик', desc: 'Установите PrestaShop за секунды через Softaculous в cPanel. Технические знания не нужны.' },
        { icon: '⚡', title: 'Оптимизация скорости', desc: 'LiteSpeed кэш и NVMe SSD обеспечивают мгновенную загрузку магазина и более высокую конверсию.' },
        { icon: '🔒', title: 'Безопасность из коробки', desc: 'Бесплатный SSL, ежедневные бекапы и сканирование на вредоносное ПО защищают ваш магазин.' },
        { icon: '📈', title: 'Масштабирование вместе с вами', desc: 'Начните с бюджетного тарифа и плавно переходите на более высокий по мере роста магазина.' },
      ],
      pricingSub: 'Тарифы для e-commerce с ресурсами, необходимыми вашему магазину PrestaShop.',
    },
    freeHosting: {
      meta: 'Бесплатный хостинг для партнеров — приведите клиента и получите хостинг для своего сайта бесплатно.',
      badge: '🎁 Партнерская программа · Free Hosting',
      title1: 'Бесплатный хостинг',
      title2: 'для наших партнеров',
      sub: 'Привлеките хотя бы одного клиента на HostPro и получите бесплатный хостинг для своего сайта в качестве награды.',
      howItWorks: 'Как это работает',
      steps: [
        { icon: '🤝', title: 'Рекомендуйте нас', desc: 'Расскажите друзьям или клиентам о HostPro и помогите им выбрать тариф.' },
        { icon: '💳', title: 'Клиент заказывает', desc: 'Клиент должен приобрести любой тариф хостинга на срок от 1 года.' },
        { icon: '🎁', title: 'Получайте бонус', desc: 'Через 14 дней использования сервиса клиентом, вы получаете хостинг на тот же тариф и срок.' }
      ],
      termsTitle: 'Условия программы',
      terms: [
        'Клиент должен быть новым для HostPro.',
        'Хостинг должен быть заказан на срок от 1 года включительно.',
        'Вознаграждение доступно после 14 дней использования хостинга приведенным клиентом.',
        'Награда аннулируется при возврате средств клиентом в течение первых 14 дней.',
        'Тариф и срок бесплатного хостинга соответствуют заказу клиента.',
        'Вы получаете вознаграждение за каждого нового привлеченного клиента.',
        'Условия использования бесплатного хостинга идентичны общим условиям предоставления услуг.',
        'Рекомендовать самого себя (самореферал) запрещено.'
      ],
      formTitle: 'Заявка на получение',
      form: {
        partnerName: 'Ваше имя',
        partnerEmail: 'Ваш Email для связи',
        clientEmail: 'Email клиента, которого вы привели',
        partnerDomain: 'Ваш домен (где запустить хостинг)',
        notes: 'Дополнительные заметки (необязательно)',
        submit: 'Отправить заявку →',
        success: '✅ Заявка отправлена! Менеджер проверит данные и свяжется в ближайшее время.',
        error: '❌ Что-то пошло не так. Попробуйте еще раз или напишите в поддержку.'
      }
    },
    freePhp: {
      meta: 'Бесплатный Стартовый хостинг для некоммерческих проектов — 6 месяцев бесплатно от HostPro.',
      title: 'Бесплатный Стартовый хостинг',
      sub: 'Воспользуйтесь бесплатным хостингом от HostPro в течение 6 месяцев, без предоплат и обязательств.',
      whoCanGet: {
        title: 'Кто может получить бесплатный хостинг?',
        text: 'Это реальное предложение для размещения сайтов некоммерческих проектов. Наш проект HostPro может предоставить бесплатные услуги хостинга для сайтов, которые не преследуют цель получения прибыли, а также по определенным уважительным причинам не могут оплачивать стандартные услуги хостинга.',
        target: 'Услуги предоставляются как некоммерческим организациям (благотворительным фондам, школам, университетам), так и частным лицам для поддержки социальных инициатив.',
      },
      whatIsIncluded: {
        title: 'Что включено в такую услугу?',
        text: 'В рамках данной бесплатной услуги вы можете получить услугу аналогичную тарифу "Personal" с панелью управления cPanel. Вы можете в 1 клик установить WordPress или любую другую систему, использовать собственное доменное имя или получить бесплатное в зоне *.apartner.pro.',
        domains: 'Если у вас еще нет собственного доменного имени, и вы не хотите использовать домен в зоне *.apartner.pro – мы предлагаем зарегистрировать домен у нас. Регистрация доменного имени будет платной.',
      },
      conditions: {
        title: 'Условия предоставления бесплатного хостинга',
        text1: 'Для получения бесплатного хостинга в первую очередь отправьте запрос в свободной форме от некоммерческой организации с просьбой предоставить бесплатный хостинг через форму контактов ниже.',
        text2: 'Частным лицам, которые имеют свои научные или учебно-образовательные проекты, можно также отправить запрос на предоставление бесплатного хостинга.',
        text3: 'Опишите в двух словах Ваш проект и причины, по которым Вы не можете использовать платные услуги хостинга.',
      },
      application: {
        title: 'Заявка на бесплатный хостинг',
        text: 'После одобрения заявки вам будет отправлен промо-код, который необходимо ввести при заказе тарифа "Personal", что дает 100% скидку на 6 месяцев.',
        form: {
          name: 'Ваше имя',
          email: 'Email',
          project: 'Описание Вашего проекта',
          submit: 'Отправить заявку →',
          success: '✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
          error: '❌ Ошибка при отправке. Попробуйте позже или напишите нам на email.',
        }
      },
      features: {
        title: 'Бесплатный хостинг включает:',
        text: 'Условия и ресурсы бесплатно предоставленного хостинга ничем не отличаются от условий платного тарифа: сайт будет размещен на мощных серверах, гарантирована профессиональная поддержка, резервное копирование, панель cPanel, бесплатный SSL.',
        notice: 'Заметьте, мы оставляем за собой право отказать в бесплатном размещении без объяснения причин. Количество бесплатных тарифов ограничено.',
      },
      restrictions: {
        title: 'Ограничения',
        link: 'Услуга предоставляется на условиях, описанных в публичной оферте:',
        list: [
          'Сайт не должен размещать на своих страницах коммерческую рекламу в любом виде;',
          'Сайт не должен размещать статьи и ссылки различных бирж;',
          'С хостинг-аккаунта не должно быть сделано ни одной СПАМ-рассылки;',
          'На перечисленных далее страницах: на главной, «о проекте» или «контакты», должен быть размещен логотип нашего проекта и упоминание о том, что хостинг предоставлен «HostPro».',
        ],
        footer: 'При нарушении любого из перечисленных условий мы оставляем за собой право на отказ от предоставления услуг без объяснений.',
        note: 'Мы искренне болеем за людей, которые вкладывают свои силы, время и талант в развитие общественно полезных дел, поэтому с радостью предоставим описанную услугу хостинга бесплатно.',
      },
      benefits: [
        { icon: '💰', title: 'Действительно за 0 грн', desc: 'Пользуйтесь бесплатно. Всё прозрачно, без скрытых условий.' },
        { icon: '🛡️', title: 'Антивирусная проверка', desc: 'Регулярно проверяем ваши файлы антивирусом и оповещаем при необходимости.' },
        { icon: '🔒', title: 'SSL бесплатно', desc: 'Бесплатный сертификат для всех ваших сайтов и поддоменов.' },
        { icon: '⚙️', title: 'PHP на выбор', desc: 'В пару кликов меняйте версию PHP. Вам доступны версии 5.x - 8.x.' }
      ],
      promo: {
        title: 'Воспользуйтесь акционными условиями',
        text1: 'Вы также можете воспользоваться нашими акционными предложениями, чтобы приобрести услуги на выгодных условиях и отменить ограничения.',
        text2: 'Мы регулярно проводим акции и распродажи, предлагаем бесплатные домены вместе с услугами хостинга.',
        text3: 'Мы имеем также 30-дневную гарантию возврата денег. Просмотрите акции на хостинг и выберите свою.',
      },
      uniqueDomain: {
        title: 'Уникальный домен для Вашего сайта',
        text: "Получи бесплатно\n✅ .pp.ua — бесплатно к любому заказу!\n✅ .com.ua — в подарок при оплате за год (от тарифа Starter).",
      },
      faq: {
        title: 'Вопросы и ответы о бесплатном хостинге',
        sub: 'Мы верим, что качество - это основная составляющая любых услуг. Именно поэтому мы предлагаем Хостинг в оптимизированной технической среде.',
        items: [
          { q: 'Есть ли тестовый хостинг, какие ограничения?', a: 'Да, мы предоставляем бесплатный тестовый период. Во время тестирования могут быть ограничения на отправку почты.' },
          { q: 'Подходит ли этот хостинг для WordPress?', a: 'Абсолютно. Наши серверы оптимизированы для быстрой работы PHP и баз данных.' },
          { q: 'Есть ли какие-то дополнительные оптимизации?', a: 'Да, мы используем LiteSpeed и NVMe SSD накопители для максимальной скорости.' },
          { q: 'SSL сертификат предоставляется?', a: 'Да, мы предоставляем бесплатные сертификаты Let\'s Encrypt.' },
          { q: 'Какое программное обеспечение используется?', a: 'Мы используем CloudLinux, LiteSpeed, cPanel и Softaculous.' },
          { q: 'Можно ли изменить PHP, какие версии PHP доступны?', a: 'Конечно. Вы можете выбрать версии от 5.x до 8.x непосредственно в cPanel.' },
          { q: 'Что я могу разместить на сайте?', a: 'Любой законный контент для некоммерческих целей, не содержащий рекламы.' }
        ]
      },
      interlink: {
        title: 'Ищете хостинг именно для WordPress?',
        desc: 'Узнайте о нашем специальном предложении для социальных и волонтерских проектов, созданных на базе WordPress.',
        btn: 'Бесплатный WordPress хостинг →',
        href: '/free-wordpress-hosting'
      },
      upgrade: {
        title: 'Нужно больше ресурсов?',
        desc: 'Если ваш проект растёт и бесплатного тарифа уже не хватает — перейдите на платный план и снимите все ограничения. От $1.99/месяц.',
        btn: 'Посмотреть платные тарифы →',
        href: '/#pricing'
      }
    },
    freePersonal: {
      meta: 'Бесплатный Personal хостинг для некоммерческих проектов — 6 месяцев бесплатно от HostPro.',
      title: 'Бесплатный Personal хостинг',
      sub: 'Воспользуйтесь бесплатным хостингом от HostPro в течение 6 месяцев, без предоплат и обязательств.',
      whoCanGet: {
        title: 'Кто может получить бесплатный хостинг?',
        text: 'Это реальное предложение для размещения сайтов некоммерческих проектов. Наш проект HostPro может предоставить бесплатные услуги хостинга для сайтов, которые не преследуют цель получения прибыли, а также по определенным уважительным причинам не могут оплачивать стандартные услуги хостинга.',
        target: 'Услуги предоставляются как некоммерческим организациям (благотворительным фондам, школам, университетам), так и частным лицам для поддержки социальных инициатив.',
      },
      whatIsIncluded: {
        title: 'Что включено в такую услугу?',
        text: 'В рамках данной бесплатной услуги вы можете получить услугу аналогичную тарифу "Personal" с панелью управления cPanel. Вы можете в 1 клик установить WordPress или любую другую систему, использовать собственное доменное имя или получить бесплатное в зоне *.apartner.pro.',
        domains: 'Если у вас еще нет собственного доменного имени, и вы не хотите использовать домен в зоне *.apartner.pro – мы предлагаем зарегистрировать домен у нас. Регистрация доменного имени будет платной.',
      },
      conditions: {
        title: 'Условия предоставления бесплатного хостинга',
        text1: 'Для получения бесплатного хостинга в первую очередь отправьте запрос в свободной форме от некоммерческой организации с просьбой предоставить бесплатный хостинг через форму контактов ниже.',
        text2: 'Частным лицам, которые имеют свои научные или учебно-образовательные проекты, можно также отправить запрос на предоставление бесплатного хостинга.',
        text3: 'Опишите в двух словах Ваш проект и причины, по которым Вы не можете использовать платные услуги хостинга.',
      },
      application: {
        title: 'Заявка на бесплатный хостинг',
        text: 'После одобрения заявки вам будет отправлен промо-код, который необходимо ввести при заказе тарифа "Personal", что дает 100% скидку на 6 месяцев.',
        form: {
          name: 'Ваше имя',
          email: 'Email',
          project: 'Описание Вашего проекта',
          submit: 'Отправить заявку →',
          success: '✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
          error: '❌ Ошибка при отправке. Попробуйте позже или напишите нам на email.',
        }
      },
      features: {
        title: 'Бесплатный хостинг включает:',
        text: 'Условия и ресурсы бесплатно предоставленного хостинга ничем не отличаются от условий платного тарифа: сайт будет размещен на мощных серверах, гарантирована профессиональная поддержка, резервное копирование, панель cPanel, бесплатный SSL.',
        notice: 'Заметьте, мы оставляем за собой право отказать в бесплатном размещении без объяснения причин. Количество бесплатных тарифов ограничено.',
      },
      restrictions: {
        title: 'Ограничения',
        link: 'Услуга предоставляется на условиях, описанных в публичной оферте:',
        list: [
          'Сайт не должен размещать на своих страницах коммерческую рекламу в любом виде;',
          'Сайт не должен размещать статьи и ссылки различных бирж;',
          'С хостинг-аккаунта не должно быть сделано ни одной СПАМ-рассылки;',
          'На перечисленных далее страницах: на главной, «о проекте» или «контакты», должен быть размещен логотип нашего проекта и упоминание о том, что хостинг предоставлен «HostPro».',
        ],
        footer: 'При нарушении любого из перечисленных условий мы оставляем за собой право на отказ от предоставления услуг без объяснений.',
        note: 'Мы искренне болеем за людей, которые вкладывают свои силы, время и талант в развитие общественно полезных дел, поэтому с радостью предоставим описанную услугу хостинга бесплатно.',
      },
      benefits: [
        { icon: '💰', title: 'Действительно за 0 грн', desc: 'Пользуйтесь бесплатно. Всё прозрачно, без скрытых условий.' },
        { icon: '🛡️', title: 'Антивирусная проверка', desc: 'Регулярно проверяем ваши файлы антивирусом и оповещаем при необходимости.' },
        { icon: '🔒', title: 'SSL бесплатно', desc: 'Бесплатный сертификат для всех ваших сайтов и поддоменов.' },
        { icon: '⚙️', title: 'Personal на выбор', desc: 'В пару кликов меняйте версию Personal. Вам доступны версии 5.x - 8.x.' }
      ],
      promo: {
        title: 'Воспользуйтесь акционными условиями',
        text1: 'Вы также можете воспользоваться нашими акционными предложениями, чтобы приобрести услуги на выгодных условиях и отменить ограничения.',
        text2: 'Мы регулярно проводим акции и распродажи, предлагаем бесплатные домены вместе с услугами хостинга.',
        text3: 'Мы имеем также 30-дневную гарантию возврата денег. Просмотрите акции на хостинг и выберите свою.',
      },
      uniqueDomain: {
        title: 'Уникальный домен для Вашего сайта',
        text: "Получи бесплатно\n✅ .pp.ua — бесплатно к любому заказу!\n✅ .com.ua — в подарок при оплате за год (от тарифа Starter).",
      },
      faq: {
        title: 'Вопросы и ответы о бесплатном хостинге',
        sub: 'Мы верим, что качество - это основная составляющая любых услуг. Именно поэтому мы предлагаем Хостинг в оптимизированной технической среде.',
        items: [
          { q: 'Есть ли тестовый хостинг, какие ограничения?', a: 'Да, мы предоставляем бесплатный тестовый период. Во время тестирования могут быть ограничения на отправку почты.' },
          { q: 'Подходит ли этот хостинг для WordPress?', a: 'Абсолютно. Наши серверы оптимизированы для быстрой работы Personal и баз данных.' },
          { q: 'Есть ли какие-то дополнительные оптимизации?', a: 'Да, мы используем LiteSpeed и NVMe SSD накопители для максимальной скорости.' },
          { q: 'SSL сертификат предоставляется?', a: 'Да, мы предоставляем бесплатные сертификаты Let\'s Encrypt.' },
          { q: 'Какое программное обеспечение используется?', a: 'Мы используем CloudLinux, LiteSpeed, cPanel и Softaculous.' },
          { q: 'Можно ли изменить Personal, какие версии Personal доступны?', a: 'Конечно. Вы можете выбрать версии от 5.x до 8.x непосредственно в cPanel.' },
          { q: 'Что я могу разместить на сайте?', a: 'Любой законный контент для некоммерческих целей, не содержащий рекламы.' }
        ]
      },
      interlink: {
        title: 'Ищете хостинг именно для WordPress?',
        desc: 'Узнайте о нашем специальном предложении для социальных и волонтерских проектов, созданных на базе WordPress.',
        btn: 'Бесплатный WordPress хостинг →',
        href: '/free-wordpress-hosting'
      },
      upgrade: {
        title: 'Нужно больше ресурсов?',
        desc: 'Если ваш проект растёт и бесплатного тарифа уже не хватает — перейдите на платный план и снимите все ограничения. От $1.99/месяц.',
        btn: 'Посмотреть платные тарифы →',
        href: '/#pricing'
      }
    },
    freeWp: {
      meta: 'Бесплатный WordPress хостинг для социальных и благотворительных организаций. Получите 6 месяцев без оплаты от HostPro.',
      title: 'Бесплатный WordPress хостинг',
      sub: 'Запустите свой благотворительный или социальный проект на WordPress бесплатно на 6 месяцев.',
      whoCanGet: {
        title: 'Для кого доступен бесплатный WP-хостинг?',
        text: 'Это уникальная возможность разместить сайты, созданные на базе WordPress, для некоммерческих инициатив. HostPro предоставляет специальные условия для проектов без коммерческой выгоды.',
        target: 'Мы поддерживаем благотворительные фонды, учебные заведения, общественные и волонтерские организации.',
      },
      whatIsIncluded: {
        title: 'Технические возможности и установка WordPress',
        text: 'Вы получаете полноценный доступ к тарифу "Personal" с интуитивной панелью cPanel. Благодаря установщику Softaculous, вы можете установить WordPress в 1 клик. Можно привязать собственный домен или получить субдомен *.apartner.pro.',
        domains: 'Также у вас есть возможность приобрести и зарегистрировать уникальное доменное имя у нас по стандартным тарифам регистрации.',
      },
      conditions: {
        title: 'Как получить бесплатный WordPress хостинг?',
        text1: 'Официальным организациям достаточно заполнить форму заявки ниже, коротко описав суть и цели вашего проекта.',
        text2: 'Если вы частное лицо и ведете волонтерский блог на WordPress, вы также имеете право на бесплатное размещение.',
        text3: 'Главное — четко объясните цель проекта и почему вам необходима техническая поддержка.',
      },
      application: {
        title: 'Запрос на бесплатный хостинг',
        text: 'После быстрой проверки вашей заявки мы отправим вам уникальный промо-код. Используйте его при заказе тарифа "Personal".',
        form: {
          name: 'ФИО или Название организации',
          email: 'Контактний Email',
          project: 'Детали проекта (почему WordPress?)',
          submit: 'Отправить запрос →',
          success: '✅ Ваш запрос успешно получен! Ожидайте письмо от нашей команды.',
          error: '❌ Возникла техническая ошибка. Пожалуйста, попробуйте позже.',
        }
      },
      features: {
        title: 'Преимущества нашего WP-хостинга:',
        text: 'Наш бесплатный тариф не является урезанной версией. Ваш WordPress-сайт будет работать на быстрых серверах с NVMe, вы получите круглосуточную поддержку, автоматические бекапы, cPanel и SSL.',
        notice: 'HostPro оставляет за собой право отказать в участии в программе без объяснения причин. Количество бесплатных тарифов ограничено.',
      },
      restrictions: {
        title: 'Правила пользования',
        link: 'Размещение регулируется общим договором-офертой:',
        list: [
          'Запрещено размещать любую коммерческую рекламу или платные ссылки;',
          'Запрещено участие в биржах ссылок;',
          'Строгий запрет на рассылку спама;',
          'На сайте обязательно должно быть указано, что он работает на хостинге от HostPro с активной ссылкой.',
        ],
        footer: 'В случае несоблюдения этих простых правил, предоставление услуги может быть прекращено.',
        note: 'Мы глубоко уважаем работу волонтеров и ученых. Это предложение создано для того, чтобы ваш голос был услышан в интернете без лишних затрат.',
      },
      benefits: [
        { icon: '🚀', title: 'Быстрый WordPress', desc: 'Серверы настроены специально для быстрой работы PHP и баз данных.' },
        { icon: '🛡️', title: 'Защита от взломов', desc: 'Автоматическая блокировка ботов и проверка файлов антивирусом.' },
        { icon: '🔒', title: 'SSL за 1 клик', desc: 'Безопасное соединение HTTPS для всех ваших доменов бесплатно.' },
        { icon: '🛠️', title: 'Удобная cPanel', desc: 'Управляйте файлами, почтой и базами данных через удобную панель.' }
      ],
      promo: {
        title: 'Коммерческие проекты и скидки',
        text1: 'Если ваш проект имеет коммерческую составляющую, это бесплатное предложение вам не подойдет. Однако, вы можете выбрать стандартный платный тариф.',
        text2: 'Мы регулярно предоставляем скидки до 30% на долгосрочные оплаты и часто дарим доменное имя при оплате на год.',
        text3: 'Кроме того, действует 30-дневная гарантия возврата средств.',
      },
      uniqueDomain: {
        title: 'Домен в подарок (для коммерческих)',
        text: "Получи бесплатно\n✅ .pp.ua — бесплатно к любому заказу!\n✅ .com.ua — в подарок при оплате за год (от тарифа Starter).",
      },
      faq: {
        title: 'FAQ: Бесплатный WordPress хостинг',
        sub: 'Ответы на частые вопросы по развертыванию социальных проектов.',
        items: [
          { q: 'Какие ресурсы выделяются для бесплатного WordPress?', a: 'Вы получаете полноценный тариф "Personal" с 1 ГБ пространства на сверхбыстрых NVMe SSD дисках и возможностью размещения 1 сайта.' },
          { q: 'Могу ли я установить другую CMS вместо WordPress?', a: 'Конечно. Хотя этот тариф оптимизирован для WordPress, вы можете установить любую другую систему через Softaculous или вручную.' },
          { q: 'Как быстро активируется бесплатный хостинг?', a: 'После ручной проверки вашей заявки (обычно 1-2 рабочих дня) вы получите промо-код для мгновенной активации.' },
          { q: 'Входит ли в тариф бесплатный SSL?', a: 'Да, каждый ваш домен и поддомен автоматически получает бесплатный сертификат Let\'s Encrypt.' },
          { q: 'Как настроить почту со своим доменом?', a: 'Вы можете создать почтовые ящики прямо в cPanel и пользоваться ими через веб-интерфейс или подключить к Gmail/Outlook.' },
          { q: 'Какие версии PHP поддерживаются для WordPress?', a: 'Мы поддерживаем все актуальные версии, включая PHP 7.4, 8.0, 8.1, 8.2 и 8.3.' },
          { q: 'Что делать после окончания 6 бесплатных месяцев?', a: 'Вы сможете продолжить использование по стандартной цене тарифа "Personal" или подать новую заявку на рассмотрение.' }
        ]
      },
      interlink: {
        title: 'Нужен хостинг для другой CMS?',
        desc: 'Рассмотрите наш Бесплатный PHP хостинг, который идеально подойдет для любых некоммерческих проектов.',
        btn: 'Бесплатный PHP хостинг →',
        href: '/free-php-hosting'
      },
      upgrade: {
        title: 'Нужно больше ресурсов?',
        desc: 'Если ваш WordPress-сайт вырос и бесплатного тарифа уже не хватает — перейдите на платный план и снимите все ограничения. От $1.99/месяц.',
        btn: 'Посмотреть платные тарифы →',
        href: '/#pricing'
      }
    },
    freeHostingHub: {
      title: 'Выберите программу бесплатного хостинга',
      sub: 'HostPro предлагает несколько вариантов бесплатного размещения. Выберите тот, который подходит вам больше всего.',
      php: {
        title: 'PHP хостинг для НКО',
        desc: '6 месяцев бесплатного хостинга для социальных проектов. cPanel, PHP, любая CMS.',
        btn: 'Детали PHP тарифа →'
      },
      personal: {
        title: 'Personal хостинг для проектов',
        desc: '6 месяцев бесплатного хостинга для персональных проектов. cPanel, PHP, любая CMS.',
        btn: 'Детали Personal тарифа →'
      },
      wp: {
        title: 'WordPress хостинг для НКО',
        desc: 'Оптимизированный WP-хостинг на 6 месяцев для благотворительных фондов. 1-click install.',
        btn: 'Детали WordPress хостинга →'
      },
      partner: {
        title: 'Партнерская программа',
        desc: 'Приведите одного клиента и получите такой же хостинг для себя абсолютно бесплатно.',
        btn: 'Как стать партнером →'
      },
      seo: {
        title: 'Почему стоит выбрать наш бесплатный хостинг?',
        text: 'HostPro предлагает надежный и быстрый бесплатный хостинг для социальных, благотворительных и некоммерческих проектов. Мы верим, что хорошие инициативы заслуживают поддержки, поэтому предоставляем высококачественные SSD серверы, cPanel и бесплатный SSL без скрытых платежей. Выберите тариф, который лучше всего подходит для ваших нужд, будь то WordPress, обычный PHP хостинг или персональный проект, и начинайте работу уже сегодня.'
      }
    },
    kb: {
      meta: 'База знаний — инструкции, руководства и ответы на вопросы о хостинге.',
      title: 'База знаний',
      sub: 'Ищите ответы в нашей библиотеке инструкций.',
      searchPh: 'Искать статьи...',
      helpful: 'Была ли эта статья полезной?',
      yes: 'Да',
      no: 'Нет',
      supportTitle: 'Всё ещё нужна помощь?',
      supportSub: 'Наша команда поддержки доступна 24/7, чтобы помочь вам с любыми вопросами.',
      supportBtn: 'Связаться с поддержкой',
      backToKb: '← Назад к базе знаний',
      articleCount: 'статей', articleSingular: 'Статья',
      categories: [
        { title: 'С чего начать', count: 12, icon: '🚀', slug: 'getting-started' },
        { title: 'cPanel и хостинг', count: 24, icon: '📋', slug: 'cpanel' },
        { title: 'Домены и DNS', count: 15, icon: '🌐', slug: 'dns' },
        { title: 'Настройка почты', count: 18, icon: '📧', slug: 'email' },
        { title: 'WordPress инструкции', count: 21, icon: '📝', slug: 'wordpress' },
        { title: 'Безопасность и SSL', count: 10, icon: '🔒', slug: 'security' },
      ],
      popular: 'Популярные статьи',
      popularItems: [
        { title: 'Как войти в cPanel', slug: 'how-to-login-to-cpanel', cat: 'cPanel и хостинг' },
        { title: 'Как сменить DNS серверы', slug: 'changing-your-nameservers', cat: 'Домены и DNS' },
        { title: 'Настройка почты на iPhone', slug: 'setting-up-email-on-iphone', cat: 'Настройка почты' },
        { title: 'Установка WordPress через Softaculous', slug: 'installing-wordpress-via-softaculous', cat: 'WordPress инструкции' },
        { title: 'Оптимизация WordPress с помощью LiteSpeed Cache', slug: 'wordpress-optimization-litespeed', cat: 'WordPress инструкции' },
      ],
      articles: [
        {
          slug: 'installing-wordpress-via-softaculous',
          title: 'Установка WordPress через Softaculous',
          cat: 'WordPress инструкции',
          content: `<p>Softaculous — это мощный автоинсталлятор, который позволяет установить WordPress всего за несколько кликов. Вот пошаговая инструкция:</p>
<ol>
  <li><strong>Войдите в свой аккаунт cPanel.</strong> Обычно это можно сделать по адресу yourdomain.com/cpanel.</li>
  <li>Прокрутите вниз до раздела <strong>"Программное обеспечение"</strong> и нажмите <strong>"Softaculous Apps Installer"</strong>.</li>
  <li>В интерфейсе Softaculous найдите <strong>WordPress</strong> и нажмите кнопку <strong>"Install" (Установить)</strong>.</li>
  <li>Выберите <strong>"Quick Install"</strong> или <strong>"Custom Install"</strong>. Мы рекомендуем Custom Install для большего контроля.</li>
  <li><strong>Настройка ПО:</strong>
    <ul>
      <li>Выберите протокол (рекомендуется https:// рекомендуется).</li>
      <li>Выберите ваш домен.</li>
      <li>В поле "Directory" (Директория): оставьте пустым, если хотите установить WordPress в корень сайта.</li>
    </ul>
  </li>
  <li><strong>Настройки сайта:</strong> Введите название сайта и его описание.</li>
  <li><strong>Аккаунт администратора:</strong> Создайте надежное имя пользователя и пароль. <em>Не используйте "admin" в качестве логина из соображений безопасности.</em></li>
  <li>Прокрутите вниз и нажмите <strong>"Install" (Установить)</strong>.</li>
</ol>
<p>Дождитесь завершения установки. После завершения вы получите ссылки на ваш сайт и панель управления (/wp-admin).</p>`
        },
        {
          slug: 'wordpress-optimization-litespeed',
          title: 'Оптимизация WordPress с помощью LiteSpeed Cache',
          cat: 'WordPress инструкции',
          content: `<p>LiteSpeed Cache (LSCache) — это высокоэффективный плагин кэширования, созданный специально для веб-сервера LiteSpeed, который используется в HostPro. Вот как его настроить:</p>
<ol>
  <li><strong>Установите плагин:</strong> Войдите в админ-панель WordPress, перейдите в раздел <strong>Плагины > Добавить новый</strong>, найдите "LiteSpeed Cache". Установите и активируйте его.</li>
  <li><strong>Пресеты (Presets):</strong> Мы рекомендуем начать с готовой настройки. Перейдите в <strong>LiteSpeed Cache > Presets</strong> и выберите "Advanced (Recommended)". Нажмите <strong>Apply Preset</strong>.</li>
  <li><strong>Оптимизация изображений:</strong> Перейдите в <strong>LiteSpeed Cache > Image Optimization</strong>. Нажмите "Gather Image Data", а затем "Send Optimization Request". Это сожмет ваши изображения без потери качества.</li>
  <li><strong>Минификация:</strong> В разделе <strong>Page Optimization > CSS Settings</strong> включите "CSS Minify". Сделайте то же самое для JS и HTML в соответствующих вкладках.</li>
  <li><strong>CDN:</strong> Если вы используете Cloudflare или QUIC.cloud, вы можете настроить их во вкладке <strong>CDN</strong> для еще лучше глобальной производительности.</li>
</ol>
<p>После применения этих настроек ваш сайт будет работать значительно быстрее. Проверить результат можно с помощью PageSpeed Insights или GTmetrix.</p>`
        },
        {
          slug: 'changing-php-version-cpanel',
          title: 'Как изменить версию PHP в cPanel',
          cat: 'WordPress инструкции',
          content: `<p>Разные версии WordPress и его плагинов могут требовать разных версий PHP. Вот как изменить ее:</p>
<ol>
  <li><strong>Войдите в cPanel.</strong></li>
  <li>В разделе <strong>"Программное обеспечение"</strong> нажмите на <strong>"Select PHP Version"</strong>.</li>
  <li>Вы увидите текущую версию PHP. Нажмите на номер версии, чтобы увидеть выпадающее меню.</li>
  <li>Выберите нужную версию (например, PHP 8.1 или 8.2) и нажмите <strong>"Set as current"</strong>.</li>
  <li>Проверьте свой сайт, чтобы убедиться, что всё работает правильно.</li>
</ol>
<p>Если после изменения версии вы заметили ошибки, вы всегда можете вернуться к предыдущей версии в том же меню.</p>`
        },
        {
          slug: 'reset-wordpress-password-phpmyadmin',
          title: 'Сброс пароля WordPress через phpMyAdmin',
          cat: 'WordPress инструкции',
          content: `<p>Если вы потеряли доступ к почте администратора и не можете сбросить пароль обычным способом, это можно сделать напрямую в базе данных:</p>
<ol>
  <li>Войдите в <strong>cPanel</strong> и откройте <strong>phpMyAdmin</strong>.</li>
  <li>Выберите вашу базу данных WordPress в левой колонке.</li>
  <li>Найдите таблицу с именем <code>wp_users</code> (префикс может отличаться, например, <code>wp123_users</code>).</li>
  <li>Нажмите <strong>Edit (Редактировать)</strong> рядом с вашей записью администратора.</li>
  <li>Найдите поле <code>user_pass</code>. В колонке <strong>Function</strong> выберите <strong>MD5</strong>.</li>
  <li>В колонке <strong>Value</strong> введите свой новый пароль.</li>
  <li>Нажмите <strong>Go (Вперед)</strong> внизу страницы.</li>
</ol>
<p>Теперь вы можете войти в WordPress с новым паролем.</p>`
        },
        {
          slug: 'fix-wordpress-database-connection-error',
          title: 'Исправление ошибки "Error Establishing a Database Connection"',
          cat: 'WordPress инструкции',
          content: `<p>Эта ошибка возникает, когда WordPress не может подключиться к базе данных. Вот как это исправить:</p>
<ol>
  <li><strong>Проверьте wp-config.php:</strong> Откройте File Manager в cPanel и найдите файл <code>wp-config.php</code> в корне сайта.</li>
  <li>Убедитесь, что параметры <code>DB_NAME</code>, <code>DB_USER</code>, <code>DB_PASSWORD</code> и <code>DB_HOST</code> указаны верно.</li>
  <li><strong>Проверьте пользователя базы данных:</strong> В cPanel > MySQL Databases убедитесь, что пользователь добавлен в базу со всеми правами (All Privileges).</li>
  <li><strong>Восстановление базы данных:</strong> Добавьте строку <code>define('WP_ALLOW_REPAIR', true);</code> в <code>wp-config.php</code>, затем перейдите по адресу <code>vash-domen.com/wp-admin/maint/repair.php</code>.</li>
</ol>
<p>Не забудьте удалить строку восстановления из <code>wp-config.php</code> после завершения работ!</p>`
        },
        {
          slug: 'wordpress-white-screen-of-death',
          title: 'Как исправить "Белый экран смерти" в WordPress',
          cat: 'WordPress инструкции',
          content: `<p>"Белый экран смерти" (WSoD) обычно вызван конфликтом плагинов или тем, или ограничением памяти. Вот как это исправить:</p>
<ol>
  <li><strong>Включите режим отладки:</strong> Отредактируйте <code>wp-config.php</code> и измените <code>define('WP_DEBUG', false);</code> на <code>true</code>. Это покажет реальную ошибку.</li>
  <li><strong>Деактивируйте все плагины:</strong> Если нет доступа к админке, переименуйте папку <code>wp-content/plugins</code> на <code>plugins_old</code> через File Manager. Если сайт заработал, верните название назад и отключайте плагины по одному.</li>
  <li><strong>Переключитесь на стандартную тему:</strong> Переименуйте папку вашей активной темы в <code>wp-content/themes</code>. WordPress автоматически активирует стандартную тему.</li>
  <li><strong>Увеличьте лимит памяти:</strong> Добавьте <code>define('WP_MEMORY_LIMIT', '256M');</code> в <code>wp-config.php</code>.</li>
</ol>
<p>Если ничего не помогло, проверьте <strong>Error Log</strong> в вашей cPanel для детальной информации.</p>`
        },
        {
          slug: 'wordpress-staging-guide',
          title: 'Как использовать Стейджинг (Staging) WordPress',
          cat: 'WordPress инструкции',
          content: `<p>Стейджинг позволяет тестировать изменения на клоне сайта перед их публикацией. В HostPro это легко делается через Softaculous:</p>
<ol>
  <li>Войдите в <strong>cPanel</strong> и откройте <strong>Softaculous</strong>.</li>
  <li>Нажмите на иконку <strong>Installations</strong> (вверху справа).</li>
  <li>Найдите вашу установку WordPress и нажмите иконку <strong>"Create Staging"</strong> (похожа на два листа).</li>
  <li>Выберите URL для стейджинга (например, <code>staging.yourdomain.com</code>).</li>
  <li>Нажмите <strong>"Create Staging"</strong>.</li>
  <li>Делайте изменения на тестовом сайте. Когда всё будет готово, повернитесь в Softaculous и нажмите <strong>"Push to Live"</strong> рядом с этой установкой.</li>
</ol>
<p>Это гарантирует стабильную работу основного сайта, пока вы экспериментируете с новым дизайном или функциями.</p>`
        }
      ],
    },
    blog: {
        meta: 'Блог HostPro — полезные статьи о хостинге, безопасности и производительности.',
        title: 'Наш блог',
        sub: 'Советы экспертов и инсайты индустрии, которые помогут вашему бизнесу расти.',
        readMore: 'Читать далее →',
        backToBlog: '← Назад в блог',
        publishedAt: 'Опубликовано',
        helpful: 'Была ли эта статья полезной?',
        yes: 'Да',
        no: 'Нет',
        posts: [
          {
            slug: 'why-nvme-ssd-hosting-matters',
            title: 'Почему NVMe SSD хостинг — это прорыв для вашего сайта',
            desc: 'Узнайте, как хранилище нового поколения может улучшить SEO и пользовательский опыт.',
            image: '/blog/nvme-speed.jpg',
            date: '1 мая 2025',
            content: `
            <p>В мире веб-хостинга скорость — это не роскошь, а критический фактор успеха. Google давно подтвердил, что скорость загрузки страницы является фактором ранжирования. Именно здесь на помощь приходит NVMe SSD хостинг.</p>
            <h3>Что такое NVMe?</h3>
            <p>NVMe (Non-Volatile Memory Express) — это протокол передачи данных, разработанный специально для быстрой флеш-памяти. В отличие от традиционных SSD, скорость NVMe может превышать 3500 МБ/с.</p>
            <h3>Ваши преимущества:</h3>
            <ul>
              <li><strong>Мгновенная загрузка:</strong> Запросы к базе данных и доступ к файлам происходят почти мгновенно.</li>
              <li><strong>Лучшее SEO:</strong> Поисковые системы отдают предпочтение быстрым сайтам.</li>
              <li><strong>Выше конверсия:</strong> Пользователи не любят ждать — быстрый сайт удерживает клиентов.</li>
            </ul>
            <p>В HostPro мы используем NVMe SSD на всех тарифах, потому что верим: каждый сайт заслуживает лучшей производительности.</p>
          `
          },
          {
            slug: 'how-to-choose-hosting-plan',
            title: '5 советов, как выбрать лучший тариф для вашего бизнеса',
            desc: 'Избегайте распространенных ошибок и выбирайте план, который будет расти вместе с вами.',
            image: '/blog/hosting-plan.jpg',
            date: '28 апреля 2025',
            content: `
            <p>Выбор хостинга может быть сложным. Вот 5 советов, которые помогут вам не ошибиться:</p>
            <ol>
              <li><strong>Оцените трафик:</strong> Для старта подойдут тарифы Personal или Starter. Для больших проектов — Business или Agency.</li>
              <li><strong>Технические требования:</strong> Вам нужен Node.js, Python или специфическая версия PHP? HostPro поддерживает всё это.</li>
              <li><strong>Возможность масштабирования:</strong> Ваш хостинг должен позволять мгновенный переход на тариф выше без простоев.</li>
              <li><strong>Безопасность прежде всего:</strong> Убедитесь, что SSL и бекапы уже включены в стоимость.</li>
              <li><strong>Качество поддержки:</strong> Доступность 24/7 критична, когда возникают вопросы.</li>
            </ol>
            <p>Помните, самый дешевый вариант — не всегда лучший. Выбирайте надежность и скорость.</p>
          `
          },
          {
            slug: 'securing-website-2025',
            title: 'Безопасность сайта в 2025 году: практическое руководство',
            desc: 'Как встроенные функции безопасности HostPro защищают ваш бренд от современных угроз.',
            image: '/blog/security-guide.jpg',
            date: '25 апреля 2025',
            content: `
            <p>Киберугрозы эволюционируют каждый день. В 2025 году простого пароля уже недостаточно. Вот как мы защищаем ваши сайты:</p>
            <h3>1. Автоматические SSL-сертификаты</h3>
            <p>Каждый сайт на HostPro получает бесплатный Let’s Encrypt SSL. Это шифрует данные между сервером и посетителями.</p>
            <h3>2. Ежедневные бекапы</h3>
            <p>Если что-то пойдет не так, вы сможете восстановить сайт до предыдущего состояния в один клик.</p>
            <h3>3. Изоляция аккаунтов</h3>
            <p>Мы используем CloudLinux. Даже если у другого пользователя на сервере возникнут проблемы с безопасностью, ваш сайт останется в безопасности.</p>
            <p>Будьте бдительны, обновляйте плагины, а мы позаботимся о безопасности на уровне сервера.</p>
          `
          }
        ]
      },
      chat: {
        title: 'AI Чат-ассистент',
        sub: 'Работает на моделях OpenRouter. Знает всё о HostPro!',
        welcome: 'Привет! Я AI-ассистент HostPro. Чем могу помочь вам с нашим хостингом?',
        inputPlaceholder: 'Спросите что-то о хостинге...',
        send: 'Отправить',
        typing: 'HostPro AI печатает...',
        error: 'Ошибка',
        apiError: 'На данный момент все модели недоступны. Пожалуйста, попробуйте позже.',
        tryAgain: 'Попробовать еще раз',
        contactFormTitle: 'Оставьте ваш контакт:',
        contactFormPlaceholder: 'Email или Telegram...',
        contactFormSubmit: 'Отправить',
        contactFormPrefix: 'Мой контакт для связи с менеджером: ',
        homeTitle: 'Встречайте вашего AI-ассистента',
        homeSub: 'Получайте мгновенные ответы на технические вопросы, помощь с миграцией или совет по выбору тарифа. Доступен 24/7.',
        homeBtn: 'Попробовать AI Чат →',
        chips: [
          'Как перенести сайт?',
          'Помоги выбрать тариф',
          'Есть ли скидки?',
        ],
      },
    }
  }

export type Translations = typeof t.en & {
  billing: {
    savings: string;
    onRenewal: string;
  }
}
export function getT(lang: Lang): Translations { return t[lang] as Translations }
