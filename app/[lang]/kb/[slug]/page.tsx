import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBArticleClient from '@/components/KBArticleClient'
import { LANGS, Lang, getT } from '@/lib/i18n'

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  LANGS.filter(l => l !== 'en').forEach(lang => {
    const T = getT(lang)
    T.kb.articles?.forEach((a: any) => {
      params.push({ lang, slug: a.slug })
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.title + ' — HostPro Knowledge Base.',
  }
}

export default function LangKBArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  const T = getT(lang)
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (!article) notFound()

  return (
    <PageWrapper lang={lang} slug={`kb/${params.slug}`}>
      <KBArticleClient lang={lang} slug={params.slug} />
    </PageWrapper>
  )
}
