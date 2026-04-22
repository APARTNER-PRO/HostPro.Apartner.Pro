'use client'

import Link from 'next/link'
import { Lang, LANG_META, getLangPath, getT } from '@/lib/i18n'

interface FooterProps { lang: Lang; slug?: string }

export default function Footer({ lang, slug = '' }: FooterProps) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  const cols = [
    {
      title: T.footer.cols?.products || 'Products',
      links: [
        { href: '#pricing', label: T.footer.links.pricing },
        { href: 'faq', label: T.footer.links.faq },
        { href: 'status', label: T.footer.links.status },
      ]
    },
    {
      title: T.footer.cols?.services || 'Services',
      links: [
        { href: 'laravel-hosting', label: T.footer.links.laravelHosting },
        { href: 'wordpress-hosting', label: T.footer.links.wpHosting },
        { href: 'vps-hosting', label: T.footer.links.vpsHosting },
        { href: 'dedicated-servers', label: T.footer.links.dedicated },
      ]
    },
    {
      title: T.footer.cols?.resources || 'Resources',
      links: [
        { href: 'kb', label: T.footer.links.kb },
        { href: 'blog', label: T.footer.links.blog },
        { href: 'about', label: T.footer.links.about },
        { href: 'contact', label: T.footer.links.contact },
      ]
    },
    {
      title: T.footer.cols?.legal || 'Legal',
      links: [
        { href: 'terms', label: T.footer.links.terms },
        { href: 'privacy', label: T.footer.links.privacy },
        { href: 'refund', label: T.footer.links.refund },
      ]
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hp-footer-link { color: rgba(240,244,255,.35); text-decoration: none; font-size: 14px; transition: color .2s; }
        .hp-footer-link:hover { color: #60A5FA; }
        .hp-lang-link { font-size: 12px; text-decoration: none; border-radius: 6px; padding: 3px 10px; transition: all .2s; }
        .hp-lang-link:hover { color: #60A5FA !important; border-color: rgba(96,165,250,.4) !important; }
        .hp-footer-col-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #F0F4FF; margin-bottom: 20px; }
      ` }} />

      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '60px 24px 40px', marginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 60 }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>
            <div style={{ maxWidth: 300 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16 }}>HostPro</span>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(240,244,255,.4)', lineHeight: 1.6, marginBottom: 24 }}>{T.footer.tagline}</p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['en', 'uk', 'ru'] as Lang[]).map((l) => (
                  <Link
                    key={l}
                    href={getLangPath(l, slug)}
                    className="hp-lang-link"
                    style={{
                      border: `1px solid ${l === lang ? 'rgba(96,165,250,.3)' : 'rgba(255,255,255,.08)'}`,
                      color: l === lang ? '#60A5FA' : 'rgba(240,244,255,.3)',
                    }}
                  >
                    {LANG_META[l].flag} {LANG_META[l].label}
                  </Link>
                ))}
              </div>
            </div>

            {cols.map((col, i) => (
              <div key={i}>
                <h4 className="hp-footer-col-title">{col.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map((link, j) => {
                    const href = link.href.startsWith('#') ? `${p || '/'}${link.href}` : `${p}/${link.href}`;
                    return (
                      <Link key={j} href={href} className="hp-footer-link">
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(240,244,255,.2)' }}>{T.footer.copy}</p>
          </div>

        </div>
      </footer>
    </>
  )
}
