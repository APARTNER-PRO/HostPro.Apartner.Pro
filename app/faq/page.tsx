import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FaqClient from '@/components/FaqClient'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to the most common questions about HostPro hosting.',
  alternates: {
    canonical: 'https://hostpro.com/faq',
    languages: {
      'en':        'https://hostpro.com/faq',
      'uk':        'https://hostpro.com/uk/faq',
      'ru':        'https://hostpro.com/ru/faq',
      'x-default': 'https://hostpro.com/faq',
    },
  },
  openGraph: {
    title: 'FAQ',
    description: 'Answers to the most common questions about HostPro hosting.',
    url: 'https://hostpro.com/faq',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="faq">
      <FaqClient lang="en" />
    </PageWrapper>
  )
}
