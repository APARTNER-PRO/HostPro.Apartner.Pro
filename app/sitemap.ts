import { MetadataRoute } from 'next'
import { LANGS, getT } from '@/lib/i18n'

const BASE = 'https://hostpro.apartner.pro'
const STATIC_PAGES = ['', 'about', 'faq', 'contact', 'status', 'terms', 'privacy', 'refund', 'pricing', 'reviews', 'ai-assistant', 'blog']
const SERVICE_PAGES = ['wordpress-hosting', 'laravel-hosting', 'php-hosting', 'prestashop-hosting', 'free-hosting', 'free-wordpress-hosting', 'free-php-hosting', 'free-personal-hosting', 'partner-free-hosting', 'vps-hosting', 'dedicated-servers', 'reseller-hosting']

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const allPages = [...STATIC_PAGES, ...SERVICE_PAGES]

  // 1. Process Static and Service Pages
  for (const page of allPages) {
    const slug = page ? `/${page}` : ''
    entries.push({
      url: `${BASE}${slug || '/'}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: `${BASE}${slug || '/'}`,
          uk: `${BASE}/uk${slug}`,
          ru: `${BASE}/ru${slug}`,
        },
      },
    })
  }

  // 2. Process KB Categories and Articles (Dynamic from i18n)
  // We use English as the base for slugs, but add alternates for all
  const T = getT('en')
  
  // KB Root
  entries.push({
    url: `${BASE}/kb`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        en: `${BASE}/kb`,
        uk: `${BASE}/uk/kb`,
        ru: `${BASE}/ru/kb`,
      },
    },
  })

  // KB Categories
  T.kb.categories.forEach((cat: any) => {
    entries.push({
      url: `${BASE}/kb/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE}/kb/${cat.slug}`,
          uk: `${BASE}/uk/kb/${cat.slug}`,
          ru: `${BASE}/ru/kb/${cat.slug}`,
        },
      },
    })
  })

  // KB Articles
  T.kb.articles.forEach((art: any) => {
    // Find category slug for the article
    const cat = T.kb.categories.find((c: any) => c.title === art.cat)
    const catSlug = cat ? cat.slug : 'general'
    
    entries.push({
      url: `${BASE}/kb/${catSlug}/${art.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${BASE}/kb/${catSlug}/${art.slug}`,
          uk: `${BASE}/uk/kb/${catSlug}/${art.slug}`,
          ru: `${BASE}/ru/kb/${catSlug}/${art.slug}`,
        },
      },
    })
  })

  // 3. Process Hosting Types (Hub and Sub-pages)
  // Hub
  entries.push({
    url: `${BASE}/hosting-types`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        en: `${BASE}/hosting-types`,
        uk: `${BASE}/uk/hosting-types`,
        ru: `${BASE}/ru/hosting-types`,
      },
    },
  })

  // Sub-pages from T.hostingTypes
  const rootSlugs = [
    'wordpress-hosting', 'laravel-hosting', 'php-hosting', 
    'prestashop-hosting', 'vps-hosting', 'dedicated-servers', 
    'reseller-hosting', 'free-hosting', 'free-php-hosting', 
    'free-personal-hosting', 'free-wordpress-hosting', 'partner-free-hosting'
  ];

  T.hostingTypes.categories.forEach((cat: any) => {
    cat.items.forEach((item: any) => {
      // If it's a root slug, it's already added in Step 1
      if (rootSlugs.includes(item.slug)) return;

      entries.push({
        url: `${BASE}/hosting-types/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE}/hosting-types/${item.slug}`,
            uk: `${BASE}/uk/hosting-types/${item.slug}`,
            ru: `${BASE}/ru/hosting-types/${item.slug}`,
          },
        },
      })
    })
  })

  return entries
}
