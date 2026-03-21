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
    canonical: 'https://hostpro.com',
    languages: {
      'en': 'https://hostpro.com',
      'uk': 'https://hostpro.com/uk',
      'ru': 'https://hostpro.com/ru',
      'x-default': 'https://hostpro.com',
    },
  },
  openGraph: {
    title: 'HostPro — Fast & Reliable Web Hosting',
    description: 'Fast NVMe SSD hosting with cPanel, free SSL and 24/7 support. Plans from $3.99/mo.',
    url: 'https://hostpro.com',
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
