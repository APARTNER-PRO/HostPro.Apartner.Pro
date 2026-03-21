import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FaqClient from '@/components/FaqClient'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['FAQ', 'Відповіді на найчастіші питання про хостинг HostPro.'],
  ru: ['FAQ', 'Ответы на самые частые вопросы о хостинге HostPro.'],
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const [title, description] = META[lang]
  const { locale } = LANG_META[lang]
  return {
    title, description,
    alternates: {
      canonical: `https://hostpro.apartner.pro/${params.lang}/faq`,
      languages: {
        'en':        'https://hostpro.apartner.pro/faq',
        'uk':        'https://hostpro.apartner.pro/uk/faq',
        'ru':        'https://hostpro.apartner.pro/ru/faq',
        'x-default': 'https://hostpro.apartner.pro/faq',
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
    <PageWrapper lang={lang} slug="faq">
      <FaqClient lang={lang} />
    </PageWrapper>
  )
}
