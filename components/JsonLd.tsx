import { Lang, getT } from '@/lib/i18n'

const SITE_URL = 'https://hostpro.apartner.pro'

interface JsonLdProps {
  lang: Lang
  page?: 'home' | 'about' | 'contact' | 'faq' | 'pricing' | 'reviews' | 'kb'
  article?: any
}

export default function JsonLd({ lang, page = 'home', article }: JsonLdProps) {
  const langPath = lang === 'en' ? '' : `/${lang}`
  const T = getT(lang)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HostPro',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Ukrainian', 'Russian'],
      email: 'hostpro@apartner.pro',
    },
    sameAs: [],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HostPro',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumb = page !== 'home' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}${langPath}/` },
      { '@type': 'ListItem', position: 2, name: page.charAt(0).toUpperCase() + page.slice(1), item: `${SITE_URL}${langPath}/${page}` },
    ],
  } : null

  const hosting = page === 'home' || page === 'pricing' || page === 'reviews' ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'HostPro Web Hosting',
    image: [`${SITE_URL}/icon-512.png`],
    description: 'Fast NVMe SSD web hosting with cPanel, free SSL and 24/7 support.',
    sku: 'HP-HOST-2025',
    mpn: 'HP-HOST-2025',
    brand: { '@type': 'Brand', name: 'HostPro' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '847',
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '1.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Business', price: '11.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Pro', price: '22.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Agency', price: '45.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Agency Pro', price: '69.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    ],
  } : null

  const localBusiness = page === 'home' ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'HostPro',
    image: [`${SITE_URL}/icon-512.png`],
    url: SITE_URL,
    description: 'Fast NVMe SSD web hosting with cPanel, free SSL, daily backups and 24/7 support.',
    email: 'hostpro@apartner.pro',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '847',
      bestRating: '5',
      worstRating: '1',
    },
  } : null

  const faqSchema = page === 'faq' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: T.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  } : null

  const reviewsSchema = page === 'reviews' ? T.testimonials.items.map((r: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: 'HostPro Web Hosting',
      image: [`${SITE_URL}/icon-512.png`],
      description: 'Fast NVMe SSD web hosting with cPanel, free SSL and 24/7 support.',
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

  const articleSchema = page === 'kb' && article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.title + ' — HostPro Knowledge Base.',
    image: [`${SITE_URL}/icon-512.png`],
    author: {
      '@type': 'Organization',
      name: 'HostPro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HostPro',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`
      }
    },
    datePublished: '2025-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${langPath}/kb/${article.catSlug}/${article.slug}`
    }
  } : null

  const schemas = [organization, website, breadcrumb, hosting, localBusiness, faqSchema, articleSchema, ...(Array.isArray(reviewsSchema) ? reviewsSchema : [reviewsSchema])].filter(Boolean)

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
