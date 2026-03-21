'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lang, getT, getLangPath } from '@/lib/i18n'

export default function CookieBanner({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false)
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  useEffect(() => {
    if (!localStorage.getItem('hp_cookies')) setVisible(true)
  }, [])

  if (!visible) return null

  const dismiss = (val: string) => {
    localStorage.setItem('hp_cookies', val)
    setVisible(false)
  }

  return (
    <div
      style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9999, background: 'rgba(10,15,30,.97)',
        border: '1px solid rgba(255,255,255,.1)', borderRadius: 16,
        padding: '22px 26px', maxWidth: 760, width: 'calc(100% - 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 20, flexWrap: 'wrap',
        boxShadow: '0 8px 40px rgba(0,0,0,.5)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        animation: 'slideUp .4s ease',
      }}
    >
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>

      <div style={{ flex: 1, minWidth: 240 }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 6, color: '#F0F4FF' }}>
          {T.cookies.title}
        </p>
        <p style={{ fontSize: 13, color: 'rgba(240,244,255,.5)', lineHeight: 1.6, fontWeight: 300 }}>
          {T.cookies.desc}{' '}
          <Link href={`${p}/privacy`} style={{ color: '#60A5FA', textDecoration: 'none' }}>
            {T.cookies.more}
          </Link>
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
        <button
          onClick={() => dismiss('all')}
          style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}
        >
          {T.cookies.acceptAll}
        </button>
        <button
          onClick={() => dismiss('essential')}
          style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(240,244,255,.7)', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}
        >
          {T.cookies.acceptEssential}
        </button>
      </div>
    </div>
  )
}
