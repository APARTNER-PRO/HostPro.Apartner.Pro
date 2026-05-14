import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  const T = getT(lang)
  const { getAlternates } = await import('@/lib/i18n')
  
  return {
    title: T.footer.links.vps,
    description: 'Scalable VPS hosting with NVMe SSD, full root access and choice of OS.',
    alternates: getAlternates(lang, 'vps-hosting'),
    openGraph: {
      title: T.footer.links.vps,
      description: 'Scalable VPS hosting with NVMe SSD, full root access and choice of OS.',
      url: `https://hostpro.apartner.pro/${lang}/vps-hosting`,
      siteName: 'HostPro',
      locale: lang === 'uk' ? 'uk_UA' : 'ru_RU',
      type: 'website',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()
  const T = getT(lang)
  
  return (
    <PageWrapper lang={lang} slug="vps-hosting">
      <JsonLd lang={lang} page="pricing" />
      <main style={{ padding: '120px 24px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16, textTransform: 'capitalize' }}>{T.footer.links.vps}</h1>
          <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)' }}>{lang === 'uk' ? 'Контент незабаром...' : 'Контент скоро...'}</p>
        </div>
      </main>
    </PageWrapper>
  )
}