'use client'

import { DashboardStats } from '@/types/integrations'

interface StatsCardsProps {
  stats: DashboardStats
  tradingViewConnected: boolean
  openClawConnected: boolean
}

export function StatsCards({ stats, tradingViewConnected, openClawConnected }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Signals */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            tradingViewConnected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {tradingViewConnected ? 'Live' : 'Offline'}
          </span>
        </div>
        <p className="text-3xl font-bold text-slate-900">{stats.totalSignals}</p>
        <p className="text-sm text-slate-500 mt-1">Total Signals</p>
      </div>

      {/* Executed Trades */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
            +12%
          </span>
        </div>
        <p className="text-3xl font-bold text-slate-900">{stats.executedTrades}</p>
        <p className="text-sm text-slate-500 mt-1">Executed Trades</p>
      </div>

      {/* Total Donations */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-100 text-pink-700">
            Impact
          </span>
        </div>
        <p className="text-3xl font-bold text-slate-900">${stats.totalDonations}</p>
        <p className="text-sm text-slate-500 mt-1">Total Donated</p>
      </div>

      {/* Agent Status */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            openClawConnected ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {openClawConnected ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="text-3xl font-bold text-slate-900">{stats.agentUptime}%</p>
        <p className="text-sm text-slate-500 mt-1">Agent Uptime</p>
      </div>
    </div>
  )
}
