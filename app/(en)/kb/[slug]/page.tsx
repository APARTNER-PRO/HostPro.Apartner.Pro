import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBArticleClient from '@/components/KBArticleClient'
import { getT, Lang } from '@/lib/i18n'

export function generateStaticParams() {
  const T = getT('en')
  return T.kb.articles?.map((a: any) => ({ slug: a.slug })) || []
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const T = getT('en')
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.title + ' — HostPro Knowledge Base guide.',
  }
}

export default function KBArticlePage({ params }: { params: { slug: string } }) {
  const lang = 'en'
  const T = getT(lang)
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (!article) notFound()

  return (
    <PageWrapper lang={lang} slug={`kb/${params.slug}`}>
      <KBArticleClient lang={lang} slug={params.slug} />
    </PageWrapper>
  )
}
