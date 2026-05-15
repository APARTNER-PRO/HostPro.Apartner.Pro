'use client'

import React, { useRef, useState, useEffect } from 'react'

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

export default function FadeIn({ children, delay = 0, className = '', style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref)
  return (
    <div ref={ref} className={className} style={{ 
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translateY(0)' : 'translateY(24px)', 
      transition: `opacity .8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform .8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`, 
      ...style 
    }}>
      {children}
    </div>
  )
}
