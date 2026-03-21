import { MetadataRoute } from 'next'
import { LANGS } from '@/lib/i18n'

const BASE = 'https://hostpro.apartner.pro'
const PAGES = ['', 'about', 'faq', 'contact', 'status', 'terms', 'privacy', 'refund']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of PAGES) {
    const slug = page ? `/${page}` : ''

    // EN (canonical)
    entries.push({
      url: `${BASE}${slug || '/'}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : page === 'about' || page === 'contact' ? 0.8 : 0.6,
      alternates: {
        languages: {
          en: `${BASE}${slug || '/'}`,
          uk: `${BASE}/uk${slug}`,
          ru: `${BASE}/ru${slug}`,
        },
      },
    })
  }

  return entries
}
