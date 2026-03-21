import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import AboutClient from '@/components/AboutClient'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the HostPro team — who we are, our mission and values.',
  alternates: {
    canonical: 'https://hostpro.com/about',
    languages: {
      'en':        'https://hostpro.com/about',
      'uk':        'https://hostpro.com/uk/about',
      'ru':        'https://hostpro.com/ru/about',
      'x-default': 'https://hostpro.com/about',
    },
  },
  openGraph: {
    title: 'About Us',
    description: 'Learn about the HostPro team — who we are, our mission and values.',
    url: 'https://hostpro.com/about',
    siteName: 'HostPro',
    locale: 'en_US',
    type: 'website',
  },
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="about">
      <AboutClient lang="en" />
    </PageWrapper>
  )
}
