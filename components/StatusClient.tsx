'use client'
import { useEffect, useRef } from 'react'
import { Lang, getT } from '@/lib/i18n'
import { useFadeIn } from './useFadeIn'

function FadeIn({ children, delay=0 }: { children:React.ReactNode;delay?:number }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useFadeIn(ref)
  return <div ref={ref} style={{ opacity:inView?1:0,transform:inView?'translateY(0)':'translateY(24px)',transition:`opacity .6s ease ${delay}ms,transform .6s ease ${delay}ms` }}>{children}</div>
}

const MG = ['linear-gradient(135deg,#60A5FA,#A78BFA)','linear-gradient(135deg,#A78BFA,#F472B6)','linear-gradient(135deg,#6EE7B7,#60A5FA)']

function UptimeBar({ miss=[] }: { miss?: number[] }) {
  return <div style={{ display:'flex',gap:2,marginTop:4 }}>{Array.from({length:60},(_,i)=><div key={i} style={{ height:5,width:6,borderRadius:1,background:miss.includes(i)?'rgba(239,68,68,.5)':'#6EE7B7',opacity:.65 }}/>)}</div>
}

export default function StatusClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const S = T.status
  return (
    <>
      <div className="page-hero">
        <div className="orb" style={{ width:400,height:400,background:'radial-gradient(circle,rgba(110,231,183,.08),transparent)',top:-60,left:'50%',transform:'translateX(-50%)' }}/>
        <div className="page-container" style={{ position:'relative',zIndex:1 }}>
          <div className="section-label">{S.label}</div>
          <h1 className="page-title">{S.h1p1} <span className="grad-text">{S.h1p2}</span></h1>
        </div>
      </div>
      <div className="page-container" style={{ paddingBottom:80 }}>
        <FadeIn>
          <div style={{ display:'flex',alignItems:'center',gap:12,background:'rgba(110,231,183,.07)',border:'1px solid rgba(110,231,183,.2)',borderRadius:13,padding:'18px 22px',marginBottom:18 }}>
            <div className="animate-pulse-dot" style={{ width:13,height:13,borderRadius:'50%',background:'#6EE7B7',boxShadow:'0 0 10px #6EE7B7',flexShrink:0 }}/>
            <div>
              <div style={{ fontFamily:'Syne,sans-serif',fontSize:17,fontWeight:700,color:'#6EE7B7' }}>{S.okText}</div>
              <div style={{ fontSize:12,color:'rgba(240,244,255,.4)',fontWeight:300,marginTop:2 }}>{S.okSub}</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:13,marginBottom:18 }}>
            {S.metrics.map((m,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,padding:16,textAlign:'center' }}>
                <div style={{ fontFamily:'Syne,sans-serif',fontSize:24,fontWeight:800,background:MG[i],WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:3 }}>{m.val}</div>
                <div style={{ fontSize:11,color:'rgba(240,244,255,.4)',fontWeight:300 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={100}><div className="card">
          <h3 style={{ marginBottom:3 }}>{S.svcTitle}</h3>
          <p style={{ fontSize:12,color:'rgba(240,244,255,.28)',marginBottom:16,fontWeight:300 }}>{S.svcSub}</p>
          {S.services.map((svc,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:i<S.services.length-1?'1px solid rgba(255,255,255,.05)':'none' }}>
              <div>
                <div style={{ fontWeight:600,fontSize:14 }}>{svc}</div>
                <UptimeBar miss={i===3?[42]:i===5?[27]:[]}/>
              </div>
              <span style={{ fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:100,background:'rgba(110,231,183,.12)',color:'#6EE7B7' }}>{S.badge}</span>
            </div>
          ))}
        </div></FadeIn>
        <FadeIn delay={150}><div className="card" style={{ marginBottom:0 }}>
          <h3 style={{ marginBottom:3 }}>{S.incTitle}</h3>
          <p style={{ fontSize:12,color:'rgba(240,244,255,.28)',marginBottom:16,fontWeight:300 }}>{S.incSub}</p>
          {S.incidents.map((inc,i)=>(
            <div key={i} style={{ padding:'13px 0',borderBottom:i<S.incidents.length-1?'1px solid rgba(255,255,255,.05)':'none' }}>
              <div style={{ fontSize:11,color:'rgba(240,244,255,.28)',marginBottom:3 }}>{inc.date}</div>
              <div style={{ fontWeight:600,fontSize:14,marginBottom:2 }}>{inc.title} <span style={{ display:'inline-block',background:'rgba(110,231,183,.1)',color:'#6EE7B7',fontSize:10,fontWeight:700,padding:'1px 6px',borderRadius:100,marginLeft:6 }}>{inc.badge}</span></div>
              <div style={{ fontSize:13,color:'rgba(240,244,255,.5)',fontWeight:300 }}>{inc.desc}</div>
            </div>
          ))}
          <div style={{ paddingTop:12,fontSize:13,color:'rgba(240,244,255,.22)',textAlign:'center' }}>{S.noMore}</div>
        </div></FadeIn>
      </div>
    </>
  )
}
