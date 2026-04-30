import type { Metadata } from 'next'
import Script from 'next/script'
import { LANGS } from '@/lib/i18n'
import '../globals.css'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hostpro.apartner.pro'),
  title: {
    default: 'HostPro - Fast & Reliable Web Hosting',
    template: '%s - HostPro',
  },
  description: 'Fast NVMe SSD hosting with cPanel, free SSL and 24/7 support. Plans from $1.99/mo.',
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

export default function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: string } }) {
  return (
    <>
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
    </>
  )
}
