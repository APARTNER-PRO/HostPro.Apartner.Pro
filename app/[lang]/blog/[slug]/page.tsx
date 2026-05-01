import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import BlogPostClient from '@/components/BlogPostClient'
import { LANGS, Lang, getT } from '@/lib/i18n'

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  LANGS.filter(l => l !== 'en').forEach(lang => {
    const T = getT(lang)
    T.blog.posts.forEach(post => {
      params.push({ lang, slug: post.slug })
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  const post = T.blog.posts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.desc,
  }
}

export default function LangBlogPostPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  const T = getT(lang)
  const post = T.blog.posts.find(p => p.slug === params.slug)
  if (!post) notFound()

  return (
    <PageWrapper lang={lang} slug={`blog/${params.slug}`}>
      <BlogPostClient lang={lang} slug={params.slug} />
    </PageWrapper>
  )
}
