import PageWrapper from '@/components/PageWrapper'
import SearchClient from '@/components/SearchClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export function generateStaticParams() {
  return LANGS.map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  return {
    title: lang === 'uk' ? 'Пошук — HostPro' : lang === 'ru' ? 'Поиск — HostPro' : 'Search — HostPro',
    description: T.siteTagline,
  }
}

export default function SearchPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang)) notFound()

  return (
    <PageWrapper lang={lang} slug="search">
      <Suspense>
        <SearchClient lang={lang} />
      </Suspense>
    </PageWrapper>
  )
}
