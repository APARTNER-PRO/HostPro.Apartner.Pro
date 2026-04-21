'use client'
import { useState, useRef, FormEvent } from 'react'
import { Lang, getT } from '@/lib/i18n'
import { useFadeIn } from './useFadeIn'

const WEB3FORMS_KEY = '9c436dd7-6fe7-4bd4-b50f-db97b5fe5473'

function FadeIn({ children, delay=0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useFadeIn(ref)
  return <div ref={ref} style={{ opacity:inView?1:0,transform:inView?'translateY(0)':'translateY(24px)',transition:`opacity .6s ease ${delay}ms,transform .6s ease ${delay}ms`,...style }}>{children}</div>
}

const INP: React.CSSProperties = { width:'100%',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',borderRadius:8,padding:'11px 13px',fontSize:14,color:'#F0F4FF',fontFamily:'DM Sans,sans-serif',outline:'none' }

export default function ContactClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const C = T.contact
  const formRef = useRef<HTMLFormElement>(null!)
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const formData = new FormData(formRef.current)
      formData.append('access_key', WEB3FORMS_KEY)
      formData.append('subject', `[HostPro Contact] ${formData.get('topic') || 'New message'}`)
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        formRef.current.reset()
      } else {
        setErrMsg(data.message || 'Unknown error')
        setStatus('error')
      }
    } catch {
      setErrMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="orb" style={{ width:400,height:400,background:'radial-gradient(circle,rgba(110,231,183,.09),transparent)',top:-80,left:0 }}/>
        <div className="page-container" style={{ position:'relative',zIndex:1 }}>
          <div className="section-label">{C.label}</div>
          <h1 className="page-title">{C.h1p1} <span className="grad-text">{C.h1p2}</span></h1>
          <p className="page-sub">{C.sub}</p>
        </div>
      </div>
      <div className="page-container" style={{ paddingBottom:80 }}>
        <FadeIn>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:18 }}>
            {C.channels.map((ch,i) => {
              const isChat = ch.title === 'Live Chat';
              const handleClick = (e: React.MouseEvent) => {
                if (isChat) {
                  e.preventDefault();
                  if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.maximize();
                  }
                }
              };
              return (
                <div 
                  key={i} 
                  className="hp-contact-channel" 
                  onClick={handleClick}
                  style={{ 
                    background:'rgba(255,255,255,.03)', 
                    border:'1px solid rgba(255,255,255,.07)', 
                    borderRadius:13, 
                    padding:22,
                    cursor: isChat ? 'pointer' : 'default'
                  }}
                >
                  <div style={{ fontSize:26,marginBottom:10 }}>{ch.icon}</div>
                  <div style={{ fontFamily:'Syne,sans-serif',fontSize:15,fontWeight:700,marginBottom:4 }}>{ch.title}</div>
                  <div style={{ fontSize:13,color:'rgba(240,244,255,.4)',marginBottom:10,fontWeight:300 }}>{ch.desc}</div>
                  <a 
                    href={ch.href} 
                    onClick={handleClick}
                    style={{ color:'#60A5FA',fontSize:13,fontWeight:600,textDecoration:'none' }}
                  >
                    {ch.link}
                  </a>
                </div>
              );
            })}
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="card">
            <div className="section-label">{C.formLabel}</div>
            <h3 style={{ marginBottom:20 }}>{C.formTitle}</h3>

            {status === 'success' ? (
              <div style={{ background:'rgba(110,231,183,.07)',border:'1px solid rgba(110,231,183,.2)',borderRadius:9,padding:20,textAlign:'center',color:'#6EE7B7',fontSize:15 }}>
                {C.success}
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Honeypot */}
                <input type="checkbox" name="botcheck" style={{ display:'none' }} />

                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14 }}>
                  <div>
                    <label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.nameLbl}</label>
                    <input name="name" required style={INP} placeholder={C.namePh}/>
                  </div>
                  <div>
                    <label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.emailLbl}</label>
                    <input name="email" type="email" required style={INP} placeholder={C.emailPh}/>
                  </div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.topicLbl}</label>
                  <select name="topic" style={{ ...INP }}>
                    {C.topics.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom:22 }}>
                  <label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.msgLbl}</label>
                  <textarea name="message" required style={{ ...INP,resize:'vertical',minHeight:110 }} placeholder={C.msgPh}/>
                </div>

                {status === 'error' && (
                  <div style={{ background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.25)',borderRadius:8,padding:'10px 14px',color:'#FCA5A5',fontSize:13,marginBottom:14 }}>
                    ❌ {errMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{ opacity: status === 'sending' ? .6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer', width:'100%' }}
                >
                  {status === 'sending' ? '...' : C.sendBtn}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </>
  )
}
