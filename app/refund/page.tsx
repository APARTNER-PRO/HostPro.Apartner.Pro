import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import RefundClient from '@/components/RefundClient'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'HostPro refund policy — 30-day money-back guarantee.',
  alternates: {
    canonical: 'https://hostpro.com/refund',
    languages: {
      'en':        'https://hostpro.com/refund',
      'uk':        'https://hostpro.com/uk/refund',
      'ru':        'https://hostpro.com/ru/refund',
      'x-default': 'https://hostpro.com/refund',
    },
  },
  openGraph: {
    title: 'Refund Policy',
    description: 'HostPro refund policy — 30-day money-back guarantee.',
    url: 'https://hostpro.com/refund',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="refund">
      <RefundClient lang="en" />
    </PageWrapper>
  )
}
