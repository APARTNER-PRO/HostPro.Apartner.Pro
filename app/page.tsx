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

export default function HomePage() {
  return (
    <PageWrapper lang="en" slug="">
      <JsonLd lang="en" page="home" />
      <HomeClient lang="en" />
    </PageWrapper>
  )
}
