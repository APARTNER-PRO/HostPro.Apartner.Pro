'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Hide loader when page is fully loaded
    const handleLoad = () => {
      setLoading(false)
      // Remove from DOM after animation completes
      setTimeout(() => setShouldRender(false), 800)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      // Fallback: hide after 3s anyway to not block users
      const timer = setTimeout(handleLoad, 3000)
      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(timer)
      }
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050810',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: loading ? 1 : 0,
        visibility: loading ? 'visible' : 'hidden',
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.8s',
        pointerEvents: loading ? 'all' : 'none',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Animated Logo */}
        <div 
          style={{ 
            width: 80, 
            height: 80, 
            borderRadius: 20, 
            background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: 40,
            margin: '0 auto 24px',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
            animation: 'pulse-glow 2s infinite ease-in-out'
          }}
        >
          ⚡
        </div>
        
        {/* Brand Name */}
        <div 
          style={{ 
            fontFamily: 'Syne, sans-serif', 
            fontWeight: 800, 
            fontSize: 28, 
            letterSpacing: '-1px',
            color: '#F0F4FF',
            opacity: 0,
            animation: 'fade-up 0.8s forwards 0.2s'
          }}
        >
          HostPro
        </div>
        
        {/* Progress Bar */}
        <div 
          style={{ 
            width: 120, 
            height: 2, 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: 10, 
            margin: '20px auto 0',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div 
            style={{ 
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
              width: '100%',
              transform: 'translateX(-100%)',
              animation: 'loading-bar 1.5s infinite ease-in-out'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(59, 130, 246, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(59, 130, 246, 0.6); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
