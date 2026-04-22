import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FaqClient from '@/components/FaqClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to the most common questions about HostPro hosting.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/faq',
    languages: {
      'en':        'https://hostpro.apartner.pro/faq',
      'uk':        'https://hostpro.apartner.pro/uk/faq',
      'ru':        'https://hostpro.apartner.pro/ru/faq',
      'x-default': 'https://hostpro.apartner.pro/faq',
    },
  },
  openGraph: {
    title: 'FAQ',
    description: 'Answers to the most common questions about HostPro hosting.',
    url: 'https://hostpro.apartner.pro/faq',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="faq">
      <JsonLd lang="en" page="faq" />
      <FaqClient lang="en" />
    </PageWrapper>
  )
}
