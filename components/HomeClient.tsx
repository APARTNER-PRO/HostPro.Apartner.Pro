'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'
import OrderModal from './OrderModal'

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.12) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref)
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

const DISC: Record<string, number> = { monthly: 1, quarterly: 0.9, yearly: 0.8 }

export default function HomeClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)

  const getPrice = (base: number) => (base * DISC[billing]).toFixed(2)

  const statGrads = [
    'linear-gradient(135deg,#60A5FA,#A78BFA)',
    'linear-gradient(135deg,#A78BFA,#F472B6)',
    'linear-gradient(135deg,#6EE7B7,#60A5FA)',
    'linear-gradient(135deg,#FB923C,#F472B6)',
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" className="grid-bg" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="orb animate-pulse-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(59,130,246,.22),transparent)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle,rgba(139,92,246,.18),transparent)', bottom: '20%', right: '10%' }} />
        <div className="orb" style={{ width: 200, height: 200, background: 'radial-gradient(circle,rgba(251,146,60,.13),transparent)', top: '30%', left: '5%' }} />

        <div style={{ textAlign: 'center', maxWidth: 820, padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div className="animate-float" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(96,165,250,.1)', border: '1px solid rgba(96,165,250,.25)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#93C5FD', marginBottom: 32, fontWeight: 500 }}>
            {T.hero.badge}
          </div>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px,8vw,88px)', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24 }}>
            <span style={{ display: 'block', color: '#F0F4FF' }}>{T.hero.title1}</span>
            <span className="grad-text" style={{ display: 'block' }}>{T.hero.title2}</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(240,244,255,.6)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px', fontWeight: 300 }}>
            {T.hero.sub}
          </p>

          <Link href={`${p}/#pricing`} className="btn-primary" style={{ boxShadow: '0 0 40px rgba(59,130,246,.3)', marginBottom: 16, fontSize: 17, padding: '16px 36px' }}>
            {T.hero.cta} →
          </Link>
          <p style={{ fontSize: 13, color: 'rgba(240,244,255,.35)', fontWeight: 400 }}>{T.hero.ctaSub}</p>

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
            {[
              { val: '12K+', label: T.hero.stat1 },
              { val: '0.3s', label: T.hero.stat2 },
              { val: '99.9%', label: T.hero.stat3 },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 36, fontWeight: 800, background: statGrads[i], WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.val}</div>
                <div style={{ fontSize: 13, color: 'rgba(240,244,255,.45)', marginTop: 4, fontWeight: 400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '120px 24px' }}>
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.features.title}</h2>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', fontWeight: 300 }}>{T.features.sub}</p>
          </FadeIn>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
              {T.features.items.map((f, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '28px', transition: 'transform .25s,background .25s', cursor: 'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.055)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.03)' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(240,244,255,.55)', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '120px 24px', background: 'rgba(255,255,255,.015)', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(139,92,246,.12),transparent)', top: 0, right: 0, zIndex: 0 }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.pricing.title}</h2>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', fontWeight: 300 }}>{T.pricing.sub}</p>
          </FadeIn>

          {/* Billing toggle */}
          <FadeIn style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 4, gap: 4 }}>
              {(['monthly', 'quarterly', 'yearly'] as const).map((b) => (
                <button key={b} onClick={() => setBilling(b)} style={{ background: billing === b ? 'rgba(96,165,250,.2)' : 'transparent', color: billing === b ? '#60A5FA' : 'rgba(240,244,255,.5)', border: billing === b ? '1px solid rgba(96,165,250,.3)' : '1px solid transparent', padding: '10px 20px', borderRadius: 9, cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 8, transition: 'all .2s' }}>
                  {T.billing[b === 'monthly' ? 'monthly' : b === 'quarterly' ? 'quarterly' : 'yearly']}
                  {b === 'quarterly' && <span style={{ background: 'rgba(251,146,60,.2)', color: '#FB923C', fontSize: 11, padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>{T.billing.save10}</span>}
                  {b === 'yearly'    && <span style={{ background: 'rgba(110,231,183,.2)', color: '#6EE7B7', fontSize: 11, padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>{T.billing.save20}</span>}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Plans */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 20, alignItems: 'start' }}>
              {T.pricing.plans.map((plan, i) => (
                <div key={i} style={{ background: plan.popular ? 'linear-gradient(160deg,rgba(96,165,250,.1),rgba(139,92,246,.08))' : 'rgba(255,255,255,.03)', border: plan.popular ? '1px solid rgba(96,165,250,.35)' : '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '32px 28px', position: 'relative', transition: 'transform .3s', boxShadow: plan.popular ? '0 0 60px rgba(59,130,246,.12)' : 'none', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = ''}
                >
                  {plan.popular && (
                    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 16px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                      {T.pricing.popular}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: plan.color, boxShadow: `0 0 12px ${plan.color}`, flexShrink: 0 }} />
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800 }}>{plan.name}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(240,244,255,.45)', marginBottom: 24, fontWeight: 300 }}>{plan.desc}</p>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 44, fontWeight: 800, color: plan.color }}>${getPrice(plan.price)}</span>
                    <span style={{ fontSize: 14, color: 'rgba(240,244,255,.4)', fontWeight: 300 }}>{T.pricing.mo}</span>
                  </div>
                  <button onClick={() => setOrder({ name: plan.name, price: getPrice(plan.price) })} style={{ width: '100%', background: plan.popular ? 'linear-gradient(135deg,#3B82F6,#8B5CF6)' : 'rgba(255,255,255,.07)', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,.1)', color: '#fff', padding: 12, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .2s', marginBottom: 24 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'; if (!plan.popular) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.12)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; if (!plan.popular) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.07)' }}
                  >
                    {T.pricing.cta}
                  </button>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20 }}>
                    <p style={{ fontSize: 12, color: 'rgba(240,244,255,.35)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em' }}>{T.pricing.featLabel}</p>
                    {plan.extras.map((ex, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="7" fill={plan.color} fillOpacity="0.15"/>
                          <path d="M4 7l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: 13, color: 'rgba(240,244,255,.7)', fontWeight: 400 }}>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Custom plan */}
          <FadeIn style={{ marginTop: 56, textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,rgba(59,130,246,.07),rgba(139,92,246,.07))', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: '36px 48px', maxWidth: 600, width: '100%', position: 'relative', overflow: 'hidden' }}>
              <div className="orb" style={{ width: 200, height: 200, background: 'radial-gradient(circle,rgba(96,165,250,.12),transparent)', top: '-60px', right: '-40px' }} />
              <div style={{ fontSize: 28, marginBottom: 12 }}>💬</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{T.pricing.customTitle}</h3>
              <p style={{ fontSize: 14, color: 'rgba(240,244,255,.5)', marginBottom: 24, fontWeight: 300, lineHeight: 1.6 }}>{T.pricing.customSub}</p>
              <Link href={`${p}/contact`} className="btn-primary">{T.pricing.customBtn}</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section id="who" style={{ padding: '120px 24px' }}>
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.who.title}</h2>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', fontWeight: 300 }}>{T.who.sub}</p>
          </FadeIn>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
              {T.who.items.map((w, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, padding: '32px 28px', textAlign: 'center', transition: 'transform .25s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = ''}
                >
                  <div style={{ fontSize: 40, marginBottom: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: w.bg, borderRadius: 16, width: 72, height: 72 }}>{w.icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 10, color: w.color }}>{w.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(240,244,255,.55)', lineHeight: 1.7, fontWeight: 300 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '80px 24px' }}>
        <FadeIn style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.15))', border: '1px solid rgba(96,165,250,.2)', borderRadius: 24, padding: '60px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle,rgba(59,130,246,.2),transparent)', top: '-50%', left: '50%', transform: 'translateX(-50%)' }} />
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, position: 'relative', zIndex: 1 }}>{T.cta.title}</h2>
            <p style={{ fontSize: 16, color: 'rgba(240,244,255,.55)', marginBottom: 32, fontWeight: 300, position: 'relative', zIndex: 1 }}>{T.cta.sub}</p>
            <Link href={`${p}/#pricing`} className="btn-primary" style={{ boxShadow: '0 0 40px rgba(59,130,246,.3)', fontSize: 17, padding: '16px 40px', position: 'relative', zIndex: 1 }}>
              {T.cta.btn}
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Order Modal */}
      {order && <OrderModal lang={lang} planName={order.name} planPrice={order.price} onClose={() => setOrder(null)} />}
    </>
  )
}
