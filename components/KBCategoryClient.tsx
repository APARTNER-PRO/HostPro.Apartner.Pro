'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function FadeIn({ children, delay = 0, className = '', style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const inView = useInView(ref)
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

const CSS = `
  .kb-article-card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 20px; padding: 32px; transition: all .25s; cursor: pointer; text-decoration: none; display: block; height: 100%; }
  .kb-article-card:hover { transform: translateY(-4px); background: rgba(255,255,255,.05); border-color: rgba(96,165,250,.3); }
  .kb-back-link { display: inline-flex; align-items: center; gap: 8px; color: rgba(240,244,255,.5); text-decoration: none; font-size: 14px; margin-bottom: 40px; transition: color .2s; }
  .kb-back-link:hover { color: #60A5FA; }
`

export default function KBCategoryClient({ lang, categorySlug }: { lang: Lang, categorySlug: string }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  
  const category = T.kb?.categories?.find((c: any) => c.slug === categorySlug)
  const articles = T.kb?.articles?.filter((a: any) => a.cat === category?.title) || []

  if (!category) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section style={{ padding: '140px 24px 100px' }}>
        <div className="section-container">
          <FadeIn>
            <Link href={`${p}/kb`} className="kb-back-link">
              {T.kb.backToKb}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 48 }}>{category.icon}</div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1px' }}>
                {category.title}
              </h1>
            </div>
            <p style={{ fontSize: 18, color: 'rgba(240,244,255,.5)', marginBottom: 60, fontWeight: 300 }}>
              {articles.length} {T.kb.articleCount}
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
            {articles.map((article: any, i: number) => (
              <FadeIn key={i} delay={i * 50}>
                <Link href={`${p}/kb/${categorySlug}/${article.slug}`} className="kb-article-card">
                  <div style={{ fontSize: 14, color: '#60A5FA', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>📄 {T.kb.articleSingular}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#fff' }}>
                    {article.title}
                  </h3>
                  <div style={{ color: 'rgba(240,244,255,.4)', fontSize: 15, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: article.content.substring(0, 150).replace(/<[^>]*>?/gm, '') + '...' }} />
                  <div style={{ marginTop: 24, color: '#60A5FA', fontSize: 14, fontWeight: 600 }}>{lang === 'uk' ? 'Читати статтю →' : lang === 'ru' ? 'Читать статью →' : 'Read article →'}</div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {articles.length === 0 && (
            <FadeIn>
              <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(240,244,255,.3)' }}>
                {lang === 'uk' ? 'У цій категорії поки немає статей' : lang === 'ru' ? 'В этой категории пока нет статей' : 'No articles in this category yet'}
              </div>
            </FadeIn>
          )}

          <div style={{ marginTop: 100 }}>
            <FadeIn delay={200}>
              <div style={{ background: 'linear-gradient(135deg, rgba(96,165,250,.08), rgba(167,139,250,.08))', borderRadius: 24, padding: 60, border: '1px solid rgba(96,165,250,.15)', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 24 }}>💬</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{T.kb.supportTitle}</h3>
                <p style={{ fontSize: 16, color: 'rgba(240,244,255,.5)', marginBottom: 32, lineHeight: 1.6, maxWidth: 600, margin: '0 auto 32px' }}>{T.kb.supportSub}</p>
                <Link href={`${p}/contact`} className="btn-primary" style={{ display: 'inline-block' }}>{T.kb.supportBtn}</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
