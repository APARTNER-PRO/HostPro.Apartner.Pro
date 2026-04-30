import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import ReviewsClient from '@/components/ReviewsClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Customer Reviews - HostPro',
  description: 'What our clients say about us. Trusted by over 12,000 customers worldwide.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/reviews',
    languages: {
      'en':        'https://hostpro.apartner.pro/reviews',
      'uk':        'https://hostpro.apartner.pro/uk/reviews',
      'ru':        'https://hostpro.apartner.pro/ru/reviews',
      'x-default': 'https://hostpro.apartner.pro/reviews',
    },
  },
  openGraph: {
    title: 'Customer Reviews - HostPro',
    description: 'What our clients say about us. Trusted by over 12,000 customers worldwide.',
    url: 'https://hostpro.apartner.pro/reviews',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="reviews">
      <JsonLd lang="en" page="reviews" />
      <ReviewsClient lang="en" />
    </PageWrapper>
  )
}
