'use client'

import Link from 'next/link'
import { Lang, getT } from '@/lib/i18n'

interface BreadcrumbsProps {
  lang: Lang
  page: string
  pageName?: string
}

export default function Breadcrumbs({ lang, page, pageName }: BreadcrumbsProps) {
  const T = getT(lang)
  const p = lang === 'en' ? '' : `/${lang}`

  const breadcrumbLabels: Record<string, string> = {
    home: lang === 'uk' ? 'Головна' : (lang === 'ru' ? 'Главная' : 'Home'),
    about: T.nav.about,
    contact: T.nav.contact,
    faq: T.nav.faq,
    pricing: T.nav.pricing,
    reviews: T.nav.reviews,
    kb: T.footer.links.kb,
    'hosting-types': T.footer.links.hostingTypes,
  }

  const label = pageName || breadcrumbLabels[page] || page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')

  // return (
  //   <nav aria-label="Breadcrumb" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
  //     <Link href={p || '/'} style={{ color: 'rgba(240,244,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-blue-400">
  //       {breadcrumbLabels.home}
  //     </Link>
  //     <span style={{ color: 'rgba(240,244,255,0.2)' }}>/</span>
  //     <span style={{ color: '#60A5FA', fontWeight: 500 }}>{label}</span>
  //   </nav>
  // )

  return (
    <></>
  )
}
