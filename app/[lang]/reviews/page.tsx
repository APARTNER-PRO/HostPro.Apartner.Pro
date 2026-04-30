import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import ReviewsClient from '@/components/ReviewsClient'
import JsonLd from '@/components/JsonLd'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['Відгуки клієнтів - HostPro', 'Що говорять про нас клієнти. Нам довіряють понад 12,000 користувачів по всьому світу.'],
  ru: ['Отзывы клиентов - HostPro', 'Что говорят о нас клиенты. Нам доверяют более 12,000 пользователей по всему миру.'],
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const [title, description] = META[lang]
  const { locale } = LANG_META[lang]
  return {
    title, description,
    alternates: {
      canonical: `https://hostpro.apartner.pro/${params.lang}/reviews`,
      languages: {
        'en':        'https://hostpro.apartner.pro/reviews',
        'uk':        'https://hostpro.apartner.pro/uk/reviews',
        'ru':        'https://hostpro.apartner.pro/ru/reviews',
        'x-default': 'https://hostpro.apartner.pro/reviews',
      },
    },
    openGraph: {
      title, description,
      url: `https://hostpro.apartner.pro/${params.lang}/reviews`,
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
    <PageWrapper lang={lang} slug="reviews">
      <JsonLd lang={lang} page="reviews" />
      <ReviewsClient lang={lang} />
    </PageWrapper>
  )
}
