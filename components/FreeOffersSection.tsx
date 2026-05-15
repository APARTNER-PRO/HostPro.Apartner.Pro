'use client'

import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'
import FadeIn from './FadeIn'

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

      <div className="hp-grid-3" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {otherOffers.map((card, i) => (
          <FadeIn key={i} delay={i * 100}>
            <Link 
              href={card.href}
              style={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="hp-card-glass-light offer-card"
            >
              <div className="hp-icon-box">{card.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                {card.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
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
          transform: translateY(-8px);
        }
      `}</style>
    </section>
  )
}
