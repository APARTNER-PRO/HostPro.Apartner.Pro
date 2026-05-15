import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreePhpClient from '@/components/FreePhpClient'
import JsonLd from '@/components/JsonLd'
import { getT } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Free PHP Hosting for Non-Profits | HostPro',
  description: 'Get 6 months of free PHP hosting for your social or volunteer project. cPanel, PHP 8.x, and premium support included.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="free-php-hosting">
      <JsonLd lang={lang} page="free-php-hosting" />
      <FreePhpClient lang={lang} />
    </PageWrapper>
  )
}
