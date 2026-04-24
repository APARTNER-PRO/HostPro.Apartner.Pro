import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HomeClient from '@/components/HomeClient'
import JsonLd from '@/components/JsonLd'
import { getAlternateLangs } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'HostPro — Fast & Reliable Web Hosting from $3.99/mo',
  description: 'Fast NVMe SSD hosting with cPanel, free SSL, daily backups and 24/7 support. Plans from $3.99/mo. 30-day money-back guarantee.',
  keywords: ['web hosting', 'NVMe SSD hosting', 'cPanel hosting', 'cheap web hosting', 'WordPress hosting', 'reseller hosting'],
  alternates: {
    canonical: 'https://hostpro.apartner.pro',
    languages: {
      'en': 'https://hostpro.apartner.pro',
      'uk': 'https://hostpro.apartner.pro/uk',
      'ru': 'https://hostpro.apartner.pro/ru',
      'x-default': 'https://hostpro.apartner.pro',
    },
  },
  openGraph: {
    title: 'HostPro — Fast & Reliable Web Hosting',
    description: 'Fast NVMe SSD hosting with cPanel, free SSL and 24/7 support. Plans from $3.99/mo.',
    url: 'https://hostpro.apartner.pro',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HostPro — Fast & Reliable Web Hosting',
    description: 'Fast NVMe SSD hosting with cPanel, free SSL and 24/7 support. Plans from $3.99/mo.',
  },
}

async function getPaddleProduct(id: string) {
  try {
    const res = await fetch(`https://api.paddle.com/products/${id}?include=prices`, {
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [monthly, quarterly, yearly, threeYears] = await Promise.all([
    getPaddleProduct('pro_01kpxjt0dtczpta4vxtdbp73zf'),
    getPaddleProduct('pro_01kpxksj5m2wsdr9tqj914m1ak'),
    getPaddleProduct('pro_01kpxjmzrcerj9a7caj6qkzgtv'),
    getPaddleProduct('pro_01kpy2h3epqjbc4fq2tyhz6esg'),
  ])

  const plansData = { monthly, quarterly, yearly, threeYears }

  return (
    <PageWrapper lang="en" slug="">
      <JsonLd lang="en" page="home" />
      <HomeClient lang="en" initialData={plansData} />
    </PageWrapper>
  )
}
