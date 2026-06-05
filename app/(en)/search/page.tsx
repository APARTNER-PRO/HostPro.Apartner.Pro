import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import SearchClient from '@/components/SearchClient'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Search — HostPro',
  description: 'Search HostPro for hosting plans, knowledge base articles, and more.',
}

export default function SearchPage() {
  return (
    <PageWrapper lang="en" slug="search">
      <Suspense>
        <SearchClient lang="en" />
      </Suspense>
    </PageWrapper>
  )
}
