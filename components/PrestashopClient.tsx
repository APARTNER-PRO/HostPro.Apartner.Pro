'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'
import OrderModal from './OrderModal'
import PricingFAQ from './PricingFAQ'

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
  .hp-plan-card.popular{background:linear-gradient(160deg,rgba(251,146,60,.1),rgba(249,115,22,.08));border-color:rgba(251,146,60,.35);box-shadow:0 0 60px rgba(251,146,60,.12)}
  .hp-plan-btn{width:100%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.07);color:#fff;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;margin-bottom:24px}
  .hp-plan-btn:hover{background:rgba(255,255,255,.14);transform:scale(1.02)}
  .hp-plan-btn.primary{background:linear-gradient(135deg,#F97316,#FB923C);border:none}
  .hp-plan-btn.primary:hover{filter:brightness(1.1);transform:scale(1.02)}
  .hp-billing-btn{border-radius:9px;cursor:pointer;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px;transition:all .2s;padding:10px 20px}
  .hp-cta-link{display:inline-block;text-decoration:none;transition:all .2s}
  .hp-cta-link:hover{transform:scale(1.04);filter:brightness(1.1)}
  @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:.9}}
  .hp-badge{animation:floatBadge 3s ease-in-out infinite}
  .hp-orb-pulse{animation:pulseGlow 4s ease-in-out infinite}

  .ps-plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  @media (max-width: 900px) { .ps-plans-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .ps-plans-grid { grid-template-columns: 1fr; } }

  .ps-why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
  .ps-why-card { background: rgba(251,146,60,.05); border: 1px solid rgba(251,146,60,.12); border-radius: 14px; padding: 24px; transition: all .2s; }
  .ps-why-card:hover { background: rgba(251,146,60,.09); border-color: rgba(251,146,60,.25); transform: translateY(-3px); }
`

const PS_REASONS = [
  { icon: '🛒', en: 'Module Compatibility', uk: 'Сумісність модулів', ru: 'Совместимость модулей', en_d: '5000+ PrestaShop modules work perfectly on our stack.', uk_d: '5000+ модулів PrestaShop ідеально працюють на нашому стеку.', ru_d: '5000+ модулей PrestaShop работают идеально на нашем стеке.' },
  { icon: '🌍', en: 'Multi-Language & Currency', uk: 'Мультимова та валюти', ru: 'Мультиязычность и валюты', en_d: 'Serve customers in multiple languages from a single store.', uk_d: 'Обслуговуйте клієнтів кількома мовами з одного магазину.', ru_d: 'Обслуживайте клиентов на нескольких языках из одного магазина.' },
  { icon: '📊', en: 'Built-in Analytics', uk: 'Вбудована аналітика', ru: 'Встроенная аналитика', en_d: 'Track orders, revenue and customer data directly in your admin.', uk_d: 'Відстежуйте замовлення, дохід та клієнтські дані прямо в адмінці.', ru_d: 'Отслеживайте заказы, доходы и данные клиентов прямо в adminке.' },
  { icon: '⚡', en: 'LiteSpeed Cache for PS', uk: 'LiteSpeed Cache для PS', ru: 'LiteSpeed Cache для PS', en_d: 'Server-level caching for maximum PrestaShop performance.', uk_d: 'Кешування на рівні сервера для максимальної продуктивності PrestaShop.', ru_d: 'Кэширование на уровне сервера для максимальной производительности PrestaShop.' },
]

export default function PrestashopClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)
  const getPrice = (base: number) => ((base + 1) * DISC[billing]).toFixed(2)
  const getTotalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36
    return ((base + 1) * months * DISC[billing]).toFixed(2)
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
        <div className="orb hp-orb-pulse" style={{ width: 600, height: 600, background: 'radial-gradient(circle,rgba(251,146,60,.15),transparent)', top: '10%', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ textAlign: 'center', maxWidth: 820, padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <div className="hp-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(251,146,60,.1)', border: '1px solid rgba(251,146,60,.25)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#FB923C', marginBottom: 32, fontWeight: 500 }}>{T.prestashop.badge}</div>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(40px,7vw,72px)', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24 }}>
            <span style={{ display: 'block', color: '#F0F4FF' }}>{T.prestashop.title1}</span>
            <span style={{ display: 'block', background: 'linear-gradient(135deg,#FB923C,#FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{T.prestashop.title2}</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(240,244,255,.6)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 40px', fontWeight: 300 }}>{T.prestashop.sub}</p>
          <Link href="#ps-pricing" className="btn-primary hp-cta-link" style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)', boxShadow: '0 0 40px rgba(251,146,60,.25)', fontSize: 17, padding: '16px 36px' }}>{T.hero.cta} →</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="ps-features">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.features.title}</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {T.prestashop.features.map((f: any, i: number) => (
              <FadeIn key={i} delay={i * 100} className="hp-feat-card">
                <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#FB923C' }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(240,244,255,.55)', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PRESTASHOP + HOSTPRO */}
      <section id="ps-why">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>
              {lang === 'uk' ? 'Чому PrestaShop на HostPro?' : lang === 'ru' ? 'Почему PrestaShop на HostPro?' : 'Why PrestaShop on HostPro?'}
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(240,244,255,.5)', fontWeight: 300, maxWidth: 560, margin: '0 auto' }}>
              {lang === 'uk' ? 'Ідеальна комбінація для успішного e-commerce' : lang === 'ru' ? 'Идеальная комбинация для успешного e-commerce' : 'The perfect combination for successful e-commerce'}
            </p>
          </FadeIn>
          <div className="ps-why-grid">
            {PS_REASONS.map((r, i) => (
              <FadeIn key={i} delay={i * 100} className="ps-why-card">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
                <h4 style={{ fontFamily: 'Syne,sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#FB923C' }}>
                  {lang === 'uk' ? r.uk : lang === 'ru' ? r.ru : r.en}
                </h4>
                <p style={{ fontSize: 14, color: 'rgba(240,244,255,.5)', lineHeight: 1.6, fontWeight: 300 }}>
                  {lang === 'uk' ? r.uk_d : lang === 'ru' ? r.ru_d : r.en_d}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="ps-pricing">
        <div className="section-container">
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(32px,5vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>{T.pricing.title}</h2>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', fontWeight: 300 }}>{T.prestashop.pricingSub}</p>
          </FadeIn>

          <FadeIn style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
            <div className="hp-billing-selector">
              {(['monthly', 'quarterly', 'yearly', 'threeYears'] as const).map((b) => (
                <button key={b} onClick={() => setBilling(b)} className="hp-billing-btn" style={{ background: billing === b ? 'rgba(251,146,60,.2)' : 'transparent', color: billing === b ? '#FB923C' : 'rgba(240,244,255,.5)', border: billing === b ? '1px solid rgba(251,146,60,.3)' : '1px solid transparent' }}>
                  {T.billing[b]}
                  {b === 'quarterly' && <span style={{ fontSize: 11, background: 'rgba(251,146,60,.15)', color: '#FB923C', padding: '2px 6px', borderRadius: 4 }}>{T.billing.save10}</span>}
                  {b === 'yearly' && <span style={{ fontSize: 11, background: 'rgba(251,146,60,.15)', color: '#FB923C', padding: '2px 6px', borderRadius: 4 }}>{T.billing.save20}</span>}
                  {b === 'threeYears' && <span style={{ fontSize: 11, background: 'rgba(244, 63, 94, 0.15)', color: '#F43F5E', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(244, 63, 94, 0.4)' }}>{T.billing.save30}</span>}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="ps-plans-grid">
              {T.pricing.plans.slice(1, 4).map((plan: any, i: number) => (
                <div key={i} className={`hp-plan-card${i === 1 ? ' popular' : ''}`}>
                  {i === 1 && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#F97316,#FB923C)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>{T.pricing.popular}</div>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 1 ? '#FB923C' : plan.color, boxShadow: `0 0 12px ${i === 1 ? '#FB923C' : plan.color}`, flexShrink: 0 }} />
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 18, fontWeight: 800 }}>{plan.name}</h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(240,244,255,.45)', marginBottom: 16, fontWeight: 300 }}>{plan.desc}</p>
                  <div style={{ marginBottom: 16 }}>
                    {billing !== 'monthly' && (
                      <div style={{ fontSize: 13, color: 'rgba(240,244,255,.4)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ textDecoration: 'line-through' }}>${plan.price.toFixed(2)}</span>
                        <span style={{ 
                          background: 'rgba(251, 146, 60, 0.08)', 
                          color: '#FB923C', 
                          padding: '3px 10px', 
                          borderRadius: '8px', 
                          fontSize: '11px', 
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          border: '1px solid rgba(251, 146, 60, 0.15)',
                          backdropFilter: 'blur(4px)'
                        }}>
                          {billing === 'threeYears' ? (
                            (plan.name === 'Agency' || plan.name === 'Agency Pro') ? (
                              `${T.billing.savings} $${Math.round(((plan.price + 1) * 36) - Number(getTotalPrice(plan.price)))}`
                            ) : (
                              T.billing.save30
                            )
                          ) : (
                            billing === 'yearly' ? T.billing.save20 : T.billing.save10
                          )}
                        </span>
                      </div>
                    )}
                    <span style={{ fontFamily: 'Syne,sans-serif', fontSize: 34, fontWeight: 800, color: i === 1 ? '#FB923C' : plan.color }}>${getPrice(plan.price)}</span>
                  </div>
                  <button onClick={() => setOrder({ name: plan.name + ' PrestaShop', price: getPrice(plan.price) })} className={`hp-plan-btn${i === 1 ? ' primary' : ''}`} style={{ marginBottom: 12 }}>{T.pricing.cta}</button>
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
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i === 1 ? '#FB923C' : plan.color} fillOpacity="0.15" /><path d="M4 7l2 2 4-4" stroke={i === 1 ? '#FB923C' : plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontSize: 12, color: 'rgba(240,244,255,.7)', fontWeight: 400 }}>{ex}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i === 1 ? '#FB923C' : plan.color} fillOpacity="0.15" /><path d="M4 7l2 2 4-4" stroke={i === 1 ? '#FB923C' : plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 12, color: 'rgba(240,244,255,.7)', fontWeight: 600 }}>PrestaShop 1-click install</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i === 1 ? '#FB923C' : plan.color} fillOpacity="0.15" /><path d="M4 7l2 2 4-4" stroke={i === 1 ? '#FB923C' : plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span style={{ fontSize: 12, color: 'rgba(240,244,255,.7)', fontWeight: 600 }}>LiteSpeed E-commerce Cache</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <PricingFAQ lang={lang} />
        </div>
      </section>

      {order && <OrderModal lang={lang} planName={order.name} planPrice={order.price} onClose={() => setOrder(null)} />}
    </>
  )
}
