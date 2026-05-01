import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBCategoryClient from '@/components/KBCategoryClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  LANGS.filter(l => l !== 'en').forEach(lang => {
    const T = getT(lang)
    T.kb.categories.forEach((c: any) => {
      params.push({ lang, slug: c.slug })
    })
  })
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  const cat = T.kb.categories.find((c: any) => c.slug === params.slug)
  if (!cat) return {}
  return {
    title: `${cat.title} — ${T.kb.title}`,
    description: `${cat.title} articles and guides in HostPro Knowledge Base.`,
  }
}

export default function CategoryPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()
  
  const T = getT(lang)
  const cat = T.kb.categories.find((c: any) => c.slug === params.slug)
  if (!cat) notFound()

  return (
    <PageWrapper lang={lang} slug={`kb/category/${params.slug}`}>
      <KBCategoryClient lang={lang} categorySlug={params.slug} />
    </PageWrapper>
  )
}
