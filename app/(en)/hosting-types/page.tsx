import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HostingTypesClient from '@/components/HostingTypesClient'
import { getT } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const T = getT('en')
  const { getAlternates, LANG_META } = await import('@/lib/i18n')
  
  return {
    title: T.hostingTypes.title,
    description: T.hostingTypes.sub,
    alternates: getAlternates('en', 'hosting-types'),
    openGraph: {
      title: T.hostingTypes.title,
      description: T.hostingTypes.sub,
      url: getAlternates('en', 'hosting-types').canonical,
      siteName: 'HostPro',
      locale: LANG_META['en'].locale,
      type: 'website',
    },
  }
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="hosting-types">
      <JsonLd lang="en" page="pricing" />
      <HostingTypesClient lang="en" />
    </PageWrapper>
  )
}
