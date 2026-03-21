import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hostpro.com'),
  title: {
    default: 'HostPro — Fast & Reliable Web Hosting',
    template: '%s — HostPro',
  },
  description: 'Fast NVMe SSD hosting with cPanel, free SSL and 24/7 support. Plans from $3.99/mo.',
  keywords: ['web hosting', 'NVMe SSD hosting', 'cPanel hosting', 'cheap hosting', 'WordPress hosting'],
  authors: [{ name: 'HostPro' }],
  creator: 'HostPro',
  publisher: 'HostPro',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    siteName: 'HostPro',
    locale: 'en_US',
    alternateLocale: ['uk_UA', 'ru_RU'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hostpro',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#050810" />
      </head>
      <body>{children}</body>
    </html>
  )
}
