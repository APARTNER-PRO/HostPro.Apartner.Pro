import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import PHPHostingClient from '@/components/PHPHostingClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  const { getAlternates } = await import('@/lib/i18n')
  
  return {
    title: T.footer.links.phpHosting,
    description: T.php.meta,
    alternates: getAlternates(lang, 'php-hosting'),
    openGraph: {
      title: T.footer.links.phpHosting,
      description: T.php.meta,
      url: `https://hostpro.apartner.pro/${lang}/php-hosting`,
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
    <PageWrapper lang={lang} slug="php-hosting">
      <JsonLd lang={lang} page="pricing" />
      <PHPHostingClient lang={lang} />
    </PageWrapper>
  )
}
