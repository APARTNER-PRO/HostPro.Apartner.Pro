import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import PrivacyClient from '@/components/PrivacyClient'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How HostPro collects, uses and protects your personal data. GDPR compliant.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/privacy',
    languages: {
      'en':        'https://hostpro.apartner.pro/privacy',
      'uk':        'https://hostpro.apartner.pro/uk/privacy',
      'ru':        'https://hostpro.apartner.pro/ru/privacy',
      'x-default': 'https://hostpro.apartner.pro/privacy',
    },
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'How HostPro collects, uses and protects your personal data. GDPR compliant.',
    url: 'https://hostpro.apartner.pro/privacy',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="privacy">
      <PrivacyClient lang="en" />
    </PageWrapper>
  )
}
