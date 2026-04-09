export const LANGS = ['en', 'uk', 'ru'] as const
export type Lang = typeof LANGS[number]

export const LANG_META: Record<Lang, { label: string; flag: string; locale: string }> = {
  en: { label: 'English',     flag: '🇬🇧', locale: 'en_US' },
  uk: { label: 'Українська', flag: '🇺🇦', locale: 'uk_UA' },
  ru: { label: 'Русский',    flag: '🇷🇺', locale: 'ru_RU' },
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

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

export const t = {
  en: {
    siteName: 'HostPro',
    siteTagline: 'Modern hosting for modern projects.',

    nav: {
      features: 'Features',
      pricing: 'Pricing',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      status: 'Status',
      cta: 'Get Started',
    },

    footer: {
      tagline: 'Modern hosting for modern projects.',
      copy: '© 2025 HostPro. All rights reserved.',
      links: {
        about: 'About',
        faq: 'FAQ',
        contact: 'Contact',
        status: 'Status',
        terms: 'Terms',
        privacy: 'Privacy',
        refund: 'Refund',
      },
    },

    hero: {
      badge: '⚡ NVMe SSD · 99.9% Uptime · cPanel',
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
      ],
    },

    billing: {
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      save10: '−5%',
      save20: '−10%',
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
        { name: 'Personal',   desc: 'Perfect for your first website',   price: 1.99,  color: '#6EE7B7', popular: false,
          extras: ['1 Website', '1 GB NVMe SSD', '1 Email Account', 'Free SSL', 'cPanel', 'Standard Support'] },
        { name: 'Starter',    desc: 'For growing projects',             price: 4.99,  color: '#60A5FA', popular: false,
          extras: ['Up to 5 Websites', '5 GB NVMe SSD', '10 Email Accounts', 'Free SSL', 'Daily Backups', 'cPanel'] },
        { name: 'Business',   desc: 'For serious projects',             price: 14.99, color: '#A78BFA', popular: true,
          extras: ['Up to 15 Websites', '15 GB NVMe SSD', 'Unlimited Email', 'Free SSL', 'Priority Backups', 'Priority Support'] },
        { name: 'Agency',     desc: 'For agencies & developers',        price: 19.99, color: '#FB923C', popular: false,
          extras: ['Up to 30 Websites', '30 GB NVMe SSD', 'Unlimited Email', 'Wildcard SSL', 'White-label Ready', 'VIP 24/7 Support'] },
        { name: 'Agency Pro', desc: 'Maximum resources & capabilities', price: 29.99, color: '#F472B6', popular: false,
          extras: ['Unlimited Websites', '50 GB NVMe SSD', 'Unlimited Email', 'Wildcard SSL', 'Dedicated Manager', 'VIP 24/7 Support'] },
      ],
    },

    who: {
      title: 'Who is it for?',
      sub: 'Scalable solution for every business size',
      items: [
        { icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Businesses',    desc: 'Corporate sites, landing pages, CRM. Reliability and speed for your brand.' },
        { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)',  title: 'Developers',   desc: 'Resell hosting to clients under your own brand. White-label solutions.' },
        { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Online Stores', desc: 'WooCommerce, PrestaShop, OpenCart. Fast hosting for e-commerce.' },
        { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)',  title: 'Startups',      desc: 'Start small and scale instantly. No migrations, no downtime.' },
      ],
    },

    cta: {
      title: 'Ready to launch?',
      sub: 'Launch your first site today — no technical skills required.',
      btn: 'Get Started →',
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
      note: 'We will contact you within 5 minutes to confirm your order.',
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
        { icon: '⚡', title: 'Speed above all',                desc: 'NVMe SSD, optimised configs and CDN — your site loads in milliseconds.' },
        { icon: '🔒', title: 'Security without compromise',   desc: 'Auto SSL, daily backups, DDoS protection and 24/7 monitoring.' },
        { icon: '🤝', title: 'Honesty & transparency',        desc: 'No hidden fees. What you see on the site is what you get.' },
        { icon: '🚀', title: 'Growing together',              desc: 'Start small, scale instantly. No migrations, no downtime.' },
      ],
      teamLabel: 'Team',
      teamTitle: 'The people behind HostPro',
      team: [
        { avatar: '👨‍💻', name: 'Alex M.',    role: 'Founder & CEO' },
        { avatar: '👩‍🔧', name: 'Natalia V.', role: 'Head of Infrastructure' },
        { avatar: '👨‍🎨', name: 'Denis K.',   role: 'Lead Developer' },
        { avatar: '👩‍💼', name: 'Maria L.',   role: 'Customer Success' },
      ],
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
        { q: 'How quickly will my account be activated?', a: 'After successful payment your account activates within 1–3 minutes automatically. You will receive an email with your cPanel login details.' },
        { q: 'Is there a money-back guarantee?', a: 'Yes — 30 days. If for any reason you are unsatisfied we refund 100% with no questions asked. Applies to new accounts only.' },
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
      sub: 'Average response time — 5 minutes. Support available 24/7.',
      channels: [
        { icon: '✉️', title: 'Email',            desc: 'General questions & suggestions',         link: 'hostpro@apartner.pro',    href: 'mailto:hostpro@apartner.pro' },
        { icon: '🛠️', title: 'Technical Support', desc: 'Site issues, cPanel, configuration',      link: 'hostpro@apartner.pro',  href: 'mailto:hostpro@apartner.pro' },
        { icon: '💬', title: 'Live Chat',         desc: 'Fastest way to get an answer',            link: 'Open chat →',          href: '#' },
        { icon: '🤝', title: 'Partnerships',      desc: 'White-label, resellers, enterprise',      link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' },
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
        { val: '0.3s',   label: 'Avg. response' },
        { val: '0',      label: 'Active incidents' },
      ],
      svcTitle: 'Service status',
      svcSub: 'Real time · updated every minute',
      services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'],
      badge: 'Operational',
      incTitle: 'Incident log',
      incSub: 'Last 90 days',
      incidents: [
        { date: 'Feb 12 2025, 03:14 UTC', title: 'Mail Server EU-1 slowdown',    badge: 'Resolved',  desc: 'Elevated load on mail server. Resolved in 18 min. No messages lost.' },
        { date: 'Jan 28 2025, 11:40 UTC', title: 'Planned maintenance',          badge: 'Completed', desc: 'Kernel update. Maintenance window: 23 min. All services restored on schedule.' },
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
      meta: 'HostPro refund policy — 30-day money-back guarantee.',
      label: 'Refund Policy',
      title: 'Refund Policy',
      date: 'Last updated: January 1, 2025',
      sections: [
        { title: '30-Day Money-Back Guarantee', body: 'If for any reason you are not satisfied within the first 30 days of your first payment, we refund 100% — no questions asked. Applies to new accounts only, one per customer.' },
        { title: 'Plan Change Credits', body: 'When upgrading, unused balance is credited toward the new plan. When downgrading, the price difference is credited as account balance for future payments.' },
        { title: 'Subscription Renewals', body: 'Automatic renewals are non-refundable if the service has been used. Cancel at least 24 hours before the renewal date.' },
        { title: 'Non-Refundable Cases', body: 'Violations of Terms of Service, accounts suspended for abuse, domain registrations and SSL certificates after issuance, and renewal requests after the 30-day window.' },
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
  },

  // ── UKRAINIAN ──────────────────────────────────────────────────────────────
  uk: {} as any,
  ru: {} as any,
}

// Populate UK
t.uk = {
  siteName: 'HostPro',
  siteTagline: 'Сучасний хостинг для сучасних проєктів.',
  nav: { features: 'Переваги', pricing: 'Тарифи', about: 'Про нас', faq: 'FAQ', contact: 'Контакти', status: 'Статус', cta: 'Розпочати' },
  footer: { tagline: 'Сучасний хостинг для сучасних проєктів.', copy: '© 2025 HostPro. Усі права захищені.', links: { about: 'Про нас', faq: 'FAQ', contact: 'Контакти', status: 'Статус', terms: 'Умови', privacy: 'Конфіденційність', refund: 'Повернення' } },
  hero: { badge: '⚡ NVMe SSD · 99.9% Uptime · cPanel', title1: 'Хостинг, який', title2: 'просто працює', sub: 'Швидкі SSD-сервери, безкоштовний SSL, cPanel та підтримка 24/7. Запустіть свій сайт за хвилини.', cta: 'Почати зараз', ctaSub: 'Без прихованих платежів · Скасування в будь-який час', stat1: 'Активних сайтів', stat2: 'Час завантаження', stat3: 'Uptime SLA' },
  features: { title: 'Все, що потрібно для успіху', sub: 'Ми подбали про інфраструктуру — ви зосередьтесь на бізнесі', items: [
    { icon: '⚡', title: 'NVMe SSD', desc: 'Швидкість у 3× швидша за звичайний SSD. Ваш сайт завантажується миттєво.' },
    { icon: '🔒', title: 'SSL безкоштовно', desc: "Let's Encrypt SSL для кожного домену. Автоматично й без доплат." },
    { icon: '📋', title: 'cPanel', desc: 'Зручна панель управління для всіх ваших сайтів і поштових скриньок.' },
    { icon: '💾', title: 'Щоденний бекап', desc: 'Автоматичні резервні копії щодня. Відновлення в один клік.' },
    { icon: '🌐', title: '99.9% Uptime', desc: 'Гарантована доступність. SLA-угода з кожним тарифом.' },
    { icon: '🎧', title: 'Підтримка 24/7', desc: 'Живі спеціалісти щодня. Середній час відповіді — 5 хвилин.' },
  ]},
  billing: { monthly: 'Щомісяця', quarterly: 'Щоквартально', yearly: 'Щорічно', save10: '−5%', save20: '−10%' },
  pricing: { title: 'Прозорі тарифи', sub: 'Оберіть план і масштабуйтесь без обмежень', popular: 'Найпопулярніший', mo: '/міс', cta: 'Обрати план', featLabel: 'Включено:', customTitle: 'Не знайшли потрібний тариф?', customSub: 'Напишіть нам — ми підберемо індивідуальне рішення під ваші потреби та бюджет.', customBtn: '✉️ Написати нам',
    plans: [
      { name: 'Personal',   desc: 'Ідеально для першого сайту',          price: 1.99,  color: '#6EE7B7', popular: false, extras: ['1 сайт', '1 GB NVMe SSD', '1 Email акаунт', 'Безкоштовний SSL', 'cPanel', 'Звичайна підтримка'] },
      { name: 'Starter',    desc: 'Для зростаючих проєктів',             price: 4.99,  color: '#60A5FA', popular: false,  extras: ['до 5 сайтів', '5 GB NVMe SSD', '10 Email акаунтів', 'Безкоштовний SSL', 'Щоденний бекап', 'cPanel'] },
      { name: 'Business',   desc: 'Для серйозних проєктів',              price: 14.99, color: '#A78BFA', popular: true, extras: ['до 15 сайтів', '15 GB NVMe SSD', 'Необмежено Email', 'Безкоштовний SSL', 'Пріоритетний бекап', 'Пріоритетна підтримка'] },
      { name: 'Agency',     desc: 'Для агентств і розробників',          price: 19.99, color: '#FB923C', popular: false, extras: ['до 30 сайтів', '30 GB NVMe SSD', 'Необмежено Email', 'Wildcard SSL', 'White-label готовий', 'VIP підтримка 24/7'] },
      { name: 'Agency Pro', desc: 'Максимум ресурсів і можливостей',     price: 29.99, color: '#F472B6', popular: false, extras: ['Необмежено сайтів', '50 GB NVMe SSD', 'Необмежено Email', 'Wildcard SSL', 'Виділений менеджер', 'VIP підтримка 24/7'] },
    ],
  },
  who: { title: 'Для кого підходить?', sub: 'Масштабоване рішення для будь-якого розміру бізнесу', items: [
    { icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Бізнес',            desc: 'Корпоративні сайти, лендинги, CRM. Надійність і швидкість для вашого бренду.' },
    { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)',  title: 'Розробники',       desc: 'Перепродавайте хостинг клієнтам під власним брендом. White-label рішення.' },
    { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Інтернет-магазини', desc: 'WooCommerce, PrestaShop, OpenCart. Швидкий хостинг для e-commerce.' },
    { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)',  title: 'Стартапи',          desc: 'Почніть малим і масштабуйтесь миттєво. Без переїздів і простоїв.' },
  ]},
  cta: { title: 'Готові розпочати?', sub: 'Запустіть перший сайт вже сьогодні — без технічних знань.', btn: 'Розпочати →' },
  order: { label: 'Замовлення плану', nameLbl: "Ваше ім'я", namePh: "Ваше ім'я", domainLbl: 'Домен / сайт (необов\'язково)', domainPh: 'yourdomain.com', msgLbl: 'Повідомлення (необов\'язково)', msgPh: 'Будь-які питання або побажання...', send: 'Надіслати замовлення →', note: 'Ми зв\'яжемось з вами протягом 5 хвилин.', success: '✅ Замовлення відправлено! Ми зв\'яжемось з вами невдовзі.' },
  about: { meta: 'Дізнайтесь більше про команду HostPro — хто ми, наша місія та цінності.', label: 'Про нас', title: 'Про нас', h1p1: 'Ми будуємо', h1p2: 'надійний інтернет', sub: 'Команда ентузіастів, яка вірить що якісний хостинг має бути доступним кожному.', stats: [{ val: '12K+', label: 'Активних сайтів' }, { val: '99.9%', label: 'Uptime SLA' }, { val: '5 хв', label: 'Серед. відповідь' }, { val: '2019', label: 'Рік заснування' }], missionLabel: 'Наша місія', missionTitle: 'Хостинг, який просто працює', mission1: 'Ми починали як невелика команда розробників, яка втомилася від ненадійних хостинг-провайдерів. Замість скарг — вирішили зробити краще. Сьогодні HostPro обслуговує тисячі клієнтів.', mission2: 'Наші сервери в сертифікованих Tier III дата-центрах з резервним живленням та подвійним підключенням до інтернету.', valuesLabel: 'Наші цінності', valuesTitle: 'Що нас рухає', values: [{ icon: '⚡', title: 'Швидкість понад усе', desc: 'NVMe SSD, оптимізовані конфігурації та CDN — сайт завантажується миттєво.' }, { icon: '🔒', title: 'Безпека без компромісів', desc: 'Автоматичний SSL, щоденні бекапи, захист від DDoS та моніторинг 24/7.' }, { icon: '🤝', title: 'Чесність і прозорість', desc: 'Без прихованих платежів. Те що на сайті — те ви й отримуєте.' }, { icon: '🚀', title: 'Зростання разом з вами', desc: 'Починаєте з малого — чудово. Масштабуємось разом без переїздів.' }], teamLabel: 'Команда', teamTitle: 'Люди за HostPro', team: [{ avatar: '👨‍💻', name: 'Олексій М.', role: 'Засновник & CEO' }, { avatar: '👩‍🔧', name: 'Наталія В.', role: 'Head of Infrastructure' }, { avatar: '👨‍🎨', name: 'Денис К.', role: 'Lead Developer' }, { avatar: '👩‍💼', name: 'Марія Л.', role: 'Customer Success' }] },
  faq: { meta: 'Відповіді на найчастіші питання про хостинг HostPro.', label: 'FAQ', title: 'FAQ', h1p1: 'Часті', h1p2: 'запитання', sub: 'Відповіді на найпоширеніші питання про наш хостинг.', items: [{ q: 'Що таке cPanel і навіщо він потрібен?', a: 'cPanel — найпоширеніша панель керування хостингом. Через неї керуєте файлами, базами даних, поштою, SSL та статистикою. Інтуїтивний інтерфейс навіть для початківців.' }, { q: 'Як швидко активується мій акаунт?', a: 'Після оплати акаунт активується автоматично за 1–3 хвилини. Ви отримаєте email з даними для входу в cPanel.' }, { q: 'Чи є гарантія повернення коштів?', a: 'Так — 30 днів. Якщо незадоволені — повертаємо 100% без зайвих питань. Тільки для нових акаунтів.' }, { q: 'Чи можу я перенести свій поточний сайт?', a: 'Так, міграція безкоштовна. Напишіть у підтримку з даними поточного хостингу — ми зробимо все самі за 24 години.' }, { q: 'Що входить до безкоштовного SSL?', a: "Let's Encrypt SSL для кожного домену та субдомену, оновлюється кожні 90 днів. На Agency тарифах — Wildcard SSL." }, { q: 'Як часто робляться бекапи?', a: 'На тарифах Business та вище — щоденні бекапи зберігаються 7 днів. Відновлення в один клік через cPanel.' }, { q: 'Чи підтримуєте WordPress?', a: 'Так, повністю. Встановлення в один клік через Softaculous в cPanel. Також WooCommerce, PrestaShop, Joomla, Drupal.' }, { q: 'Що буде якщо я перевищу ліміти?', a: 'Ми попередимо по email заздалегідь. Сайт не відключиться одразу — буде час оптимізувати або перейти на вищий тариф.' }, { q: 'Чи можу я змінити тариф?', a: 'Звісно. Апгрейд миттєво, дані збережено. Платите лише різницю до кінця поточного циклу.' }, { q: 'Де знаходяться ваші сервери?', a: 'Сертифіковані Tier III дата-центри в кількох географічних локаціях для резервування та мінімальних затримок.' }] },
  contact: { meta: "Зв'яжіться з командою HostPro — підтримка 24/7, відповідь за 5 хвилин.", label: 'Контакти', title: 'Контакти', h1p1: 'Ми тут,', h1p2: 'щоб допомогти', sub: 'Середній час відповіді — 5 хвилин. Підтримка доступна 24/7.', channels: [{ icon: '✉️', title: 'Email', desc: 'Загальні питання та пропозиції', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '🛠️', title: 'Технічна підтримка', desc: 'Проблеми з сайтом, cPanel, налаштування', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '💬', title: 'Live Chat', desc: 'Найшвидший спосіб отримати відповідь', link: 'Відкрити чат →', href: '#' }, { icon: '🤝', title: 'Партнерство', desc: 'White-label, реселери, корпоративні рішення', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }], formLabel: "Форма зворотнього зв'язку", formTitle: 'Напишіть нам', nameLbl: "Ім'я", namePh: "Ваше ім'я", emailLbl: 'Email', emailPh: 'your@email.com', topicLbl: 'Тема', msgLbl: 'Повідомлення', msgPh: 'Опишіть ваше питання або проблему...', sendBtn: 'Надіслати повідомлення →', topics: ['Загальне питання', 'Технічна підтримка', 'Білінг та оплата', 'Міграція сайту', 'Партнерство', 'Інше'], success: '✅ Дякуємо! Ми відповімо протягом 5 хвилин.' },
  status: { meta: 'Реальний стан серверів та сервісів HostPro. Uptime 99.9%.', label: 'Статус системи', title: 'Статус системи', h1p1: 'Все', h1p2: 'працює', okText: 'Всі системи працюють нормально', okSub: 'Жодних активних інцидентів · Uptime 99.98% за 90 днів', metrics: [{ val: '99.98%', label: 'Uptime (90 днів)' }, { val: '0.3s', label: 'Серед. відповідь' }, { val: '0', label: 'Активних інцидентів' }], svcTitle: 'Статус сервісів', svcSub: 'Реальний час · оновлюється щохвилини', services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'], badge: 'Operational', incTitle: 'Журнал інцидентів', incSub: 'Останні 90 днів', incidents: [{ date: '12 лютого 2025, 03:14 UTC', title: 'Уповільнення Mail Server EU-1', badge: 'Вирішено', desc: 'Підвищене навантаження. Усунено за 18 хв. Жодного втраченого листа.' }, { date: '28 січня 2025, 11:40 UTC', title: 'Планове обслуговування', badge: 'Завершено', desc: 'Оновлення ядра. Вікно 23 хв. Всі сервіси відновлено за планом.' }], noMore: 'Більше інцидентів не зафіксовано за цей період' },
  terms: { meta: 'Умови використання послуг хостингу HostPro.', label: 'Юридична інформація', title: 'Умови використання', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: 'Загальні положення', body: 'Ці Умови регулюють доступ і використання послуг HostPro. Використовуючи сервіс, ви погоджуєтесь з Умовами. HostPro може оновлювати їх, повідомляючи по email за 14 днів.' }, { title: 'Опис послуг', body: 'HostPro надає хостинг на NVMe SSD серверах, включаючи: доступ до cPanel, поштові скриньки, SSL-сертифікати, щоденні бекапи та підтримку 24/7.' }, { title: 'Акаунт і відповідальність', body: 'Ви відповідаєте за конфіденційність даних акаунту та весь контент, розміщений через сервіс.' }, { title: 'Заборонене використання', body: 'Забороняється: незаконний контент, спам, фішинг, порушення авторських прав, майнінг криптовалюти, DDoS-атаки.' }, { title: 'Оплата та білінг', body: 'Оплата авансом за обраний період. Акаунт може бути призупинений через 7 днів несплати. Дані зберігаються 30 днів після призупинення.' }, { title: 'Гарантія доступності (SLA)', body: 'Гарантуємо 99.9% доступності на місяць. Кредити: 99.0–99.9% = 10%; 95.0–99.0% = 25%; нижче 95% = 50%.' }, { title: 'Обмеження відповідальності', body: 'HostPro не відповідає за непрямі збитки. Максимальна відповідальність — сума, сплачена за останні 3 місяці.' }, { title: 'Розірвання договору', body: 'Ви можете скасувати в будь-який час по email. Дані зберігаються 30 днів, потім видаляються.' }, { title: 'Застосовне право', body: 'Ці Умови регулюються законодавством України. Спори — в судах за місцем знаходження HostPro.' }, { title: 'Контакти', body: 'Юридичні питання: hostpro@apartner.pro' }] },
  privacy: { meta: 'Як HostPro збирає, використовує та захищає ваші персональні дані. GDPR.', label: 'Конфіденційність', title: 'Політика конфіденційності', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: 'Які дані ми збираємо', body: "Ми збираємо: ідентифікаційні дані (ім'я, email, телефон); платіжні дані (обробляються через захищені шлюзи — дані карток не зберігаємо); технічні дані (IP, браузер, ОС, cookies); дані використання." }, { title: 'Як ми використовуємо ваші дані', body: 'Дані використовуються виключно для надання сервісу, обробки платежів, підтримки та безпеки. Ми не продаємо персональні дані третім особам.' }, { title: 'Cookies', body: 'Ми використовуємо необхідні cookies та аналітичні cookies. Аналітичні можна відключити в налаштуваннях браузера.' }, { title: 'Безпека даних', body: 'Дані зберігаються на захищених серверах в ЄС. TLS для передачі, AES-256 для зберігання чутливих даних.' }, { title: 'Ваші права (GDPR)', body: 'Ви маєте право на: доступ, виправлення, видалення, обмеження обробки, заперечення, перенесення даних. Контакт: hostpro@apartner.pro' }, { title: 'Треті особи', body: 'Дані передаються лише надійним технічним партнерам, які підписують угоду про обробку даних відповідно до GDPR.' }, { title: 'Строки зберігання', body: 'Дані активних акаунтів зберігаються весь термін послуг. Після закриття — видаляються через 30 днів.' }, { title: 'Зміни Політики', body: 'Суттєві зміни повідомляємо по email за 30 днів.' }, { title: 'Контакти DPO', body: 'hostpro@apartner.pro' }] },
  refund: { meta: 'Умови повернення коштів HostPro. 30-денна гарантія.', label: 'Повернення коштів', title: 'Політика повернення коштів', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: '30-денна гарантія повернення', body: 'Якщо протягом перших 30 днів ви незадоволені — повертаємо 100% без жодних питань. Тільки для нових акаунтів, один раз на клієнта.' }, { title: 'Кредити при зміні тарифу', body: 'При апгрейді залишок зараховується як кредит. При даунгрейді різниця зараховується як кредит на майбутні платежі.' }, { title: 'Поновлення підписки', body: 'Автоматичні поновлення не підлягають поверненню, якщо послуга використовувалась. Скасуйте за 24 години до дати поновлення.' }, { title: 'Випадки без повернення', body: 'Порушення Умов використання, акаунт призупинений через зловживання, домени та SSL-сертифікати після реєстрації, запити після 30-денного терміну.' }, { title: 'Процес повернення', body: 'Напишіть на hostpro@apartner.pro. Обробляємо за 1 робочий день; кошти повертаються за 3–7 банківських днів.' }, { title: 'Кредити на акаунт', body: 'Замість повернення на картку можна обрати миттєвий кредит на акаунт.' }, { title: 'Суперечки', body: 'Якщо вважаєте відмову несправедливою: hostpro@apartner.pro' }] },
  notFound: { title: 'Сторінку не знайдено', sub: 'Здається, цієї сторінки не існує або вона була переміщена. Повернімось на потрібний шлях.', home: '← На головну', back: 'Назад' },
  cookies: { title: 'Ми використовуємо cookies', desc: 'Ми використовуємо необхідні cookies для роботи сайту та аналітичні cookies, щоб розуміти як ви ним користуєтесь.', acceptAll: 'Прийняти всі', acceptEssential: 'Лише необхідні', more: 'Конфіденційність' },
}

// Populate RU
t.ru = {
  siteName: 'HostPro',
  siteTagline: 'Современный хостинг для современных проектов.',
  nav: { features: 'Преимущества', pricing: 'Тарифы', about: 'О нас', faq: 'FAQ', contact: 'Контакты', status: 'Статус', cta: 'Начать' },
  footer: { tagline: 'Современный хостинг для современных проектов.', copy: '© 2025 HostPro. Все права защищены.', links: { about: 'О нас', faq: 'FAQ', contact: 'Контакты', status: 'Статус', terms: 'Условия', privacy: 'Конфиденциальность', refund: 'Возврат' } },
  hero: { badge: '⚡ NVMe SSD · 99.9% Uptime · cPanel', title1: 'Хостинг, который', title2: 'просто работает', sub: 'Быстрые SSD-серверы, бесплатный SSL, cPanel и поддержка 24/7. Запустите сайт за минуты.', cta: 'Начать сейчас', ctaSub: 'Без скрытых платежей · Отмена в любое время', stat1: 'Активных сайтов', stat2: 'Время загрузки', stat3: 'Uptime SLA' },
  features: { title: 'Всё, что нужно для успеха', sub: 'Мы позаботились об инфраструктуре — вы сосредоточьтесь на бизнесе', items: [{ icon: '⚡', title: 'NVMe SSD', desc: 'Скорость в 3× быстрее обычного SSD. Ваш сайт загружается мгновенно.' }, { icon: '🔒', title: 'SSL бесплатно', desc: "Let's Encrypt SSL для каждого домена. Автоматически и без доплат." }, { icon: '📋', title: 'cPanel', desc: 'Удобная панель управления для всех сайтов и почтовых ящиков.' }, { icon: '💾', title: 'Ежедневный бекап', desc: 'Автоматические резервные копии каждый день. Восстановление в один клик.' }, { icon: '🌐', title: '99.9% Uptime', desc: 'Гарантированная доступность. SLA-соглашение с каждым тарифом.' }, { icon: '🎧', title: 'Поддержка 24/7', desc: 'Живые специалисты каждый день. Среднее время ответа — 5 минут.' }] },
  billing: { monthly: 'Ежемесячно', quarterly: 'Ежеквартально', yearly: 'Ежегодно', save10: '−5%', save20: '−10%' },
  pricing: { title: 'Прозрачные тарифы', sub: 'Выберите план и масштабируйтесь без ограничений', popular: 'Самый популярный', mo: '/мес', cta: 'Выбрать план', featLabel: 'Включено:', customTitle: 'Не нашли нужный тариф?', customSub: 'Напишите нам — мы подберём индивидуальное решение под ваши нужды и бюджет.', customBtn: '✉️ Написать нам',
    plans: [
      { name: 'Personal',   desc: 'Идеально для первого сайта',        price: 1.99,  color: '#6EE7B7', popular: false, extras: ['1 сайт', '1 GB NVMe SSD', '1 Email аккаунт', 'Бесплатный SSL', 'cPanel', 'Обычная поддержка'] },
      { name: 'Starter',    desc: 'Для растущих проектов',             price: 4.99,  color: '#60A5FA', popular: false,  extras: ['до 5 сайтов', '5 GB NVMe SSD', '10 Email аккаунтов', 'Бесплатный SSL', 'Ежедневный бекап', 'cPanel'] },
      { name: 'Business',   desc: 'Для серьёзных проектов',            price: 14.99, color: '#A78BFA', popular: true, extras: ['до 15 сайтов', '15 GB NVMe SSD', 'Безлимитный Email', 'Бесплатный SSL', 'Приоритетный бекап', 'Приоритетная поддержка'] },
      { name: 'Agency',     desc: 'Для агентств и разработчиков',      price: 19.99, color: '#FB923C', popular: false, extras: ['до 30 сайтов', '30 GB NVMe SSD', 'Безлимитный Email', 'Wildcard SSL', 'White-label готов', 'VIP поддержка 24/7'] },
      { name: 'Agency Pro', desc: 'Максимум ресурсов и возможностей',  price: 29.99, color: '#F472B6', popular: false, extras: ['Безлимитно сайтов', '50 GB NVMe SSD', 'Безлимитный Email', 'Wildcard SSL', 'Персональный менеджер', 'VIP поддержка 24/7'] },
    ],
  },
  who: { title: 'Для кого подходит?', sub: 'Масштабируемое решение для любого размера бизнеса', items: [{ icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Бизнес', desc: 'Корпоративные сайты, лендинги, CRM. Надёжность и скорость для вашего бренда.' }, { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)', title: 'Разработчики', desc: 'Перепродавайте хостинг клиентам под своим брендом. White-label решения.' }, { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Интернет-магазины', desc: 'WooCommerce, PrestaShop, OpenCart. Быстрый хостинг для e-commerce.' }, { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)', title: 'Стартапы', desc: 'Начните малым и масштабируйтесь мгновенно. Без переездов и простоев.' }] },
  cta: { title: 'Готовы начать?', sub: 'Запустите первый сайт уже сегодня — без технических знаний.', btn: 'Начать →' },
  order: { label: 'Заказ плана', nameLbl: 'Ваше имя', namePh: 'Ваше имя', domainLbl: 'Домен / сайт (необязательно)', domainPh: 'yourdomain.com', msgLbl: 'Сообщение (необязательно)', msgPh: 'Любые вопросы или пожелания...', send: 'Отправить заказ →', note: 'Мы свяжемся с вами в течение 5 минут.', success: '✅ Заказ отправлен! Мы свяжемся с вами в ближайшее время.' },
  about: { meta: 'Узнайте больше о команде HostPro — кто мы, наша миссия и ценности.', label: 'О нас', title: 'О нас', h1p1: 'Мы строим', h1p2: 'надёжный интернет', sub: 'Команда энтузиастов, которая верит что качественный хостинг должен быть доступен каждому.', stats: [{ val: '12K+', label: 'Активных сайтов' }, { val: '99.9%', label: 'Uptime SLA' }, { val: '5 мин', label: 'Среднее время ответа' }, { val: '2019', label: 'Год основания' }], missionLabel: 'Наша миссия', missionTitle: 'Хостинг, который просто работает', mission1: 'Мы начинали как небольшая команда разработчиков, уставших от ненадёжных провайдеров. Вместо жалоб — решили сделать лучше. Сегодня HostPro обслуживает тысячи клиентов.', mission2: 'Наши серверы в сертифицированных Tier III датацентрах с резервным питанием и двойным интернет-подключением.', valuesLabel: 'Наши ценности', valuesTitle: 'Что нас движет', values: [{ icon: '⚡', title: 'Скорость прежде всего', desc: 'NVMe SSD, оптимизированные конфигурации и CDN — сайт загружается мгновенно.' }, { icon: '🔒', title: 'Безопасность без компромиссов', desc: 'Авто-SSL, ежедневные бекапы, защита от DDoS и мониторинг 24/7.' }, { icon: '🤝', title: 'Честность и прозрачность', desc: 'Без скрытых платежей. То что на сайте — то вы и получаете.' }, { icon: '🚀', title: 'Рост вместе с вами', desc: 'Начинаете с малого — отлично. Масштабируемся вместе без переездов.' }], teamLabel: 'Команда', teamTitle: 'Люди за HostPro', team: [{ avatar: '👨‍💻', name: 'Алексей М.', role: 'Основатель & CEO' }, { avatar: '👩‍🔧', name: 'Наталья В.', role: 'Head of Infrastructure' }, { avatar: '👨‍🎨', name: 'Денис К.', role: 'Lead Developer' }, { avatar: '👩‍💼', name: 'Мария Л.', role: 'Customer Success' }] },
  faq: { meta: 'Ответы на самые частые вопросы о хостинге HostPro.', label: 'FAQ', title: 'FAQ', h1p1: 'Частые', h1p2: 'вопросы', sub: 'Ответы на самые распространённые вопросы о нашем хостинге.', items: [{ q: 'Что такое cPanel и зачем он нужен?', a: 'cPanel — самая популярная панель управления хостингом. Управляйте файлами, базами данных, почтой, SSL и статистикой. Интуитивный интерфейс даже для новичков.' }, { q: 'Как быстро активируется аккаунт?', a: 'После оплаты аккаунт активируется автоматически за 1–3 минуты. Вы получите email с данными для входа в cPanel.' }, { q: 'Есть ли гарантия возврата денег?', a: 'Да — 30 дней. Если недовольны — возвращаем 100% без лишних вопросов. Только для новых аккаунтов.' }, { q: 'Можно ли перенести существующий сайт?', a: 'Да, миграция бесплатна. Напишите в поддержку с данными текущего хостинга — сделаем всё сами за 24 часа.' }, { q: 'Что входит в бесплатный SSL?', a: "Let's Encrypt SSL для каждого домена и субдомена, обновляется каждые 90 дней. На тарифах Agency — Wildcard SSL." }, { q: 'Как часто делаются бекапы?', a: 'На тарифах Business и выше — ежедневные бекапы хранятся 7 дней. Восстановление одним кликом в cPanel.' }, { q: 'Поддерживаете ли WordPress?', a: 'Да, полностью. Установка в один клик через Softaculous в cPanel. Также WooCommerce, PrestaShop, Joomla, Drupal.' }, { q: 'Что будет если я превышу лимиты?', a: 'Предупредим по email заранее. Сайт не отключится сразу — будет время оптимизировать или перейти на тариф выше.' }, { q: 'Можно ли изменить тариф?', a: 'Конечно. Апгрейд мгновенно, данные сохраняются. Платите только разницу до конца текущего цикла.' }, { q: 'Где находятся серверы?', a: 'Сертифицированные Tier III датацентры в нескольких географических локациях для резервирования и минимальных задержек.' }] },
  contact: { meta: 'Свяжитесь с командой HostPro — поддержка 24/7, ответ за 5 минут.', label: 'Контакты', title: 'Контакты', h1p1: 'Мы здесь,', h1p2: 'чтобы помочь', sub: 'Среднее время ответа — 5 минут. Поддержка доступна 24/7.', channels: [{ icon: '✉️', title: 'Email', desc: 'Общие вопросы и предложения', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '🛠️', title: 'Техническая поддержка', desc: 'Проблемы с сайтом, cPanel, настройка', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '💬', title: 'Live Chat', desc: 'Самый быстрый способ получить ответ', link: 'Открыть чат →', href: '#' }, { icon: '🤝', title: 'Партнёрство', desc: 'White-label, реселеры, корпоративные решения', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }], formLabel: 'Форма обратной связи', formTitle: 'Напишите нам', nameLbl: 'Имя', namePh: 'Ваше имя', emailLbl: 'Email', emailPh: 'your@email.com', topicLbl: 'Тема', msgLbl: 'Сообщение', msgPh: 'Опишите ваш вопрос или проблему...', sendBtn: 'Отправить сообщение →', topics: ['Общий вопрос', 'Техническая поддержка', 'Биллинг и оплата', 'Миграция сайта', 'Партнёрство', 'Другое'], success: '✅ Спасибо! Мы ответим в течение 5 минут.' },
  status: { meta: 'Реальное состояние серверов и сервисов HostPro. Uptime 99.9%.', label: 'Статус системы', title: 'Статус системы', h1p1: 'Всё', h1p2: 'работает', okText: 'Все системы работают нормально', okSub: 'Нет активных инцидентов · Uptime 99.98% за 90 дней', metrics: [{ val: '99.98%', label: 'Uptime (90 дней)' }, { val: '0.3s', label: 'Среднее время ответа' }, { val: '0', label: 'Активных инцидентов' }], svcTitle: 'Статус сервисов', svcSub: 'Реальное время · обновляется каждую минуту', services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'], badge: 'Operational', incTitle: 'Журнал инцидентов', incSub: 'Последние 90 дней', incidents: [{ date: '12 февраля 2025, 03:14 UTC', title: 'Замедление Mail Server EU-1', badge: 'Решено', desc: 'Повышенная нагрузка. Устранено за 18 мин. Ни одного потерянного письма.' }, { date: '28 января 2025, 11:40 UTC', title: 'Плановое обслуживание', badge: 'Завершено', desc: 'Обновление ядра. Окно 23 мин. Все сервисы восстановлены по плану.' }], noMore: 'Больше инцидентов не зафиксировано за этот период' },
  terms: { meta: 'Условия использования услуг хостинга HostPro.', label: 'Юридическая информация', title: 'Условия использования', date: 'Последнее обновление: 1 января 2025', sections: [{ title: 'Общие положения', body: 'Настоящие Условия регулируют доступ и использование услуг HostPro. Используя сервис, вы соглашаетесь с Условиями. HostPro может обновлять их, уведомляя по email за 14 дней.' }, { title: 'Описание услуг', body: 'HostPro предоставляет хостинг на NVMe SSD серверах, включая: доступ к cPanel, почтовые ящики, SSL-сертификаты, ежедневные бекапы и поддержку 24/7.' }, { title: 'Аккаунт и ответственность', body: 'Вы несёте ответственность за конфиденциальность данных аккаунта и весь размещённый контент.' }, { title: 'Запрещённое использование', body: 'Запрещено: незаконный контент, спам, фишинг, нарушение авторских прав, майнинг криптовалюты, DDoS-атаки.' }, { title: 'Оплата и биллинг', body: 'Оплата авансом за выбранный период. Аккаунт может быть приостановлен через 7 дней неоплаты. Данные хранятся 30 дней.' }, { title: 'Гарантия доступности (SLA)', body: 'Гарантируем 99.9% доступности в месяц. Кредиты: 99.0–99.9% = 10%; 95.0–99.0% = 25%; ниже 95% = 50%.' }, { title: 'Ограничение ответственности', body: 'HostPro не несёт ответственности за косвенные убытки. Максимальная ответственность — сумма, уплаченная за последние 3 месяца.' }, { title: 'Расторжение договора', body: 'Вы можете отменить в любое время по email. Данные хранятся 30 дней, затем удаляются.' }, { title: 'Применимое право', body: 'Настоящие Условия регулируются применимым законодательством. Споры — в судах по месту нахождения HostPro.' }, { title: 'Контакты', body: 'Юридические вопросы: hostpro@apartner.pro' }] },
  privacy: { meta: 'Как HostPro собирает, использует и защищает ваши данные. GDPR.', label: 'Конфиденциальность', title: 'Политика конфиденциальности', date: 'Последнее обновление: 1 января 2025', sections: [{ title: 'Какие данные мы собираем', body: 'Мы собираем: идентификационные данные (имя, email, телефон); платёжные данные (обрабатываются через защищённые шлюзы — данные карт не хранятся); технические данные (IP, браузер, ОС, cookies); данные использования.' }, { title: 'Как мы используем данные', body: 'Данные используются исключительно для предоставления сервиса, обработки платежей, поддержки и безопасности. Мы не продаём данные третьим лицам.' }, { title: 'Cookies', body: 'Мы используем необходимые cookies и аналитические cookies. Аналитические можно отключить в настройках браузера.' }, { title: 'Безопасность данных', body: 'Данные хранятся на защищённых серверах в ЕС. TLS для передачи, AES-256 для хранения чувствительных данных.' }, { title: 'Ваши права (GDPR)', body: 'Вы имеете право на: доступ, исправление, удаление, ограничение обработки, возражение, перенос данных. Контакт: hostpro@apartner.pro' }, { title: 'Третьи лица', body: 'Данные передаются только доверенным техническим партнёрам, которые подписывают соглашение по GDPR.' }, { title: 'Сроки хранения', body: 'Данные активных аккаунтов хранятся весь срок услуг. После закрытия — удаляются через 30 дней.' }, { title: 'Изменения Политики', body: 'Существенные изменения сообщаем по email за 30 дней.' }, { title: 'Контакты DPO', body: 'hostpro@apartner.pro' }] },
  refund: { meta: 'Условия возврата средств HostPro. 30-дневная гарантия.', label: 'Возврат средств', title: 'Политика возврата средств', date: 'Последнее обновление: 1 января 2025', sections: [{ title: '30-дневная гарантия возврата', body: 'Если в течение первых 30 дней вы недовольны — возвращаем 100% без лишних вопросов. Только для новых аккаунтов, один раз на клиента.' }, { title: 'Кредиты при смене тарифа', body: 'При апгрейде остаток зачисляется как кредит. При даунгрейде разница зачисляется как кредит на будущие платежи.' }, { title: 'Продление подписки', body: 'Автоматические продления не возвращаются, если услуга использовалась. Отмените за 24 часа до даты продления.' }, { title: 'Случаи без возврата', body: 'Нарушение Условий использования, аккаунт заблокирован из-за злоупотреблений, домены и SSL-сертификаты после регистрации, запросы после 30-дневного срока.' }, { title: 'Процесс возврата', body: 'Напишите на hostpro@apartner.pro. Обрабатываем за 1 рабочий день; средства возвращаются за 3–7 банковских дней.' }, { title: 'Кредиты на аккаунт', body: 'Вместо возврата на карту можно выбрать мгновенный кредит на аккаунт.' }, { title: 'Споры', body: 'Если считаете отказ несправедливым: hostpro@apartner.pro' }] },
  notFound: { title: 'Страница не найдена', sub: 'Похоже, этой страницы не существует или она была перемещена. Вернёмся на нужный путь.', home: '← На главную', back: 'Назад' },
  cookies: { title: 'Мы используем cookies', desc: 'Мы используем необходимые cookies для работы сайта и аналитические cookies, чтобы понимать как вы им пользуетесь.', acceptAll: 'Принять все', acceptEssential: 'Только необходимые', more: 'Конфиденциальность' },
}

export type Translations = typeof t.en
export function getT(lang: Lang): Translations { return t[lang] as Translations }
