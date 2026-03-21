import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import RefundClient from '@/components/RefundClient'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['Повернення коштів', 'Умови повернення коштів HostPro. 30-денна гарантія.'],
  ru: ['Возврат средств', 'Условия возврата средств HostPro. 30-дневная гарантия.'],
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const [title, description] = META[lang]
  const { locale } = LANG_META[lang]
  return {
    title, description,
    alternates: {
      canonical: `https://hostpro.apartner.pro/${params.lang}/refund`,
      languages: {
        'en':        'https://hostpro.apartner.pro/refund',
        'uk':        'https://hostpro.apartner.pro/uk/refund',
        'ru':        'https://hostpro.apartner.pro/ru/refund',
        'x-default': 'https://hostpro.apartner.pro/refund',
      },
    },
    openGraph: {
      title, description,
      url: `https://hostpro.apartner.pro/${params.lang}/refund`,
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
    <PageWrapper lang={lang} slug="refund">
      <RefundClient lang={lang} />
    </PageWrapper>
  )
}
