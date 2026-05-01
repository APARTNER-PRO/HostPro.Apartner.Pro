import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBArticleClient from '@/components/KBArticleClient'
import { LANGS, Lang, getT } from '@/lib/i18n'

export function generateStaticParams() {
  const params: { lang: string; catSlug: string; articleSlug: string }[] = []
  LANGS.filter(l => l !== 'en').forEach(lang => {
    const T = getT(lang)
    T.kb?.articles?.forEach((a: any) => {
      const cat = T.kb?.categories?.find((c: any) => 
        c.title.trim().toLowerCase() === a.cat.trim().toLowerCase()
      )
      if (cat) {
        params.push({ lang, catSlug: cat.slug, articleSlug: a.slug })
      }
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; catSlug: string; articleSlug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  const article = T.kb.articles?.find((a: any) => a.slug === params.articleSlug)
  if (!article) return {}
  
  return {
    title: article.title,
    description: article.title + ' — HostPro Knowledge Base.',
  }
}

export default function LangKBArticlePage({ params }: { params: { lang: string; catSlug: string; articleSlug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  const T = getT(lang)
  const article = T.kb?.articles?.find((a: any) => a.slug === params.articleSlug)
  if (!article) notFound()

  // Verify category matches (more robust)
  const cat = T.kb?.categories?.find((c: any) => 
    c.slug === params.catSlug && 
    (c.title.trim().toLowerCase() === article.cat.trim().toLowerCase())
  )
  if (!cat) notFound()

  return (
    <PageWrapper lang={lang} slug={`kb/${params.catSlug}/${params.articleSlug}`}>
      <JsonLd 
        lang={lang} 
        page="kb" 
        article={{ ...article, catSlug: params.catSlug }} 
      />
      <KBArticleClient lang={lang} slug={params.articleSlug} />
    </PageWrapper>
  )
}
