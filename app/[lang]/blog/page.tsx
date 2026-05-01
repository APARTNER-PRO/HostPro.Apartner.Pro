import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import BlogClient from '@/components/BlogClient'
import JsonLd from '@/components/JsonLd'
import { LANGS, Lang, getT } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  return {
    title: T.blog.title,
    description: T.blog.meta,
  }
}

export default function LangBlogPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  return (
    <PageWrapper lang={lang} slug="blog">
      <JsonLd lang={lang} page="home" />
      <BlogClient lang={lang} />
    </PageWrapper>
  )
}