'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = (totalScroll / windowHeight) * 100;
      setScroll(scrollValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '3px',
      background: 'rgba(255, 255, 255, 0.05)',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{
        height: '100%',
        width: `${scroll}%`,
        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #FB923C)',
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
      }} />
    </div>
  );
}
