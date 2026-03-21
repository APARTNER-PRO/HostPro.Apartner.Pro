import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import TermsClient from '@/components/TermsClient'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['Умови використання', 'Умови використання послуг хостингу HostPro.'],
  ru: ['Условия использования', 'Условия использования услуг хостинга HostPro.'],
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const [title, description] = META[lang]
  const { locale } = LANG_META[lang]
  return {
    title, description,
    alternates: {
      canonical: ,
      languages: {
        'en':        'https://hostpro.com/terms',
        'uk':        'https://hostpro.com/uk/terms',
        'ru':        'https://hostpro.com/ru/terms',
        'x-default': 'https://hostpro.com/terms',
      },
    },
    openGraph: {
      title, description,
      url: ,
      siteName: 'HostPro',
      locale,
      type: 'website',
    },
  }
}

export default function LangPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()
  return (
    <PageWrapper lang={lang} slug="terms">
      <TermsClient lang={lang} />
    </PageWrapper>
  )
}
