import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { signalId, strategyId, signal, metadata } = body

    // Validate required fields
    if (!signal || !signal.symbol || !signal.side) {
      return NextResponse.json(
        { error: 'Invalid signal: missing required fields' },
        { status: 400 }
      )
    }

    // In production, this would:
    // 1. Authenticate the request
    // 2. Validate the signal against risk rules
    // 3. Forward to the OpenClaw agent for processing
    // 4. Return the execution status

    console.log('[OpenClaw Signal] Processing signal:', {
      signalId,
      strategyId,
      signal,
      metadata,
    })

    // Simulate signal processing
    const execution = {
      id: `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      signalId: signalId || `sig_${Date.now()}`,
      status: 'queued',
      queuedAt: new Date().toISOString(),
      estimatedExecutionTime: '< 1s',
    }

    return NextResponse.json({
      success: true,
      execution,
      message: 'Signal queued for agent processing',
    })
  } catch (error) {
    console.error('[OpenClaw Signal] Error:', error)
    return NextResponse.json(
      { error: 'Failed to process signal' },
      { status: 500 }
    )
  }
}

// Get recent signals
export async function GET() {
  // In production, fetch from database
  const signals = [
    {
      id: 'sig_1',
      symbol: 'BTCUSDT',
      side: 'BUY',
      price: '67432.50',
      status: 'executed',
      timestamp: new Date(Date.now() - 5000).toISOString(),
    },
    {
      id: 'sig_2',
      symbol: 'ETHUSDT',
      side: 'SELL',
      price: '3521.80',
      status: 'processed',
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
  ]

  return NextResponse.json({ signals })
}
