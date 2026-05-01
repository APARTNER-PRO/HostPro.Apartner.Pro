'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
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
  .hp-ai-promo { background:rgba(255,255,255,.02); border:1px solid rgba(255,255,255,.06); border-radius:32px; padding:60px; display:flex; align-items:center; gap:60px; position:relative; overflow:hidden; flex-wrap:wrap; }
  @media (max-width: 767px) {
    .hp-ai-promo { padding: 32px 20px; gap: 40px; border-radius: 24px; }
  }
`

interface HomeClientProps {
  lang: Lang
  initialData?: {
    monthly: any
    quarterly: any
    yearly: any
    threeYears: any
  }
}

export default function HomeClient({ lang, initialData }: HomeClientProps) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const [billing, setBilling] = useState('monthly')
  const [order, setOrder] = useState<{ name: string; price: string } | null>(null)
  const [paddleLoaded, setPaddleLoaded] = useState(false)
  
  useEffect(() => {
    if ((window as any).Paddle) setPaddleLoaded(true);
  }, []);

  const searchParams = useSearchParams()
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

  // Get Paddle priceId for a plan by name and a specific billing period
  const getPriceId = (planName: string, billingPeriod: string = billing): string | null => {
    if (!initialData) return null
    const currentProduct = initialData[billingPeriod as keyof typeof initialData]
    if (!currentProduct?.prices) return null
    const prices: any[] = currentProduct.prices
    const target = planName.toLowerCase()
    const match = prices.find((price: any) => {
      const desc = price.description?.toLowerCase() || ''
      if (target === 'agency') {
        return desc.includes('agency') && !desc.includes('pro')
      }
      return desc.includes(target)
    })
    return match?.id || null
  }

  const handleBuy = (priceId: string) => {
    if (!priceId) return
    if (!(window as any).Paddle) {
      console.warn('Paddle not loaded yet')
      return
    }
    const Paddle = (window as any).Paddle
    Paddle.Initialize({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'live_5479fe94fca51b60d7791b81725'
    })
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }]
    })
  }

  // Auto-checkout from URL params
  useEffect(() => {
    if (!paddleLoaded || !initialData) return;
    
    // Use searchParams from hook, fallback to manual parsing if hook is empty (for some edge cases)
    let plan = searchParams.get('plan');
    let bParam = searchParams.get('billing');

    if (!plan && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      plan = urlParams.get('plan');
      bParam = urlParams.get('billing');
    }

    if (plan && bParam) {
      const validB = ['monthly', 'quarterly', 'yearly', 'threeYears'];
      if (validB.includes(bParam)) {
        setBilling(bParam);
        const pid = getPriceId(plan, bParam);
        if (pid) {
          // Ensure Paddle is initialized and ready
          const openCheckout = () => {
            if ((window as any).Paddle) {
              const Paddle = (window as any).Paddle;
              Paddle.Initialize({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'live_5479fe94fca51b60d7791b81725'
              });
              Paddle.Checkout.open({
                items: [{ priceId: pid, quantity: 1 }]
              });
            }
          };
          // Slight delay to ensure UI has settled
          setTimeout(openCheckout, 500);
        }
      }
    }
  }, [searchParams, paddleLoaded, initialData]);

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => setPaddleLoaded(true)}
      />
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
                  <div className="feat-icon" style={{ fontSize:32,marginBottom:16,transition:'transform .3s ease' }}>{f.icon}</div>
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
                  {b==='threeYears'&&<span style={{ background:'rgba(244, 63, 94, 0.15)', color:'#F43F5E', fontSize:11, padding:'2px 8px', borderRadius:100, fontWeight:800, border:'1px solid rgba(244, 63, 94, 0.4)', boxShadow:'0 0 12px rgba(244, 63, 94, 0.2)', marginLeft: 6 }}>{T.billing.save30}</span>}
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
                  {/* OLD BUTTON (order modal) — збережено для повернення:
                  <button onClick={()=>setOrder({name:plan.name,price:getPrice(plan.price)})} className={`hp-plan-btn${plan.popular?' primary':''}`}>{T.pricing.cta}</button>
                  */}
                  {(() => {
                    const priceId = getPriceId(plan.name)
                    if (priceId) {
                      return (
                        <button
                          onClick={() => handleBuy(priceId)}
                          className={`hp-plan-btn${plan.popular?' primary':''}`}
                        >
                          {T.pricing.cta}
                        </button>
                      )
                    }
                    // Fallback: redirect to /pricing/ page if no priceId available
                    return (
                      <Link
                        href={`${p}/pricing`}
                        className={`hp-plan-btn${plan.popular?' primary':''}`}
                        style={{ display:'block',textAlign:'center',textDecoration:'none' }}
                      >
                        {T.pricing.cta}
                      </Link>
                    )
                  })()}
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
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,marginBottom:48 }}>
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

          <FadeIn style={{ textAlign:'center' }}>
            <Link 
              href={`${p}/reviews`} 
              style={{ 
                fontSize: 16, 
                color: 'rgba(96,165,250,1)', 
                fontWeight: 600, 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 8,
                transition: 'all 0.3s ease',
                padding: '10px 20px',
                borderRadius: '12px',
                background: 'rgba(59,130,246,.05)',
                border: '1px solid rgba(59,130,246,.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59,130,246,.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59,130,246,.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {T.testimonials.reviewsLink}
            </Link>
          </FadeIn>
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
                  <div className="feat-icon" style={{ fontSize:40,marginBottom:20,display:'inline-flex',alignItems:'center',justifyContent:'center',background:w.bg,borderRadius:16,width:72,height:72,transition:'transform .3s ease' }}>{w.icon}</div>
                  <h3 style={{ fontFamily:'Syne,sans-serif',fontSize:20,fontWeight:700,marginBottom:10,color:w.color }}>{w.title}</h3>
                  <p style={{ fontSize:14,color:'rgba(240,244,255,.55)',lineHeight:1.7,fontWeight:300 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AI ASSISTANT SECTION */}
      <section id="ai-assistant-promo" style={{ padding:'80px 24px' }}>
        <FadeIn style={{ maxWidth:1000, margin:'0 auto' }}>
          <div className="hp-ai-promo">
            <div className="orb" style={{ width:400,height:400,background:'radial-gradient(circle,rgba(59,130,246,0.1),transparent)',top:'-50%',right:'-10%' }} />
            
            <div style={{ flex: 1, minWidth: 300, position: 'relative', zIndex: 1 }}>
              <div style={{ display:'inline-flex',alignItems:'center',gap:8,background:'rgba(139,92,246,.1)',border:'1px solid rgba(139,92,246,.2)',borderRadius:100,padding:'6px 14px',fontSize:12,color:'#C084FC',marginBottom:24,fontWeight:600 }}>✨ AI Powered</div>
              <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,4vw,48px)',fontWeight:800,letterSpacing:'-1.5px',marginBottom:20,lineHeight:1.1 }}>{T.chat.homeTitle}</h2>
              <p style={{ fontSize:17,color:'rgba(240,244,255,.5)',marginBottom:32,fontWeight:300,lineHeight:1.6 }}>{T.chat.homeSub}</p>
              <Link href={`${p}/ai-assistant`} className="btn-primary hp-cta-link" style={{ background:'linear-gradient(135deg,#8B5CF6,#D946EF)', boxShadow:'0 0 40px rgba(139,92,246,.3)' }}>{T.chat.homeBtn}</Link>
            </div>

            <div style={{ flex: 1, minWidth: 300, position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ 
                width: '100%', 
                maxWidth: 400, 
                aspectRatio: '1/1', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: 24, 
                border: '1px solid rgba(255,255,255,0.08)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
              }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', height: 20, width: '60%', borderRadius: 4 }}></div>
                <div style={{ background: 'rgba(255,255,255,0.05)', height: 20, width: '80%', borderRadius: 4 }}></div>
                <div style={{ background: 'rgba(59,130,246,0.1)', height: 60, width: '90%', borderRadius: 12, alignSelf: 'flex-end', border: '1px solid rgba(59,130,246,0.2)' }}></div>
                <div style={{ background: 'rgba(139,92,246,0.1)', height: 80, width: '90%', borderRadius: 12, alignSelf: 'flex-start', border: '1px solid rgba(139,92,246,0.2)' }}></div>
              </div>
            </div>
          </div>
        </FadeIn>
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
