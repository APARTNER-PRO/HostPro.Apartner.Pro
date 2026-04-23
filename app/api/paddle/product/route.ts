import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { apiKey, productId } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: { message: 'API Key is required' } }, { status: 400 });
    }

    const id = productId || 'pro_01kpxjt0dtczpta4vxtdbp73zf';
    
    // Paddle Billing API (v3)
    // We fetch the product details and include prices
    const response = await fetch(`https://api.paddle.com/products/${id}?include=prices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}
