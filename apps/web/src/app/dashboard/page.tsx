'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TradingViewConnection } from '@/components/dashboard/TradingViewConnection'
import { OpenClawConnection } from '@/components/dashboard/OpenClawConnection'
import { SignalFeed } from '@/components/dashboard/SignalFeed'
import { WorkflowTimeline } from '@/components/dashboard/WorkflowTimeline'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { Signal, DashboardStats } from '@/types/integrations'

// Mock data for demonstration
const mockSignals: Signal[] = [
  { id: '1', symbol: 'BTCUSDT', side: 'BUY', price: '67,432.50', source: 'tradingview', status: 'executed', timestamp: new Date(Date.now() - 5000), strategyId: 'Momentum' },
  { id: '2', symbol: 'ETHUSDT', side: 'SELL', price: '3,521.80', source: 'tradingview', status: 'processed', timestamp: new Date(Date.now() - 60000), strategyId: 'RSI Divergence' },
  { id: '3', symbol: 'SOLUSDT', side: 'BUY', price: '142.35', source: 'tradingview', status: 'pending', timestamp: new Date(Date.now() - 120000) },
]

const mockWorkflows = [
  { id: '1', name: 'Trade Executed', type: 'trade_execution', status: 'completed' as const, timestamp: new Date(Date.now() - 5000), details: 'BTC Long @ $67,432.50' },
  { id: '2', name: 'Donation Triggered', type: 'donation', status: 'completed' as const, timestamp: new Date(Date.now() - 10000), details: '$2.45 donated to Water.org' },
  { id: '3', name: 'Risk Check', type: 'risk_management', status: 'active' as const, timestamp: new Date(Date.now() - 15000), details: 'Monitoring drawdown limits' },
]

const mockStats: DashboardStats = {
  totalSignals: 1247,
  executedTrades: 892,
  totalDonations: '2,345.67',
  activeStrategies: 5,
  agentUptime: 99.8,
}

export default function Dashboard() {
  const [tradingViewConnected, setTradingViewConnected] = useState(false)
  const [openClawConnected, setOpenClawConnected] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState<string | undefined>()
  const [activeTab, setActiveTab] = useState<'overview' | 'connections'>('overview')

  const handleTradingViewConnect = (url: string) => {
    setWebhookUrl(url)
    setTradingViewConnected(true)
  }

  const handleOpenClawConnect = () => {
    setOpenClawConnected(true)
  }

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl rotate-3 shadow-lg group-hover:rotate-0 transition-transform">
                  D
                </div>
                <span className="font-bold text-xl tracking-tight">
                  Donate<span className="text-brand-accent">.</span>
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('connections')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'connections'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Connections
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Connection Status Indicators */}
              <div className="hidden md:flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  tradingViewConnected ? 'bg-green-100' : 'bg-slate-100'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    tradingViewConnected ? 'bg-green-500' : 'bg-slate-300'
                  }`} />
                  <span className={`text-xs font-bold ${
                    tradingViewConnected ? 'text-green-700' : 'text-slate-500'
                  }`}>
                    TradingView
                  </span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  openClawConnected ? 'bg-green-100' : 'bg-slate-100'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    openClawConnected ? 'bg-green-500' : 'bg-slate-300'
                  }`} />
                  <span className={`text-xs font-bold ${
                    openClawConnected ? 'text-green-700' : 'text-slate-500'
                  }`}>
                    OpenClaw
                  </span>
                </div>
              </div>
              
              {/* User Menu */}
              <button className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white font-bold">
                U
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-500">Monitor your trading signals, agent activity, and donation impact.</p>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Cards */}
            <div className="mb-8">
              <StatsCards 
                stats={mockStats} 
                tradingViewConnected={tradingViewConnected}
                openClawConnected={openClawConnected}
              />
            </div>

            {/* Quick Setup Banner - Show if not fully connected */}
            {(!tradingViewConnected || !openClawConnected) && (
              <div className="mb-8 glass-card rounded-3xl p-6 border-l-4 border-brand-accent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Complete Your Setup</h3>
                      <p className="text-sm text-slate-500">
                        Connect {!tradingViewConnected && 'TradingView'}{!tradingViewConnected && !openClawConnected && ' and '}{!openClawConnected && 'OpenClaw Agent'} to start automated trading
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('connections')}
                    className="btn-primary text-sm"
                  >
                    Setup Now
                  </button>
                </div>
              </div>
            )}

            {/* Main Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Signal Feed */}
              <SignalFeed signals={tradingViewConnected ? mockSignals : []} />
              
              {/* Workflow Timeline */}
              <WorkflowTimeline workflows={openClawConnected ? mockWorkflows : []} />
            </div>

            {/* Donation Impact Section */}
            <div className="mt-8 glass-card rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Donation Impact</h3>
                  <p className="text-slate-500 text-sm">Your trading activity generates real-world impact</p>
                </div>
                <Link href="#" className="text-brand-accent text-sm font-bold hover:underline">
                  View All Recipients
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💧</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Water.org</p>
                      <p className="text-xs text-slate-500">Clean Water Access</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-brand-primary">$845.32</p>
                  <p className="text-xs text-slate-400 mt-1">12 people helped</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🌳</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">One Tree Planted</p>
                      <p className="text-xs text-slate-500">Reforestation</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-brand-primary">$623.18</p>
                  <p className="text-xs text-slate-400 mt-1">623 trees planted</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Room to Read</p>
                      <p className="text-xs text-slate-500">Education</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-brand-primary">$877.17</p>
                  <p className="text-xs text-slate-400 mt-1">8 students supported</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Connections Tab */
          <div className="grid lg:grid-cols-2 gap-6">
            <TradingViewConnection 
              onConnect={handleTradingViewConnect}
              isConnected={tradingViewConnected}
              webhookUrl={webhookUrl}
            />
            <OpenClawConnection 
              onConnect={handleOpenClawConnect}
              isConnected={openClawConnected}
              connectionStatus={openClawConnected ? 'connected' : 'disconnected'}
            />
          </div>
        )}
      </main>
    </div>
  )
}
