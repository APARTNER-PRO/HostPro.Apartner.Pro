import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import TermsClient from '@/components/TermsClient'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'HostPro Terms of Service — rules for using hosting services.',
  alternates: {
    canonical: 'https://hostpro.com/terms',
    languages: {
      'en':        'https://hostpro.com/terms',
      'uk':        'https://hostpro.com/uk/terms',
      'ru':        'https://hostpro.com/ru/terms',
      'x-default': 'https://hostpro.com/terms',
    },
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'HostPro Terms of Service — rules for using hosting services.',
    url: 'https://hostpro.com/terms',
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
