'use client'
import { useState, useRef, useEffect } from 'react'
import { Lang, getT } from '@/lib/i18n'

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.12) {
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
    <div ref={ref} className={className} style={{ 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0)' : 'translateY(24px)', 
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, 
      ...style 
    }}>
      {children}
    </div>
  )
}

export default function ReviewsClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  return (
    <div style={{ color: '#F0F4FF', background: '#050810', minHeight: '100vh' }}>
      {/* HERO */}
      <section style={{ padding: '160px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(59,130,246,.15),transparent)', top: '-20%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.2)', padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700, color: '#60A5FA', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>⭐ {T.nav.reviews}</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, marginBottom: 24 }}>
              {T.testimonials.title}
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'rgba(240,244,255,.5)', fontWeight: 300, lineHeight: 1.6 }}>
              {T.testimonials.sub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section style={{ padding: '0 24px 120px' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
            {T.testimonials.items.map((t: any, i: number) => (
              <FadeIn key={i} delay={i * 100} className="hp-feat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32 }}>
                <div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                    {[...Array(t.stars)].map((_, s) => (
                      <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    ))}
                  </div>
                  <p style={{ fontSize: 18, color: 'rgba(240,244,255,.9)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 32 }}>"{t.text}"</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid rgba(255,255,255,.1)' }}>👤</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: 14, color: 'rgba(240,244,255,.45)' }}>{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '0 24px 120px' }}>
        <FadeIn className="section-container">
          <div style={{ background: 'linear-gradient(135deg,rgba(59,130,246,.1),rgba(139,92,246,.1))', border: '1px solid rgba(255,255,255,.05)', borderRadius: 32, padding: '80px 40px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 16 }}>{T.cta.title}</h2>
            <p style={{ color: 'rgba(240,244,255,.5)', marginBottom: 32 }}>{T.cta.sub}</p>
            <a href={`${p}/#pricing`} className="btn-primary" style={{ padding: '16px 48px' }}>{T.cta.btn}</a>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
