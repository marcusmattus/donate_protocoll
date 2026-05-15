'use client'

import { Signal } from '@/types/integrations'

interface SignalFeedProps {
  signals: Signal[]
}

export function SignalFeed({ signals }: SignalFeedProps) {
  const getStatusColor = (status: Signal['status']) => {
    switch (status) {
      case 'executed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'processed': return 'bg-blue-100 text-blue-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  const getSideColor = (side: Signal['side']) => {
    return side === 'BUY' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Signal Feed</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-slate-500">Live</span>
        </div>
      </div>

      {signals.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">No signals yet</p>
          <p className="text-slate-400 text-sm mt-1">Connect TradingView to start receiving signals</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {signals.map((signal) => (
            <div key={signal.id} className="bg-slate-50 rounded-2xl p-4 hover:bg-slate-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{signal.symbol}</span>
                  <span className={`font-bold text-sm ${getSideColor(signal.side)}`}>
                    {signal.side}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(signal.status)}`}>
                  {signal.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">@ ${signal.price}</span>
                <span className="text-slate-400 text-xs">
                  {new Date(signal.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {signal.strategyId && (
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-400">Strategy: {signal.strategyId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
