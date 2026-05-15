'use client'

import { useState, useRef, useEffect } from 'react'
import { Lang, getT } from '@/lib/i18n'
import Link from 'next/link'
import FreeOffersSection from './FreeOffersSection'


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
      transform: inView ? 'translateY(0)' : 'translateY(30px)', 
      transition: `opacity .8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform .8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`, 
      ...style 
    }}>
      {children}
    </div>
  )
}

export default function FreeWpClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'Безкоштовний Стартовий Хостинг'
        })
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', projectDescription: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section-container" style={{ paddingTop: 100, paddingBottom: 100 }}>
      {/* HERO SECTION */}
      <section style={{ textAlign: 'center', marginBottom: 120 }}>
        <FadeIn>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 100, padding: '8px 20px', fontSize: 14, color: '#60A5FA', marginBottom: 32, fontWeight: 600 }}>
            ✨ {T.freeWp.meta}
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 32 }}>
            <span style={{ display: 'block', color: '#fff' }}>{T.freeWp.title}</span>
            <span style={{ display: 'block', background: 'linear-gradient(90deg, #60A5FA, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>від HostPro</span>
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto', fontWeight: 400 }}>
            {T.freeWp.sub}
          </p>
        </FadeIn>
      </section>

      {/* WHO CAN GET & WHAT INCLUDED */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32, marginBottom: 120 }}>
        <FadeIn delay={100} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: 48 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#fff' }}>{T.freeWp.whoCanGet.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>{T.freeWp.whoCanGet.text}</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, fontStyle: 'italic' }}>{T.freeWp.whoCanGet.target}</p>
        </FadeIn>

        <FadeIn delay={200} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: 48 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#fff' }}>{T.freeWp.whatIsIncluded.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>{T.freeWp.whatIsIncluded.text}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{T.freeWp.whatIsIncluded.domains}</p>
        </FadeIn>
      </div>

      {/* BENEFITS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 120 }}>
        {T.freeWp.benefits.map((benefit: any, i: number) => (
          <FadeIn key={i} delay={i * 100} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>{benefit.icon}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#fff' }}>{benefit.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>{benefit.desc}</p>
          </FadeIn>
        ))}
      </div>

      {/* FORM & CONDITIONS SECTION */}
      <div id="application-form" className="hp-grid-2-1" style={{ gap: 80, alignItems: 'start', marginBottom: 120 }}>
        <FadeIn>
          <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 40, padding: 48 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 20 }}>{T.freeWp.application.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 40 }}>{T.freeWp.application.text}</p>

            {status === 'success' ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#10B981', fontSize: 20, fontWeight: 700 }}>{T.freeWp.application.form.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{T.freeWp.application.form.name}</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 20px', color: '#fff', fontSize: 16, outline: 'none', transition: 'border-color .3s' }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{T.freeWp.application.form.email}</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 20px', color: '#fff', fontSize: 16, outline: 'none' }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{T.freeWp.application.form.project}</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '16px 20px', color: '#fff', fontSize: 16, outline: 'none', resize: 'none' }} 
                  />
                </div>

                {status === 'error' && (
                  <div style={{ color: '#EF4444', fontSize: 14, fontWeight: 500 }}>{T.freeWp.application.form.error}</div>
                )}

                <button 
                  disabled={loading}
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '18px', borderRadius: 16, fontSize: 18, fontWeight: 800, background: 'linear-gradient(90deg, #60A5FA, #3B82F6)', border: 'none', color: '#fff', cursor: 'pointer', boxShadow: '0 10px 30px rgba(59,130,246,0.3)', transition: 'transform .3s ease' }}
                >
                  {loading ? 'Надсилаємо...' : T.freeWp.application.form.submit}
                </button>
              </form>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 24 }}>{T.freeWp.conditions.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{T.freeWp.conditions.text1}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{T.freeWp.conditions.text2}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{T.freeWp.conditions.text3}</p>
            </div>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 24 }}>{T.freeWp.features.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>{T.freeWp.features.text}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>💡 {T.freeWp.features.notice}</p>
          </div>
        </FadeIn>
      </div>

      {/* RESTRICTIONS SECTION */}
      <section style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: 40, padding: 60, marginBottom: 120 }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, color: '#F87171', marginBottom: 32 }}>{T.freeWp.restrictions.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>{T.freeWp.restrictions.link}</p>
          <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
            {T.freeWp.restrictions.list.map((item: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ color: '#F87171', fontWeight: 800 }}>•</div>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: 24 }}>{T.freeWp.restrictions.footer}</p>
          <p style={{ color: '#fff', fontWeight: 500 }}>{T.freeWp.restrictions.note}</p>
        </FadeIn>
      </section>

      {/* PROMO & UNIQUE DOMAIN */}
      <div className="hp-grid-2-1" style={{ gap: 40, marginBottom: 120 }}>
        <FadeIn style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: 48 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 24 }}>{T.freeWp.promo.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>{T.freeWp.promo.text1}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>{T.freeWp.promo.text2}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{T.freeWp.promo.text3}</p>
        </FadeIn>

        <FadeIn delay={200} style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: 32, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎁</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{T.freeWp.uniqueDomain.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, whiteSpace: 'pre-wrap' }}>{T.freeWp.uniqueDomain.text}</p>
        </FadeIn>
      </div>

      {/* FAQ SECTION */}
      <section style={{ marginBottom: 120 }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>{T.freeWp.faq.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 700, margin: '0 auto' }}>{T.freeWp.faq.sub}</p>
        </FadeIn>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {T.freeWp.faq.items.map((item: any, i: number) => (
            <FaqItem key={i} item={item} i={i} />
          ))}
        </div>
      </section>

      {/* OTHER OFFERS */}
      <FreeOffersSection lang={lang} currentSlug="free-wordpress-hosting" />


      {/* UPGRADE SECTION */}
      <section style={{ textAlign: 'center', marginBottom: 120, paddingTop: 24 }}>
        <FadeIn>
          <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.05))', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 32, padding: 56, maxWidth: 800, margin: '0 auto' }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>💼</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 16, color: '#fff' }}>{T.freeWp.upgrade.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>{T.freeWp.upgrade.desc}</p>
            <Link href={`/${lang}${T.freeWp.upgrade.href}`} style={{ display: 'inline-block', padding: '16px 36px', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', borderRadius: 100, textDecoration: 'none', fontWeight: 700, fontSize: 16, boxShadow: '0 10px 30px rgba(16,185,129,0.3)', transition: 'transform .3s ease' }}>
              {T.freeWp.upgrade.btn}
            </Link>
          </div>
        </FadeIn>
      </section>

      <style jsx>{`
        .hp-grid-2-1 {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }
        @media (max-width: 1000px) {
          .hp-grid-2-1 {
            grid-template-columns: 1fr;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  )
}

function FaqItem({ item, i }: { item: { q: string, a: string }, i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeIn delay={i * 50} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '20px 32px', cursor: 'pointer' }}>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#fff', paddingRight: 20 }}>{item.q}</span>
        <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}>+</span>
      </div>
      {open && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: 15 }}>
          {item.a}
        </div>
      )}
    </FadeIn>
  )
}
