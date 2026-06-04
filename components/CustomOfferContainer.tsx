'use client'

import { useState } from 'react'
import CustomOfferTable from './CustomOfferTable'
import { Lang, getT } from '@/lib/i18n'

interface CustomOfferContainerProps {
  lang: Lang;
  initialData: any;
}

export default function CustomOfferContainer({ lang, initialData }: CustomOfferContainerProps) {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const T = getT(lang);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === 'bundes-mebli') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isUnlocked) {
    return <CustomOfferTable lang={lang} initialData={initialData} />
  }

  const titleText = lang === 'uk' ? 'Введіть код доступу' : (lang === 'ru' ? 'Введите код доступа' : 'Enter Access Code');
  const subText = lang === 'uk' ? 'Відкрийте ваш індивідуальний тариф' : (lang === 'ru' ? 'Откройте ваш индивидуальный тариф' : 'Unlock your personalized plan');
  const placeholderText = lang === 'uk' ? 'Код' : (lang === 'ru' ? 'Код' : 'Code');
  const errorText = lang === 'uk' ? 'Недійсний код. Будь ласка, спробуйте ще раз.' : (lang === 'ru' ? 'Неверный код. Пожалуйста, попробуйте еще раз.' : 'Invalid code. Please try again.');
  const submitText = lang === 'uk' ? 'Відкрити пропозицію' : (lang === 'ru' ? 'Открыть предложение' : 'View Offer');

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', padding: '40px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20 }}>
      <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#fff' }}>
        {titleText}
      </h2>
      <p style={{ fontSize: 14, color: 'rgba(240,244,255,0.6)', marginBottom: 24 }}>
        {subText}
      </p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={code} 
          onChange={(e) => {
            setCode(e.target.value);
            if (error) setError(false);
          }}
          placeholder={placeholderText}
          style={{ 
            width: '100%', 
            padding: '14px 16px', 
            borderRadius: 12, 
            border: `1px solid ${error ? 'rgba(244,63,94,0.5)' : 'rgba(255,255,255,0.1)'}`, 
            background: 'rgba(255,255,255,0.05)', 
            color: '#fff', 
            marginBottom: error ? 8 : 24,
            outline: 'none',
            fontSize: 16
          }}
        />
        {error && (
          <p style={{ color: '#FB7185', marginBottom: 24, fontSize: 13, textAlign: 'left', paddingLeft: 4 }}>
            {errorText}
          </p>
        )}
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '14px 16px', 
            borderRadius: 12, 
            background: 'linear-gradient(135deg,#F43F5E,#E11D48)', 
            border: 'none', 
            color: '#fff', 
            fontWeight: 700, 
            fontSize: 16,
            cursor: 'pointer',
            transition: 'transform 0.2s, filter 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {submitText}
        </button>
      </form>
    </div>
  )
}
