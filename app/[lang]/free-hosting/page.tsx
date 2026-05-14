import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeHostingHubClient from '@/components/FreeHostingHubClient'
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
    title: T.freeHostingHub.title,
    description: T.freeHostingHub.sub,
    alternates: getAlternates(lang, 'free-hosting'),
    openGraph: {
      title: T.freeHostingHub.title,
      description: T.freeHostingHub.sub,
      url: `https://hostpro.apartner.pro/${lang}/free-hosting`,
      siteName: 'HostPro',
      locale: lang === 'uk' ? 'uk_UA' : 'ru_RU',
      type: 'website',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  return (
    <PageWrapper lang={lang} slug="free-hosting">
      <JsonLd lang={lang} page="pricing" />
      <FreeHostingHubClient lang={lang} />
    </PageWrapper>
  )
}
