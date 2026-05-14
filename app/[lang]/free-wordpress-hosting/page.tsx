import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreeWpClient from '@/components/FreeWpClient'
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
    title: T.freeWp.title,
    description: T.freeWp.meta,
    alternates: getAlternates(lang, 'free-wordpress-hosting'),
    openGraph: {
      title: T.freeWp.title,
      description: T.freeWp.meta,
      url: getAlternates(lang, 'free-wordpress-hosting').canonical,
      type: 'website',
    }
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  return (
    <PageWrapper lang={lang} slug="free-wordpress-hosting">
      <JsonLd lang={lang} page="free-wordpress-hosting" />
      <FreeWpClient lang={lang} />
    </PageWrapper>
  )
}
