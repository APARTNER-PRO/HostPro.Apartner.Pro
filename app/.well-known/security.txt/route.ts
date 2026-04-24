import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const CONTENT = `Contact: mailto:hostpro@apartner.pro
Contact: https://hostpro.apartner.pro/contact
Expires: 2026-12-31T23:59:59.000Z
Encryption: https://hostpro.apartner.pro/.well-known/pgp-key.txt
Acknowledgments: https://hostpro.apartner.pro/security/hall-of-fame
Preferred-Languages: en, uk, ru
Canonical: https://hostpro.apartner.pro/.well-known/security.txt
Policy: https://hostpro.apartner.pro/privacy
Hiring: https://hostpro.apartner.pro/about
`

export function GET() {
  return new NextResponse(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
