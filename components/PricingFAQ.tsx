'use client'
import { useState } from 'react'
import { Lang, getT } from '@/lib/i18n'
import FadeIn from './FadeIn'

export default function PricingFAQ({ lang }: { lang: Lang }) {
  const T = getT(lang)
  const faqItems = T.pricing.faq
  const [open, setOpen] = useState<number | null>(null)

  if (!faqItems) return null

  return (
    <div style={{ maxWidth: 800, margin: '60px auto 0' }}>
      <FadeIn>
        {faqItems.map((item, i) => (
          <div 
            key={i} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.01)',
              border: `1px solid ${open === i ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255, 255, 255, 0.04)'}`,
              borderRadius: 16,
              marginBottom: 12,
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: open === i ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none'
            }}
          >
            <button 
              onClick={() => setOpen(open === i ? null : i)} 
              style={{ 
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 16,
                gap: 16,
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: open === i ? '#60A5FA' : '#F0F4FF',
                transition: 'color 0.3s ease'
              }}
            >
              <span style={{ fontFamily: 'Syne, sans-serif' }}>{item.q}</span>
              <div 
                style={{ 
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: open === i ? 'rgba(96, 165, 250, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  color: open === i ? '#60A5FA' : 'rgba(240, 244, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  transform: open === i ? 'rotate(180deg)' : 'none'
                }}
              >
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            <div 
              style={{ 
                maxHeight: open === i ? 500 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div 
                style={{ 
                  padding: '0 24px 24px',
                  fontSize: 15,
                  color: 'rgba(240, 244, 255, 0.55)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                  paddingTop: 16
                }}
              >
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </FadeIn>
    </div>
  )
}
