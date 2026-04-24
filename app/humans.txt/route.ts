import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

const CONTENT = `/* TEAM */
Founder & CEO: Alex M.
Contact: hostpro@apartner.pro
Location: Ukraine

Head of Infrastructure: Natalia V.
Contact: hostpro@apartner.pro

Lead Developer: Denis K.
Contact: hostpro@apartner.pro

Customer Success: Maria L.
Contact: hostpro@apartner.pro

/* THANKS */
Thank you to all our 12,000+ customers who trust HostPro every day.

/* SITE */
Last update: 2025/04/24
Language: English, Ukrainian, Russian
Standards: HTML5, CSS3, TypeScript
Components: Next.js 14, React 18
Hosting: Tier III Data Centres
`

export function GET() {
  return new NextResponse(CONTENT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
