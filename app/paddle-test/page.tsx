'use client'

import { useState } from 'react'

export default function PaddleTestPage() {
  const [apiKey, setApiKey] = useState('')
  const [clientToken, setClientToken] = useState('')
  const [productId, setProductId] = useState('pro_01kpxjt0dtczpta4vxtdbp73zf')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async () => {
    if (!apiKey) {
      setError('Please enter your Paddle API Key (Secret Key)')
      return
    }
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/paddle/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, productId })
      })
      
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch product')
      }
      setResult(data.data)
    } catch (err: any) {
      setError(err.message)
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const handleBuy = (priceId: string) => {
    if (!clientToken) {
      alert('Please enter your Paddle Client Token first')
      return
    }

    if (!(window as any).Paddle) {
      alert('Paddle.js not loaded yet')
      return
    }

    const Paddle = (window as any).Paddle
    Paddle.Initialize({ token: clientToken })
    
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }]
    })
  }

  return (
    <div className="grid-bg" style={{ minHeight: '100vh', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <script src="https://cdn.paddle.com/paddle/v2/paddle.js" async />
      {/* Decorative Orbs */}
      <div className="orb animate-pulse-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1), transparent)', top: '-10%', left: '10%' }} />
      <div className="orb animate-pulse-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(244, 114, 182, 0.08), transparent)', bottom: '5%', right: '5%' }} />

      <div className="page-container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="animate-float" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 100, padding: '6px 16px', fontSize: 12, color: '#60A5FA', marginBottom: 20, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Paddle Integration Test
          </div>
          <h1 className="page-title">
            Paddle <span className="grad-text">Product Fetcher</span>
          </h1>
          <p className="page-sub">
            Test your Paddle Billing API integration by fetching product details directly.
          </p>
        </div>

        <div className="card" style={{ maxWidth: 600, margin: '0 auto 40px', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              API Secret Key
            </label>
            <input 
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="pdl_sig_..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>
              Used for server-side product fetching (Secret Key).
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Client Token
            </label>
            <input 
              type="text"
              value={clientToken}
              onChange={(e) => setClientToken(e.target.value)}
              placeholder="plt_..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
            <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>
              Required for the "Buy" button (Client-side Token).
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Product ID
            </label>
            <input 
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="pro_..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <button 
            onClick={handleFetch}
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Fetching...' : 'Fetch Product Details'}
          </button>

          {error && (
            <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 8, color: '#FB7185', fontSize: 14 }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {result && (
          <div className="card animate-fade-up" style={{ maxWidth: 800, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(110, 231, 183, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6EE7B7', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
                  Product Found
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{result.name}</h2>
              </div>
              <div style={{ background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                {result.status}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
              <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>ID</div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'monospace', color: 'var(--accent)' }}>{result.id}</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>Tax Category</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{result.tax_category}</div>
              </div>
              <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>Created At</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{new Date(result.created_at).toLocaleDateString()}</div>
              </div>
            </div>

            {result.prices && result.prices.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Available Prices
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                  {result.prices.map((price: any) => (
                    <div key={price.id} style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{price.description || 'Price'}</span>
                        <span style={{ fontSize: 11, background: 'rgba(96,165,250,0.1)', color: 'var(--accent)', padding: '2px 8px', borderRadius: 100 }}>{price.billing_cycle?.interval || 'One-time'}</span>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>
                        {price.unit_price.amount / 100} <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-dim)' }}>{price.unit_price.currency_code}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4, fontFamily: 'monospace', marginBottom: 16 }}>
                        {price.id}
                      </div>
                      <button 
                        onClick={() => handleBuy(price.id)}
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px', fontSize: 13 }}
                      >
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Raw JSON Data
              </div>
              <pre style={{ background: '#0a0f1d', padding: 20, borderRadius: 12, overflowX: 'auto', fontSize: 12, border: '1px solid var(--border)', color: '#a5b4fc', lineHeight: 1.5 }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  )
}
