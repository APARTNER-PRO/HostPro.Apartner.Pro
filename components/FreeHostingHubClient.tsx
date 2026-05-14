'use client'

import { useRef, useState, useEffect } from 'react'
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
      transform: inView ? 'translateY(0)' : 'translateY(20px)', 
      transition: `opacity .8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform .8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`, 
      ...style 
    }}>
      {children}
    </div>
  )
}

export default function FreeHostingHubClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  const cards = [
    {
      title: T.freeHostingHub.php.title,
      desc: T.freeHostingHub.php.desc,
      btn: T.freeHostingHub.php.btn,
      href: `${p}/free-php-hosting`,
      icon: '🚀',
      color: '#A855F7'
    },
    {
      title: T.freeHostingHub.personal.title,
      desc: T.freeHostingHub.personal.desc,
      btn: T.freeHostingHub.personal.btn,
      href: `${p}/free-personal-hosting`,
      icon: '💎',
      color: '#F43F5E'
    },
    {
      title: T.freeHostingHub.wp.title,
      desc: T.freeHostingHub.wp.desc,
      btn: T.freeHostingHub.wp.btn,
      href: `${p}/free-wordpress-hosting`,
      icon: '📝',
      color: '#60A5FA'
    },
    {
      title: T.freeHostingHub.partner.title,
      desc: T.freeHostingHub.partner.desc,
      btn: T.freeHostingHub.partner.btn,
      href: `${p}/partner-free-hosting`,
      icon: '🤝',
      color: '#10B981'
    }
  ]

  return (
    <div className="section-container" style={{ paddingTop: 100, paddingBottom: 120 }}>
      <FadeIn style={{ textAlign: 'center', marginBottom: 80 }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 24, color: '#fff' }}>
          {T.freeHostingHub.title}
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          {T.freeHostingHub.sub}
        </p>
      </FadeIn>

      <div className="hp-hub-grid">
        {cards.map((card, i) => (
          <FadeIn key={i} delay={i * 150}>
            <Link 
              href={card.href}
              style={{ 
                display: 'block',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 32,
                padding: 48,
                height: '100%',
                transition: 'all .3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="hp-hub-card"
            >
              <div style={{ fontSize: 56, marginBottom: 32 }}>{card.icon}</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                {card.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 32 }}>
                {card.desc}
              </p>
              <div style={{ color: card.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                {card.btn}
              </div>

              <style jsx>{`
                .hp-hub-card:hover {
                  background: rgba(255,255,255,0.04);
                  border-color: ${card.color}44;
                  transform: translateY(-8px);
                }
              `}</style>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <section style={{ padding: '120px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn style={{ textAlign:'center',marginBottom:60 }}>
          <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(32px,5vw,48px)',fontWeight:800,marginBottom:16 }}>{T.testimonials.title}</h2>
          <p style={{ fontSize:18,color:'rgba(255,255,255,.5)' }}>{T.testimonials.sub}</p>
        </FadeIn>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,marginBottom:48 }}>
          {T.testimonials.items.slice(0, 3).map((t: any,i: number)=>(
            <FadeIn key={i} delay={i*150} style={{ background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)',borderRadius:24,padding:32,display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
              <div>
                <div style={{ display:'flex',gap:4,marginBottom:20 }}>
                  {[...Array(t.stars)].map((_,s)=>(
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </div>
                <p style={{ fontSize:16,color:'rgba(255,255,255,.8)',lineHeight:1.7,fontStyle:'italic',marginBottom:24 }}>"{t.text}"</p>
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:16 }}>
                <div style={{ width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.05))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,border:'1px solid rgba(255,255,255,.1)' }}>👤</div>
                <div>
                  <div style={{ fontWeight:700,fontSize:16,color:'#fff' }}>{t.name}</div>
                  <div style={{ fontSize:13,color:'rgba(255,255,255,.45)' }}>{t.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SEO TEXT */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'24px',fontWeight:700,marginBottom:16,color:'#fff' }}>
            {T.freeHostingHub.seo.title}
          </h2>
          <p style={{ fontSize:'16px',color:'rgba(255,255,255,.6)',lineHeight:1.8 }}>
            {T.freeHostingHub.seo.text}
          </p>
        </FadeIn>
      </section>

      <style jsx>{`
        .hp-hub-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .hp-hub-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  )
}
