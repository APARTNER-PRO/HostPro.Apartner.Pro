import { Lang, getT, LANGS } from '@/lib/i18n'

const SITE_URL = 'https://hostpro.apartner.pro'

interface JsonLdProps {
  lang: Lang
  page?: 'home' | 'about' | 'contact' | 'faq' | 'pricing' | 'reviews' | 'kb' | 'free-php-hosting' | 'free-personal-hosting' | 'free-wordpress-hosting' | 'free-hosting' | 'partner-free-hosting' | 'wordpress-hosting' | 'laravel-hosting' | 'php-hosting' | 'prestashop-hosting' | 'vps-hosting' | 'dedicated-servers' | 'reseller-hosting' | 'blog' | string
  article?: any
}

export default function JsonLd({ lang, page = 'home', article }: JsonLdProps) {
  const langPath = lang === 'en' ? '' : `/${lang}`
  const T = getT(lang)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'HostPro',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: '512',
      height: '512'
    },
    image: `${SITE_URL}/icon-512.png`,
    description: T.hero.sub,
    foundingDate: '2019',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Ukrainian', 'Russian'],
      email: 'hostpro@apartner.pro',
      url: `${SITE_URL}${langPath}/contact`
    },
    sameAs: [], // Add social links here if any
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'HostPro',
    url: SITE_URL,
    description: T.hero.sub,
    inLanguage: LANGS,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}${langPath}/kb?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  // Localize breadcrumb labels
  const breadcrumbLabels: Record<string, string> = {
    home: lang === 'uk' ? 'Головна' : (lang === 'ru' ? 'Главная' : 'Home'),
    about: T.nav.about,
    contact: T.nav.contact,
    faq: T.nav.faq,
    pricing: T.nav.pricing,
    reviews: T.nav.reviews,
    kb: T.footer.links.kb,
    'wordpress-hosting': T.footer.links.wpHosting,
    'laravel-hosting': T.footer.links.laravelHosting,
    'php-hosting': T.footer.links.phpHosting,
    'prestashop-hosting': T.footer.links.prestashopHosting,
    'free-hosting': T.footer.links.freeHosting,
    'vps-hosting': T.footer.links.vpsHosting,
    'dedicated-servers': T.footer.links.dedicated,
    'reseller-hosting': T.footer.links.resellerHosting,
  }

  const breadcrumb = page !== 'home' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { 
        '@type': 'ListItem', 
        position: 1, 
        name: breadcrumbLabels.home, 
        item: `${SITE_URL}${langPath}/` 
      },
      { 
        '@type': 'ListItem', 
        position: 2, 
        name: breadcrumbLabels[page] || page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' '), 
        item: `${SITE_URL}${langPath}/${page}` 
      },
    ],
  } : null

  // Use Service schema for hosting as it's more accurate
  const hosting = page === 'home' || page === 'pricing' || page === 'reviews' || page.includes('hosting') || page === 'dedicated-servers' ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Hosting',
    provider: { '@id': `${SITE_URL}/#organization` },
    name: page.includes('hosting') ? breadcrumbLabels[page] : 'HostPro Web Hosting',
    image: [`${SITE_URL}/icon-512.png`],
    description: T.hero.sub,
    brand: { '@type': 'Brand', name: 'HostPro' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '847',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: T.pricing.plans[0].price,
      highPrice: T.pricing.plans[T.pricing.plans.length - 1].price,
      offerCount: T.pricing.plans.length,
      offers: T.pricing.plans.map((plan: any) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${langPath}/#pricing`
      }))
    }
  } : null

  const localBusiness = page === 'home' ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'HostPro',
    image: [`${SITE_URL}/icon-512.png`],
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: T.hero.sub,
    email: 'hostpro@apartner.pro',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Warsaw',
      addressCountry: 'PL'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '847',
      bestRating: '5',
      worstRating: '1',
    },
  } : null

  let faqSchema = null
  let faqItems = null
  if (page === 'faq' || page === 'home') faqItems = T.faq.items
  else if (page === 'free-php-hosting') faqItems = T.freePhp.faq.items
  else if (page === 'free-personal-hosting') faqItems = T.freePersonal.faq.items
  else if (page === 'free-wordpress-hosting') faqItems = T.freeWp.faq.items

  if (faqItems) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item: any) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    }
  }

  const reviewsSchema = page === 'reviews' || page === 'home' ? T.testimonials.items.slice(0, 3).map((r: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: 'HostPro Web Hosting',
      image: [`${SITE_URL}/icon-512.png`],
      description: T.hero.sub,
      brand: { '@type': 'Brand', name: 'HostPro' },
    },
    author: {
      '@type': 'Person',
      name: r.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.stars,
    },
    reviewBody: r.text,
  })) : null

  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || article.title,
    image: [article.image || `${SITE_URL}/og-image.png`],
    author: {
      '@type': 'Organization',
      name: article.author || 'HostPro',
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: article.datePublished || '2025-01-01',
    dateModified: article.dateModified || article.datePublished || '2025-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${langPath}${article.path || ''}`
    }
  } : null

  const blogSchema = page === 'blog' ? {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: T.blog.title,
    description: T.blog.meta,
    publisher: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}${langPath}/blog`
  } : null

  const schemas = [
    organization, 
    website, 
    breadcrumb, 
    hosting, 
    localBusiness, 
    faqSchema, 
    articleSchema, 
    blogSchema,
    ...(Array.isArray(reviewsSchema) ? reviewsSchema : [reviewsSchema])
  ].filter(Boolean)

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
