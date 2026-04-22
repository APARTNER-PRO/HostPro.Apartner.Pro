import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBClient from '@/components/KBClient'

export const metadata: Metadata = {
  title: 'Knowledge Base',
  description: 'Guides, tutorials and answers to your hosting questions. Find everything you need to manage your HostPro account.',
}

export default function Page() {
  const lang = 'en'
  return (
    <PageWrapper lang={lang} slug="kb">
      <KBClient lang={lang} />
    </PageWrapper>
  )
}