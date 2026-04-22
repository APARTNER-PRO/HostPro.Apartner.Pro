import PageWrapper from '@/components/PageWrapper'
import { getT } from '@/lib/i18n'

export default function Page() {
  const lang = 'en'
  const T = getT(lang)
  
  return (
    <PageWrapper lang={lang} slug="vps-hosting">
      <main style={{ padding: '120px 24px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16, textTransform: 'capitalize' }}>vps hosting</h1>
          <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)' }}>Content coming soon...</p>
        </div>
      </main>
    </PageWrapper>
  )
}