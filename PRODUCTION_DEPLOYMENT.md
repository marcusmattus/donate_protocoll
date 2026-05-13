# Production Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the Donate Protocol platform to production, including API integration with cryptocurrency exchanges and dashboard setup.

## Prerequisites

- Node.js ≥ 20.0.0
- pnpm ≥ 8.0.0
- Docker & Docker Compose (optional, for containerized deployment)
- PostgreSQL database
- Redis (for caching and session management)
- Environment variables configured

## Environment Setup

### 1. Create Production Environment File

```bash
cp .env.example .env.production
```

### 2. Configure Environment Variables

```bash
# API Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
JWT_SECRET=<generate-secure-random-string>
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com

# Database
DATABASE_URL=postgresql://user:password@db.example.com:5432/donate_protocol

# Redis
REDIS_URL=redis://cache.example.com:6379

# Exchange APIs (see Exchange Integration section)
EXCHANGE_API_KEY_BINANCE=<your-binance-key>
EXCHANGE_SECRET_BINANCE=<your-binance-secret>
EXCHANGE_API_KEY_COINBASE=<your-coinbase-key>
EXCHANGE_SECRET_COINBASE=<your-coinbase-secret>

# Telegram Bot (for MiniApp)
TELEGRAM_BOT_TOKEN=<your-bot-token>
TELEGRAM_WEBHOOK_URL=https://api.yourdomain.com/telegram/webhook

# Auth
AUTH_SECRET=<generate-secure-random-string>
NEXTAUTH_URL=https://app.yourdomain.com

# Monitoring
SENTRY_DSN=<your-sentry-dsn>
LOG_LEVEL=info
```

## Build Process

### 1. Install Dependencies

```bash
pnpm install --frozen-lockfile
```

### 2. Build All Packages

```bash
pnpm run build
```

### 3. Database Migration

```bash
pnpm run db:push
```

## Deployment Options

### Option A: Docker Deployment (Recommended)

#### 1. Build Docker Images

```bash
docker-compose -f docker-compose.yml build
```

#### 2. Start Services

```bash
docker-compose -f docker-compose.yml up -d
```

#### 3. Verify Services

```bash
docker-compose ps
docker-compose logs api
docker-compose logs web
```

### Option B: Manual Deployment

#### 1. Start API Server

```bash
# Build API
pnpm --filter @donate/api run build

# Start API
NODE_ENV=production node apps/api/dist/index.js
```

#### 2. Start Web Application

```bash
# Build Web
pnpm --filter @donate/web run build

# Start Web
pnpm --filter @donate/web start
```

#### 3. Use Process Manager

```bash
# Install PM2
npm install -g pm2

# Start services
pm2 start apps/api/dist/index.js --name api
pm2 start apps/web/.next --name web --exec "node"

# Monitor
pm2 monit
```

## API Integration with Exchanges

### Supported Exchanges

- **Binance** - Spot and Futures trading
- **Coinbase** - Spot trading
- **Kraken** - Spot and Margin trading
- **Bybit** - Futures trading

### Integration Steps

#### 1. Binance Integration

```typescript
// Configure in apps/api/src/integrations/exchanges/binance.ts

import { BinanceClient } from '@donate/exchange-clients';

export const binanceClient = new BinanceClient({
  apiKey: process.env.EXCHANGE_API_KEY_BINANCE,
  apiSecret: process.env.EXCHANGE_SECRET_BINANCE,
  testnet: process.env.NODE_ENV === 'development',
});

// API Routes
POST /api/exchanges/binance/connect - Connect user account
GET  /api/exchanges/binance/balance - Get user balance
POST /api/exchanges/binance/trade - Execute trade
```

#### 2. Coinbase Integration

```typescript
// Configure in apps/api/src/integrations/exchanges/coinbase.ts

import { CoinbaseClient } from '@donate/exchange-clients';

export const coinbaseClient = new CoinbaseClient({
  apiKey: process.env.EXCHANGE_API_KEY_COINBASE,
  apiSecret: process.env.EXCHANGE_SECRET_COINBASE,
  apiPassphrase: process.env.EXCHANGE_PASSPHRASE_COINBASE,
});

// API Routes
POST /api/exchanges/coinbase/connect
GET  /api/exchanges/coinbase/balance
POST /api/exchanges/coinbase/trade
```

### API Connection Flow

```
User Dashboard
    ↓
Request → API Gateway (/api/exchanges/{exchange}/...)
    ↓
Authentication Middleware
    ↓
Exchange Client (Binance/Coinbase/Kraken/Bybit)
    ↓
Exchange API
    ↓
Response → User Dashboard
```

### Example: Execute Trade with Donation

```bash
curl -X POST http://localhost:3000/api/trades/execute \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "exchange": "binance",
    "pair": "BTC/USDT",
    "amount": 0.01,
    "price": 50000,
    "donationPercentage": 0.5,
    "donationAddress": "0x..."
  }'
```

## Dashboard Setup

### 1. Configure Dashboard

```typescript
// apps/web/src/config/exchanges.ts

export const EXCHANGES = {
  binance: {
    name: 'Binance',
    icon: '🔴',
    connected: false,
    balance: 0,
  },
  coinbase: {
    name: 'Coinbase',
    icon: '🔵',
    connected: false,
    balance: 0,
  },
  // ... more exchanges
};
```

### 2. Dashboard Components

#### Exchange Connection Widget
```tsx
// apps/web/src/components/ExchangeConnector.tsx

export function ExchangeConnector({ exchange }: { exchange: string }) {
  const [connecting, setConnecting] = useState(false);
  
  const handleConnect = async () => {
    setConnecting(true);
    try {
      const response = await fetch(`/api/exchanges/${exchange}/connect`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Handle connection
    } finally {
      setConnecting(false);
    }
  };

  return (
    <button onClick={handleConnect} disabled={connecting}>
      {connecting ? 'Connecting...' : 'Connect'}
    </button>
  );
}
```

#### Trading Panel
```tsx
// apps/web/src/components/TradingPanel.tsx

export function TradingPanel() {
  return (
    <div className="trading-panel">
      <ExchangeConnector exchange="binance" />
      <BalanceDisplay />
      <TradingForm />
      <DonationSettings />
      <RecentTrades />
    </div>
  );
}
```

### 3. Real-time Updates

```typescript
// WebSocket connection for live trading updates
// apps/web/src/hooks/useTradeUpdates.ts

import { useEffect, useState } from 'react';

export function useTradeUpdates() {
  const [trades, setTrades] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket(`wss://api.yourdomain.com/ws/trades`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTrades(prev => [data, ...prev].slice(0, 50));
    };
    
    return () => ws.close();
  }, []);
  
  return trades;
}
```

## Monitoring & Logging

### 1. Enable Monitoring

```bash
# Install monitoring tools
pnpm add @sentry/node @sentry/tracing pino-pretty
```

### 2. Configure Logging

```typescript
// apps/api/src/lib/logger.ts

import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
});
```

### 3. Set Up Alerts

```bash
# Configure Sentry for error tracking
# Configure New Relic or DataDog for APM
# Set up log aggregation (ELK stack, Cloudwatch, etc.)
```

## Security Checklist

- [ ] Environment variables are not committed to git
- [ ] JWT_SECRET is a strong random string (min 32 characters)
- [ ] Database credentials are secure
- [ ] HTTPS/TLS enabled for all endpoints
- [ ] CORS configured for specific origins
- [ ] Rate limiting enabled
- [ ] SQL injection prevention with parameterized queries
- [ ] CSRF protection enabled
- [ ] Helmet headers configured
- [ ] Regular security audits performed
- [ ] Dependencies kept up to date
- [ ] Secrets stored in secure vault (not .env files in production)

## Performance Optimization

### 1. Database Indexing

```sql
-- Create indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_created_at ON trades(created_at DESC);
```

### 2. Caching Strategy

```typescript
// Cache exchange rates
const CACHE_TTL = 5 * 60; // 5 minutes

redis.setex(
  `rate:${pair}`,
  CACHE_TTL,
  JSON.stringify(rateData)
);
```

### 3. Database Connection Pooling

```typescript
// Configure connection pool in .env
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20
```

## Backup & Disaster Recovery

### 1. Database Backups

```bash
# Daily automated backups
0 2 * * * pg_dump $DATABASE_URL | gzip > backup_$(date +\%Y\%m\%d).sql.gz
```

### 2. Test Restore Procedure

```bash
# Test restore from backup
gunzip -c backup_20240101.sql.gz | psql $DATABASE_URL
```

## Maintenance

### 1. Regular Tasks

```bash
# Daily: Monitor logs
# Weekly: Review performance metrics
# Monthly: Security updates
# Quarterly: Full backup restore test
```

### 2. Update Dependencies

```bash
# Check for updates
pnpm outdated

# Update safely
pnpm update
pnpm run test
```

## Troubleshooting

### API won't start

```bash
# Check logs
docker-compose logs api

# Verify environment variables
env | grep -E "^(DATABASE|JWT|EXCHANGE)"

# Test database connection
psql $DATABASE_URL -c "SELECT 1"
```

### Exchange connection fails

```bash
# Verify credentials
curl https://api.binance.com/api/v3/ping

# Check API limits
# Review exchange API documentation for rate limits
```

### Dashboard not updating

```bash
# Check WebSocket connection
# Verify browser console for errors
# Ensure CORS headers are correct
```

## Support

For issues or questions:
1. Check logs in `docker-compose logs`
2. Review [API Documentation](./docs/API.md)
3. Check [Troubleshooting Guide](./docs/TROUBLESHOOTING.md)
4. Open an issue on GitHub

---

**Last Updated**: 2024
**Version**: 1.0.0
