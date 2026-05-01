'use client'
import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'

export default function KBArticleClient({ lang, slug }: { lang: Lang, slug: string }) {
  const T = getT(lang)
  const article = T.kb?.articles?.find((a: any) => a.slug === slug)
  const p = lang === 'en' ? '' : `/${lang}`

  if (!article) return (
    <div style={{ color: '#F0F4FF', background: '#050810', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 16 }}>{T.notFound?.title || 'Not Found'}</h1>
        <Link href={`${p}/kb`} style={{ color: '#60A5FA', textDecoration: 'none' }}>{T.kb?.backToKb || 'Back to Knowledge Base'}</Link>
      </div>
    </div>
  )

  return (
    <div style={{ color: '#F0F4FF', background: '#050810', minHeight: '100vh' }}>
      {/* HEADER */}
      <section style={{ padding: '160px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(96,165,250,.12),transparent)', top: '-20%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <Link href={`${p}/kb`} style={{ color: 'rgba(240,244,255,.5)', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 32, fontWeight: 500, transition: 'color 0.2s' }}>
            {T.kb.backToKb}
          </Link>
          <div style={{ maxWidth: 800 }}>
            <div style={{ fontSize: 14, color: '#60A5FA', fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {article.cat}
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 24 }}>
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: '0 24px 120px' }}>
        <div className="section-container" style={{ maxWidth: 800 }}>
          <div 
            className="kb-content"
            style={{ 
              fontSize: 18, 
              color: 'rgba(240,244,255,.8)', 
              lineHeight: 1.8,
              fontWeight: 300
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <style dangerouslySetInnerHTML={{ __html: `
            .kb-content h3 {
              font-family: 'Syne', sans-serif;
              font-size: 28px;
              font-weight: 800;
              color: #fff;
              margin: 48px 0 24px;
            }
            .kb-content p {
              margin-bottom: 24px;
            }
            .kb-content ul, .kb-content ol {
              margin-bottom: 32px;
              padding-left: 24px;
            }
            .kb-content li {
              margin-bottom: 12px;
            }
            .kb-content strong {
              color: #60A5FA;
              font-weight: 700;
            }
          `}} />

          <div style={{ marginTop: 80, padding: 40, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 24, textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{T.kb.helpful}</h3>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button className="btn-primary" style={{ padding: '10px 32px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>{T.kb.yes}</button>
              <button className="btn-primary" style={{ padding: '10px 32px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>{T.kb.no}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
