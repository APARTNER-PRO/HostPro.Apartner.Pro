import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import BlogClient from '@/components/BlogClient'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Blog - Expert Hosting Insights',
  description: 'Stay updated with the latest trends in web hosting, security, and performance. Expert advice to grow your business.',
}

export default function BlogPage() {
  return (
    <PageWrapper lang="en" slug="blog">
      <JsonLd lang="en" page="home" />
      <BlogClient lang="en" />
    </PageWrapper>
  )
}