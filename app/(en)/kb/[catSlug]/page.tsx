import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import KBCategoryClient from '@/components/KBCategoryClient'
import { getT } from '@/lib/i18n'

export function generateStaticParams() {
  const T = getT('en')
  return T.kb.categories?.map((c: any) => ({ catSlug: c.slug })) || []
}

export async function generateMetadata({ params }: { params: { catSlug: string } }): Promise<Metadata> {
  const T = getT('en')
  const cat = T.kb.categories?.find((c: any) => c.slug === params.catSlug)
  if (!cat) return {}
  return {
    title: `${cat.title} — HostPro Knowledge Base`,
    description: `${cat.title} articles and guides.`,
  }
}

export default function KBCategoryPage({ params }: { params: { catSlug: string } }) {
  const lang = 'en'
  const T = getT(lang)
  
  const cat = T.kb.categories?.find((c: any) => c.slug === params.catSlug)
  if (!cat) notFound()

  return (
    <PageWrapper lang={lang} slug={`kb/${params.catSlug}`}>
      <KBCategoryClient lang={lang} categorySlug={params.catSlug} />
    </PageWrapper>
  )
}
