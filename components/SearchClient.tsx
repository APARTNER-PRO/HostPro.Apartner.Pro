'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, FormEvent } from 'react'
import { getT } from '@/lib/i18n'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function SearchClient({ lang }: { lang: 'en' | 'uk' | 'ru' }) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''
  
  const [results, setResults] = useState<any[]>([])
  const [inputValue, setInputValue] = useState(query === '{search_term_string}' ? '' : query)

  useEffect(() => {
    if (!query || query === '{search_term_string}') return

    // Search through KB articles, blog posts, and pages
    const searchResults: any[] = []
    const q = query.toLowerCase()

    // Search KB
    if (T.kb?.categories) {
      T.kb.categories.forEach((cat: any) => {
        cat.articles?.forEach((article: any) => {
          if (article.title?.toLowerCase().includes(q) || article.content?.toLowerCase().includes(q)) {
            searchResults.push({
              title: article.title,
              type: lang === 'uk' ? 'База знань' : lang === 'ru' ? 'База знаний' : 'Knowledge Base',
              href: `${p}/kb/${cat.slug}/${article.slug}/`,
              snippet: article.content?.substring(0, 150) || ''
            })
          }
        })
      })
    }

    // Search blog posts
    if (T.blog?.posts) {
      T.blog.posts.forEach((post: any) => {
        if (post.title?.toLowerCase().includes(q) || post.excerpt?.toLowerCase().includes(q)) {
          searchResults.push({
            title: post.title,
            type: lang === 'uk' ? 'Блог' : lang === 'ru' ? 'Блог' : 'Blog',
            href: `${p}/blog/${post.slug}/`,
            snippet: post.excerpt?.substring(0, 150) || ''
          })
        }
      })
    }

    // Search hosting types
    if (T.hostingTypes?.categories) {
      T.hostingTypes.categories.forEach((cat: any) => {
        cat.items?.forEach((item: any) => {
          if (item.name?.toLowerCase().includes(q)) {
            searchResults.push({
              title: item.name,
              type: lang === 'uk' ? 'Послуги' : lang === 'ru' ? 'Услуги' : 'Services',
              href: `${p}/hosting-types/${item.slug}/`,
              snippet: ''
            })
          }
        })
      })
    }

    setResults(searchResults)
  }, [query, lang, p, T])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      router.push(`${p}/search/?q=${encodeURIComponent(inputValue)}`)
    }
  }

  const titleText = lang === 'uk' ? 'Результати пошуку' : lang === 'ru' ? 'Результаты поиска' : 'Search Results'
  const noResultsText = lang === 'uk' ? 'Нічого не знайдено' : lang === 'ru' ? 'Ничего не найдено' : 'No results found'
  const searchForText = lang === 'uk' ? 'за запитом' : lang === 'ru' ? 'по запросу' : 'for'
  const tryKBText = lang === 'uk' ? 'Спробуйте пошукати в базі знань' : lang === 'ru' ? 'Попробуйте поискать в базе знаний' : 'Try searching in our Knowledge Base'
  const placeholderText = lang === 'uk' ? 'Що ви шукаєте?' : lang === 'ru' ? 'Что вы ищете?' : 'What are you looking for?'
  const searchBtnText = lang === 'uk' ? 'Пошук' : lang === 'ru' ? 'Поиск' : 'Search'

  return (
    <div className="section-container" style={{ paddingTop: 80, paddingBottom: 100, minHeight: '60vh' }}>
      <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
          {titleText}
        </h1>
        
        {query && query !== '{search_term_string}' && (
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', marginBottom: 24 }}>
            {searchForText} «<span style={{ color: '#60A5FA' }}>{query}</span>»
          </p>
        )}

        <form onSubmit={handleSearch} style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 10, marginTop: (!query || query === '{search_term_string}') ? 32 : 0 }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholderText}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '14px 20px',
              color: '#fff',
              fontSize: 16,
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0 24px', borderRadius: 12 }}>
            {searchBtnText}
          </button>
        </form>
      </FadeIn>

      {(!query || query === '{search_term_string}') ? (
        <FadeIn style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 16, color: 'rgba(240,244,255,0.5)', marginBottom: 32 }}>{tryKBText}</p>
          <Link href={`${p}/kb/`} className="btn-primary" style={{ padding: '14px 36px' }}>
            {lang === 'uk' ? 'База знань' : lang === 'ru' ? 'База знаний' : 'Knowledge Base'}
          </Link>
        </FadeIn>
      ) : results.length > 0 ? (
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {results.map((res, i) => (
            <FadeIn key={i} delay={i * 50}>
              <Link
                href={res.href}
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '20px 24px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                className="hp-feat-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: '#60A5FA', background: 'rgba(96,165,250,0.1)', padding: '2px 8px', borderRadius: 6, fontWeight: 700, textTransform: 'uppercase' }}>
                    {res.type}
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>{res.title}</h3>
                {res.snippet && (
                  <p style={{ fontSize: 13, color: 'rgba(240,244,255,0.4)', lineHeight: 1.5 }}>
                    {res.snippet}...
                  </p>
                )}
              </Link>
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🔍</div>
          <p style={{ fontSize: 18, color: 'rgba(240,244,255,0.5)', marginBottom: 32 }}>{noResultsText}</p>
          <Link href={`${p}/kb/`} className="btn-primary" style={{ padding: '14px 36px' }}>
            {lang === 'uk' ? 'Переглянути базу знань' : lang === 'ru' ? 'Перейти в базу знаний' : 'Browse Knowledge Base'}
          </Link>
        </FadeIn>
      )}
    </div>
  )
}

