import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <style>{`
        .not-found-main { font-family:'DM Sans',sans-serif;background:#050810;color:#F0F4FF;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;overflow:hidden }
        .not-found-main * { box-sizing:border-box;margin:0;padding:0 }
        .not-found-main .orb { position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none }
        @keyframes pulse { 0%,100%{opacity:.8} 50%{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <main className="not-found-main">
        <div className="orb" style={{width:500,height:500,background:'radial-gradient(circle,rgba(59,130,246,.18),transparent)',top:-100,left:'50%',transform:'translateX(-50%)'}}/>
        <div className="orb" style={{width:300,height:300,background:'radial-gradient(circle,rgba(139,92,246,.12),transparent)',bottom:0,right:0}}/>

        <Link href="/" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',color:'#F0F4FF',position:'fixed',top:24,left:24}}>
          <div style={{width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>⚡</div>
          <span style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:18,letterSpacing:'-.5px'}}>HostPro</span>
        </Link>

        <div style={{animation:'slideUp .5s ease',position:'relative',zIndex:1}}>
          <div style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(100px,20vw,180px)',fontWeight:800,lineHeight:1,background:'linear-gradient(135deg,#60A5FA,#A78BFA,#FB923C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'pulse 3s ease-in-out infinite',marginBottom:8}}>404</div>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(22px,4vw,36px)',fontWeight:800,marginBottom:12}}>Page not found</h1>
          <p style={{fontSize:16,color:'rgba(240,244,255,.5)',maxWidth:440,lineHeight:1.6,fontWeight:300,marginBottom:36}}>Looks like this page doesn&rsquo;t exist or has been moved. Let&rsquo;s get you back on track.</p>

          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:48}}>
            <Link href="/" style={{background:'linear-gradient(135deg,#3B82F6,#8B5CF6)',color:'#fff',padding:'13px 28px',borderRadius:10,fontSize:15,fontWeight:700,textDecoration:'none',transition:'all .2s'}}>← Go to Homepage</Link>
            <Link href="/#pricing" style={{background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',color:'rgba(240,244,255,.7)',padding:'13px 28px',borderRadius:10,fontSize:15,fontWeight:600,textDecoration:'none'}}>View Plans</Link>
          </div>

          <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
            {[['/#pricing','Pricing'],['contact','Contact'],['status','System Status'],['faq','FAQ']].map(([href,label])=>(
              <Link key={href} href={`/${href}`} style={{fontSize:13,color:'rgba(240,244,255,.35)',textDecoration:'none'}}>{label}</Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
