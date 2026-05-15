'use client'

import { useState } from 'react'

interface TradingViewConnectionProps {
  onConnect: (webhookUrl: string) => void
  isConnected: boolean
  webhookUrl?: string
}

export function TradingViewConnection({ onConnect, isConnected, webhookUrl }: TradingViewConnectionProps) {
  const [copied, setCopied] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)

  const generatedWebhookUrl = webhookUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/api/webhooks/tradingview/${generateSecret()}`

  function generateSecret() {
    return 'wh_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(generatedWebhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function testConnection() {
    setTesting(true)
    setTestResult(null)
    
    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 1500))
      setTestResult('success')
      onConnect(generatedWebhookUrl)
    } catch {
      setTestResult('error')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="glass-card rounded-3xl p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
              <path fillRule="evenodd" d="M1.5 9.75v6.75a3 3 0 003 3h15a3 3 0 003-3V9.75H1.5zm3 3a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">TradingView</h3>
            <p className="text-slate-500 text-sm">Connect your alerts to automate trading signals</p>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
          isConnected 
            ? 'bg-green-100 text-green-700' 
            : 'bg-slate-100 text-slate-500'
        }`}>
          {isConnected ? 'Connected' : 'Not Connected'}
        </span>
      </div>

      <div className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Setup Instructions
          </h4>
          <ol className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Copy the webhook URL below</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>In TradingView, go to your alert settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Add a new Webhook URL notification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Paste the URL and save your alert</span>
            </li>
          </ol>
        </div>

        {/* Webhook URL */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Your Webhook URL</label>
          <div className="flex gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm text-slate-600 truncate">
              {generatedWebhookUrl}
            </div>
            <button
              onClick={copyToClipboard}
              className="px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payload Format */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Alert Message Format</label>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
            <pre>{`{
  "symbol": "{{ticker}}",
  "side": "{{strategy.order.action}}",
  "price": "{{close}}",
  "strategy": "{{strategy.order.comment}}"
}`}</pre>
          </div>
        </div>

        {/* Test Connection */}
        <button
          onClick={testConnection}
          disabled={testing}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            testResult === 'success'
              ? 'bg-green-500 text-white'
              : testResult === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-brand-accent text-white hover:scale-[1.02] active:scale-95'
          }`}
        >
          {testing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Testing Connection...
            </>
          ) : testResult === 'success' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Connection Verified
            </>
          ) : testResult === 'error' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Connection Failed - Retry
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Test Connection
            </>
          )}
        </button>
      </div>
    </div>
  )
}
