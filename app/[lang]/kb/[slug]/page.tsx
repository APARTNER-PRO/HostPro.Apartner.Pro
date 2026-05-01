import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBArticleClient from '@/components/KBArticleClient'
import KBCategoryClient from '@/components/KBCategoryClient'
import { LANGS, Lang, getT } from '@/lib/i18n'

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  LANGS.filter(l => l !== 'en').forEach(lang => {
    const T = getT(lang)
    T.kb.articles?.forEach((a: any) => {
      params.push({ lang, slug: a.slug })
    })
    T.kb.categories?.forEach((c: any) => {
      params.push({ lang, slug: c.slug })
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  
  const article = T.kb.articles?.find((a: any) => a.slug === params.slug)
  if (article) {
    return {
      title: article.title,
      description: article.title + ' — HostPro Knowledge Base.',
    }
  }

  const cat = T.kb.categories?.find((c: any) => c.slug === params.slug)
  if (cat) {
    return {
      title: `${cat.title} — ${T.kb.title}`,
      description: `${cat.title} articles and guides.`,
    }
  }

  return {}
}

export default function LangKBPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

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
