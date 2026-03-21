'use client'
import { useEffect, useRef } from 'react'
import { Lang, getT } from '@/lib/i18n'
import { useFadeIn } from './useFadeIn'

function FadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useFadeIn(ref)
  return <div ref={ref} style={{ opacity:inView?1:0,transform:inView?'translateY(0)':'translateY(24px)',transition:'opacity .6s ease,transform .6s ease',...style }}>{children}</div>
}

export default function TermsClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const D = T.terms
  useEffect(() => {
    const toc = document.getElementById('toc')
    if (!toc) return
    toc.innerHTML = ''
    document.querySelectorAll<HTMLHeadingElement>('.legal-h2').forEach((h, i) => {
      h.id = 's' + i
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = '#s' + i
      a.textContent = h.textContent
      a.style.cssText = 'color:#60A5FA;font-size:13px;text-decoration:none'
      li.appendChild(a)
      toc.appendChild(li)
    })
  }, [lang])
  return (
    <>
      <div className="page-hero" style={{ paddingBottom:40,textAlign:'left' }}>
        <div className="page-container" style={{ position:'relative',zIndex:1 }}>
          <div className="section-label">{D.label}</div>
          <h1 className="page-title" style={{ fontSize:'clamp(24px,4vw,42px)' }}>{D.title}</h1>
          <p style={{ fontSize:12,color:'rgba(240,244,255,.28)',fontWeight:300,marginTop:6 }}>{D.date}</p>
        </div>
      </div>
      <div className="page-container" style={{ paddingBottom:80 }}>
        <FadeIn>
          <div className="legal-toc"><h4>Contents</h4><ol id="toc" style={{ paddingLeft:16 }}></ol></div>
        </FadeIn>
        <FadeIn>
          <div>
          {D.sections.map((s, i) => (
            <div key={i} className="card">
              <h2 className="legal-h2" style={{ fontFamily:'Syne,sans-serif',fontSize:18,fontWeight:700,marginBottom:10 }}>{i+1}. {s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
          </div>
        </FadeIn>
      </div>
    </>
  )
}
