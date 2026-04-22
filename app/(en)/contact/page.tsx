import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import ContactClient from '@/components/ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact HostPro — 24/7 support, average response in 5 minutes.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/contact',
    languages: {
      'en':        'https://hostpro.apartner.pro/contact',
      'uk':        'https://hostpro.apartner.pro/uk/contact',
      'ru':        'https://hostpro.apartner.pro/ru/contact',
      'x-default': 'https://hostpro.apartner.pro/contact',
    },
  },
  openGraph: {
    title: 'Contact',
    description: 'Contact HostPro — 24/7 support, average response in 5 minutes.',
    url: 'https://hostpro.apartner.pro/contact',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="contact">
      <ContactClient lang="en" />
    </PageWrapper>
  )
}
