import PricingTable from '@/components/PricingTable'
import PageWrapper from '@/components/PageWrapper'
import { Metadata } from 'next'
import { getT } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Pricing — HostPro',
  description: 'Choose the best plan for your needs. Professional hosting with 24/7 support.',
}

async function getPaddleProduct(id: string) {
  const res = await fetch(`https://api.paddle.com/products/${id}?include=prices`, {
    headers: {
      'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  if (!res.ok) {
    console.error(`Failed to fetch Paddle product ${id}:`, await res.text());
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

export default async function PricingPage() {
  const T = getT('en');
  const [monthly, quarterly, yearly, threeYears] = await Promise.all([
    getPaddleProduct('pro_01kpxjt0dtczpta4vxtdbp73zf'),
    getPaddleProduct('pro_01kpxksj5m2wsdr9tqj914m1ak'),
    getPaddleProduct('pro_01kpxjmzrcerj9a7caj6qkzgtv'),
    getPaddleProduct('pro_01kpy2h3epqjbc4fq2tyhz6esg'),
  ]);

  const plansData = {
    monthly,
    quarterly,
    yearly,
    threeYears
  };

  return (
    <PageWrapper lang="en" slug="pricing">
      <main className="grid-bg" style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 100 }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: 20 }}>
              {T.pricing.title.split(' ')[0]} <span className="grad-text">{T.pricing.title.split(' ')[1]}</span>
            </h1>
            <p style={{ fontSize: 19, color: 'rgba(240, 244, 255, 0.6)', maxWidth: 600, margin: '0 auto', fontWeight: 300 }}>
              {T.pricing.sub}
            </p>
          </div>

          <PricingTable lang="en" initialData={plansData} />
        </div>
      </main>
    </PageWrapper>
  )
}
