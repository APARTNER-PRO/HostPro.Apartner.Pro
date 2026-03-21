import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import AboutClient from '@/components/AboutClient'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['Про нас', 'Дізнайтесь більше про команду HostPro — хто ми, наша місія та цінності.'],
  ru: ['О нас', 'Узнайте больше о команде HostPro — кто мы, наша миссия и ценности.'],
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
        'en':        'https://hostpro.com/about',
        'uk':        'https://hostpro.com/uk/about',
        'ru':        'https://hostpro.com/ru/about',
        'x-default': 'https://hostpro.com/about',
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
    <PageWrapper lang={lang} slug="about">
      <AboutClient lang={lang} />
    </PageWrapper>
  )
}
