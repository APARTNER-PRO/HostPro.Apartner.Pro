import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import BlogPostClient from '@/components/BlogPostClient'
import { getT } from '@/lib/i18n'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const T = getT('en')
  const post = T.blog.posts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.desc,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const T = getT('en')
  const post = T.blog.posts.find(p => p.slug === params.slug)
  if (!post) notFound()

  return (
    <PageWrapper lang="en" slug={`blog/${params.slug}`}>
      <BlogPostClient lang="en" slug={params.slug} />
    </PageWrapper>
  )
}
