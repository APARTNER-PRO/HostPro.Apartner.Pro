import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreePersonalClient from '@/components/FreePersonalClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Free Personal Hosting for Projects | HostPro',
  description: 'Free hosting for your personal non-commercial projects. 6 months of premium hosting with cPanel and SSL.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="free-personal-hosting">
      <JsonLd lang={lang} page="free-personal-hosting" />
      <FreePersonalClient lang={lang} />
    </PageWrapper>
  )
}
