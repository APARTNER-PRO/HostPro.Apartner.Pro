import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import StatusClient from '@/components/StatusClient'

export const metadata: Metadata = {
  title: 'System Status',
  description: 'Real-time HostPro server and service status. 99.9% uptime.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/status',
    languages: {
      'en':        'https://hostpro.apartner.pro/status',
      'uk':        'https://hostpro.apartner.pro/uk/status',
      'ru':        'https://hostpro.apartner.pro/ru/status',
      'x-default': 'https://hostpro.apartner.pro/status',
    },
  },
  openGraph: {
    title: 'System Status',
    description: 'Real-time HostPro server and service status. 99.9% uptime.',
    url: 'https://hostpro.apartner.pro/status',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="status">
      <StatusClient lang="en" />
    </PageWrapper>
  )
}
