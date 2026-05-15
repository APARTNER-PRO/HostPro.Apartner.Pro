'use client'

import { Lang, getT } from '@/lib/i18n'
import FadeIn from './FadeIn'
import TestimonialsSection from './TestimonialsSection'
import Link from 'next/link'

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
    <div className="section-container">
      <FadeIn style={{ textAlign: 'center', marginBottom: 80 }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 24, color: '#fff' }}>
          {T.freeHostingHub.title}
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          {T.freeHostingHub.sub}
        </p>
      </FadeIn>

      <div className="hp-grid-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
        {cards.map((card, i) => (
          <FadeIn key={i} delay={i * 150}>
            <Link 
              href={card.href}
              style={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="hp-card-glass-light hp-hub-card"
            >
              <div className="hp-icon-box">{card.icon}</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                {card.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 32, flex: 1 }}>
                {card.desc}
              </p>
              <div style={{ color: card.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                {card.btn}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <div style={{ marginTop: 80 }}>
        <TestimonialsSection lang={lang} />
      </div>

      {/* SEO TEXT */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 700, marginBottom: 16, color: '#fff' }}>
            {T.freeHostingHub.seo.title}
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.6)', lineHeight: 1.8 }}>
            {T.freeHostingHub.seo.text}
          </p>
        </FadeIn>
      </section>

      <style jsx>{`
        .hp-hub-card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  )
}
