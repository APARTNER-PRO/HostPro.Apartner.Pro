import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import ChatClient from '@/components/ChatClient'

export const metadata: Metadata = {
  title: 'AI Assistant - HostPro',
  description: 'Get instant help with your hosting questions from our AI assistant.',
}

export default function Page() {
  return (
    <PageWrapper lang="en" slug="ai-assistant">
      <ChatClient lang="en" />
    </PageWrapper>
  )
}
