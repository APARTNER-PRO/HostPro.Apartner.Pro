import Link from 'next/link'
import { Lang, LANG_META, getLangPath, getT } from '@/lib/i18n'

interface FooterProps { lang: Lang; slug?: string }

export default function Footer({ lang, slug = '' }: FooterProps) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  const pages = [
    ['about',   T.footer.links.about],
    ['faq',     T.footer.links.faq],
    ['contact', T.footer.links.contact],
    ['status',  T.footer.links.status],
    ['terms',   T.footer.links.terms],
    ['privacy', T.footer.links.privacy],
    ['refund',  T.footer.links.refund],
  ] as const

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '40px 24px', textAlign: 'center', marginTop: 80 }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16 }}>HostPro</span>
      </div>

      {/* Page links */}
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        {pages.map(([s, label]) => (
          <Link key={s} href={`${p}/${s}`} style={{ fontSize: 13, color: 'rgba(240,244,255,.35)', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#60A5FA')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,244,255,.35)')}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Lang switcher */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
        {(['en', 'uk', 'ru'] as Lang[]).map((l) => (
          <Link
            key={l}
            href={getLangPath(l, slug)}
            style={{
              fontSize: 12, textDecoration: 'none',
              border: `1px solid ${l === lang ? 'rgba(96,165,250,.3)' : 'rgba(255,255,255,.08)'}`,
              color: l === lang ? '#60A5FA' : 'rgba(240,244,255,.3)',
              borderRadius: 6, padding: '3px 10px', transition: 'all .2s',
            }}
          >
            {LANG_META[l].flag} {LANG_META[l].label}
          </Link>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'rgba(240,244,255,.3)', marginBottom: 4 }}>{T.footer.tagline}</p>
      <p style={{ fontSize: 12, color: 'rgba(240,244,255,.2)' }}>{T.footer.copy}</p>
    </footer>
  )
}
