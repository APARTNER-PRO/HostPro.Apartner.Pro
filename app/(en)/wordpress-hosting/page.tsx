import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import WPClient from '@/components/WPClient'
import { getT } from '@/lib/i18n'

import { getAlternates } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Managed WordPress Hosting',
  description: 'Fast, secure and reliable managed WordPress hosting with auto-updates, staging and 24/7 support.',
  alternates: getAlternates('en', 'wordpress-hosting'),
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="wordpress-hosting">
      <JsonLd lang={lang} page="pricing" />
      <WPClient lang={lang} />
    </PageWrapper>
  )
}