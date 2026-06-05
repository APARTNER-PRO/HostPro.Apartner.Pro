import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import HostingLandingClient from '@/components/HostingLandingClient'
import { getT } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  const T = getT('en')
  const params: { slug: string }[] = []
  
  T.hostingTypes.categories.forEach((cat: any) => {
    cat.items.forEach((item: any) => {
      params.push({ slug: item.slug })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const T = getT('en')
  
  let itemName = params.slug
  T.hostingTypes.categories.forEach((cat: any) => {
    const found = cat.items.find((i: any) => i.slug === params.slug)
    if (found) itemName = found.name
  })

  const { getAlternates, LANG_META } = await import('@/lib/i18n')
  
  return {
    title: itemName,
    description: `${itemName} - ${T.siteTagline}`,
    alternates: getAlternates('en', `hosting-types/${params.slug}`),
    openGraph: {
      title: itemName,
      description: T.siteTagline,
      url: getAlternates('en', `hosting-types/${params.slug}`).canonical,
      siteName: 'HostPro',
      locale: LANG_META['en'].locale,
      type: 'website',
    },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const T = getT('en')
  
  let itemName = ''
  T.hostingTypes.categories.forEach((cat: any) => {
    const found = cat.items.find((i: any) => i.slug === params.slug)
    if (found) itemName = found.name
  })

  if (!itemName) notFound()

  return (
    <PageWrapper lang="en" slug={`hosting-types/${params.slug}`}>
      <JsonLd lang="en" page={params.slug as any} />
      <HostingLandingClient lang="en" title={itemName} slug={params.slug} />
    </PageWrapper>
  )
}
