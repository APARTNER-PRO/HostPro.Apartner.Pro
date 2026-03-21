import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import StatusClient from '@/components/StatusClient'

export const metadata: Metadata = {
  title: 'System Status',
  description: 'Real-time HostPro server and service status. 99.9% uptime.',
  alternates: {
    canonical: 'https://hostpro.com/status',
    languages: {
      'en':        'https://hostpro.com/status',
      'uk':        'https://hostpro.com/uk/status',
      'ru':        'https://hostpro.com/ru/status',
      'x-default': 'https://hostpro.com/status',
    },
  },
  openGraph: {
    title: 'System Status',
    description: 'Real-time HostPro server and service status. 99.9% uptime.',
    url: 'https://hostpro.com/status',
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
