import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeHostingClient from '@/components/FreeHostingClient'
import JsonLd from '@/components/JsonLd'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  const { getAlternates } = await import('@/lib/i18n')
  return {
    title: T.footer.links.freeHosting,
    description: T.freeHosting.meta,
    alternates: getAlternates(lang, 'partner-free-hosting'),
    openGraph: {
      title: T.footer.links.freeHosting,
      description: T.freeHosting.meta,
      url: getAlternates(lang, 'partner-free-hosting').canonical,
      type: 'website',
    }
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  return (
    <PageWrapper lang={lang} slug="partner-free-hosting">
      <JsonLd lang={lang} page="home" />
      <FreeHostingClient lang={lang} />
    </PageWrapper>
  )
}
