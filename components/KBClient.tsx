'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function FadeIn({ children, delay = 0, className = '', style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref)
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const CSS = `
  .kb-cat-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 20px; padding: 32px; transition: all .25s; cursor: pointer; text-decoration: none; display: block; }
  .kb-cat-card:hover { transform: translateY(-4px); background: rgba(255,255,255,.05); border-color: rgba(96,165,250,.3); }
  .kb-search-input { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 18px 24px; font-size: 16px; color: #fff; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .kb-search-input:focus { outline: none; border-color: #60A5FA; background: rgba(255,255,255,.08); box-shadow: 0 0 20px rgba(96,165,250,.1); }
  .kb-article-link { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 12px; background: rgba(255,255,255,.02); border: 1px solid transparent; transition: all .2s; text-decoration: none; color: rgba(240,244,255,.7); font-size: 15px; margin-bottom: 12px; }
  .kb-article-link:hover { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.08); color: #60A5FA; padding-left: 20px; }
`

export default function KBClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO / SEARCH */}
      <section className="grid-bg" style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(96,165,250,.12), transparent)', top: '-10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 20 }}>{T.kb.title}</h1>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', marginBottom: 40, fontWeight: 300 }}>{T.kb.sub}</p>
          </FadeIn>
          
          <FadeIn delay={100} style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" className="kb-search-input" placeholder={T.kb.searchPh} />
              <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: '60px 24px 100px' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 80 }}>
            {T.kb.categories.map((cat: any, i: number) => (
              <FadeIn key={i} delay={i * 50} className="kb-cat-card">
                <div style={{ fontSize: 32, marginBottom: 24 }}>{cat.icon}</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{cat.title}</h3>
                <div style={{ fontSize: 14, color: 'rgba(240,244,255,.4)', fontWeight: 300 }}>{cat.count} {T.kb.articleCount}</div>
              </FadeIn>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 48 }}>
            <FadeIn>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 32 }}>{T.kb.popular}</h2>
              {T.kb.popularItems.map((item: any, i: number) => (
                <Link key={i} href={`${p}/kb/${item.slug}`} className="kb-article-link">
                  <span style={{ opacity: 0.3 }}>📄</span>
                  {item.title}
                </Link>
              ))}
            </FadeIn>

            <FadeIn delay={200}>
              <div style={{ background: 'linear-gradient(135deg, rgba(96,165,250,.08), rgba(167,139,250,.08))', borderRadius: 24, padding: 40, border: '1px solid rgba(96,165,250,.15)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>💬</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{T.kb.supportTitle}</h3>
                <p style={{ fontSize: 15, color: 'rgba(240,244,255,.5)', marginBottom: 24, lineHeight: 1.6 }}>{T.kb.supportSub}</p>
                <Link href={`${p}/contact`} className="btn-primary" style={{ alignSelf: 'center' }}>{T.kb.supportBtn}</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
