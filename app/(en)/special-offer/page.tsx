import CustomOfferContainer from '@/components/CustomOfferContainer'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'
import { getT } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Special Offer — HostPro',
  description: 'Special customized offer for professional hosting with 24/7 support.',
}

async function getPaddleProduct(id: string) {
  const res = await fetch(`https://api.paddle.com/products/${id}?include=prices`, {
    headers: {
      'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function CustomOfferPage() {
  const T = getT('en');
  const [yearly, twoYears, threeYears] = await Promise.all([
    getPaddleProduct('pro_01kta938ztsvqhftbczthxny6y'),
    getPaddleProduct('pro_01ktad8z7am1kxkgexpwwk1rdz'),
    getPaddleProduct('pro_01ktae6g2328pws0tmyd2e2b3w')
  ]);
  const plansData = { yearly, twoYears, threeYears };

  const subText = 'Personal exclusive offer';

  return (
    <PageWrapper lang="en" slug="special-offer">
      <main className="grid-bg" style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 100 }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 20 }}>
              Special <span className="grad-text">Offer</span>
            </h1>
            <p style={{ fontSize: 19, color: 'rgba(240, 244, 255, 0.6)', maxWidth: 600, margin: '0 auto', fontWeight: 300 }}>
              {subText}
            </p>
          </div>
          <CustomOfferContainer lang="en" initialData={plansData} />
        </div>
      </main>
    </PageWrapper>
  )
}
