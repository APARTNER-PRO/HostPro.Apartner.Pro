import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeHostingHubClient from '@/components/FreeHostingHubClient'
import JsonLd from '@/components/JsonLd'
import { getT } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Free Hosting Programs | HostPro',
  description: 'Choose from our range of free hosting offers for non-profits, volunteers, and partners. 6 months of free hosting with premium features.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="free-hosting">
      <JsonLd lang={lang} page="pricing" />
      <FreeHostingHubClient lang={lang} />
    </PageWrapper>
  )
}
