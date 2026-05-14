import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import FreePersonalClient from '@/components/FreePersonalClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  return {
    title: T.freePersonal.title,
    description: T.freePersonal.meta,
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()

  return (
    <PageWrapper lang={lang} slug="free-personal-hosting">
      <FreePersonalClient lang={lang} />
    </PageWrapper>
  )
}
