import { Lang } from '@/lib/i18n'

const SITE_URL = 'https://hostpro.apartner.pro'

interface JsonLdProps {
  lang: Lang
  page?: 'home' | 'about' | 'contact' | 'faq' | 'pricing'
}

export default function JsonLd({ lang, page = 'home' }: JsonLdProps) {
  const langPath = lang === 'en' ? '' : `/${lang}`

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

  const hosting = page === 'home' || page === 'pricing' ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'HostPro Web Hosting',
    description: 'Fast NVMe SSD web hosting with cPanel, free SSL and 24/7 support.',
    brand: { '@type': 'Brand', name: 'HostPro' },
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '3.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Business', price: '11.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Pro', price: '22.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Agency', price: '45.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Agency Pro', price: '69.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    ],
  } : null

  const schemas = [organization, website, breadcrumb, hosting].filter(Boolean)

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
