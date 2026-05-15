import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeHostingClient from '@/components/FreeHostingClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Free Hosting for Partners | HostPro',
  description: 'Bring a client to HostPro and get free hosting for your own website. Our partner reward program for long-term clients.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="partner-free-hosting">
      <JsonLd lang={lang} page="home" />
      <FreeHostingClient lang={lang} />
    </PageWrapper>
  )
}
