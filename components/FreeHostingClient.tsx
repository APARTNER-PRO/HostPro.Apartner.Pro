'use client'

import { useState, useRef, useEffect } from 'react'
import { Lang, getT } from '@/lib/i18n'
import FreeOffersSection from './FreeOffersSection'
import TestimonialsSection from './TestimonialsSection'


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

export default function FreeHostingClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    partnerName: '',
    partnerEmail: '',
    clientEmail: '',
    partnerDomain: '',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/free-hosting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ partnerName: '', partnerEmail: '', clientEmail: '', partnerDomain: '', notes: '' })
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
    <div className="section-container" style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* HERO */}
      <FadeIn style={{ textAlign: 'center', marginBottom: 80 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(110,231,183,.1)', border: '1px solid rgba(110,231,183,.2)', borderRadius: 100, padding: '6px 16px', fontSize: 13, color: '#6EE7B7', marginBottom: 24, fontWeight: 500 }}>
          {T.freeHosting.badge}
        </div>
        <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24 }}>
          <span style={{ display: 'block', color: '#F0F4FF' }}>{T.freeHosting.title1}</span>
          <span style={{ display: 'block', background: 'linear-gradient(135deg,#6EE7B7,#34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{T.freeHosting.title2}</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(240,244,255,.6)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto', fontWeight: 300 }}>
          {T.freeHosting.sub}
        </p>
      </FadeIn>

      {/* HOW IT WORKS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 100 }}>
        {T.freeHosting.steps.map((step: any, i: number) => (
          <FadeIn key={i} delay={i * 100} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 24, padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 24 }}>{step.icon}</div>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#F0F4FF' }}>{step.title}</h3>
            <p style={{ fontSize: 15, color: 'rgba(240,244,255,.5)', lineHeight: 1.6 }}>{step.desc}</p>
          </FadeIn>
        ))}
      </div>

      <div className="hp-grid-2" style={{ gap: 60, alignItems: 'start' }}>
        {/* TERMS */}
        <FadeIn>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 32, fontWeight: 800, marginBottom: 32 }}>{T.freeHosting.termsTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {T.freeHosting.terms.map((term: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6EE7B7', marginTop: 10, flexShrink: 0 }} />
                <p style={{ fontSize: 16, color: 'rgba(240,244,255,.7)', lineHeight: 1.5 }}>{term}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* FORM */}
        <FadeIn delay={200} style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 32, padding: 40 }}>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 32 }}>{T.freeHosting.formTitle}</h2>
          
          {status === 'success' ? (
            <div style={{ background: 'rgba(110,231,183,.1)', border: '1px solid rgba(110,231,183,.2)', borderRadius: 16, padding: 24, color: '#6EE7B7', fontSize: 16 }}>
              {T.freeHosting.form.success}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, color: 'rgba(240,244,255,.6)', fontWeight: 500 }}>{T.freeHosting.form.partnerName}</label>
                <input 
                  required
                  type="text" 
                  value={formData.partnerName}
                  onChange={(e) => setFormData({...formData, partnerName: e.target.value})}
                  style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none' }} 
                />
              </div>
              
              <div className="hp-grid-2" style={{ gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 14, color: 'rgba(240,244,255,.6)', fontWeight: 500 }}>{T.freeHosting.form.partnerEmail}</label>
                  <input 
                    required
                    type="email" 
                    value={formData.partnerEmail}
                    onChange={(e) => setFormData({...formData, partnerEmail: e.target.value})}
                    style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none' }} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 14, color: 'rgba(240,244,255,.6)', fontWeight: 500 }}>{T.freeHosting.form.clientEmail}</label>
                  <input 
                    required
                    type="email" 
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                    style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, color: 'rgba(240,244,255,.6)', fontWeight: 500 }}>{T.freeHosting.form.partnerDomain}</label>
                <input 
                  required
                  type="text" 
                  value={formData.partnerDomain}
                  onChange={(e) => setFormData({...formData, partnerDomain: e.target.value})}
                  placeholder="yourdomain.com"
                  style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 14, color: 'rgba(240,244,255,.6)', fontWeight: 500 }}>{T.freeHosting.form.notes}</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none', resize: 'none' }} 
                />
              </div>

              {status === 'error' && (
                <div style={{ color: '#F87171', fontSize: 14 }}>{T.freeHosting.form.error}</div>
              )}

              <button 
                disabled={loading}
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: 16, fontWeight: 700, background: 'linear-gradient(135deg,#6EE7B7,#34D399)', marginTop: 10, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? '...' : T.freeHosting.form.submit}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
      

      <TestimonialsSection lang={lang} />
      
      <FreeOffersSection lang={lang} currentSlug="partner-free-hosting" />
    </div>
  )
}
