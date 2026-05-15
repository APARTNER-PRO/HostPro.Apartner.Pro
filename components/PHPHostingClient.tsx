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

function FadeIn({ children, delay = 0, className = '', style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref)
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const DISC: Record<string, number> = { monthly: 1, quarterly: 0.9, yearly: 0.8, threeYears: 0.7 }

const CSS = `
  .hp-feat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;transition:transform .25s,background .25s;cursor:default}
  .hp-feat-card:hover{transform:translateY(-4px);background:rgba(255,255,255,.055)}
  .hp-plan-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:22px 18px;position:relative;transition:transform .3s;cursor:default}
  .hp-plan-card:hover{transform:translateY(-8px)}
  .hp-plan-card.popular{background:linear-gradient(160deg,rgba(139,92,246,.1),rgba(168,85,247,.08));border-color:rgba(167,139,250,.35);box-shadow:0 0 60px rgba(139,92,246,.12)}
  .hp-plan-btn{width:100%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.07);color:#fff;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;margin-bottom:24px}
  .hp-plan-btn:hover{background:rgba(255,255,255,.14);transform:scale(1.02)}
  .hp-plan-btn.primary{background:linear-gradient(135deg,#8B5CF6,#A78BFA);border:none}
  .hp-plan-btn.primary:hover{filter:brightness(1.1);transform:scale(1.02)}
  .hp-billing-btn{border-radius:9px;cursor:pointer;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px;transition:all .2s;padding:10px 20px}
  .hp-cta-link{display:inline-block;text-decoration:none;transition:all .2s}
  .hp-cta-link:hover{transform:scale(1.04);filter:brightness(1.1)}
  @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:.9}}
  .hp-badge{animation:floatBadge 3s ease-in-out infinite}
  .hp-orb-pulse{animation:pulseGlow 4s ease-in-out infinite}

  .php-plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  @media (max-width: 900px) { .php-plans-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .php-plans-grid { grid-template-columns: 1fr; } }

  .php-tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .php-tech-item { background: rgba(139,92,246,.06); border: 1px solid rgba(139,92,246,.15); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 14px; transition: all .2s; }
  .php-tech-item:hover { background: rgba(139,92,246,.1); border-color: rgba(167,139,250,.3); transform: translateY(-2px); }
`

const PHP_VERSIONS = ['PHP 7.4', 'PHP 8.0', 'PHP 8.1', 'PHP 8.2', 'PHP 8.3']
const PHP_FRAMEWORKS = ['Laravel', 'Symfony', 'CodeIgniter', 'Yii 2', 'CakePHP', 'Slim', 'WordPress', 'Joomla', 'Drupal', 'Magento']

export default function PHPHostingClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)
  const getPrice = (base: number) => (base * DISC[billing]).toFixed(2)
  const getTotalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36
    return (base * months * DISC[billing]).toFixed(2)
  }
  const getBillingText = () => {
    if (billing === 'monthly') return { term: T.billing.monthTerm }
    if (billing === 'quarterly') return { term: T.billing.quarterTerm }
    if (billing === 'yearly') return { term: T.billing.yearTerm }
    return { term: T.billing.threeYearTerm }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="grid-bg" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 80 }}>
        <div className="orb hp-orb-pulse" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(139,92,246,.18),transparent)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ textAlign: 'center', maxWidth: 820, padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div className="hp-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.25)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#A78BFA', marginBottom: 32, fontWeight: 500 }}>{T.php.badge}</div>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(40px,7vw,72px)', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24 }}>
            <span style={{ display: 'block', color: '#F0F4FF' }}>{T.php.title1}</span>
            <span style={{ display: 'block', background: 'linear-gradient(135deg,#A78BFA,#C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{T.php.title2}</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(240,244,255,.6)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 40px', fontWeight: 300 }}>{T.php.sub}</p>
          <Link href="#php-pricing" className="btn-primary hp-cta-link" style={{ background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)', boxShadow: '0 0 40px rgba(139,92,246,.3)', fontSize: 17, padding: '16px 36px' }}>{T.hero.cta} →</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="php-features">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.features.title}</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {T.php.features.map((f: any, i: number) => (
              <FadeIn key={i} delay={i * 100} className="hp-feat-card">
                <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#A78BFA' }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(240,244,255,.55)', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PHP VERSIONS + FRAMEWORKS */}
      <section id="php-versions">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>
              {lang === 'uk' ? 'Підтримувані версії та фреймворки' : lang === 'ru' ? 'Поддерживаемые версии и фреймворки' : 'Supported Versions & Frameworks'}
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <FadeIn>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 13, fontWeight: 700, marginBottom: 20, color: 'rgba(240,244,255,.7)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                {lang === 'uk' ? 'Версії PHP' : lang === 'ru' ? 'Версии PHP' : 'PHP Versions'}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {PHP_VERSIONS.map((v) => (
                  <div key={v} style={{ background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.25)', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 600, color: '#A78BFA' }}>{v}</div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 13, fontWeight: 700, marginBottom: 20, color: 'rgba(240,244,255,.7)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                {lang === 'uk' ? 'Фреймворки та CMS' : lang === 'ru' ? 'Фреймворки и CMS' : 'Frameworks & CMS'}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {PHP_FRAMEWORKS.map((f) => (
                  <div key={f} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 8, padding: '8px 16px', fontSize: 14, fontWeight: 500, color: 'rgba(240,244,255,.7)' }}>{f}</div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="php-pricing">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.pricing.title}</h2>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', fontWeight: 300 }}>{T.php.pricingSub}</p>
          </FadeIn>

          <FadeIn style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 4, gap: 4 }}>
              {(['monthly', 'quarterly', 'yearly', 'threeYears'] as const).map((b) => (
                <button key={b} onClick={() => setBilling(b)} className="hp-billing-btn" style={{ background: billing === b ? 'rgba(139,92,246,.2)' : 'transparent', color: billing === b ? '#A78BFA' : 'rgba(240,244,255,.5)', border: billing === b ? '1px solid rgba(139,92,246,.3)' : '1px solid transparent' }}>
                  {T.billing[b]}
                  {b === 'quarterly' && <span style={{ fontSize: 11, background: 'rgba(139,92,246,.2)', color: '#A78BFA', padding: '2px 6px', borderRadius: 4 }}>{T.billing.save10}</span>}
                  {b === 'yearly' && <span style={{ fontSize: 11, background: 'rgba(139,92,246,.2)', color: '#A78BFA', padding: '2px 6px', borderRadius: 4 }}>{T.billing.save20}</span>}
                  {b === 'threeYears' && <span style={{ fontSize: 11, background: 'rgba(244, 63, 94, 0.15)', color: '#F43F5E', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(244, 63, 94, 0.4)' }}>{T.billing.save30}</span>}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="php-plans-grid">
              {T.pricing.plans.slice(1, 4).map((plan: any, i: number) => (
                <div key={i} className={`hp-plan-card${i === 1 ? ' popular' : ''}`}>
                  {i === 1 && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#8B5CF6,#A78BFA)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>{T.pricing.popular}</div>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 1 ? '#A78BFA' : plan.color, boxShadow: `0 0 12px ${i === 1 ? '#A78BFA' : plan.color}`, flexShrink: 0 }} />
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800 }}>{plan.name}</h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(240,244,255,.45)', marginBottom: 16, fontWeight: 300 }}>{plan.desc}</p>
                  <div style={{ marginBottom: 16 }}>
                    {billing !== 'monthly' && (
                      <div style={{ fontSize: 13, color: 'rgba(240,244,255,.4)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ textDecoration: 'line-through' }}>${plan.price.toFixed(2)}</span>
                        <span style={{ 
                          background: 'rgba(167, 139, 250, 0.08)', 
                          color: '#A78BFA', 
                          padding: '3px 10px', 
                          borderRadius: '8px', 
                          fontSize: '11px', 
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          border: '1px solid rgba(167, 139, 250, 0.15)',
                          backdropFilter: 'blur(4px)'
                        }}>
                          {billing === 'threeYears' ? (
                            (plan.name === 'Agency' || plan.name === 'Agency Pro') ? (
                              `${T.billing.savings} $${Math.round((plan.price * 36) - Number(getTotalPrice(plan.price)))}`
                            ) : (
                              T.billing.save30
                            )
                          ) : (
                            billing === 'yearly' ? T.billing.save20 : T.billing.save10
                          )}
                        </span>
                      </div>
                    )}
                    <span style={{ fontFamily: 'Syne,sans-serif', fontSize: 34, fontWeight: 800, color: i === 1 ? '#A78BFA' : plan.color }}>${getPrice(plan.price)}</span>
                  </div>
                  <button onClick={() => setOrder({ name: plan.name + ' PHP', price: getPrice(plan.price) })} className={`hp-plan-btn${i === 1 ? ' primary' : ''}`} style={{ marginBottom: 12 }}>{T.pricing.cta}</button>
                  <div style={{ fontSize: 12, color: 'rgba(240,244,255,.5)', marginBottom: 24, fontWeight: 300, lineHeight: 1.6 }}>
                    <div>{T.billing.payToday} <span style={{ fontWeight: 600 }}>${getTotalPrice(plan.price)}</span> {T.billing.today}.</div>
                    <div style={{ marginTop: 2, fontSize: 11, opacity: 0.8 }}>
                      {T.billing.renewsAt} <span style={{fontWeight:600}}>${plan.price.toFixed(2)}{T.pricing.mo}</span>. {billing !== 'monthly' && `${T.billing.prepaidFor} ${billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36} ${T.billing.months}. `}{T.billing.exVat}
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 20 }}>
                    <p style={{ fontSize: 11, color: 'rgba(240,244,255,.35)', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em' }}>{T.pricing.featLabel}</p>
                    {plan.extras.map((ex: string, j: number) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i === 1 ? '#A78BFA' : plan.color} fillOpacity="0.15" /><path d="M4 7l2 2 4-4" stroke={i === 1 ? '#A78BFA' : plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontSize: 12, color: 'rgba(240,244,255,.7)', fontWeight: 400 }}>{ex}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i === 1 ? '#A78BFA' : plan.color} fillOpacity="0.15" /><path d="M4 7l2 2 4-4" stroke={i === 1 ? '#A78BFA' : plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 12, color: 'rgba(240,244,255,.7)', fontWeight: 600 }}>Multi-version PHP</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i === 1 ? '#A78BFA' : plan.color} fillOpacity="0.15" /><path d="M4 7l2 2 4-4" stroke={i === 1 ? '#A78BFA' : plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 12, color: 'rgba(240,244,255,.7)', fontWeight: 600 }}>Composer + SSH</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {order && <OrderModal lang={lang} planName={order.name} planPrice={order.price} onClose={() => setOrder(null)} />}
    </>
  )
}
