import { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { getT, getAlternates } from '@/lib/i18n'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Dedicated Servers — High-Performance Bare Metal Hosting',
  description: 'Enterprise-grade dedicated servers with NVMe storage, 1Gbps network and 24/7 technical support. Maximum performance for your business.',
  alternates: getAlternates('en', 'dedicated-servers'),
}

export default function Page() {
  const lang = 'en'
  const T = getT(lang)
  
  return (
    <PageWrapper lang={lang} slug="dedicated-servers">
      <JsonLd lang={lang} page="pricing" />
      <main style={{ padding: '120px 24px', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: 16, textTransform: 'capitalize' }}>dedicated servers</h1>
          <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)' }}>Content coming soon...</p>
        </div>
      </main>
    </PageWrapper>
  )
}