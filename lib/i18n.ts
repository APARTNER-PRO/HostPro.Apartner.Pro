export const LANGS = ['en', 'uk', 'ru'] as const
export type Lang = typeof LANGS[number]

export const LANG_META: Record<Lang, { label: string; flag: string; locale: string }> = {
  en: { label: 'English',     flag: '🇬🇧', locale: 'en_US' },
  uk: { label: 'Українська', flag: '🇺🇦', locale: 'uk_UA' },
  ru: { label: 'Русский',    flag: 'ua', locale: 'ru_RU' },
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
      reviews: 'Reviews',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      status: 'Status',
      cta: 'Get Started',
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
      save30: '−25%',
      monthTerm: '1 month',
      quarterTerm: '3 months',
      yearTerm: '1 year',
      threeYearTerm: '3 years',
      payToday: 'Pay',
      today: 'today',
      for: 'For',
      then: 'then',
      onRenewal: 'on renewal',
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
          extras: ['1 Website', '1 GB NVMe SSD', '1 Email Account', 'Free SSL', 'cPanel', 'Node.js', 'Standard Support'] },
        { name: 'Starter',    desc: 'For growing projects',             price: 4.99,  color: '#60A5FA', popular: false,
          extras: ['Up to 5 Websites', '5 GB NVMe SSD', '10 Email Accounts', 'Free SSL', 'Backups', 'cPanel', 'Node.js'] },
        { name: 'Business',   desc: 'For serious projects',             price: 14.99, color: '#A78BFA', popular: false,
          extras: ['Up to 15 Websites', '15 GB NVMe SSD', 'Unlimited Email', 'Free SSL', 'Priority Backups', 'Priority Support', 'Node.js'] },
        { name: 'Agency',     desc: 'For agencies & developers',        price: 19.99, color: '#FB923C', popular: true,
          extras: ['Up to 25 Websites', '25 GB NVMe SSD', 'Unlimited Email', 'Wildcard SSL', 'Priority Backups', 'VIP 24/7 Support', 'Node.js'] },
        { name: 'Agency Pro', desc: 'Maximum resources & capabilities', price: 29.99, color: '#F472B6', popular: false,
          extras: ['Unlimited Websites', '50 GB NVMe SSD', 'Unlimited Email', 'Wildcard SSL', 'Dedicated Manager', 'VIP 24/7 Support', 'Node.js'] },
      ],
    },

    who: {
      title: 'Who is it for?',
      sub: 'Scalable solution for every business size',
      items: [
        { icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Businesses',    desc: 'Corporate sites, landing pages, CRM. Reliability and speed for your brand.' },
        { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)',  title: 'Developers',   desc: 'Resell hosting to clients. Powerful infrastructure for your business.' },
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
        { icon: '✉️', title: 'Email',            desc: 'General questions & suggestions',         link: 'hostpro@apartner.pro',    href: 'mailto:hostpro@apartner.pro' },
        { icon: '🛠️', title: 'Technical Support', desc: 'Site issues, cPanel, configuration',      link: 'hostpro@apartner.pro',  href: 'mailto:hostpro@apartner.pro' },
        { icon: '💬', title: 'Live Chat',         desc: 'Fastest way to get an answer',            link: 'Open chat →',          href: '#' },
        { icon: '🤝', title: 'Partnerships',      desc: 'Resellers, enterprise solutions',      link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' },
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
    kb: {
      meta: 'Knowledge Base — find guides, tutorials and answers to your hosting questions.',
      title: 'Knowledge Base',
      sub: 'Search our library of help articles and tutorials.',
      searchPh: 'Search for articles...',
      helpful: 'Was this article helpful?',
      yes: 'Yes',
      no: 'No',
      categories: [
        { title: 'Getting Started', count: 12, icon: '🚀' },
        { title: 'cPanel & Hosting', count: 24, icon: '📋' },
        { title: 'Domains & DNS', count: 15, icon: '🌐' },
        { title: 'Email Setup', count: 18, icon: '📧' },
        { title: 'WordPress Guides', count: 21, icon: '📝' },
        { title: 'Security & SSL', count: 10, icon: '🔒' },
      ],
      popular: 'Popular Articles',
      popularItems: [
        { title: 'How to login to cPanel', slug: 'how-to-login-to-cpanel' },
        { title: 'Changing your nameservers', slug: 'changing-your-nameservers' },
        { title: 'Setting up email on iPhone', slug: 'setting-up-email-on-iphone' },
        { title: 'Installing WordPress via Softaculous', slug: 'installing-wordpress-via-softaculous' },
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
        }
      ]
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
    }
  },

  // ── UKRAINIAN ──────────────────────────────────────────────────────────────
  uk: {} as any,
  ru: {} as any,
}

// Populate UK
t.uk = {
  siteName: 'HostPro',
  siteTagline: 'Сучасний хостинг для сучасних проєктів.',
  nav: { features: 'Переваги', pricing: 'Тарифи', reviews: 'Відгуки', about: 'Про нас', faq: 'FAQ', contact: 'Контакти', status: 'Статус', cta: 'Розпочати' },
  footer: { tagline: 'Сучасний хостинг для сучасних проєктів.', copy: '© 2025 HostPro. Усі права захищені.', cols: { products: 'Продукти', services: 'Послуги', resources: 'Ресурси', legal: 'Юридична інформація' }, links: { pricing: 'Тарифи', faq: 'FAQ', status: 'Статус системи', wpHosting: 'WordPress хостинг', vpsHosting: 'VPS хостинг', dedicated: 'Виділені сервери', laravelHosting: 'Laravel хостинг', kb: 'База знань', blog: 'Блог', about: 'Про нас', reviews: 'Відгуки', contact: 'Контакти', terms: 'Умови використання', privacy: 'Конфіденційність', refund: 'Повернення коштів' } },
  hero: { badge: '⚡ NVMe SSD · Node.js · 99.9% Uptime · cPanel', title1: 'Хостинг, який', title2: 'просто працює', sub: 'Швидкі SSD-сервери, безкоштовний SSL, cPanel та підтримка 24/7. Запустіть свій сайт за хвилини.', cta: 'Почати зараз', ctaSub: 'Без прихованих платежів · Скасування в будь-який час', stat1: 'Активних сайтів', stat2: 'Час завантаження', stat3: 'Uptime SLA' },
  features: { title: 'Все, що потрібно для успіху', sub: 'Ми подбали про інфраструктуру — ви зосередьтесь на бізнесі', items: [
    { icon: '⚡', title: 'NVMe SSD', desc: 'Швидкість у 3× швидша за звичайний SSD. Ваш сайт завантажується миттєво.' },
    { icon: '🔒', title: 'SSL безкоштовно', desc: "Let's Encrypt SSL для кожного домену. Автоматично й без доплат." },
    { icon: '📋', title: 'cPanel', desc: 'Зручна панель управління для всіх ваших сайтів і поштових скриньок.' },
    { icon: '💾', title: 'Щоденний бекап', desc: 'Автоматичні резервні копії щодня. Відновлення в один клік.' },
    { icon: '🌐', title: '99.9% Uptime', desc: 'Гарантована доступність. SLA-угода з кожним тарифом.' },
    { icon: '🎧', title: 'Підтримка 24/7', desc: 'Живі спеціалісти щодня. Середній час відповіді — 5 хвилин.' },
    { icon: '📧', title: 'Поштові скриньки', desc: 'Створюйте професійні email-адреси на вашому домені. Безлімітний доступ по IMAP/POP3/SMTP.' },
    { icon: '🚀', title: 'Встановлення в 1 клік', desc: 'Автоматичне встановлення WordPress, Joomla та ще 400+ скриптів через Softaculous.' },
  ]},
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
  billing: { monthly: 'Щомісяця', quarterly: 'Щоквартально', yearly: 'Щорічно', threeYears: 'На 3 роки', save10: '−10%', save20: '−20%', save30: '−25%', monthTerm: '1 місяць', quarterTerm: '3 місяці', yearTerm: '1 рік', threeYearTerm: '3 роки', payToday: 'Оплатити', today: 'сьогодні', for: 'На', then: 'потім', onRenewal: 'при поновленні' },
  pricing: { title: 'Прозорі тарифи', sub: 'Оберіть план і масштабуйтесь без обмежень', popular: 'Найпопулярніший', mo: '/міс', cta: 'Обрати план', featLabel: 'Включено:', customTitle: 'Не знайшли потрібний тариф?', customSub: 'Напишіть нам — ми підберемо індивідуальне рішення під ваші потреби та бюджет.', customBtn: '✉️ Написати нам',
    plans: [
      { name: 'Personal',   desc: 'Ідеально для першого сайту',          price: 1.99,  color: '#6EE7B7', popular: false, extras: ['1 сайт', '1 GB NVMe SSD', '1 Email акаунт', 'Безкоштовний SSL', 'cPanel', 'Node.js', 'Звичайна підтримка'] },
      { name: 'Starter',    desc: 'Для зростаючих проєктів',             price: 4.99,  color: '#60A5FA', popular: false,  extras: ['до 5 сайтів', '5 GB NVMe SSD', '10 Email акаунтів', 'Безкоштовний SSL', 'Бекапи', 'cPanel', 'Node.js'] },
      { name: 'Business',   desc: 'Для серйозних проєктів',              price: 14.99, color: '#A78BFA', popular: false, extras: ['до 15 сайтів', '15 GB NVMe SSD', 'Необмежено Email', 'Безкоштовний SSL', 'Пріоритетний бекап', 'Пріоритетна підтримка', 'Node.js'] },
      { name: 'Agency',     desc: 'Для агентств і розробників',          price: 19.99, color: '#FB923C', popular: true, extras: ['до 25 сайтів', '25 GB NVMe SSD', 'Необмежено Email', 'Wildcard SSL', 'Пріоритетний бекап', 'VIP підтримка 24/7', 'Node.js'] },
      { name: 'Agency Pro', desc: 'Максимум ресурсів і можливостей',     price: 29.99, color: '#F472B6', popular: false, extras: ['Необмежено сайтів', '50 GB NVMe SSD', 'Необмежено Email', 'Wildcard SSL', 'Виділений менеджер', 'VIP підтримка 24/7', 'Node.js'] },
    ],
  },
  who: { title: 'Для кого підходить?', sub: 'Масштабоване рішення для будь-якого розміру бізнесу', items: [
    { icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Бізнес',            desc: 'Корпоративні сайти, лендинги, CRM. Надійність і швидкість для вашого бренду.' },
    { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)',  title: 'Розробники',       desc: 'Перепродавайте хостинг клієнтам. Потужна інфраструктура для вашого бізнесу.' },
    { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Інтернет-магазини', desc: 'WooCommerce, PrestaShop, OpenCart. Швидкий хостинг для e-commerce.' },
    { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)',  title: 'Стартапи',          desc: 'Почніть малим і масштабуйтесь миттєво. Без переїздів і простоїв.' },
  ]},
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
  contact: { meta: "Зв'яжіться з командою HostPro — підтримка 24/7, відповідь якомога швидше.", label: 'Контакти', title: 'Контакти', h1p1: 'Ми тут,', h1p2: 'щоб допомогти', sub: 'Середній час відповіді — якомога швидше. Підтримка доступна 24/7.', channels: [{ icon: '✉️', title: 'Email', desc: 'Загальні питання та пропозиції', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '🛠️', title: 'Технічна підтримка', desc: 'Проблеми з сайтом, cPanel, налаштування', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }, { icon: '💬', title: 'Live Chat', desc: 'Найшвидший спосіб отримати відповідь', link: 'Відкрити чат →', href: '#' }, { icon: '🤝', title: 'Партнерство', desc: 'Реселери, корпоративні рішення', link: 'hostpro@apartner.pro', href: 'mailto:hostpro@apartner.pro' }], formLabel: "Форма зворотнього зв'язку", formTitle: 'Напишіть нам', nameLbl: "Ім'я", namePh: "Ваше ім'я", emailLbl: 'Email', emailPh: 'your@email.com', topicLbl: 'Тема', msgLbl: 'Повідомлення', msgPh: 'Опишіть ваше питання або проблему...', sendBtn: 'Надіслати повідомлення →', topics: ['Загальне питання', 'Технічна підтримка', 'Білінг та оплата', 'Міграція сайту', 'Партнерство', 'Інше'], success: '✅ Дякуємо! Ми відповімо якомога швидше.' },
  status: { meta: 'Реальний стан серверів та сервісів HostPro. Uptime 99.9%.', label: 'Статус системи', title: 'Статус системи', h1p1: 'Все', h1p2: 'працює', okText: 'Всі системи працюють нормально', okSub: 'Жодних активних інцидентів · Uptime 99.98% за 90 днів', metrics: [{ val: '99.98%', label: 'Uptime (90 днів)' }, { val: '0.3s', label: 'Серед. відповідь' }, { val: '0', label: 'Активних інцидентів' }], svcTitle: 'Статус сервісів', svcSub: 'Реальний час · оновлюється щохвилини', services: ['🌐 Web Servers', '📋 cPanel / WHM', '🗄️ MySQL Databases', '📧 Mail Servers', '🔒 SSL Provisioning', '💾 Backup System', '🌍 DNS'], badge: 'Operational', incTitle: 'Журнал інцидентів', incSub: 'Останні 90 днів', incidents: [{ date: '12 лютого 2025, 03:14 UTC', title: 'Уповільнення Mail Server EU-1', badge: 'Вирішено', desc: 'Підвищене навантаження. Усунено за 18 хв. Жодного втраченого листа.' }, { date: '28 січня 2025, 11:40 UTC', title: 'Планове обслуговування', badge: 'Завершено', desc: 'Оновлення ядра. Вікно 23 хв. Всі сервіси відновлено за планом.' }], noMore: 'Більше інцидентів не зафіксовано за цей період' },
  terms: { meta: 'Умови використання послуг хостингу HostPro.', label: 'Юридична інформація', title: 'Умови використання', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: 'Загальні положення', body: 'Ці Умови регулюють доступ і використання послуг HostPro. Використовуючи сервіс, ви погоджуєтесь з Умовами. HostPro може оновлювати їх, повідомляючи по email за 14 днів.' }, { title: 'Опис послуг', body: 'HostPro надає хостинг на NVMe SSD серверах, включаючи: доступ до cPanel, поштові скриньки, SSL-сертифікати, щоденні бекапи та підтримку 24/7.' }, { title: 'Акаунт і відповідальність', body: 'Ви відповідаєте за конфіденційність даних акаунту та весь контент, розміщений через сервіс.' }, { title: 'Заборонене використання', body: 'Забороняється: незаконний контент, спам, фішинг, порушення авторських прав, майнінг криптовалюти, DDoS-атаки.' }, { title: 'Оплата та білінг', body: 'Оплата авансом за обраний період. Акаунт може бути призупинений через 7 днів несплати. Дані зберігаються 30 днів після призупинення.' }, { title: 'Гарантія доступності (SLA)', body: 'Гарантуємо 99.9% доступності на місяць. Кредити: 99.0–99.9% = 10%; 95.0–99.0% = 25%; нижче 95% = 50%.' }, { title: 'Обмеження відповідальності', body: 'HostPro не відповідає за непрямі збитки. Максимальна відповідальність — сума, сплачена за останні 3 місяці.' }, { title: 'Розірвання договору', body: 'Ви можете скасувати в будь-який час по email. Дані зберігаються 30 днів, потім видаляються.' }, { title: 'Застосовне право', body: 'Ці Умови регулюються законодавством України. Спори — в судах за місцем знаходження HostPro.' }, { title: 'Контакти', body: 'Юридичні питання: hostpro@apartner.pro' }] },
  privacy: { meta: 'Як HostPro збирає, використовує та захищає ваші персональні дані. GDPR.', label: 'Конфіденційність', title: 'Політика конфіденційності', date: 'Останнє оновлення: 1 січня 2025', sections: [{ title: 'Які дані ми збираємо', body: "Ми збираємо: ідентифікаційні дані (ім'я, email, телефон); платіжні дані (обробляються через захищені шлюзи — дані карток не зберігаємо); технічні дані (IP, браузер, ОС, cookies); дані використання." }, { title: 'Як ми використовуємо ваші дані', body: 'Дані використовуються виключно для надання сервісу, обробки платежів, підтримки та безпеки. Ми не продаємо персональні дані третім особам.' }, { title: 'Cookies', body: 'Ми використовуємо необхідні cookies та аналітичні cookies. Аналітичні можна відключити в налаштуваннях браузера.' }, { title: 'Безпека даних', body: 'Дані зберігаються на захищених серверах в ЄС. TLS для передачі, AES-256 для зберігання чутливих даних.' }, { title: 'Ваші права (GDPR)', body: 'Ви маєте право на: доступ, виправлення, видалення, обмеження обробки, заперечення, перенесення даних. Контакт: hostpro@apartner.pro' }, { title: 'Треті особи', body: 'Дані передаються лише надійним технічним партнерам, які підписують угоду про обробку даних відповідно до GDPR.' }, { title: 'Строки зберігання', body: 'Дані активних акаунтів зберігаються весь термін послуг. Після закриття — видаляються через 30 днів.' }, { title: 'Зміни Політики', body: 'Суттєві зміни повідомляємо по email за 30 днів.' }, { title: 'Контакти DPO', body: 'hostpro@apartner.pro' }] },
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
  kb: {
    meta: 'База знань — інструкції, посібники та відповіді на питання про хостинг.',
    title: 'База знань',
    sub: 'Шукайте відповіді у нашій бібліотеці інструкцій.',
    searchPh: 'Шукати статті...',
    helpful: 'Чи була ця стаття корисною?',
    yes: 'Так',
    no: 'Ні',
    categories: [
      { title: 'З чого почати', count: 12, icon: '🚀' },
      { title: 'cPanel та хостинг', count: 24, icon: '📋' },
      { title: 'Домени та DNS', count: 15, icon: '🌐' },
      { title: 'Налаштування пошти', count: 18, icon: '📧' },
      { title: 'WordPress інструкції', count: 21, icon: '📝' },
      { title: 'Безпека та SSL', count: 10, icon: '🔒' },
    ],
    popular: 'Популярні статті',
    popularItems: [
      { title: 'Як увійти в cPanel', slug: 'how-to-login-to-cpanel' },
      { title: 'Як змінити DNS сервери', slug: 'changing-your-nameservers' },
      { title: 'Налаштування пошти на iPhone', slug: 'setting-up-email-on-iphone' },
      { title: 'Встановлення WordPress через Softaculous', slug: 'installing-wordpress-via-softaculous' },
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
      }
    ]
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
  }
}

// Populate RU
t.ru = {
  siteName: 'HostPro',
  siteTagline: 'Современный хостинг для современных проектов.',
  nav: { features: 'Преимущества', pricing: 'Тарифы', reviews: 'Отзывы', about: 'О нас', faq: 'FAQ', contact: 'Контакты', status: 'Статус', cta: 'Начать' },
  footer: { tagline: 'Современный хостинг для современных проектов.', copy: '© 2025 HostPro. Все права защищены.', cols: { products: 'Продукты', services: 'Услуги', resources: 'Ресурсы', legal: 'Юридическая информация' }, links: { pricing: 'Тарифы', faq: 'FAQ', status: 'Статус системы', wpHosting: 'WordPress хостинг', vpsHosting: 'VPS хостинг', dedicated: 'Выделенные серверы', laravelHosting: 'Laravel хостинг', kb: 'База знаний', blog: 'Блог', about: 'О нас', reviews: 'Отзывы', contact: 'Контакты', terms: 'Условия использования', privacy: 'Конфиденциальность', refund: 'Возврат средств' } },
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
  billing: { monthly: 'Ежемесячно', quarterly: 'Ежеквартально', yearly: 'Ежегодно', threeYears: 'На 3 года', save10: '−10%', save20: '−20%', save30: '−25%', monthTerm: '1 месяц', quarterTerm: '3 месяца', yearTerm: '1 год', threeYearTerm: '3 года', payToday: 'Оплатить', today: 'сегодня', for: 'На', then: 'затем', onRenewal: 'при возобновлении' },
  pricing: { title: 'Прозрачные тарифы', sub: 'Выберите план и масштабируйтесь без ограничений', popular: 'Самый популярный', mo: '/мес', cta: 'Выбрать план', featLabel: 'Включено:', customTitle: 'Не нашли нужный тариф?', customSub: 'Напишите нам — мы подберём индивидуальное решение под ваши нужды и бюджет.', customBtn: '✉️ Написать нам',
    plans: [
      { name: 'Personal',   desc: 'Идеально для первого сайта',        price: 1.99,  color: '#6EE7B7', popular: false, extras: ['1 сайт', '1 GB NVMe SSD', '1 Email аккаунт', 'Бесплатный SSL', 'cPanel', 'Node.js', 'Обычная поддержка'] },
      { name: 'Starter',    desc: 'Для растущих проектов',             price: 4.99,  color: '#60A5FA', popular: false,  extras: ['до 5 сайтов', '5 GB NVMe SSD', '10 Email аккаунтов', 'Бесплатный SSL', 'Бекапы', 'cPanel', 'Node.js'] },
      { name: 'Business',   desc: 'Для серьёзных проектов',            price: 14.99, color: '#A78BFA', popular: false, extras: ['до 15 сайтов', '15 GB NVMe SSD', 'Безлимитный Email', 'Бесплатный SSL', 'Приоритетный бекап', 'Приоритетная поддержка', 'Node.js'] },
      { name: 'Agency',     desc: 'Для агентств и разработчиков',      price: 19.99, color: '#FB923C', popular: true, extras: ['до 25 сайтов', '25 GB NVMe SSD', 'Безлимитный Email', 'Wildcard SSL', 'Приоритетный бекап', 'VIP поддержка 24/7', 'Node.js'] },
      { name: 'Agency Pro', desc: 'Максимум ресурсов и возможностей',  price: 29.99, color: '#F472B6', popular: false, extras: ['Безлимитно сайтов', '50 GB NVMe SSD', 'Безлимитный Email', 'Wildcard SSL', 'Персональный менеджер', 'VIP поддержка 24/7', 'Node.js'] },
    ],
  },
  who: { title: 'Для кого подходит?', sub: 'Масштабируемое решение для любого размера бизнеса', items: [{ icon: '🏢', color: '#6EE7B7', bg: 'rgba(110,231,183,.1)', title: 'Бизнес', desc: 'Корпоративные сайты, лендинги, CRM. Надёжность и скорость для вашего бренда.' }, { icon: '👨‍💻', color: '#60A5FA', bg: 'rgba(96,165,250,.1)', title: 'Разработчики', desc: 'Перепродавайте хостинг клиентам под своим брендом. Мощная инфраструктура для вашего бизнеса.' }, { icon: '🛒', color: '#A78BFA', bg: 'rgba(167,139,250,.1)', title: 'Интернет-магазины', desc: 'WooCommerce, PrestaShop, OpenCart. Быстрый хостинг для e-commerce.' }, { icon: '🚀', color: '#FB923C', bg: 'rgba(251,146,60,.1)', title: 'Стартапы', desc: 'Начните малым и масштабируйтесь мгновенно. Без переездов и простоев.' }] },
  cta: { title: 'Готовы начать?', sub: 'Запустите первый сайт уже сегодня — без технических знаний.', btn: 'Начать →' },
  order: { label: 'Заказ плана', nameLbl: 'Ваше имя', namePh: 'Ваше имя', domainLbl: 'Домен / сайт (необязательно)', domainPh: 'yourdomain.com', msgLbl: 'Сообщение (необязательно)', msgPh: 'Любые вопросы или пожелания...', send: 'Отправить заказ →', note: 'Свяжемся с вами как можно быстрее.', success: '✅ Заказ отправлен! Мы свяжемся с вами в ближайшее время.' },
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
  faq: { meta: 'Ответы на самые частые вопросы о хостинге HostPro.', label: 'FAQ', title: 'FAQ', h1p1: 'Частые', h1p2: 'вопросы', sub: 'Ответы на самые распространённые вопросы о нашем хостинге.', items: [{ q: 'Что такое cPanel и зачем он нужен?', a: 'cPanel — самая популярная панель управления хостингом. Управляйте файлами, базами данных, почтой, SSL и статистикой. Интуитивный интерфейс даже для новичков.' }, { q: 'Как быстро активируется аккаунт?', a: 'После оплаты аккаунт активируется автоматически. Обычно это занимает 1-3 минуты, но в отдельных случаях (в зависимости от нагрузки) может длиться до 5 часов. Вы получите email с данными для входа в cPanel.' }, { q: 'Есть ли гарантия возврата денег?', a: 'Да — 14 дней. Если недовольны — возвращаем 100% без лишних вопросов. Только для новых аккаунтов.' }, { q: 'Можно ли перенести существующий сайт?', a: 'Да, миграция бесплатна. Напишите в поддержку с данными текущего хостинга — сделаем всё сами за 24 часа.' }, { q: 'Что входит в бесплатный SSL?', a: "Let's Encrypt SSL для каждого домена и субдомена, обновляется каждые 90 дней. На тарифах Agency — Wildcard SSL." }, { q: 'Как часто делаются бекапы?', a: 'На тарифах Business и выше — ежедневные бекапы хранятся 7 дней. Восстановление одним кликом в cPanel.' }, { q: 'Поддерживаете ли WordPress?', a: 'Да, полностью. Установка в один клик через Softaculous в cPanel. Также WooCommerce, PrestaShop, Joomla, Drupal.' }, { q: 'Что будет если я превышу лимиты?', a: 'Предупредим по email заранее. Сайт не отключится сразу — будет время оптимизировать или перейти на тариф выше.' }, { q: 'Можно ли изменить тариф?', a: 'Конечно. Апгрейд мгновенно, данные сохраняются. Платите только разницу до конца текущего цикла.' }, { q: 'Где находятся серверы?', a: 'Сертифицированные Tier III датацентры в нескольких географических локациях для резервирования и минимальных задержек.' }] },
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
  kb: {
    meta: 'База знаний — инструкции, руководства и ответы на вопросы о хостинге.',
    title: 'База знаний',
    sub: 'Ищите ответы в нашей библиотеке инструкций.',
    searchPh: 'Искать статьи...',
    helpful: 'Была ли эта статья полезной?',
    yes: 'Да',
    no: 'Нет',
    categories: [
      { title: 'С чего начать', count: 12, icon: '🚀' },
      { title: 'cPanel и хостинг', count: 24, icon: '📋' },
      { title: 'Домены и DNS', count: 15, icon: '🌐' },
      { title: 'Настройка почты', count: 18, icon: '📧' },
      { title: 'WordPress инструкции', count: 21, icon: '📝' },
      { title: 'Безопасность и SSL', count: 10, icon: '🔒' },
    ],
    popular: 'Популярные статьи',
    popularItems: [
      { title: 'Как войти в cPanel', slug: 'how-to-login-to-cpanel' },
      { title: 'Как сменить DNS серверы', slug: 'how-to-login-to-server' },
      { title: 'Настройка почты на iPhone', slug: 'setting-up-email-on-iphone' },
      { title: 'Установка WordPress через Softaculous', slug: 'installing-wordpress-via-softaculous' },
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
      }
    ]
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
  }
}

export type Translations = typeof t.en
export function getT(lang: Lang): Translations { return t[lang] as Translations }
