'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Lang, LANG_META, getLangPath, getT } from '@/lib/i18n'

interface NavProps {
  lang: Lang
  slug?: string
}

export default function Navbar({ lang, slug = '' }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  const navLinks = [
    { href: `${p}/#features`,    label: T.nav.features },
    { href: `${p}/#pricing`,     label: T.nav.pricing },
    { href: `${p}/about`,        label: T.nav.about },
    { href: `${p}/faq`,          label: T.nav.faq },
    { href: `${p}/contact`,      label: T.nav.contact },
    { href: `${p}/status`,       label: T.nav.status },
  ]

  const langLinks = (
    ['en', 'uk', 'ru'] as Lang[]
  ).map((l) => ({
    lang: l,
    label: l.toUpperCase(),
    flag: LANG_META[l].flag,
    href: getLangPath(l, slug),
    current: l === lang,
  }))

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(5,8,16,.88)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link
          href={lang === 'en' ? '/' : `/${lang}`}
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#F0F4FF' }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>⚡</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-.5px' }}>HostPro</span>
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 26, alignItems: 'center', width: '111px' }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hp-nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: lang bar + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Lang switcher */}
          <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,.05)', borderRadius: 8, padding: 3 }}>
            {langLinks.map((l) => (
              <Link
                key={l.lang}
                href={l.href}
                style={{
                  color: l.current ? '#60A5FA' : 'rgba(240,244,255,.4)',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  padding: '4px 9px', borderRadius: 5, textDecoration: 'none',
                  background: l.current ? 'rgba(96,165,250,.2)' : 'transparent',
                  transition: 'all .2s',
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`${p}/#pricing`}
            className="hide-mobile"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'all .2s' }}
          >
            {T.nav.cta}
          </Link>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'rgba(255,255,255,.07)', border: 'none', color: '#F0F4FF', width: 36, height: 36, borderRadius: 8, cursor: 'pointer', fontSize: 18 }}
            className="show-mobile"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '16px 0 20px' }}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '10px 0', color: 'rgba(240,244,255,.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`${p}/#pricing`}
            onClick={() => setMobileOpen(false)}
            style={{ display: 'inline-block', marginTop: 12, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
          >
            {T.nav.cta}
          </Link>
        </div>
      )}
    </nav>
  )
}
