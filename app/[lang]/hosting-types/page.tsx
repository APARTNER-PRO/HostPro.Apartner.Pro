import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HostingTypesClient from '@/components/HostingTypesClient'
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
    title: T.hostingTypes.title,
    description: T.hostingTypes.sub,
    alternates: getAlternates(lang, 'hosting-types'),
    openGraph: {
      title: T.hostingTypes.title,
      description: T.hostingTypes.sub,
      url: getAlternates(lang, 'hosting-types').canonical,
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
    <PageWrapper lang={lang} slug="hosting-types">
      <JsonLd lang={lang} page="pricing" />
      <HostingTypesClient lang={lang} />
    </PageWrapper>
  )
}
