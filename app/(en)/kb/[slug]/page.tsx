import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBArticleClient from '@/components/KBArticleClient'
import KBCategoryClient from '@/components/KBCategoryClient'
import { getT } from '@/lib/i18n'

export function generateStaticParams() {
  const T = getT('en')
  const articles = T.kb.articles?.map((a: any) => ({ slug: a.slug })) || []
  const categories = T.kb.categories?.map((c: any) => ({ slug: c.slug })) || []
  return [...articles, ...categories]
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const T = getT('en')
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (article) {
    return {
      title: article.title,
      description: article.title + ' — HostPro Knowledge Base guide.',
    }
  }
  
  const cat = T.kb.categories?.find((c: any) => c.slug === params.slug)
  if (cat) {
    return {
      title: `${cat.title} — HostPro Knowledge Base`,
      description: `${cat.title} articles and guides.`,
    }
  }

  return {}
}

export default function KBPage({ params }: { params: { slug: string } }) {
  const lang = 'en'
  const T = getT(lang)
  
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (article) {
    return (
      <PageWrapper lang={lang} slug={`kb/${params.slug}`}>
        <KBArticleClient lang={lang} slug={params.slug} />
      </PageWrapper>
    )
  }

  const cat = T.kb.categories?.find((c: any) => c.slug === params.slug)
  if (cat) {
    return (
      <PageWrapper lang={lang} slug={`kb/${params.slug}`}>
        <KBCategoryClient lang={lang} categorySlug={params.slug} />
      </PageWrapper>
    )
  }

  notFound()
}
