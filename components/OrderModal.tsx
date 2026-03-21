'use client'

import { useState, useEffect, FormEvent, useRef } from 'react'
import { Lang, getT } from '@/lib/i18n'

const WEB3FORMS_KEY = '9c436dd7-6fe7-4bd4-b50f-db97b5fe5473'

interface OrderModalProps {
  lang: Lang
  planName: string
  planPrice: string
  onClose: () => void
}

export default function OrderModal({ lang, planName, planPrice, onClose }: OrderModalProps) {
  const T = getT(lang)
  const formRef = useRef<HTMLFormElement>(null!)
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [onClose])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    const name = (form.querySelector('[name="name"]') as HTMLInputElement).value.trim()
    const email = (form.querySelector('[name="email"]') as HTMLInputElement).value.trim()
    const ne = !name; const ee = !email || !email.includes('@')
    setNameErr(ne); setEmailErr(ee)
    if (ne || ee) return

    setStatus('sending')
    try {
      const formData = new FormData(form)
      formData.append('access_key', WEB3FORMS_KEY)
      formData.append('subject', `[HostPro Order] ${planName} — $${planPrice}/mo`)
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setErrMsg(data.message || 'Unknown error')
        setStatus('error')
      }
    } catch {
      setErrMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  const inp = (err = false): React.CSSProperties => ({
    width: '100%', background: 'rgba(255,255,255,.04)',
    border: `1px solid ${err ? 'rgba(239,68,68,.5)' : 'rgba(255,255,255,.1)'}`,
    borderRadius: 8, padding: '11px 13px', fontSize: 14,
    color: '#F0F4FF', fontFamily: 'DM Sans, sans-serif', outline: 'none',
  })

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)' }} />

      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(160deg,#0a0f20,#0d1528)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 40, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 80px rgba(0,0,0,.6)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.07)', border: 'none', color: 'rgba(240,244,255,.5)', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: '#60A5FA', marginBottom: 8 }}>{T.order.label}</div>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{planName}</h2>
        <p style={{ fontSize: 14, color: 'rgba(240,244,255,.45)', marginBottom: 24, fontWeight: 300 }}>${planPrice}/mo</p>

        {status === 'success' ? (
          <div style={{ background: 'rgba(110,231,183,.08)', border: '1px solid rgba(110,231,183,.22)', borderRadius: 10, padding: 24, textAlign: 'center', color: '#6EE7B7', fontSize: 15 }}>
            {T.order.success}
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Honeypot spam protection */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
            {/* Hidden fields for context */}
            <input type="hidden" name="plan_name" value={planName} />
            <input type="hidden" name="plan_price" value={`$${planPrice}/mo`} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>{T.order.nameLbl}</label>
                <input name="name" style={inp(nameErr)} placeholder={T.order.namePh} onChange={() => setNameErr(false)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>Email</label>
                <input name="email" type="email" style={inp(emailErr)} placeholder="you@example.com" onChange={() => setEmailErr(false)} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>{T.order.domainLbl}</label>
              <input name="domain" style={inp()} placeholder={T.order.domainPh} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5, color: 'rgba(240,244,255,.65)' }}>{T.order.msgLbl}</label>
              <textarea name="message" style={{ ...inp(), resize: 'vertical', minHeight: 100 }} placeholder={T.order.msgPh} />
            </div>

            {status === 'error' && (
              <div style={{ background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 8, padding: '10px 14px', color: '#FCA5A5', fontSize: 13, marginBottom: 14 }}>
                ❌ {errMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{ width: '100%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', border: 'none', color: '#fff', padding: 14, borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: status === 'sending' ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', opacity: status === 'sending' ? .6 : 1, transition: 'all .2s' }}
            >
              {status === 'sending' ? '...' : T.order.send}
            </button>
            <p style={{ fontSize: 12, color: 'rgba(240,244,255,.3)', textAlign: 'center', marginTop: 12, fontWeight: 300 }}>{T.order.note}</p>
          </form>
        )}
      </div>
    </div>
  )
}
