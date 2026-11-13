import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import Preloader from '@/components/Preloader'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#050810" />
        <style>{`
          :root {
            --font-syne: 'Syne', system-ui, sans-serif;
            --font-dm-sans: 'DM Sans', system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body>
        <Preloader />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
