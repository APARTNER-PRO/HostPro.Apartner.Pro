import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBCategoryClient from '@/components/KBCategoryClient'
import { LANGS, Lang, getT } from '@/lib/i18n'

export function generateStaticParams() {
  const params: { lang: string; catSlug: string }[] = []
  LANGS.filter(l => l !== 'en').forEach(lang => {
    const T = getT(lang)
    T.kb.categories?.forEach((c: any) => {
      params.push({ lang, catSlug: c.slug })
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; catSlug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  const cat = T.kb.categories?.find((c: any) => c.slug === params.catSlug)
  if (!cat) return {}
  return {
    title: `${cat.title} — ${T.kb.title}`,
    description: `${cat.title} articles and guides.`,
  }
}

export default function LangKBCategoryPage({ params }: { params: { lang: string; catSlug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  const T = getT(lang)
  const cat = T.kb?.categories?.find((c: any) => c.slug === params.catSlug)
  if (!cat) notFound()

  return (
    <PageWrapper lang={lang} slug={`kb/${params.catSlug}`}>
      <KBCategoryClient lang={lang} categorySlug={params.catSlug} />
    </PageWrapper>
  )
}
