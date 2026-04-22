import PageWrapper from '@/components/PageWrapper'
import { Lang, getT, LANGS } from '@/lib/i18n'
import { notFound } from 'next/navigation'


export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export default function Page({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang) || lang === 'en') notFound()
  const T = getT(lang)
  
  return (
    <PageWrapper lang={lang} slug="dedicated-servers">
      <main style={{ padding: '120px 24px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16, textTransform: 'capitalize' }}>dedicated servers</h1>
          <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)' }}>Контент незабаром...</p>
        </div>
      </main>
    </PageWrapper>
  )
}