'use client'

import { useState } from 'react'
import Script from 'next/script'
import { Lang, getT } from '@/lib/i18n'

interface CustomOfferTableProps {
  lang: Lang;
  initialData: {
    yearly: any;
    twoYears: any;
    threeYears: any;
  } | any;
}

export default function CustomOfferTable({ lang, initialData }: CustomOfferTableProps) {
  const [billing, setBilling] = useState<'yearly' | 'twoYears' | 'threeYears'>('yearly')
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

  const currentProduct = initialData[billing] || initialData;
  const prices = (currentProduct?.prices || [])
    .filter((p: any) => p.unit_price.currency_code === 'USD')
    .sort((a: any, b: any) => parseInt(a.unit_price.amount) - parseInt(b.unit_price.amount))

  const getPlanDetails = (priceDesc: string) => {
    const desc = priceDesc.toLowerCase();
    if (desc.includes('personal')) return T.pricing.plans[0];
    if (desc.includes('starter')) return T.pricing.plans[1];
    if (desc.includes('business')) return T.pricing.plans[2];
    if (desc.includes('agency pro') || desc.includes('agencypro')) return T.pricing.plans[4];
    if (desc.includes('agency')) return T.pricing.plans[3];
    return T.pricing.plans[0];
  }

  const getBillingLabel = (period: 'yearly' | 'twoYears' | 'threeYears') => {
    if (period === 'yearly') return T.billing.yearTerm;
    if (period === 'twoYears') return lang === 'uk' ? '2 роки' : (lang === 'ru' ? '2 года' : '2 Years');
    if (period === 'threeYears') return T.billing.threeYearTerm;
    return '';
  }

  return (
    <>
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        onLoad={() => setPaddleLoaded(true)}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
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
          background: transparent;
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
        @media (max-width: 767px) {
          .billing-toggle {
            padding: 0 20px;
            margin-bottom: 40px;
          }
          .toggle-wrapper {
            flex-direction: column;
            width: 100%;
          }
          .toggle-btn {
            width: 100%;
            justify-content: center;
          }
        }
      ` }} />

      <div className="pricing-section">
        <div className="billing-toggle">
          <div className="toggle-wrapper">
            {(['yearly', 'twoYears', 'threeYears'] as const).map((period) => {
              const discount = period === 'yearly' ? '-10%' : period === 'twoYears' ? '-15%' : period === 'threeYears' ? '-30%' : null;

              return (
                <button
                  key={period}
                  onClick={() => setBilling(period)}
                  className={`toggle-btn ${billing === period ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  {getBillingLabel(period)}
                  {discount && (
                    <span style={{
                      fontSize: period === 'threeYears' ? 11 : 10,
                      background: period === 'threeYears' ? 'rgba(244, 63, 94, 0.15)' : (billing === period ? 'rgba(244,63,94,0.2)' : 'rgba(110,231,183,0.1)'),
                      color: period === 'threeYears' ? '#F43F5E' : (billing === period ? '#FB7185' : '#6EE7B7'),
                      padding: '2px 8px',
                      borderRadius: 6,
                      fontWeight: 800,
                      border: period === 'threeYears' ? '1px solid rgba(244, 63, 94, 0.4)' : (billing === period ? '1px solid rgba(244,63,94,0.3)' : '1px solid rgba(110,231,183,0.2)'),
                      boxShadow: period === 'threeYears' ? '0 0 12px rgba(244, 63, 94, 0.2)' : 'none'
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

            const desc = price.description?.toLowerCase() || '';
            const isAgency = desc.includes('agency');
            const isFeatured = isAgency && !desc.includes('pro');
            const color = isFeatured ? '#FB7185' : plan.color;

            // Annual calculations
            const months = billing === 'yearly' ? 12 : billing === 'twoYears' ? 24 : 36;
            const totalAmount = parseInt(price.unit_price.amount) / 100;
            const monthlyPrice = totalAmount / months;

            // Override specific features for the custom offer
            const customExtras = [...plan.extras];
            if (customExtras.length >= 5) {
              if (plan.name === 'Business') {
                customExtras[0] = lang === 'uk' ? 'До 3 сайтів' : (lang === 'ru' ? 'До 3 сайтов' : 'Up to 3 Websites');
                customExtras[1] = '10 GB NVMe SSD';
                customExtras[2] = '1 GB RAM, 2 CPU 40%';
                customExtras[3] = lang === 'uk' ? '3 Email акаунтів' : (lang === 'ru' ? '3 Email аккаунтов' : '3 Email Accounts');
                customExtras[4] = lang === 'uk' ? '3 баз даних MySQL' : (lang === 'ru' ? '3 баз данных MySQL' : '3 MySQL Databases');
              } else if (plan.name === 'Agency') {
                customExtras[0] = lang === 'uk' ? 'До 5 сайтів' : (lang === 'ru' ? 'До 5 сайтов' : 'Up to 5 Websites');
                customExtras[1] = '15 GB NVMe SSD';
                customExtras[2] = '1.5 GB RAM, 2 CPU 80%';
                customExtras[3] = lang === 'uk' ? '5 Email акаунтів' : (lang === 'ru' ? '5 Email аккаунтов' : '5 Email Accounts');
                customExtras[4] = lang === 'uk' ? '5 баз даних MySQL' : (lang === 'ru' ? '5 баз данных MySQL' : '5 MySQL Databases');
              } else if (plan.name === 'Agency Pro') {
                customExtras[0] = lang === 'uk' ? 'До 10 сайтів' : (lang === 'ru' ? 'До 10 сайтов' : 'Up to 10 Websites');
                customExtras[1] = '20 GB NVMe SSD';
                customExtras[3] = lang === 'uk' ? '10 Email акаунтів' : (lang === 'ru' ? '10 Email аккаунтов' : '10 Email Accounts');
                customExtras[4] = lang === 'uk' ? '10 баз даних MySQL' : (lang === 'ru' ? '10 баз данных MySQL' : '10 MySQL Databases');
              }

              if (plan.name === 'Business' || plan.name === 'Agency') {
                const ipString = lang === 'uk' ? 'Загальна IP-адреса' : (lang === 'ru' ? 'Общий IP-адрес' : 'Shared IP Address');
                const cpanelIndex = customExtras.findIndex((ex: string) => ex.toLowerCase().includes('cpanel'));
                if (cpanelIndex !== -1) {
                  customExtras.splice(cpanelIndex, 0, ipString);
                } else {
                  customExtras.splice(6, 0, ipString);
                }
              }
            }

            return (
              <div key={price.id} className={`hp-plan-card ${isFeatured ? 'featured' : ''}`}>
                {isFeatured && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#F43F5E,#E11D48)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                    {T.pricing.popular}
                  </div>
                )}

                <div style={{ marginBottom: 6, minHeight: 48, display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 0 12px ${color}`, flexShrink: 0 }} />
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                      {price.description}
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(240,244,255,0.45)', marginBottom: 16, fontWeight: 300, minHeight: 36, lineHeight: 1.5 }}>
                  {plan.desc}
                </p>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: 'rgba(240,244,255,.4)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ textDecoration: 'line-through' }}>${plan.price.toFixed(2)}</span>
                    <span style={{
                      background: 'rgba(110, 231, 183, 0.08)',
                      color: '#6EE7B7',
                      padding: '3px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      border: '1px solid rgba(110, 231, 183, 0.15)',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {T.billing.savings} ${Math.round((plan.price * months) - totalAmount)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="price-val">${monthlyPrice.toFixed(2)}</span>
                    <span style={{ fontSize: 14, color: 'rgba(240,244,255,0.4)', fontWeight: 400 }}>{T.pricing.mo}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(price.id)}
                  className={`hp-plan-btn ${isFeatured ? 'primary' : ''}`}
                  style={{ marginBottom: 12 }}
                >
                  {T.pricing.cta}
                </button>

                <div style={{ fontSize: 12, color: 'rgba(240,244,255,.5)', marginBottom: 24, fontWeight: 300, lineHeight: 1.6 }}>
                  <div>{T.billing.payToday} <span style={{ fontWeight: 600 }}>${totalAmount.toFixed(2)}</span> {T.billing.today}.</div>
                  <div style={{ marginTop: 2, fontSize: 11, opacity: 0.8 }}>
                    <div>{T.billing.renewsAt} <span style={{ fontWeight: 600 }}>${plan.price.toFixed(2)}{T.pricing.mo}</span>.</div>
                    <div>{T.billing.prepaidFor} {months} {T.billing.months}. {T.billing.exVat}</div>
                  </div>
                </div>

                <div className="features-list">
                  <p style={{ fontSize: 11, color: 'rgba(240,244,255,.35)', marginBottom: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                    {T.pricing.featLabel}
                  </p>
                  {customExtras.map((ex: string, j: number) => (
                    <div key={j} className="feature-item">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill={color} fillOpacity="0.15" />
                        <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'rgba(240,244,255,0.4)', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
          {lang === 'uk' ? '* Зверніть увагу: об’єм ресурсів у цих персональних тарифах зменшено порівняно з основними тарифами нашого хостингу.' :
           lang === 'ru' ? '* Обратите внимание: объем ресурсов в этих персональных тарифах уменьшен по сравнению с основными тарифами нашего хостинга.' :
           '* Please note: the volume of resources in these personalized plans is reduced compared to our main hosting plans.'}
        </div>
      </div>
    </>
  )
}
