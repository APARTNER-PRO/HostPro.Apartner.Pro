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
      title: T.freeHostingHub.starter.title,
      desc: T.freeHostingHub.starter.desc,
      btn: T.freeHostingHub.starter.btn,
      href: `${p}/free-starter-hosting`,
      icon: '🚀',
      color: '#A855F7'
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, maxWidth: 1000, margin: '0 auto' }}>
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
    </div>
  )
}
