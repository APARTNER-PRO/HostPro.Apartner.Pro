'use client'

import Navbar from './Navbar'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import { Lang } from '@/lib/i18n'

interface PageWrapperProps {
  lang: Lang
  slug?: string
  children: React.ReactNode
}

export default function PageWrapper({ lang, slug = '', children }: PageWrapperProps) {
  return (
    <>
      <Navbar lang={lang} slug={slug} />
      <main style={{ paddingTop: 64 }}>{children}</main>
      <Footer lang={lang} slug={slug} />
      <CookieBanner lang={lang} />
    </>
  )
}
