'use client'

import { useState } from 'react'
import Script from 'next/script'
import { Lang, getT } from '@/lib/i18n'

type BillingPeriod = 'monthly' | 'quarterly' | 'yearly' | 'threeYears'

interface PricingTableProps {
  lang: Lang;
  initialData: {
    monthly: any;
    quarterly: any;
    yearly: any;
    threeYears: any;
  }
}

export default function PricingTable({ lang, initialData }: PricingTableProps) {
  const [billing, setBilling] = useState<BillingPeriod>('monthly')
  const [paddleLoaded, setPaddleLoaded] = useState(false)
  const T = getT(lang)

  const handleBuy = (priceId: string) => {
    if (!priceId) return
    
    if (!(window as any).Paddle) {
      alert('Paddle is still loading...')
      return
    }

    const Paddle = (window as any).Paddle
    Paddle.Initialize({ 
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'live_5479fe94fca51b60d7791b81725' 
    })
    
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }]
    })
  }

  const formatPrice = (amount: string) => (parseInt(amount) / 100).toFixed(2)

  const currentProduct = initialData[billing]
  // Sort prices by amount to keep them in order (Personal -> Pro)
  const prices = currentProduct?.prices?.sort((a: any, b: any) => parseInt(a.unit_price.amount) - parseInt(b.unit_price.amount)) || []

  const getPlanDetails = (priceDesc: string) => {
    const desc = priceDesc.toLowerCase();
    if (desc.includes('personal')) return T.pricing.plans[0];
    if (desc.includes('starter')) return T.pricing.plans[1];
    if (desc.includes('business')) return T.pricing.plans[2];
    if (desc.includes('agency pro')) return T.pricing.plans[4];
    if (desc.includes('agency')) return T.pricing.plans[3];
    return null;
  }

  const getBillingLabel = () => {
    if (billing === 'threeYears') return T.billing.threeYearTerm;
    if (billing === 'yearly') return T.billing.yearTerm;
    if (billing === 'quarterly') return T.billing.quarterTerm;
    return T.billing.monthTerm;
  }

  return (
    <>
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js" 
        onLoad={() => setPaddleLoaded(true)}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .pricing-section {
          max-width: 1400px;
          margin: 0 auto;
        }
        .billing-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 60px;
        }
        .toggle-wrapper {
          display: flex;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
          padding: 4px;
          gap: 4px;
        }
        .toggle-btn {
          border-radius: 9px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 24px;
          transition: all .2s;
          border: 1px solid transparent;
          color: rgba(240,244,255,.5);
        }
        .toggle-btn.active {
          background: rgba(244,63,94,.2);
          color: #FB7185;
          border-color: rgba(244,63,94,.3);
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 0 20px;
        }
        .hp-plan-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px;
          padding: 32px 24px;
          position: relative;
          transition: transform .3s, border-color .3s;
          display: flex;
          flex-direction: column;
        }
        .hp-plan-card:hover {
          transform: translateY(-8px);
          border-color: rgba(244,63,94,.3);
          background: rgba(255,255,255,.05);
        }
        .hp-plan-card.featured {
          background: linear-gradient(160deg,rgba(244,63,94,.1),rgba(225,29,72,.08));
          border-color: rgba(244,63,94,.35);
          box-shadow: 0 0 60px rgba(244,63,94,.12);
        }
        .price-val {
          font-family: 'Syne', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: #fff;
        }
        .featured .price-val {
          color: #FB7185;
        }
        .hp-plan-btn {
          width: 100%;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          border: none;
          padding: 14px;
          font-size: 15px;
          margin-top: auto;
          background: rgba(255,255,255,0.07);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 24px;
        }
        .hp-plan-btn.primary {
          background: linear-gradient(135deg,#F43F5E,#E11D48);
          border: none;
        }
        .hp-plan-btn:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
        .features-list {
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 13px;
          color: rgba(240,244,255,.7);
        }
        .plan-badge {
          position: absolute;
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg,#F43F5E,#E11D48)',
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: 100,
          whiteSpace: 'nowrap'
        }
      ` }} />

      <div className="pricing-section">
        <div className="billing-toggle">
          <div className="toggle-wrapper">
            {(['monthly', 'quarterly', 'yearly', 'threeYears'] as const).map((period) => {
              const discount = period === 'quarterly' ? T.billing.save10 : period === 'yearly' ? T.billing.save20 : period === 'threeYears' ? T.billing.save30 : null;
              
              return (
                <button
                  key={period}
                  onClick={() => setBilling(period)}
                  className={`toggle-btn ${billing === period ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  {T.billing[period]}
                  {discount && (
                    <span style={{ 
                      fontSize: 10, 
                      background: billing === period ? 'rgba(244,63,94,0.2)' : 'rgba(110,231,183,0.1)', 
                      color: billing === period ? '#FB7185' : '#6EE7B7', 
                      padding: '2px 6px', 
                      borderRadius: 6,
                      fontWeight: 700,
                      border: billing === period ? '1px solid rgba(244,63,94,0.3)' : '1px solid rgba(110,231,183,0.2)'
                    }}>
                      {discount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="plans-grid">
          {prices.map((price: any, i: number) => {
            const plan = getPlanDetails(price.description);
            if (!plan) return null;

            const isAgency = price.description?.toLowerCase().includes('agency');
            const isFeatured = isAgency && !price.description?.toLowerCase().includes('pro');
            const color = isFeatured ? '#FB7185' : plan.color;

            // Calculate totals
            const months = billing === 'monthly' ? 1 : billing === 'quarterly' ? 3 : billing === 'yearly' ? 12 : 36;
            const totalAmount = (parseInt(price.unit_price.amount) * months) / 100;
            const renewalAmount = (totalAmount * 1.25).toFixed(2); // Example renewal logic if needed, or just use total

            return (
              <div key={price.id} className={`hp-plan-card ${isFeatured ? 'featured' : ''}`}>
                {isFeatured && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#F43F5E,#E11D48)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                    {T.pricing.popular}
                  </div>
                )}
                
                <div style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 0 12px ${color}` }} />
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800 }}>
                      {plan.name}
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(240,244,255,0.45)', marginBottom: 16, fontWeight: 300 }}>
                  {plan.desc}
                </p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="price-val">${formatPrice(price.unit_price.amount)}</span>
                    <span style={{ fontSize: 14, color: 'rgba(240,244,255,.4)', fontWeight: 300 }}>
                      {T.pricing.mo}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(240,244,255,.5)', marginTop: 8, fontWeight: 300, lineHeight: 1.5 }}>
                    {T.billing.for} {getBillingLabel()}. {T.billing.payToday} <span style={{fontWeight:600}}>${totalAmount.toFixed(2)}</span> {T.billing.today}
                    {billing !== 'monthly' && <div style={{opacity: 0.7}}>then ${renewalAmount} {T.billing.onRenewal}</div>}
                  </div>
                </div>

                <button 
                  onClick={() => handleBuy(price.id)}
                  className={`hp-plan-btn ${isFeatured ? 'primary' : ''}`}
                >
                  {T.pricing.cta}
                </button>

                <div className="features-list">
                  <p style={{ fontSize: 11, color: 'rgba(240,244,255,.35)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                    {T.pricing.featLabel}
                  </p>
                  {plan.extras.map((ex: string, j: number) => (
                    <div key={j} className="feature-item">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill={color} fillOpacity="0.15"/>
                        <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* CUSTOM CARD */}
          <div className="hp-plan-card" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', textAlign: 'center', minHeight: 400 }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>💬</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
              {T.pricing.customTitle}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(240,244,255,0.4)', fontWeight: 300, marginBottom: 32, lineHeight: 1.6 }}>
              {T.pricing.customSub}
            </p>
            <a 
              href={lang === 'en' ? '/contact' : `/${lang}/contact`}
              className="hp-plan-btn"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginBottom: 0 }}
            >
              {T.pricing.customBtn}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
