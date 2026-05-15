'use client'

import { Lang, getT } from '@/lib/i18n'
import FadeIn from './FadeIn'
import Link from 'next/link'

export default function HostingTypesClient({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  return (
    <div className="section-container" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <FadeIn style={{ textAlign: 'center', marginBottom: 80 }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 24, color: '#fff' }}>
          {T.hostingTypes.title}
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          {T.hostingTypes.sub}
        </p>
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
        {T.hostingTypes.categories.map((cat: any, i: number) => (
          <FadeIn key={i} delay={i * 150}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: '40px 32px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#60A5FA', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 10px #60A5FA' }}></span>
                {cat.name}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {cat.items.map((item: any, j: number) => {
                  const rootSlugs = [
                    'wordpress-hosting', 'laravel-hosting', 'php-hosting', 
                    'prestashop-hosting', 'vps-hosting', 'dedicated-servers', 
                    'reseller-hosting', 'free-hosting', 'free-php-hosting', 
                    'free-personal-hosting', 'free-wordpress-hosting', 'partner-free-hosting'
                  ];
                  const isRoot = rootSlugs.includes(item.slug);
                  const href = isRoot ? `${p}/${item.slug}` : `${p}/hosting-types/${item.slug}`;
                  
                  return (
                    <Link 
                      key={j} 
                      href={href}
                      className="hosting-type-link"
                    >
                      {item.name}
                      <span className="arrow">→</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <style jsx>{`
        .hosting-type-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 16px 20px;
          border-radius: 12px;
          color: rgba(240,244,255,0.7);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .hosting-type-link:hover {
          background: rgba(96,165,250,0.08);
          border-color: rgba(96,165,250,0.2);
          color: #fff;
          transform: translateX(4px);
        }
        .arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.2s ease;
          color: #60A5FA;
        }
        .hosting-type-link:hover .arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  )
}
