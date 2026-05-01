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
        { href: 'ai-assistant', label: T.nav.chat },
        { href: 'blog', label: T.footer.links.blog },
        { href: 'about', label: T.footer.links.about },
        { href: '#testimonials', label: T.footer.links.reviews },
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
        .hp-footer-link { color: rgba(240,244,255,.35); text-decoration: none; font-size: 14px; transition: all .2s; display: flex; align-items: center; gap: 6px; }
        .hp-footer-link:hover { color: #60A5FA; transform: translateX(4px); }
        .hp-lang-link { font-size: 12px; text-decoration: none; border-radius: 6px; padding: 3px 10px; transition: all .2s; }
        .hp-lang-link:hover { color: #60A5FA !important; border-color: rgba(96,165,250,.4) !important; }
        .hp-footer-col-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #F0F4FF; margin-bottom: 20px; }
        .hp-new-badge { background: linear-gradient(135deg, #F43F5E, #E11D48); color: #fff; font-size: 9px; font-weight: 800; padding: 1px 5px; borderRadius: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .hp-payment-icon { width: 40px; height: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; display: flex; alignItems: center; justifyContent: center; opacity: 0.4; transition: opacity 0.2s; }
        .hp-payment-icon:hover { opacity: 0.8; background: rgba(255,255,255,0.05); }
      ` }} />

      <footer style={{ position: 'relative', marginTop: 80, padding: '60px 24px 40px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.3), transparent)' }}></div>
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
                        {link.href === 'ai-assistant' && <span className="hp-new-badge">NEW</span>}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
            <p style={{ fontSize: 13, color: 'rgba(240,244,255,.2)' }}>{T.footer.copy}</p>
            
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className="hp-payment-icon" title="Visa">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.153 14.931c-.015-.015-.436-.454-1.127-.454-.645 0-1.291.439-1.306.454l-2.031 2.031 2.031 2.031c.015.015.661.454 1.306.454.691 0 1.112-.439 1.127-.454l2.031-2.031-2.031-2.031zm-6.153 1.069h-2v4h2v-4zm-11-2v4h2v-4h-2zm4 0v4h2v-4h-2zm4 0v4h2v-4h-2z" opacity=".2"/><path d="M22.75 6.25h-21.5c-.69 0-1.25.56-1.25 1.25v11c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25v-11c0-.69-.56-1.25-1.25-1.25zm-20 2h18.5v3h-18.5v-3zm18.5 10.25h-18.5v-5.75h18.5v5.75z"/></svg>
              </div>
              <div className="hp-payment-icon" title="Mastercard">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="8.5" cy="12" r="5" opacity=".6"/><circle cx="15.5" cy="12" r="5" opacity=".6"/><path d="M12 12a4.99 4.99 0 0 0-1.5 3.5 4.99 4.99 0 0 0 1.5 3.5 4.99 4.99 0 0 0 1.5-3.5 4.99 4.99 0 0 0-1.5-3.5z"/></svg>
              </div>
              <div className="hp-payment-icon" title="Apple Pay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 10.3c-.02-2.14 1.74-3.17 1.82-3.22-1-1.46-2.55-1.66-3.1-1.68-1.31-.13-2.56.77-3.23.77-.67 0-1.7-.76-2.8-.74-1.45.02-2.78.84-3.53 2.14-1.51 2.62-.39 6.49 1.07 8.6 0.72 1.04 1.58 2.2 2.7 2.16 1.08-.04 1.49-.7 2.8-.7s1.68.7 2.82.68c1.15-.02 1.9-.1 2.62-2.14.73-1.06 1.07-2.1 1.09-2.15-.02-.01-2.11-.81-2.13-3.22zM14.65 4.75c.59-.71.98-1.7.87-2.69-.85.03-1.89.57-2.5 1.28-.55.63-.83 1.34-.73 2.31.95.07 1.88-.34 2.36-.9z"/></svg>
              </div>
              <div className="hp-payment-icon" title="Google Pay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.16 11.08v2.24h3.3c-.14 1-.95 2.17-3.3 2.17-2.02 0-3.66-1.67-3.66-3.74s1.64-3.74 3.66-3.74c1.15 0 1.92.49 2.36.91l1.77-1.7c-1.14-1.06-2.62-1.71-4.13-1.71-3.64 0-6.6 2.96-6.6 6.6s2.96 6.6 6.6 6.6c3.8 0 6.32-2.67 6.32-6.43 0-.43-.05-.76-.11-1.1h-6.21z"/></svg>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}
