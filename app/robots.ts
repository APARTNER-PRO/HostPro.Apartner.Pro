import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://hostpro.apartner.pro/sitemap.xml',
    host: 'https://hostpro.apartner.pro',
  }
}
