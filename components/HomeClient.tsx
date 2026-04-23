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

const DISC: Record<string, number> = { monthly: 1, quarterly: 0.9, yearly: 0.8, threeYears: 0.75 }

const CSS = `
  .hp-feat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:28px;transition:transform .25s,background .25s;cursor:default}
  .hp-feat-card:hover{transform:translateY(-4px);background:rgba(255,255,255,.055)}
  .hp-plan-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:22px 18px;position:relative;transition:transform .3s;cursor:default}
  .hp-plan-card:hover{transform:translateY(-8px)}
  .hp-plan-card.popular{background:linear-gradient(160deg,rgba(96,165,250,.1),rgba(139,92,246,.08));border-color:rgba(96,165,250,.35);box-shadow:0 0 60px rgba(59,130,246,.12)}
  .hp-plan-btn{width:100%;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.07);color:#fff;padding:12px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;margin-bottom:24px}
  .hp-plan-btn:hover{background:rgba(255,255,255,.14);transform:scale(1.02)}
  .hp-plan-btn.primary{background:linear-gradient(135deg,#3B82F6,#8B5CF6);border:none}
  .hp-plan-btn.primary:hover{filter:brightness(1.1);transform:scale(1.02)}
  .hp-who-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:32px 28px;text-align:center;transition:transform .25s;cursor:default}
  .hp-who-card:hover{transform:translateY(-4px)}
  .hp-billing-btn{border-radius:9px;cursor:pointer;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px;transition:all .2s;padding:10px 20px}
  .hp-cta-link{display:inline-block;text-decoration:none;transition:all .2s}
  .hp-cta-link:hover{transform:scale(1.04);filter:brightness(1.1)}
  @keyframes floatBadge{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulseGlow{0%,100%{opacity:.4}50%{opacity:.9}}
  .hp-badge{animation:floatBadge 3s ease-in-out infinite}
  .hp-orb-pulse{animation:pulseGlow 4s ease-in-out infinite}

  @media (max-width: 767px) {
    .price__wrapper { display: flex; flex-direction: column; }
    .hp-features-grid, .hp-who-grid, .hp-stats-flex { grid-template-columns: 1fr !important; }
    .hp-stats-flex { flex-direction: column !important; align-items: center !important; gap: 32px !important; }
  }

  .hp-plans-grid { display: grid; gap: 14px; grid-template-columns: repeat(5, 1fr); }
  @media (max-width: 1100px) { .hp-plans-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 720px)  { .hp-plans-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 640px)  { .hp-plans-grid { grid-template-columns: 1fr; } }

  .hp-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .hp-who-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
  .hp-stats-flex { display: flex; gap: 48px; justify-content: center; margin-top: 64px; flex-wrap: wrap; }
`

export default function HomeClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)
  const getPrice = (base: number) => (base * DISC[billing]).toFixed(2)
  const getTotalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36
    return (base * months * DISC[billing]).toFixed(2)
  }
  const getRenewalPrice = (base: number) => {
    const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36
    return (base * months).toFixed(2)
  }
  const getBillingText = () => {
    if (billing === 'monthly') return { term: T.billing.monthTerm, period: T.billing.monthly.toLowerCase() }
    if (billing === 'quarterly') return { term: T.billing.quarterTerm, period: T.billing.quarterly.toLowerCase() }
    if (billing === 'yearly') return { term: T.billing.yearTerm, period: T.billing.yearly.toLowerCase() }
    return { term: T.billing.threeYearTerm, period: T.billing.threeYears.toLowerCase() }
  }
  const statGrads = ['linear-gradient(135deg,#60A5FA,#A78BFA)','linear-gradient(135deg,#A78BFA,#F472B6)','linear-gradient(135deg,#6EE7B7,#60A5FA)','linear-gradient(135deg,#FB923C,#F472B6)']

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section id="hero" className="grid-bg" style={{ position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden' }}>
        <div className="orb hp-orb-pulse" style={{ width:600,height:600,background:'radial-gradient(circle,rgba(59,130,246,.22),transparent)',top:'10%',left:'50%',transform:'translateX(-50%)' }} />
        <div className="orb" style={{ width:300,height:300,background:'radial-gradient(circle,rgba(139,92,246,.18),transparent)',bottom:'20%',right:'10%' }} />
        <div className="orb" style={{ width:200,height:200,background:'radial-gradient(circle,rgba(251,146,60,.13),transparent)',top:'30%',left:'5%' }} />
        <div style={{ textAlign:'center',maxWidth:820,padding:'0 24px',position:'relative',zIndex:2 }}>
          <div className="hp-badge" style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(96,165,250,.1)',border:'1px solid rgba(96,165,250,.25)',borderRadius:100,padding:'6px 16px',fontSize:13,color:'#93C5FD',marginBottom:32,fontWeight:500 }}>{T.hero.badge}</div>
          <h1 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'clamp(48px,8vw,88px)',lineHeight:1.05,letterSpacing:'-2px',marginBottom:24 }}>
            <span style={{ display:'block',color:'#F0F4FF' }}>{T.hero.title1}</span>
            <span className="grad-text" style={{ display:'block' }}>{T.hero.title2}</span>
          </h1>
          <p style={{ fontSize:'clamp(16px,2vw,20px)',color:'rgba(240,244,255,.6)',lineHeight:1.7,maxWidth:600,margin:'0 auto 40px',fontWeight:300 }}>{T.hero.sub}</p>
          <Link href={`${p}/#pricing`} className="btn-primary hp-cta-link" style={{ boxShadow:'0 0 40px rgba(59,130,246,.3)',fontSize:17,padding:'16px 36px' }}>{T.hero.cta} →</Link>
          <p style={{ fontSize:13,color:'rgba(240,244,255,.35)',fontWeight:400,marginTop:16 }}>{T.hero.ctaSub}</p>
          <div className="hp-stats-flex">
            {[{val:'12K+',label:T.hero.stat1},{val:'0.3s',label:T.hero.stat2},{val:'99.9%',label:T.hero.stat3}].map((s,i)=>(
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Syne,sans-serif',fontSize:36,fontWeight:800,background:statGrads[i],WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>{s.val}</div>
                <div style={{ fontSize:13,color:'rgba(240,244,255,.45)',marginTop:4,fontWeight:400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding:'120px 24px' }}>
        <div className="section-container">
          <FadeIn style={{ textAlign:'center',marginBottom:72 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.features.title}</h2>
            <p style={{ fontSize:18,color:'rgba(240,244,255,.5)',fontWeight:300 }}>{T.features.sub}</p>
          </FadeIn>
          <FadeIn>
            <div className="hp-features-grid">
              {T.features.items.map((f,i)=>(
                <div key={i} className="hp-feat-card">
                  <div style={{ fontSize:32,marginBottom:16 }}>{f.icon}</div>
                  <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:18,fontWeight:700,marginBottom:8 }}>{f.title}</h3>
                  <p style={{ fontSize:14,color:'rgba(240,244,255,.55)',lineHeight:1.7,fontWeight:300 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding:'120px 24px',background:'rgba(255,255,255,.015)',position:'relative' }}>
        <div className="orb" style={{ width:500,height:500,background:'radial-gradient(circle,rgba(139,92,246,.12),transparent)',top:0,right:0,zIndex:0 }} />
        <div className="section-container" style={{ position:'relative',zIndex:1 }}>
          <FadeIn style={{ textAlign:'center',marginBottom:48 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.pricing.title}</h2>
            <p style={{ fontSize:18,color:'rgba(240,244,255,.5)',fontWeight:300 }}>{T.pricing.sub}</p>
          </FadeIn>
          <FadeIn style={{ display:'flex',justifyContent:'center',marginBottom:60,overflowX:'auto',WebkitOverflowScrolling:'touch',width:'100%' }}>
            <div className="price__wrapper" style={{ display:'flex',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',borderRadius:12,padding:4,gap:4,minWidth:'fit-content' }}>
              {(['monthly','quarterly','yearly', 'threeYears'] as const).map((b)=>(
                <button key={b} onClick={()=>setBilling(b)} className="hp-billing-btn" style={{ background:billing===b?'rgba(96,165,250,.2)':'transparent',color:billing===b?'#60A5FA':'rgba(240,244,255,.5)',border:billing===b?'1px solid rgba(96,165,250,.3)':'1px solid transparent',whiteSpace:'nowrap',flexShrink:0 }}>
                  {T.billing[b]}
                  {b==='quarterly'&&<span style={{ background:'rgba(251,146,60,.2)',color:'#FB923C',fontSize:11,padding:'1px 6px',borderRadius:100,fontWeight:700 }}>{T.billing.save10}</span>}
                  {b==='yearly'&&<span style={{ background:'rgba(110,231,183,.2)',color:'#6EE7B7',fontSize:11,padding:'1px 6px',borderRadius:100,fontWeight:700 }}>{T.billing.save20}</span>}
                  {b==='threeYears'&&<span style={{ background:'rgba(110,231,183,.2)',color:'#6EE7B7',fontSize:11,padding:'1px 6px',borderRadius:100,fontWeight:700 }}>{T.billing.save30}</span>}
                </button>
              ))}
            </div>
          </FadeIn>
          <FadeIn>
            <div className="hp-plans-grid" style={{ alignItems:'start' }}>
              {T.pricing.plans.map((plan,i)=>(
                <div key={i} className={`hp-plan-card${plan.popular?' popular':''}`}>
                  {plan.popular&&<div style={{ position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:100,whiteSpace:'nowrap' }}>{T.pricing.popular}</div>}
                  <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:6 }}>
                    <div style={{ width:10,height:10,borderRadius:'50%',background:plan.color,boxShadow:`0 0 12px ${plan.color}`,flexShrink:0 }} />
                    <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:18,fontWeight:800 }}>{plan.name}</h3>
                  </div>
                  <p style={{ fontSize:12,color:'rgba(240,244,255,.45)',marginBottom:16,fontWeight:300 }}>{plan.desc}</p>
                  <div style={{ marginBottom:24 }}>
                    <span style={{ fontFamily:'Syne,sans-serif',fontSize:34,fontWeight:800,color:plan.color }}>${getPrice(plan.price)}</span>
                    <span style={{ fontSize:14,color:'rgba(240,244,255,.4)',fontWeight:300 }}>{T.pricing.mo}</span>
                    <div style={{ fontSize:12,color:'rgba(240,244,255,.5)',marginTop:8,fontWeight:300 }}>
                      {T.billing.for} {getBillingText().term}. {T.billing.payToday} <span style={{fontWeight:600}}>${getTotalPrice(plan.price)}</span> {T.billing.today}
                      {billing !== 'monthly' && (
                        <div style={{ marginTop:6,fontSize:11,color:'rgba(240,244,255,.4)' }}>
                          {T.billing.then} <span style={{fontWeight:600}}>${getRenewalPrice(plan.price)}</span> {T.billing.onRenewal}
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={()=>setOrder({name:plan.name,price:getPrice(plan.price)})} className={`hp-plan-btn${plan.popular?' primary':''}`}>{T.pricing.cta}</button>
                  <div style={{ borderTop:'1px solid rgba(255,255,255,.07)',paddingTop:20 }}>
                    <p style={{ fontSize:11,color:'rgba(240,244,255,.35)',marginBottom:8,fontWeight:500,textTransform:'uppercase',letterSpacing:'.08em' }}>{T.pricing.featLabel}</p>
                    {plan.extras.map((ex,j)=>(
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
          <FadeIn style={{ marginTop:56,textAlign:'center' }}>
            <div style={{ display:'inline-block',background:'linear-gradient(135deg,rgba(59,130,246,.07),rgba(139,92,246,.07))',border:'1px solid rgba(255,255,255,.1)',borderRadius:20,padding:'36px 48px',maxWidth:600,width:'100%',position:'relative',overflow:'hidden' }}>
              <div className="orb" style={{ width:200,height:200,background:'radial-gradient(circle,rgba(96,165,250,.12),transparent)',top:'-60px',right:'-40px' }} />
              <div style={{ fontSize:28,marginBottom:12 }}>💬</div>
              <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:22,fontWeight:800,marginBottom:8 }}>{T.pricing.customTitle}</h3>
              <p style={{ fontSize:14,color:'rgba(240,244,255,.5)',marginBottom:24,fontWeight:300,lineHeight:1.6 }}>{T.pricing.customSub}</p>
              <Link href={`${p}/contact`} className="btn-primary hp-cta-link">{T.pricing.customBtn}</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="tech-stack" style={{ padding:'120px 24px', background:'rgba(255,255,255,.01)', position:'relative', overflow:'hidden' }}>
        <div className="orb" style={{ width:400,height:400,background:'radial-gradient(circle,rgba(59,130,246,.08),transparent)',top:'20%',left:'-10%' }} />
        <div className="section-container" style={{ position:'relative', zIndex:1 }}>
          <FadeIn style={{ textAlign:'center', marginBottom:72 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(32px,5vw,52px)', fontWeight:800, letterSpacing:'-1px', marginBottom:16 }}>{T.tech.title}</h2>
            <p style={{ fontSize:18, color:'rgba(240,244,255,.5)', fontWeight:300 }}>{T.tech.sub}</p>
          </FadeIn>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24, marginBottom:56 }}>
            {/* Softaculous */}
            <FadeIn delay={100} className="hp-feat-card" style={{ border:'1px solid rgba(96,165,250,.2)', background:'rgba(59,130,246,.04)' }}>
              <div style={{ fontSize:40, marginBottom:20 }}>🚀</div>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:22, fontWeight:700, marginBottom:12, color:'#60A5FA' }}>{T.tech.softaculous.title}</h3>
              <p style={{ fontSize:15, color:'rgba(240,244,255,.6)', lineHeight:1.6, fontWeight:300 }}>{T.tech.softaculous.desc}</p>
            </FadeIn>

            {/* Technical Features */}
            <FadeIn delay={200} className="hp-feat-card">
              <h4 style={{ fontSize:11, color:'rgba(240,244,255,.4)', fontWeight:700, letterSpacing:'.15em', marginBottom:24, textTransform:'uppercase' }}>{T.tech.features.title}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {T.tech.features.items.map((item, i) => (
                  <div key={i}>
                    <div style={{ fontWeight:600, color:'#F0F4FF', fontSize:15, marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:13, color:'rgba(240,244,255,.5)', fontWeight:300, lineHeight:1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Server Technologies */}
            <FadeIn delay={300} className="hp-feat-card">
              <h4 style={{ fontSize:11, color:'rgba(240,244,255,.4)', fontWeight:700, letterSpacing:'.15em', marginBottom:24, textTransform:'uppercase' }}>{T.tech.server.title}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {T.tech.server.items.map((item, i) => (
                  <div key={i}>
                    <div style={{ fontWeight:600, color:'#F0F4FF', fontSize:15, marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:13, color:'rgba(240,244,255,.5)', fontWeight:300, lineHeight:1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Databases */}
            <FadeIn delay={400} className="hp-feat-card">
              <h4 style={{ fontSize:11, color:'rgba(240,244,255,.4)', fontWeight:700, letterSpacing:'.15em', marginBottom:24, textTransform:'uppercase' }}>{T.tech.databases.title}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                {T.tech.databases.items.map((item, i) => (
                  <div key={i}>
                    <div style={{ fontWeight:600, color:'#F0F4FF', fontSize:15, marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:13, color:'rgba(240,244,255,.5)', fontWeight:300, lineHeight:1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn style={{ textAlign:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', flexWrap:'wrap', justifyContent:'center', gap:16, padding:'20px 32px', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:20, maxWidth:800 }}>
              <span style={{ fontSize:24 }}>🛠️</span>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontSize:15, color:'#F0F4FF', fontWeight:700, marginBottom:2 }}>{T.tech.dev.title}</div>
                <div style={{ fontSize:14, color:'rgba(240,244,255,.5)', fontWeight:300 }}>{T.tech.dev.desc}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding:'120px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width:400,height:400,background:'radial-gradient(circle,rgba(59,130,246,.1),transparent)',bottom:'-10%',left:'-10%' }} />
        <div className="section-container">
          <FadeIn style={{ textAlign:'center',marginBottom:72 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.testimonials.title}</h2>
            <p style={{ fontSize:18,color:'rgba(240,244,255,.5)',fontWeight:300 }}>{T.testimonials.sub}</p>
          </FadeIn>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24 }}>
            {T.testimonials.items.map((t: any,i: number)=>(
              <FadeIn key={i} delay={i*150} className="hp-feat-card" style={{ display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                <div>
                  <div style={{ display:'flex',gap:4,marginBottom:20 }}>
                    {[...Array(t.stars)].map((_,s)=>(
                      <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                  <p style={{ fontSize:16,color:'rgba(240,244,255,.8)',lineHeight:1.7,fontStyle:'italic',marginBottom:24 }}>"{t.text}"</p>
                </div>
                <div style={{ display:'flex',alignItems:'center',gap:16 }}>
                  <div style={{ width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.05))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,border:'1px solid rgba(255,255,255,.1)' }}>👤</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:16,color:'#fff' }}>{t.name}</div>
                    <div style={{ fontSize:13,color:'rgba(240,244,255,.45)' }}>{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHO */}
      <section id="who" style={{ padding:'120px 24px' }}>
        <div className="section-container">
          <FadeIn style={{ textAlign:'center',marginBottom:72 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,52px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16 }}>{T.who.title}</h2>
            <p style={{ fontSize:18,color:'rgba(240,244,255,.5)',fontWeight:300 }}>{T.who.sub}</p>
          </FadeIn>
          <FadeIn>
            <div className="hp-who-grid">
              {T.who.items.map((w,i)=>(
                <div key={i} className="hp-who-card">
                  <div style={{ fontSize:40,marginBottom:20,display:'inline-flex',alignItems:'center',justifyContent:'center',background:w.bg,borderRadius:16,width:72,height:72 }}>{w.icon}</div>
                  <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:20,fontWeight:700,marginBottom:10,color:w.color }}>{w.title}</h3>
                  <p style={{ fontSize:14,color:'rgba(240,244,255,.55)',lineHeight:1.7,fontWeight:300 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 24px' }}>
        <FadeIn style={{ maxWidth:800,margin:'0 auto' }}>
          <div style={{ background:'linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.15))',border:'1px solid rgba(96,165,250,.2)',borderRadius:24,padding:'60px 48px',textAlign:'center',position:'relative',overflow:'hidden' }}>
            <div className="orb" style={{ width:300,height:300,background:'radial-gradient(circle,rgba(59,130,246,.2),transparent)',top:'-50%',left:'50%',transform:'translateX(-50%)' }} />
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(28px,4vw,44px)',fontWeight:800,letterSpacing:'-1px',marginBottom:16,position:'relative',zIndex:1 }}>{T.cta.title}</h2>
            <p style={{ fontSize:16,color:'rgba(240,244,255,.55)',marginBottom:32,fontWeight:300,position:'relative',zIndex:1 }}>{T.cta.sub}</p>
            <Link href={`${p}/#pricing`} className="btn-primary hp-cta-link" style={{ boxShadow:'0 0 40px rgba(59,130,246,.3)',fontSize:17,padding:'16px 40px',position:'relative',zIndex:1 }}>{T.cta.btn}</Link>
          </div>
        </FadeIn>
      </section>

      {order&&<OrderModal lang={lang} planName={order.name} planPrice={order.price} onClose={()=>setOrder(null)}/>}
    </>
  )
}
