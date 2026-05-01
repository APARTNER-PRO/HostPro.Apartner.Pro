import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Ignore static assets, api, and next internal files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const segments = pathname.split('/')
  const pathnameLocale = segments[1]
  const supportedLocales = ['en', 'uk', 'ru']
  
  // 1. Redirect if hitting root and have a preferred locale
  if (pathname === '/') {
    const referer = request.headers.get('referer')
    const isInternal = referer && new URL(referer).origin === request.nextUrl.origin

    if (!isInternal && cookieLocale && cookieLocale !== 'en' && supportedLocales.includes(cookieLocale)) {
      return NextResponse.redirect(new URL(`/${cookieLocale}/`, request.url))
    }
  }

  // 2. Set/Update cookie based on current path
  let response = NextResponse.next()
  
  if (supportedLocales.includes(pathnameLocale)) {
    // We are on a locale-specific path like /uk or /en
    // Note: /en might not be a valid path if it's handled by (en) group at root, 
    // but the switcher might use it.
    response.cookies.set('NEXT_LOCALE', pathnameLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  } else if (pathname === '/' || !supportedLocales.includes(pathnameLocale)) {
    // We are on a default (English) path
    response.cookies.set('NEXT_LOCALE', 'en', { path: '/', maxAge: 60 * 60 * 24 * 365 })
  }

  return response
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
