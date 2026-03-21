'use client'
import { useState, useRef } from 'react'
import { Lang, getT } from '@/lib/i18n'
import { useFadeIn } from './useFadeIn'

function FadeIn({ children, delay=0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useFadeIn(ref)
  return <div ref={ref} style={{ opacity:inView?1:0,transform:inView?'translateY(0)':'translateY(24px)',transition:`opacity .6s ease ${delay}ms,transform .6s ease ${delay}ms`,...style }}>{children}</div>
}

const INP: React.CSSProperties = { width:'100%',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',borderRadius:8,padding:'11px 13px',fontSize:14,color:'#F0F4FF',fontFamily:'DM Sans,sans-serif',outline:'none' }

export default function ContactClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const C = T.contact
  const [sent, setSent] = useState(false)
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
            {C.channels.map((ch,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:13,padding:22,transition:'border-color .2s,transform .2s',cursor:'default' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(96,165,250,.22)';(e.currentTarget as HTMLDivElement).style.transform='translateY(-2px)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='rgba(255,255,255,.07)';(e.currentTarget as HTMLDivElement).style.transform=''}}>
                <div style={{ fontSize:26,marginBottom:10 }}>{ch.icon}</div>
                <div style={{ fontFamily:'Syne,sans-serif',fontSize:15,fontWeight:700,marginBottom:4 }}>{ch.title}</div>
                <div style={{ fontSize:13,color:'rgba(240,244,255,.4)',marginBottom:10,fontWeight:300 }}>{ch.desc}</div>
                <a href={ch.href} style={{ color:'#60A5FA',fontSize:13,fontWeight:600,textDecoration:'none' }}>{ch.link}</a>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={100}><div className="card">
          <div className="section-label">{C.formLabel}</div>
          <h3 style={{ marginBottom:20 }}>{C.formTitle}</h3>
          {!sent ? <>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14 }}>
              <div><label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.nameLbl}</label><input style={INP} placeholder={C.namePh}/></div>
              <div><label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.emailLbl}</label><input style={INP} type="email" placeholder={C.emailPh}/></div>
            </div>
            <div style={{ marginBottom:14 }}><label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.topicLbl}</label>
              <select style={{ ...INP }}>{C.topics.map(t=><option key={t}>{t}</option>)}</select>
            </div>
            <div style={{ marginBottom:22 }}><label style={{ display:'block',fontSize:12,fontWeight:600,marginBottom:5,color:'rgba(240,244,255,.65)' }}>{C.msgLbl}</label><textarea style={{ ...INP,resize:'vertical',minHeight:110 }} placeholder={C.msgPh}/></div>
            <button onClick={()=>setTimeout(()=>setSent(true),1000)} className="btn-primary">{C.sendBtn}</button>
          </> : <div style={{ background:'rgba(110,231,183,.07)',border:'1px solid rgba(110,231,183,.2)',borderRadius:9,padding:16,textAlign:'center',color:'#6EE7B7',fontSize:14 }}>{C.success}</div>}
        </div></FadeIn>
      </div>
    </>
  )
}
