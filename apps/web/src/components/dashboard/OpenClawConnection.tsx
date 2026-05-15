'use client'

import { useState } from 'react'

interface OpenClawConnectionProps {
  onConnect: (endpoint: string, apiKey: string) => void
  isConnected: boolean
  connectionStatus?: 'connected' | 'disconnected' | 'error'
}

export function OpenClawConnection({ onConnect, isConnected, connectionStatus }: OpenClawConnectionProps) {
  const [endpoint, setEndpoint] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)

  async function testConnection() {
    if (!endpoint || !apiKey) return
    
    setTesting(true)
    setTestResult(null)
    
    try {
      // Simulate connection test to OpenClaw agent
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTestResult('success')
      onConnect(endpoint, apiKey)
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
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">OpenClaw Agent</h3>
            <p className="text-slate-500 text-sm">Connect your AI trading agent for automated execution</p>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
          connectionStatus === 'connected' 
            ? 'bg-green-100 text-green-700' 
            : connectionStatus === 'error'
            ? 'bg-red-100 text-red-700'
            : 'bg-slate-100 text-slate-500'
        }`}>
          {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'error' ? 'Error' : 'Not Connected'}
        </span>
      </div>

      <div className="space-y-6">
        {/* Info Box */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
          <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            What is OpenClaw?
          </h4>
          <p className="text-sm text-purple-800">
            OpenClaw is an AI agent framework that executes trading workflows based on your signals. 
            It handles risk management, trade execution, and donation routing automatically.
          </p>
        </div>

        {/* Agent Endpoint */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Agent Endpoint URL</label>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://your-agent.openclaw.ai/v1"
            className="input-field"
          />
          <p className="text-xs text-slate-400 mt-2">The HTTP endpoint where your OpenClaw agent is running</p>
        </div>

        {/* API Key */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">API Key</label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="oc_sk_..."
              className="input-field pr-12"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showApiKey ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Your OpenClaw API key for authentication</p>
        </div>

        {/* Supported Workflows */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Supported Workflows</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Trade Execution</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Risk Management</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-700">Auto Donation</span>
            </div>
          </div>
        </div>

        {/* Test Connection */}
        <button
          onClick={testConnection}
          disabled={testing || !endpoint || !apiKey}
          className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            !endpoint || !apiKey
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : testResult === 'success'
              ? 'bg-green-500 text-white'
              : testResult === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-[1.02] active:scale-95'
          }`}
        >
          {testing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Connecting to Agent...
            </>
          ) : testResult === 'success' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Agent Connected
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
              Connect Agent
            </>
          )}
        </button>
      </div>
    </div>
  )
}
