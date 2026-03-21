import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import TermsClient from '@/components/TermsClient'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'HostPro Terms of Service — rules for using hosting services.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/terms',
    languages: {
      'en':        'https://hostpro.apartner.pro/terms',
      'uk':        'https://hostpro.apartner.pro/uk/terms',
      'ru':        'https://hostpro.apartner.pro/ru/terms',
      'x-default': 'https://hostpro.apartner.pro/terms',
    },
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'HostPro Terms of Service — rules for using hosting services.',
    url: 'https://hostpro.apartner.pro/terms',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="terms">
      <TermsClient lang="en" />
    </PageWrapper>
  )
}
