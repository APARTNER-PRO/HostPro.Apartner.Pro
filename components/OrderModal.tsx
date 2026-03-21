'use client'

import { useState, useEffect } from 'react'
import { Lang, getT } from '@/lib/i18n'

interface OrderModalProps {
  lang: Lang
  planName: string
  planPrice: string
  onClose: () => void
}

export default function OrderModal({ lang, planName, planPrice, onClose }: OrderModalProps) {
  const T = getT(lang)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [domain, setDomain] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({ name: false, email: false })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [onClose])

  const submit = () => {
    const e = { name: !name.trim(), email: !email.trim() || !email.includes('@') }
    setErrors(e)
    if (e.name || e.email) return
    setTimeout(() => setSent(true), 1000)
  }

  const inp: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.1)', borderRadius: 8,
    padding: '11px 13px', fontSize: 14, color: '#F0F4FF',
    fontFamily: 'DM Sans, sans-serif', outline: 'none',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)' }} />

      {/* Modal */}
      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(160deg,#0a0f20,#0d1528)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 40, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 80px rgba(0,0,0,.6)' }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.07)', border: 'none', color: 'rgba(240,244,255,.5)', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#60A5FA', marginBottom: 8 }}>{T.order.label}</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{planName}</h2>
        <p style={{ fontSize: 14, color: 'rgba(240,244,255,.45)', marginBottom: 24, fontWeight: 300 }}>${planPrice}/mo</p>

        {!sent ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>{T.order.nameLbl}</label>
                <input style={{ ...inp, borderColor: errors.name ? 'rgba(239,68,68,.5)' : 'rgba(255,255,255,.1)' }}
                  placeholder={T.order.namePh} value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>Email</label>
                <input style={{ ...inp, borderColor: errors.email ? 'rgba(239,68,68,.5)' : 'rgba(255,255,255,.1)' }}
                  type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>{T.order.domainLbl}</label>
              <input style={inp} placeholder={T.order.domainPh} value={domain} onChange={e => setDomain(e.target.value)} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>{T.order.msgLbl}</label>
              <textarea style={{ ...inp, resize: 'vertical', minHeight: 100 }} placeholder={T.order.msgPh} value={msg} onChange={e => setMsg(e.target.value)} />
            </div>

            <button onClick={submit} style={{ width: '100%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', border: 'none', color: '#fff', padding: 14, borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'all .2s' }}>
              {T.order.send}
            </button>
            <p style={{ fontSize: 12, color: 'rgba(240,244,255,.3)', textAlign: 'center', marginTop: 12, fontWeight: 300 }}>{T.order.note}</p>
          </>
        ) : (
          <div style={{ background: 'rgba(110,231,183,.08)', border: '1px solid rgba(110,231,183,.22)', borderRadius: 10, padding: 20, textAlign: 'center', color: '#6EE7B7', fontSize: 15 }}>
            {T.order.success}
          </div>
        )}
      </div>
    </div>
  )
}
