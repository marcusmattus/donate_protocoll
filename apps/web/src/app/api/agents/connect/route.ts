import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { endpoint, apiKey } = body

    // Validate required fields
    if (!endpoint || !apiKey) {
      return NextResponse.json(
        { error: 'Missing required fields: endpoint and apiKey' },
        { status: 400 }
      )
    }

    // Validate endpoint format
    try {
      new URL(endpoint)
    } catch {
      return NextResponse.json(
        { error: 'Invalid endpoint URL format' },
        { status: 400 }
      )
    }

    // Validate API key format
    if (!apiKey.startsWith('oc_')) {
      return NextResponse.json(
        { error: 'Invalid API key format. Expected format: oc_sk_...' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Test the connection to the OpenClaw endpoint
    // 2. Verify the API key
    // 3. Store the connection details in the database

    // Simulate connection test
    console.log('[OpenClaw] Testing connection to:', endpoint)

    // Mock successful connection
    const connection = {
      id: `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      endpoint,
      status: 'connected',
      connectedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      connection,
      message: 'Successfully connected to OpenClaw agent',
    })
  } catch (error) {
    console.error('[OpenClaw Connect] Error:', error)
    return NextResponse.json(
      { error: 'Failed to connect to OpenClaw agent' },
      { status: 500 }
    )
  }
}
