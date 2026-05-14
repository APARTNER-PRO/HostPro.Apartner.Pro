import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import WPClient from '@/components/WPClient'
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
    title: T.footer.links.wpHosting,
    description: T.wp.meta,
    alternates: getAlternates(lang, 'wordpress-hosting'),
    openGraph: {
      title: T.footer.links.wpHosting,
      description: T.wp.meta,
      url: `https://hostpro.apartner.pro/${lang}/wordpress-hosting`,
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
    <PageWrapper lang={lang} slug="wordpress-hosting">
      <JsonLd lang={lang} page="pricing" />
      <WPClient lang={lang} />
    </PageWrapper>
  )
}