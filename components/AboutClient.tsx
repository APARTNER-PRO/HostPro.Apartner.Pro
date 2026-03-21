'use client'
import { useRef } from 'react'
import { Lang, getT } from '@/lib/i18n'
import { useFadeIn } from './useFadeIn'

function FadeIn({ children, delay=0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useFadeIn(ref)
  return <div ref={ref} style={{ opacity: inView?1:0, transform: inView?'translateY(0)':'translateY(24px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>{children}</div>
}

const SG = ['linear-gradient(135deg,#60A5FA,#A78BFA)','linear-gradient(135deg,#A78BFA,#F472B6)','linear-gradient(135deg,#6EE7B7,#60A5FA)','linear-gradient(135deg,#FB923C,#F472B6)']

export default function AboutClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const A = T.about
  return (
    <>
      <div className="page-hero">
        <div className="orb" style={{ width:500,height:500,background:'radial-gradient(circle,rgba(59,130,246,.15),transparent)',top:-100,left:'50%',transform:'translateX(-50%)' }}/>
        <div className="page-container" style={{ position:'relative',zIndex:1 }}>
          <div className="section-label">{A.label}</div>
          <h1 className="page-title">{A.h1p1} <span className="grad-text">{A.h1p2}</span></h1>
          <p className="page-sub">{A.sub}</p>
        </div>
      </div>
      <div className="page-container" style={{ paddingBottom:80 }}>
        <FadeIn>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20 }}>
            {A.stats.map((s,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:14,padding:22,textAlign:'center' }}>
                <div style={{ fontFamily:'Syne,sans-serif',fontSize:36,fontWeight:800,background:SG[i],WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:5 }}>{s.val}</div>
                <div style={{ fontSize:12,color:'rgba(240,244,255,.45)',fontWeight:300 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={100}><div className="card">
          <div className="section-label">{A.missionLabel}</div>
          <h3>{A.missionTitle}</h3>
          <p style={{ marginTop:10 }}>{A.mission1}</p>
          <p style={{ marginTop:10 }}>{A.mission2}</p>
        </div></FadeIn>
        <FadeIn delay={150}><div className="card">
          <div className="section-label">{A.valuesLabel}</div>
          <h3 style={{ marginBottom:14 }}>{A.valuesTitle}</h3>
          <div>
            {A.values.map((v,i) => (
              <div key={i} style={{ display:'flex',gap:14,alignItems:'flex-start',padding:'16px 0',borderBottom:i<A.values.length-1?'1px solid rgba(255,255,255,.05)':'none' }}>
                <div style={{ fontSize:20,flexShrink:0,marginTop:3 }}>{v.icon}</div>
                <div><strong style={{ fontWeight:700,fontSize:15 }}>{v.title}</strong><p style={{ marginTop:4 }}>{v.desc}</p></div>
              </div>
            ))}
          </div>
        </div></FadeIn>
        <FadeIn delay={200}><div className="card" style={{ marginBottom:0 }}>
          <div className="section-label">{A.teamLabel}</div>
          <h3 style={{ marginBottom:16 }}>{A.teamTitle}</h3>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12 }}>
            {A.team.map((m,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:13,padding:20,textAlign:'center' }}>
                <div style={{ fontSize:32,marginBottom:9 }}>{m.avatar}</div>
                <div style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14,marginBottom:3 }}>{m.name}</div>
                <div style={{ fontSize:12,color:'rgba(240,244,255,.35)',fontWeight:300 }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div></FadeIn>
      </div>
    </>
  )
}
