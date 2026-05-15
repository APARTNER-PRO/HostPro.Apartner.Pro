import React from 'react'
import { getT, Lang } from '@/lib/i18n'
import FadeIn from './FadeIn'

interface TestimonialsSectionProps {
  lang: Lang
}

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const T = getT(lang)
  
  return (
    <section style={{ marginBottom: 120 }}>
      <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>{T.testimonials.title}</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>{T.testimonials.sub}</p>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {T.testimonials.items.slice(0, 3).map((t: any, i: number) => (
          <FadeIn key={i} delay={i * 100}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: 32, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {[...Array(t.stars)].map((_, s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 24, flex: 1 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #60A5FA, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{t.role}</div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
