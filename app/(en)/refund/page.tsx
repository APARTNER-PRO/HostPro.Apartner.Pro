import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import RefundClient from '@/components/RefundClient'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'HostPro refund policy — 14-day money-back guarantee.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/refund',
    languages: {
      'en':        'https://hostpro.apartner.pro/refund',
      'uk':        'https://hostpro.apartner.pro/uk/refund',
      'ru':        'https://hostpro.apartner.pro/ru/refund',
      'x-default': 'https://hostpro.apartner.pro/refund',
    },
  },
  openGraph: {
    title: 'Refund Policy',
    description: 'HostPro refund policy — 14-day money-back guarantee.',
    url: 'https://hostpro.apartner.pro/refund',
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
