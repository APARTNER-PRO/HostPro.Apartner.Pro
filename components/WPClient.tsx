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

const DISC: Record<string, number> = { monthly: 1, quarterly: 0.9, yearly: 0.8 }

const CSS = `
  .hp-feat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;transition:transform .25s,background .25s;cursor:default}
  .hp-feat-card:hover{transform:translateY(-4px);background:rgba(255,255,255,.055)}
  .hp-plan-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:22px 18px;position:relative;transition:transform .3s;cursor:default}
  .hp-plan-card:hover{transform:translateY(-8px)}
  .hp-plan-card.popular{background:linear-gradient(160deg,rgba(59,130,246,.1),rgba(139,92,246,.08));border-color:rgba(96,165,250,.35);box-shadow:0 0 60px rgba(59,130,246,.12)}
  .hp-plan-btn{width:100%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.07);color:#fff;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;margin-bottom:24px}
  .hp-plan-btn:hover{background:rgba(255,255,255,.14);transform:scale(1.02)}
  .hp-plan-btn.primary{background:linear-gradient(135deg,#3B82F6,#8B5CF6);border:none}
  .hp-plan-btn.primary:hover{filter:brightness(1.1);transform:scale(1.02)}
  .hp-billing-btn{border-radius:9px;cursor:pointer;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px;transition:all .2s;padding:10px 20px}
  .hp-cta-link{display:inline-block;text-decoration:none;transition:all .2s}
  .hp-cta-link:hover{transform:scale(1.04);filter:brightness(1.1)}
  @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:.9}}
  .hp-badge{animation:floatBadge 3s ease-in-out infinite}
  .hp-orb-pulse{animation:pulseGlow 4s ease-in-out infinite}
  @media (max-width: 767px) { .price__wrapper { display: flex; flex-direction: column; } }

  .wp-plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  @media (max-width: 900px) { .wp-plans-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .wp-plans-grid { grid-template-columns: 1fr; } }
`

export default function WPClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)
  const getPrice = (base: number) => (base * DISC[billing]).toFixed(2)
  const getTotalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : 12
    return (base * months * DISC[billing]).toFixed(2)
  }
  const getRenewalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : 12
    return (base * months).toFixed(2)
  }
  const getBillingText = () => {
    if (billing === 'monthly') return { term: T.billing.monthTerm, period: T.billing.monthly.toLowerCase() }
    if (billing === 'quarterly') return { term: T.billing.quarterTerm, period: T.billing.quarterly.toLowerCase() }
    return { term: T.billing.yearTerm, period: T.billing.yearly.toLowerCase() }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="grid-bg" style={{ position:'relative',minHeight:'90vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden', paddingTop: 80 }}>
        <div className="orb hp-orb-pulse" style={{ width:600,height:600,background:'radial-gradient(circle,rgba(34,197,94,.15),transparent)',top:'10%',left:'50%',transform:'translateX(-50%)' }} />
        <div style={{ textAlign:'center',maxWidth:820,padding:'0 24px',position:'relative',zIndex:2 }}>
          <div className="hp-badge" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.25)',borderRadius:100,padding:'6px 16px',fontSize:13,color:'#4ADE80',marginBottom:32,fontWeight:500 }}>{T.wp.badge}</div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(40px,7vw,72px)',lineHeight:1.1,letterSpacing:'-2px',marginBottom:24 }}>
            <span style={{ display:'block',color:'#F0F4FF' }}>{T.wp.title1}</span>
            <span className="grad-text" style={{ display:'block', background: 'linear-gradient(135deg,#4ADE80,#3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{T.wp.title2}</span>
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,19px)',color:'rgba(240,244,255,.6)',lineHeight:1.7,maxWidth:640,margin:'0 auto 40px',fontWeight:300 }}>{T.wp.sub}</p>
          <Link href="#wp-pricing" className="btn-primary hp-cta-link" style={{ background: 'linear-gradient(135deg,#22C55E,#3B82F6)', boxShadow:'0 0 40px rgba(34,197,94,.25)',fontSize:17,padding:'16px 36px' }}>{T.hero.cta} →</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'100px 24px' }}>
        <div className="section-container">
          <FadeIn style={{ textAlign:'center',marginBottom:72 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,48px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.features.title}</h2>
          </FadeIn>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24 }}>
            {T.wp.features.map((f: any, i: number)=>(
              <FadeIn key={i} delay={i*100} className="hp-feat-card">
                <div style={{ fontSize:36,marginBottom:20 }}>{f.icon}</div>
                <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:20,fontWeight:700,marginBottom:12 }}>{f.title}</h3>
                <p style={{ fontSize:15,color:'rgba(240,244,255,.55)',lineHeight:1.7,fontWeight:300 }}>{f.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="wp-pricing" style={{ padding:'100px 24px',background:'rgba(255,255,255,.015)' }}>
        <div className="section-container">
          <FadeIn style={{ textAlign:'center',marginBottom:48 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,48px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.pricing.title}</h2>
            <p style={{ fontSize:18,color:'rgba(240,244,255,.5)',fontWeight:300 }}>{T.wp.pricingSub}</p>
          </FadeIn>
          
          <FadeIn style={{ display:'flex',justifyContent:'center',marginBottom:60 }}>
            <div className="price__wrapper" style={{ display:'flex',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',borderRadius:12,padding:4,gap:4 }}>
              {(['monthly','quarterly','yearly'] as const).map((b)=>(
                <button key={b} onClick={()=>setBilling(b)} className="hp-billing-btn" style={{ background:billing===b?'rgba(34,197,94,.2)':'transparent',color:billing===b?'#4ADE80':'rgba(240,244,255,.5)',border:billing===b?'1px solid rgba(34,197,94,.3)':'1px solid transparent' }}>
                  {T.billing[b==='monthly'?'monthly':b==='quarterly'?'quarterly':'yearly']}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="wp-plans-grid">
              {T.pricing.plans.slice(1, 4).map((plan: any, i: number)=>(
                <div key={i} className={`hp-plan-card${i===1?' popular':''}`}>
                  {i===1&&<div style={{ position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:100,whiteSpace:'nowrap' }}>{T.pricing.popular}</div>}
                  <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
                    <div style={{ width:10,height:10,borderRadius:'50%',background:i===1?'#4ADE80':plan.color,boxShadow:`0 0 12px ${i===1?'#4ADE80':plan.color}`,flexShrink:0 }} />
                    <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:18,fontWeight:800 }}>{plan.name}</h3>
                  </div>
                  <p style={{ fontSize:12,color:'rgba(240,244,255,.45)',marginBottom:16,fontWeight:300 }}>{plan.desc}</p>
                  <div style={{ marginBottom:24 }}>
                    <span style={{ fontFamily:'Syne,sans-serif',fontSize:34,fontWeight:800,color:i===1?'#4ADE80':plan.color }}>${getPrice(plan.price + 2)}</span>
                    <span style={{ fontSize:14,color:'rgba(240,244,255,.4)',fontWeight:300 }}>{T.pricing.mo}</span>
                    <div style={{ fontSize:12,color:'rgba(240,244,255,.5)',marginTop:8,fontWeight:300 }}>
                      {T.billing.for} {getBillingText().term}. {T.billing.payToday} <span style={{fontWeight:600}}>${getTotalPrice(plan.price + 2)}</span> {T.billing.today}
                    </div>
                  </div>
                  <button onClick={()=>setOrder({name:plan.name + ' WP',price:getPrice(plan.price + 2)})} className={`hp-plan-btn${i===1?' primary':''}`} style={i===1?{background:'linear-gradient(135deg,#22C55E,#3B82F6)'}:{}}>{T.pricing.cta}</button>
                  <div style={{ borderTop:'1px solid rgba(255,255,255,.07)',paddingTop:20 }}>
                    <p style={{ fontSize:11,color:'rgba(240,244,255,.35)',marginBottom:8,fontWeight:500,textTransform:'uppercase',letterSpacing:'.08em' }}>{T.pricing.featLabel}</p>
                    {plan.extras.map((ex: string, j: number)=>(
                      <div key={j} style={{ display:'flex',alignItems:'center',gap:6,marginBottom:7 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i===1?'#4ADE80':plan.color} fillOpacity="0.15"/><path d="M4 7l2 2 4-4" stroke={i===1?'#4ADE80':plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontSize:12,color:'rgba(240,244,255,.7)',fontWeight:400 }}>{ex}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:7 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={i===1?'#4ADE80':plan.color} fillOpacity="0.15"/><path d="M4 7l2 2 4-4" stroke={i===1?'#4ADE80':plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize:12,color:'rgba(240,244,255,.7)',fontWeight:600 }}>WP Toolkit Plus</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {order&&<OrderModal lang={lang} planName={order.name} planPrice={order.price} onClose={()=>setOrder(null)}/>}
    </>
  )
}
