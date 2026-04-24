import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HomeClient from '@/components/HomeClient'
import { LANGS, Lang, LANG_META, getT } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const T = getT(lang)
  const { locale } = LANG_META[lang]

  const titles: Record<string, string> = {
    uk: 'HostPro — Швидкий та надійний хостинг від $3.99/міс',
    ru: 'HostPro — Быстрый и надёжный хостинг от $3.99/мес',
  }
  const descs: Record<string, string> = {
    uk: 'Швидкий NVMe SSD хостинг з cPanel, безкоштовним SSL та підтримкою 24/7. Тарифи від $3.99/міс. 30-денна гарантія повернення.',
    ru: 'Быстрый NVMe SSD хостинг с cPanel, бесплатным SSL и поддержкой 24/7. Тарифы от $3.99/мес. 30-дневная гарантия возврата.',
  }

  return {
    title: titles[lang],
    description: descs[lang],
    alternates: {
      canonical: `https://hostpro.apartner.pro/${lang}`,
      languages: {
        'en':        'https://hostpro.apartner.pro',
        'uk':        'https://hostpro.apartner.pro/uk',
        'ru':        'https://hostpro.apartner.pro/ru',
        'x-default': 'https://hostpro.apartner.pro',
      },
    },
    openGraph: {
      title: titles[lang],
      description: descs[lang],
      url: `https://hostpro.apartner.pro/${lang}`,
      siteName: 'HostPro',
      locale,
      type: 'website',
    },
  }
}

async function getPaddleProduct(id: string) {
  try {
    const res = await fetch(`https://api.paddle.com/products/${id}?include=prices`, {
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data
  } catch {
    return null
  }
}

export default async function LangHomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  const [monthly, quarterly, yearly, threeYears] = await Promise.all([
    getPaddleProduct('pro_01kpxjt0dtczpta4vxtdbp73zf'),
    getPaddleProduct('pro_01kpxksj5m2wsdr9tqj914m1ak'),
    getPaddleProduct('pro_01kpxjmzrcerj9a7caj6qkzgtv'),
    getPaddleProduct('pro_01kpy2h3epqjbc4fq2tyhz6esg'),
  ])

  const plansData = { monthly, quarterly, yearly, threeYears }

  return (
    <PageWrapper lang={lang} slug="">
      <HomeClient lang={lang} initialData={plansData} />
    </PageWrapper>
  )
}
