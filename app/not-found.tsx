'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getT, Lang } from '@/lib/i18n'

export default function NotFound() {
  const pathname = usePathname()
  // Extract lang from path (e.g., /ru/something -> ru)
  const segments = pathname.split('/')
  const lang = (segments[1] || 'en') as Lang
  const T = getT(['uk', 'ru', 'en'].includes(lang) ? lang : 'en')

  const homePath = lang === 'en' ? '/' : `/${lang}`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .not-found-main {
          font-family: 'DM Sans', sans-serif;
          background: #050810;
          color: #F0F4FF;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 24px;
          overflow: hidden;
          position: relative;
        }
        
        .not-found-main .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.6;
        }
        
        .not-found-main .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent);
          top: -10%;
          left: 20%;
        }
        
        .not-found-main .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent);
          bottom: 10%;
          right: 10%;
        }

        .not-found-main .content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 600px;
        }

        .not-found-main .error-code {
          font-family: 'Syne', sans-serif;
          font-size: clamp(120px, 25vw, 220px);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0;
          background: linear-gradient(135deg, #60A5FA, #A78BFA, #FB923C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 10px 30px rgba(96, 165, 250, 0.3));
        }

        .not-found-main h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(24px, 5vw, 42px);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .not-found-main p {
          font-size: 18px;
          color: rgba(240, 244, 255, 0.6);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .not-found-main .btn-home {
          display: inline-block;
          background: linear-gradient(135deg, #3B82F6, #8B5CF6);
          color: white;
          padding: 16px 36px;
          border-radius: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
        }

        .not-found-main .btn-home:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.5);
        }
      ` }} />
      
      <main className="not-found-main">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        
        <div className="content-wrapper">
          <div className="error-code">404</div>
          <h1>{T.notFound?.title || 'Page Not Found'}</h1>
          <p>{T.notFound?.sub || 'The page you are looking for does not exist.'}</p>
          
          <Link href={homePath} className="btn-home">
            ← {T.notFound?.back || 'Back to Homepage'}
          </Link>
        </div>
      </main>
    </>
  )
}
