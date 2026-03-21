import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import PrivacyClient from '@/components/PrivacyClient'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How HostPro collects, uses and protects your personal data. GDPR compliant.',
  alternates: {
    canonical: 'https://hostpro.com/privacy',
    languages: {
      'en':        'https://hostpro.com/privacy',
      'uk':        'https://hostpro.com/uk/privacy',
      'ru':        'https://hostpro.com/ru/privacy',
      'x-default': 'https://hostpro.com/privacy',
    },
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'How HostPro collects, uses and protects your personal data. GDPR compliant.',
    url: 'https://hostpro.com/privacy',
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
