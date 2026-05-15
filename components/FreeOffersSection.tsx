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

export default function FreeOffersSection({ lang, currentSlug }: { lang: Lang, currentSlug: string }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  const allOffers = [
    {
      slug: 'free-php-hosting',
      title: T.freeHostingHub.php.title,
      desc: T.freeHostingHub.php.desc,
      btn: T.freeHostingHub.php.btn,
      href: `${p}/free-php-hosting`,
      icon: '🚀',
      color: '#A855F7'
    },
    {
      slug: 'free-personal-hosting',
      title: T.freeHostingHub.personal.title,
      desc: T.freeHostingHub.personal.desc,
      btn: T.freeHostingHub.personal.btn,
      href: `${p}/free-personal-hosting`,
      icon: '💎',
      color: '#F43F5E'
    },
    {
      slug: 'free-wordpress-hosting',
      title: T.freeHostingHub.wp.title,
      desc: T.freeHostingHub.wp.desc,
      btn: T.freeHostingHub.wp.btn,
      href: `${p}/free-wordpress-hosting`,
      icon: '📝',
      color: '#60A5FA'
    },
    {
      slug: 'partner-free-hosting',
      title: T.freeHostingHub.partner.title,
      desc: T.freeHostingHub.partner.desc,
      btn: T.freeHostingHub.partner.btn,
      href: `${p}/partner-free-hosting`,
      icon: '🤝',
      color: '#10B981'
    }
  ]

  const otherOffers = allOffers.filter(o => o.slug !== currentSlug)

  return (
    <section style={{ padding: '100px 0 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 16 }}>
          {lang === 'uk' ? 'Інші безкоштовні пропозиції' : 'Explore Other Free Offers'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
          {lang === 'uk' ? 'Оберіть програму, яка найкраще підходить для вашого проекту' : 'Choose the program that best fits your project goals'}
        </p>
      </FadeIn>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 24,
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {otherOffers.map((card, i) => (
          <FadeIn key={i} delay={i * 100}>
            <Link 
              href={card.href}
              style={{ 
                display: 'block',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 32,
                padding: 40,
                height: '100%',
                transition: 'all .3s ease',
              }}
              className="offer-card"
            >
              <div style={{ fontSize: 48, marginBottom: 24 }}>{card.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                {card.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
                {card.desc}
              </p>
              <div style={{ color: card.color, fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                {card.btn}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <style jsx>{`
        .offer-card:hover {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.15) !important;
          transform: translateY(-8px);
        }
      `}</style>
    </section>
  )
}
