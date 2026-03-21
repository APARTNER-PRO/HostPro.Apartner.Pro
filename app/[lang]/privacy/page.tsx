import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import PrivacyClient from '@/components/PrivacyClient'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['Конфіденційність', 'Як HostPro збирає, використовує та захищає ваші дані. GDPR.'],
  ru: ['Конфиденциальность', 'Как HostPro собирает, использует и защищает ваши данные. GDPR.'],
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const [title, description] = META[lang]
  const { locale } = LANG_META[lang]
  return {
    title, description,
    alternates: {
      canonical: `https://hostpro.apartner.pro/${params.lang}/privacy`,
      languages: {
        'en':        'https://hostpro.apartner.pro/privacy',
        'uk':        'https://hostpro.apartner.pro/uk/privacy',
        'ru':        'https://hostpro.apartner.pro/ru/privacy',
        'x-default': 'https://hostpro.apartner.pro/privacy',
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
    <PageWrapper lang={lang} slug="privacy">
      <PrivacyClient lang={lang} />
    </PageWrapper>
  )
}
