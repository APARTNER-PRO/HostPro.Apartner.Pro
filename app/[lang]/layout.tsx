import type { Metadata } from 'next'
import Script from 'next/script'
import { LANGS, Lang, getT, LANG_META, getAlternates } from '@/lib/i18n'

export function generateStaticParams() {
  return LANGS.filter(l => l !== 'en').map(l => ({ lang: l }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Lang
  if (!LANGS.includes(lang)) return {}
  
  const T = getT(lang)
  const { locale } = LANG_META[lang]

  return {
    metadataBase: new URL('https://hostpro.apartner.pro'),
    title: {
      default: T.hero.title1 + ' ' + T.hero.title2,
      template: `%s - HostPro`,
    },
    description: T.hero.sub,
    keywords: [
      'web hosting', 'NVMe SSD hosting', 'cPanel hosting', 'cheap hosting', 'WordPress hosting',
      'PHP hosting', 'Laravel hosting', 'SSD servers', 'free SSL', 'Node.js hosting',
      'hosting in Poland', 'fast hosting', 'shared hosting', 'VPS', 'dedicated servers'
    ],
    authors: [{ name: 'HostPro' }],
    creator: 'HostPro',
    publisher: 'HostPro',
    robots: { 
      index: true, 
      follow: true, 
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } 
    },
    alternates: getAlternates(lang),
    openGraph: {
      type: 'website',
      siteName: 'HostPro',
      locale,
      alternateLocale: LANGS.filter(l => l !== lang).map(l => LANG_META[l].locale),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'HostPro - Modern Hosting Solutions',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hostpro',
      images: ['/og-image.png'],
    },
    verification: {
      google: 'your-google-verification-code', // User should replace this
      yandex: 'yandex-verification-code',
    },
  }
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
