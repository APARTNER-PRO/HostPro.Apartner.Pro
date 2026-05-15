import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeWpClient from '@/components/FreeWpClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Free WordPress Hosting for NPOs | HostPro',
  description: 'Optimized WordPress hosting for social and charity projects. 6 months free with auto-updates and premium support.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="free-wordpress-hosting">
      <JsonLd lang={lang} page="free-wordpress-hosting" />
      <FreeWpClient lang={lang} />
    </PageWrapper>
  )
}
