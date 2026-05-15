import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HostingLandingClient from '@/components/HostingLandingClient'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  
  LANGS.forEach(lang => {
    const T = getT(lang)
    T.hostingTypes.categories.forEach((cat: any) => {
      cat.items.forEach((item: any) => {
        params.push({ lang, slug: item.slug })
      })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  
  // Find the item name from i18n
  let itemName = params.slug
  T.hostingTypes.categories.forEach((cat: any) => {
    const found = cat.items.find((i: any) => i.slug === params.slug)
    if (found) itemName = found.name
  })

  const { getAlternates, LANG_META } = await import('@/lib/i18n')
  
  return {
    title: itemName,
    description: `${itemName} - ${T.siteTagline}`,
    alternates: getAlternates(lang, `hosting-types/${params.slug}`),
    openGraph: {
      title: itemName,
      description: T.siteTagline,
      url: getAlternates(lang, `hosting-types/${params.slug}`).canonical,
      siteName: 'HostPro',
      locale: LANG_META[lang].locale,
      type: 'website',
    },
  }
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang)) notFound()

  const T = getT(lang)
  
  // Find the item name from i18n
  let itemName = ''
  T.hostingTypes.categories.forEach((cat: any) => {
    const found = cat.items.find((i: any) => i.slug === params.slug)
    if (found) itemName = found.name
  })

  if (!itemName) notFound()

  return (
    <PageWrapper lang={lang} slug={`hosting-types/${params.slug}`}>
      <JsonLd lang={lang} page="pricing" />
      <HostingLandingClient lang={lang} title={itemName} slug={params.slug} />
    </PageWrapper>
  )
}
