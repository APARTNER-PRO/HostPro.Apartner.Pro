'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'
import OrderModal from './OrderModal'
import PricingFAQ from './PricingFAQ'
import FadeIn from './FadeIn'

const DISC: Record<string, number> = { monthly: 1, quarterly: 0.9, yearly: 0.8, threeYears: 0.7 }

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
  .wp-plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; }
  @media (max-width: 900px) { .wp-plans-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .wp-plans-grid { grid-template-columns: 1fr; } }
`

interface HostingLandingClientProps {
  lang: Lang
  title: string
  slug: string
}

export default function HostingLandingClient({ lang, title, slug }: HostingLandingClientProps) {
  const T = getT(lang)
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)
  
  const getPrice = (base: number) => (base * DISC[billing]).toFixed(2)
  const getTotalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36
    return (base * months * DISC[billing]).toFixed(2)
  }

  // Generic features based on the hosting type
  const genericFeatures = [
    { icon: '🚀', title: lang === 'uk' ? 'Максимальна швидкість' : lang === 'ru' ? 'Максимальная скорость' : 'Maximum Speed', desc: lang === 'uk' ? 'Оптимізовано для високої продуктивності та швидкого завантаження.' : lang === 'ru' ? 'Оптимизировано для высокой производительности и быстрой загрузки.' : 'Optimized for high performance and fast loading speeds.' },
    { icon: '🛡️', title: lang === 'uk' ? 'Повна безпека' : lang === 'ru' ? 'Полная безопасность' : 'Full Security', desc: lang === 'uk' ? 'Вбудований захист від шкідливого ПЗ та щоденні бекапи.' : lang === 'ru' ? 'Встроенная защита от вредоносного ПО и ежедневные бэкапы.' : 'Built-in malware protection and daily backups.' },
    { icon: '💎', title: lang === 'uk' ? 'Преміальна підтримка' : lang === 'ru' ? 'Премиальная поддержка' : 'Premium Support', desc: lang === 'uk' ? 'Наша команда експертів готова допомогти вам 24/7.' : lang === 'ru' ? 'Наша команда экспертов готова помочь вам 24/7.' : 'Our expert team is ready to help you 24/7.' },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="grid-bg" style={{ position:'relative',minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden', paddingTop: 100, paddingBottom: 60 }}>
        <div style={{ textAlign:'center',maxWidth:900,padding:'0 24px',position:'relative',zIndex:2 }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(96,165,250,.1)',border:'1px solid rgba(96,165,250,.25)',borderRadius:100,padding:'6px 16px',fontSize:13,color:'#60A5FA',marginBottom:32,fontWeight:500 }}>{T.hero.badge}</div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(36px,6vw,64px)',lineHeight:1.1,letterSpacing:'-2px',marginBottom:24, color: '#fff' }}>
            {title}
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,19px)',color:'rgba(240,244,255,.6)',lineHeight:1.7,maxWidth:700,margin:'0 auto 40px',fontWeight:300 }}>
            {lang === 'uk' ? `Професійне рішення для ваших проєктів. Надійний, швидкий та безпечний ${title.toLowerCase()} з підтримкою 24/7 та автоматичними бекапами.` : 
             lang === 'ru' ? `Профессиональное решение для ваших проектов. Надежный, быстрый и безопасный ${title.toLowerCase()} с поддержкой 24/7 и автоматическими бэкапами.` :
             `Professional solution for your projects. Reliable, fast, and secure ${title.toLowerCase()} with 24/7 support and automatic backups.`}
          </p>
          <Link href="#pricing" className="btn-primary hp-cta-link" style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', boxShadow:'0 0 40px rgba(59,130,246,.25)',fontSize:17,padding:'16px 36px' }}>{T.hero.cta} →</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <div className="section-container">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24 }}>
            {genericFeatures.map((f, i)=>(
              <FadeIn key={i} delay={i*100} className="hp-feat-card">
                <div style={{ fontSize:40,marginBottom:20 }}>{f.icon}</div>
                <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:22,fontWeight:700,marginBottom:12 }}>{f.title}</h3>
                <p style={{ fontSize:15,color:'rgba(240,244,255,.55)',lineHeight:1.7,fontWeight:300 }}>{f.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-container">
          <FadeIn style={{ textAlign:'center',marginBottom:48 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,48px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.pricing.title}</h2>
          </FadeIn>
          
          <FadeIn style={{ display:'flex',justifyContent:'center',marginBottom:60 }}>
            <div className="hp-billing-selector">
              {(['monthly','quarterly','yearly','threeYears'] as const).map((b)=>(
                <button key={b} onClick={()=>setBilling(b)} className="hp-billing-btn" style={{ background:billing===b?'rgba(59,130,246,.15)':'transparent',color:billing===b?'#60A5FA':'rgba(240,244,255,.5)',border:billing===b?'1px solid rgba(96,165,250,.3)':'1px solid transparent' }}>
                  {T.billing[b]}
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <div className="wp-plans-grid">
              {T.pricing.plans.map((plan: any, i: number)=>(
                <div key={i} className={`hp-plan-card${plan.popular?' popular':''}`}>
                  {plan.popular&&<div style={{ position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:100,whiteSpace:'nowrap' }}>{T.pricing.popular}</div>}
                  <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
                    <div style={{ width:10,height:10,borderRadius:'50%',background:plan.color,boxShadow:`0 0 12px ${plan.color}`,flexShrink:0 }} />
                    <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:18,fontWeight:800 }}>{plan.name}</h3>
                  </div>
                  <p style={{ fontSize:12,color:'rgba(240,244,255,.45)',marginBottom:16,fontWeight:300 }}>{plan.desc}</p>
                  <div style={{ marginBottom:16 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontFamily:'Syne,sans-serif',fontSize:34,fontWeight:800, color: '#fff' }}>${getPrice(plan.price)}</span>
                      <span style={{ fontSize:14, color:'rgba(240,244,255,.4)', fontWeight:400 }}>{T.pricing.mo}</span>
                    </div>
                  </div>
                  <button onClick={()=>setOrder({name:`${title} - ${plan.name}`, price:getPrice(plan.price)})} className={`hp-plan-btn${plan.popular?' primary':''}`}>{T.pricing.cta}</button>
                  <div style={{ borderTop:'1px solid rgba(255,255,255,.07)',paddingTop:20 }}>
                    {plan.extras.map((ex: string, j: number)=>(
                      <div key={j} style={{ display:'flex',alignItems:'center',gap:6,marginBottom:7 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill={plan.color} fillOpacity="0.15"/><path d="M4 7l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontSize:12,color:'rgba(240,244,255,.7)',fontWeight:400 }}>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <PricingFAQ lang={lang} />
        </div>
      </section>

      {order&&<OrderModal lang={lang} planName={order.name} planPrice={order.price} onClose={()=>setOrder(null)}/>}
    </>
  )
}
