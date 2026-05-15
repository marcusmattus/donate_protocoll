// TradingView Integration Types
export interface TradingViewConnection {
  id: string
  userId: string
  webhookSecret: string
  webhookUrl: string
  preferredStrategyId?: string
  status: 'connected' | 'disconnected' | 'pending'
  createdAt: Date
  lastSignalAt?: Date
}

export interface TradingViewPayload {
  symbol: string
  side: 'BUY' | 'SELL'
  price: string
  strategy?: string
  quantity?: string
  timestamp?: string
}

// OpenClaw Agent Integration Types
export interface OpenClawConnection {
  id: string
  userId: string
  endpoint: string
  apiKey: string
  status: 'connected' | 'disconnected' | 'error'
  lastHealthCheck?: Date
  createdAt: Date
}

export interface OpenClawWorkflow {
  id: string
  name: string
  type: 'trade_execution' | 'risk_management' | 'donation'
  status: 'active' | 'paused' | 'completed'
  lastExecutedAt?: Date
}

// Signal Types
export interface Signal {
  id: string
  symbol: string
  side: 'BUY' | 'SELL'
  price: string
  strategyId?: string
  source: 'tradingview' | 'manual' | 'api'
  status: 'pending' | 'processed' | 'executed' | 'failed'
  timestamp: Date
  executionId?: string
}

export interface SignalExecution {
  id: string
  signalId: string
  agentId: string
  status: 'pending' | 'executing' | 'completed' | 'failed'
  result?: {
    orderId?: string
    executedPrice?: string
    donationAmount?: string
  }
  createdAt: Date
  completedAt?: Date
}

// Onboarding State
export interface OnboardingState {
  userId: string
  walletConnected: boolean
  exchangeConnected: boolean
  tradingViewConnected: boolean
  openClawConnected: boolean
  completed: boolean
  currentStep: number
}

// Dashboard Stats
export interface DashboardStats {
  totalSignals: number
  executedTrades: number
  totalDonations: string
  activeStrategies: number
  agentUptime: number
}
