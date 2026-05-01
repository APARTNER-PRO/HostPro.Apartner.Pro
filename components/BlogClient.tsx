'use client'
import { useState, useRef, useEffect } from 'react'
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

export default function BlogClient({ lang }: { lang: Lang }) {
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
              <span>📝 {T.nav.about}</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, marginBottom: 24 }}>
              {T.blog.title}
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'rgba(240,244,255,.5)', fontWeight: 300, lineHeight: 1.6 }}>
              {T.blog.sub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* BLOG LIST */}
      <section style={{ padding: '0 24px 120px' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {T.blog.posts.map((post, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Link href={`${p}/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="hp-feat-card" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    padding: 0, 
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,.02)',
                    border: '1px solid rgba(255,255,255,.05)',
                    borderRadius: '24px',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ height: 200, background: `linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))`, position: 'relative' }}>
                       {/* Placeholder for images since we don't have real ones yet */}
                       <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                          {i === 0 ? '⚡' : i === 1 ? '📋' : '🔒'}
                       </div>
                    </div>
                    <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: 13, color: 'rgba(240,244,255,.4)', marginBottom: 12, fontWeight: 500 }}>
                        {post.date}
                      </div>
                      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#fff', lineHeight: 1.3 }}>
                        {post.title}
                      </h2>
                      <p style={{ fontSize: 15, color: 'rgba(240,244,255,.5)', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                        {post.desc}
                      </p>
                      <div style={{ color: '#60A5FA', fontWeight: 700, fontSize: 15 }}>
                        {T.blog.readMore}
                      </div>
                    </div>
                  </div>
                </Link>
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
            <Link href={`${p}/#pricing`} className="btn-primary" style={{ padding: '16px 48px' }}>{T.cta.btn}</Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
