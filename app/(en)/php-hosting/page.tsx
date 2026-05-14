import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import PHPHostingClient from '@/components/PHPHostingClient'

import { getAlternates } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'PHP Hosting — Multiple Versions, OPcache, Composer & SSH',
  description: 'Optimized PHP hosting with multiple PHP versions (7.4–8.3), OPcache, JIT, Composer and SSH access. Run any PHP framework on NVMe SSD servers.',
  alternates: getAlternates('en', 'php-hosting'),
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="php-hosting">
      <JsonLd lang={lang} page="pricing" />
      <PHPHostingClient lang={lang} />
    </PageWrapper>
  )
}
