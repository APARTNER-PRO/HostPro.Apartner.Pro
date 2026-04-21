import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hostpro.apartner.pro'),
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
      <body>
        {children}
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69e7e56d34e22f1c313bcacb/1jmotgdcf';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
