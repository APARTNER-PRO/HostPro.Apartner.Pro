import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeHostingHubClient from '@/components/FreeHostingHubClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return LANGS.map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  const { getAlternates, LANG_META } = await import('@/lib/i18n')
  
  return {
    title: T.freeHostingHub.title,
    description: T.freeHostingHub.sub,
    alternates: getAlternates(lang, 'free-hosting'),
    openGraph: {
      title: T.freeHostingHub.title,
      description: T.freeHostingHub.sub,
      url: getAlternates(lang, 'free-hosting').canonical,
      siteName: 'HostPro',
      locale: LANG_META[lang].locale,
      type: 'website',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang)) notFound()

  return (
    <PageWrapper lang={lang} slug="free-hosting">
      <JsonLd lang={lang} page="free-hosting" />
      <FreeHostingHubClient lang={lang} />
    </PageWrapper>
  )
}
