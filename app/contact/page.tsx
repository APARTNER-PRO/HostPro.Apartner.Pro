import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import ContactClient from '@/components/ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact HostPro — 24/7 support, average response in 5 minutes.',
  alternates: {
    canonical: 'https://hostpro.com/contact',
    languages: {
      'en':        'https://hostpro.com/contact',
      'uk':        'https://hostpro.com/uk/contact',
      'ru':        'https://hostpro.com/ru/contact',
      'x-default': 'https://hostpro.com/contact',
    },
  },
  openGraph: {
    title: 'Contact',
    description: 'Contact HostPro — 24/7 support, average response in 5 minutes.',
    url: 'https://hostpro.com/contact',
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
