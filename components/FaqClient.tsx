'use client'
import { useState, useRef } from 'react'
import { Lang, getT } from '@/lib/i18n'
import { useFadeIn } from './useFadeIn'

function FadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useFadeIn(ref)
  return <div ref={ref} style={{ opacity:inView?1:0,transform:inView?'translateY(0)':'translateY(24px)',transition:'opacity .6s ease,transform .6s ease',...style }}>{children}</div>
}

export default function FaqClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const F = T.faq
  const [open, setOpen] = useState<number | null>(null)
  return (
    <>
      <div className="page-hero">
        <div className="orb" style={{ width:400,height:400,background:'radial-gradient(circle,rgba(139,92,246,.15),transparent)',top:-60,right:0 }}/>
        <div className="page-container" style={{ position:'relative',zIndex:1 }}>
          <div className="section-label">{F.label}</div>
          <h1 className="page-title">{F.h1p1} <span className="grad-text">{F.h1p2}</span></h1>
          <p className="page-sub">{F.sub}</p>
        </div>
      </div>
      <div className="page-container" style={{ paddingBottom:80 }}>
        <FadeIn>
          {F.items.map((item, i) => (
            <div key={i} style={{ border:`1px solid ${open===i?'rgba(96,165,250,.3)':'rgba(255,255,255,.07)'}`,borderRadius:12,marginBottom:8,overflow:'hidden',transition:'border-color .2s' }}>
              <div onClick={() => setOpen(open===i?null:i)} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'17px 20px',cursor:'pointer',fontWeight:600,fontSize:15,gap:14,userSelect:'none',color:open===i?'#60A5FA':'#F0F4FF',transition:'color .2s' }}>
                <span>{item.q}</span>
                <span style={{ flexShrink:0,fontSize:20,color:open===i?'#60A5FA':'rgba(240,244,255,.3)',transition:'transform .3s,color .3s',transform:open===i?'rotate(45deg)':'none',display:'block' }}>+</span>
              </div>
              <div style={{ maxHeight:open===i?300:0,overflow:'hidden',transition:'max-height .35s ease' }}>
                <div style={{ padding:'0 20px 16px',fontSize:14,color:'rgba(240,244,255,.6)',lineHeight:1.75,borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:12,fontWeight:300 }}>{item.a}</div>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </>
  )
}
