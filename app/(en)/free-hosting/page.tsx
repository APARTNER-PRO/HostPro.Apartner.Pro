import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeHostingClient from '@/components/FreeHostingClient'

export const metadata: Metadata = {
  title: 'Free Hosting for Partners — HostPro Partner Program',
  description: 'Get free hosting for your website by bringing a new client to HostPro. Our partner program rewards you with free hosting matching the plan and term of the client you refer.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="free-hosting">
      <FreeHostingClient lang={lang} />
    </PageWrapper>
  )
}
