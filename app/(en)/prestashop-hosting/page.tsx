import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import PrestashopClient from '@/components/PrestashopClient'

export const metadata: Metadata = {
  title: 'PrestaShop Hosting — Fast, Secure E-Commerce Hosting',
  description: 'High-performance PrestaShop hosting with 1-click install, LiteSpeed cache, free SSL, daily backups and 24/7 support. Launch your online store in minutes.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="prestashop-hosting">
      <PrestashopClient lang={lang} />
    </PageWrapper>
  )
}
