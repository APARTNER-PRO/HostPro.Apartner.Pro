'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function PaddleRecovery() {
  useEffect(() => {
    const handleRecovery = () => {
      const params = new URLSearchParams(window.location.search)
      const paction = params.get('_paction')
      const ptxn = params.get('_ptxn')

      if (paction === 'recovery' && ptxn) {
        console.log('Paddle Recovery detected:', ptxn)
        
        if ((window as any).Paddle) {
          const Paddle = (window as any).Paddle
          Paddle.Initialize({ 
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'live_5479fe94fca51b60d7791b81725' 
          })
          
          Paddle.Checkout.open({
            transactionId: ptxn
          })
          
          // Clear URL parameters to avoid re-opening on refresh
          const newUrl = window.location.pathname + window.location.hash
          window.history.replaceState({}, '', newUrl)
        } else {
          // If Paddle isn't ready yet, wait a bit and try again
          setTimeout(handleRecovery, 500)
        }
      }
    }

    handleRecovery()
  }, [])

  return (
    <Script 
      src="https://cdn.paddle.com/paddle/v2/paddle.js" 
      strategy="afterInteractive"
    />
  )
}
