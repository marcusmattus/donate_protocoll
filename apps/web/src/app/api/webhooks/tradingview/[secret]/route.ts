import { NextRequest, NextResponse } from 'next/server'

// In-memory store for demo purposes
// In production, this would be stored in a database
const connections = new Map<string, { userId: string; createdAt: Date }>()

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ secret: string }> }
) {
  try {
    const { secret } = await params
    
    // Validate the webhook secret
    if (!secret || !secret.startsWith('wh_')) {
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      )
    }

    // Parse the TradingView payload
    const payload = await request.json()
    
    // Validate required fields
    if (!payload.symbol || !payload.side) {
      return NextResponse.json(
        { error: 'Invalid payload: missing required fields (symbol, side)' },
        { status: 400 }
      )
    }

    // Normalize the payload
    const signal = {
      id: `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      symbol: payload.symbol,
      side: payload.side.toUpperCase() as 'BUY' | 'SELL',
      price: payload.price || '0',
      strategy: payload.strategy || null,
      quantity: payload.quantity || null,
      timestamp: new Date().toISOString(),
      source: 'tradingview',
      webhookSecret: secret,
    }

    // Log the signal (in production, save to database and queue for processing)
    console.log('[TradingView Webhook] Signal received:', signal)

    // In production, you would:
    // 1. Save signal to database
    // 2. Queue signal for OpenClaw processing
    // 3. Emit WebSocket event to dashboard

    return NextResponse.json({
      success: true,
      signalId: signal.id,
      message: 'Signal received and queued for processing',
    })
  } catch (error) {
    console.error('[TradingView Webhook] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ secret: string }> }
) {
  const { secret } = await params
  
  if (!secret || !secret.startsWith('wh_')) {
    return NextResponse.json(
      { error: 'Invalid webhook secret' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    status: 'ok',
    webhook: 'active',
    timestamp: new Date().toISOString(),
  })
}
