import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import ContactClient from '@/components/ContactClient'
import { LANGS, Lang, LANG_META } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

const META: Record<string, [string, string]> = {
  uk: ['Контакти', "Зв'яжіться з командою HostPro — підтримка 24/7, відповідь за 5 хвилин."],
  ru: ['Контакты', 'Свяжитесь с командой HostPro — поддержка 24/7, ответ за 5 минут.'],
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') return {}
  const [title, description] = META[lang]
  const { locale } = LANG_META[lang]
  return {
    title, description,
    alternates: {
      canonical: `https://hostpro.apartner.pro/${params.lang}/contact`,
      languages: {
        'en':        'https://hostpro.apartner.pro/contact',
        'uk':        'https://hostpro.apartner.pro/uk/contact',
        'ru':        'https://hostpro.apartner.pro/ru/contact',
        'x-default': 'https://hostpro.apartner.pro/contact',
      },
    },
    openGraph: {
      title, description,
      url: `https://hostpro.apartner.pro/${params.lang}/contact`,
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
    <PageWrapper lang={lang} slug="contact">
      <ContactClient lang={lang} />
    </PageWrapper>
  )
}
