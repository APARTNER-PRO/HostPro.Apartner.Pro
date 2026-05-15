import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreePersonalClient from '@/components/FreePersonalClient'
import JsonLd from '@/components/JsonLd'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return LANGS.map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  const { getAlternates } = await import('@/lib/i18n')
  return {
    title: T.freePersonal.title,
    description: T.freePersonal.meta,
    alternates: getAlternates(lang, 'free-personal-hosting'),
    openGraph: {
      title: T.freePersonal.title,
      description: T.freePersonal.meta,
      url: getAlternates(lang, 'free-personal-hosting').canonical,
      type: 'website',
    }
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang)) notFound()

  return (
    <PageWrapper lang={lang} slug="free-personal-hosting">
      <JsonLd lang={lang} page="free-personal-hosting" />
      <FreePersonalClient lang={lang} />
    </PageWrapper>
  )
}
