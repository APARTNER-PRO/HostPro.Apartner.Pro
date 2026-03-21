import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import AboutClient from '@/components/AboutClient'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the HostPro team — who we are, our mission and values.',
  alternates: {
    canonical: 'https://hostpro.apartner.pro/about',
    languages: {
      'en':        'https://hostpro.apartner.pro/about',
      'uk':        'https://hostpro.apartner.pro/uk/about',
      'ru':        'https://hostpro.apartner.pro/ru/about',
      'x-default': 'https://hostpro.apartner.pro/about',
    },
  },
  openGraph: {
    title: 'About Us',
    description: 'Learn about the HostPro team — who we are, our mission and values.',
    url: 'https://hostpro.apartner.pro/about',
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
