import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import WPClient from '@/components/WPClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'


export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  return {
    title: T.footer.links.wpHosting,
    description: T.wp.meta,
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()
  
  return (
    <PageWrapper lang={lang} slug="wordpress-hosting">
      <WPClient lang={lang} />
    </PageWrapper>
  )
}