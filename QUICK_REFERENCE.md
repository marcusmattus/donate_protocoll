# 🚀 Quick Reference Card

## Getting Started (5 min)

```bash
# 1. Setup
cd /Users/marcusmattus/donate_protocoll
node scripts/cli-agent.mjs

# 2. Select: 1 (Initialize Project)
# 3. Select: 4 (Start Dev Server)
# 4. Open browser: http://localhost:3000
```

## Common Commands

### Development
```bash
pnpm dev              # Start all services
pnpm api:dev          # API only
pnpm web:dev          # Web only
pnpm db:studio        # Database UI
pnpm lint             # Run linter
pnpm test             # Run tests
```

### Building
```bash
pnpm build            # Build everything
pnpm --filter @donate/api build
pnpm --filter @donate/web build
```

### Database
```bash
pnpm db:generate      # Generate types
pnpm db:push          # Push schema
pnpm db:migrate       # Run migrations
```

### CLI Agent
```bash
node scripts/cli-agent.mjs

Menu Options:
1. Initialize Project
2. Setup Exchange Integration
3. Setup Telegram MiniApp
4. Start Dev Server
5. Build for Production
6. Deploy to Production
7. View Status
8. Exit
```

## Services & Ports

| Service | URL | Status |
|---------|-----|--------|
| Web Dashboard | http://localhost:3000 | ✅ Running |
| API Server | http://localhost:3001 | ✅ Running |
| Database | postgresql://localhost:5432 | ✅ Configured |
| Health Check | http://localhost:3001/health | ✅ OK |

## Environment Variables

### Required
```bash
NODE_ENV=development
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/donate
```

### Exchanges (Optional)
```bash
EXCHANGE_API_KEY_BINANCE=xxx
EXCHANGE_SECRET_BINANCE=xxx
EXCHANGE_API_KEY_COINBASE=xxx
EXCHANGE_SECRET_COINBASE=xxx
```

### Telegram (Optional)
```bash
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_WEBHOOK_URL=https://api.yourdomain.com/webhook
```

## File Structure

```
.
├── apps/
│   ├── api/              # Backend API
│   ├── web/              # Frontend dashboard
│   ├── admin/            # Admin panel
│   └── mcp-server/       # MCP integration
├── packages/
│   ├── database/         # Database schema
│   ├── auth/             # Auth library
│   └── utils/            # Shared utils
├── scripts/
│   └── cli-agent.mjs     # 🌟 CLI tool
├── docs/
│   └── API.md            # API documentation
├── CLI_QUICK_START.md    # 🌟 CLI guide
├── PRODUCTION_DEPLOYMENT.md  # 🌟 Deployment
├── TELEGRAM_MINIAPP_SETUP.md # 🌟 Telegram setup
└── PRODUCTION_READY.md   # 🌟 Summary
```

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `lsof -i :3000` then `kill -9 <PID>` |
| Dependencies fail | `pnpm install --frozen-lockfile` |
| API won't start | `pnpm --filter @donate/api add pino-pretty` |
| Web won't compile | `pnpm --filter @donate/web add -D autoprefixer postcss` |
| DB connection fails | `psql $DATABASE_URL -c "SELECT 1"` |

## Exchange Integration

### Binance
```bash
# Setup via CLI (select option 2)
# or manually:
EXCHANGE_API_KEY_BINANCE=your-key
EXCHANGE_SECRET_BINANCE=your-secret

# Test endpoint
curl https://api.binance.com/api/v3/ping
```

### Coinbase
```bash
EXCHANGE_API_KEY_COINBASE=your-key
EXCHANGE_SECRET_COINBASE=your-secret

# Test endpoint
curl https://api.coinbase.com/api/v3/time
```

### Kraken & Bybit
Similar setup - see `PRODUCTION_DEPLOYMENT.md`

## Telegram Bot Setup

```bash
# 1. Open Telegram → @BotFather
# 2. Send /newbot
# 3. Get bot token

# 2. Use CLI
node scripts/cli-agent.mjs
# Select: 3 (Setup Telegram MiniApp)
# Enter bot token and webhook URL

# 3. Test bot
# Find bot in Telegram search
# Send /start
```

## Production Deployment

### Docker (Recommended)
```bash
docker-compose build
docker-compose up -d
docker-compose logs api
```

### Manual
```bash
pnpm build
NODE_ENV=production node apps/api/dist/index.js
pnpm --filter @donate/web start
```

## Documentation Quick Links

| Document | Purpose |
|----------|---------|
| [CLI_QUICK_START.md](./CLI_QUICK_START.md) | CLI agent guide |
| [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) | Deploy to production |
| [TELEGRAM_MINIAPP_SETUP.md](./TELEGRAM_MINIAPP_SETUP.md) | Telegram integration |
| [PRODUCTION_READY.md](./PRODUCTION_READY.md) | Summary & checklist |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design |
| [LOCAL_DEV_SETUP.md](./LOCAL_DEV_SETUP.md) | Local development |

## Key Files

| File | Purpose |
|------|---------|
| `scripts/cli-agent.mjs` | Interactive setup tool |
| `apps/api/src/index.ts` | API entry point |
| `apps/web/src/app.tsx` | Web app entry point |
| `docker-compose.yml` | Container orchestration |
| `.env.example` | Environment template |

## Performance Tips

```bash
# Database indexing
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trades_user_id ON trades(user_id);

# Enable caching
redis://localhost:6379

# Connection pooling
DATABASE_POOL_MIN=5
DATABASE_POOL_MAX=20
```

## Monitoring

```bash
# Logs
pnpm dev 2>&1 | grep -i error

# Health check
curl http://localhost:3001/health
# Response: {"status":"healthy"}

# Database
pnpm db:studio  # Opens UI

# Metrics
# Configure in production env:
# - Sentry for errors
# - DataDog for APM
# - CloudWatch for logs
```

## Security Checklist

- [ ] JWT_SECRET is strong (32+ chars)
- [ ] .env.local is in .gitignore
- [ ] CORS_ORIGINS configured
- [ ] Rate limiting enabled
- [ ] HTTPS only in production
- [ ] Database credentials secure
- [ ] Exchange keys rotated
- [ ] Secrets in vault (not git)
- [ ] Regular backups
- [ ] Security audit done

## Common API Endpoints

```bash
# Health
GET /health

# Auth
POST /auth/signup
POST /auth/login
POST /auth/logout

# Exchanges
POST /api/exchanges/binance/connect
GET  /api/exchanges/binance/balance
POST /api/exchanges/binance/trade

# Trades
GET  /api/trades
POST /api/trades/execute
GET  /api/trades/{id}

# Users
GET  /api/users/profile
PUT  /api/users/profile
GET  /api/users/{id}/balance
```

## Git Workflow

```bash
# Check status
git status

# Commit changes
git add .
git commit -m "feat: description"

# Push to GitHub
git push origin main

# View history
git log --oneline -10
```

## Support

1. Read the relevant guide (CLI_QUICK_START, PRODUCTION_DEPLOYMENT, etc.)
2. Check [Troubleshooting](#quick-troubleshooting)
3. Review logs: `pnpm dev 2>&1`
4. GitHub issues: https://github.com/marcusmattus/donate_protocoll/issues

---

**Quick Links**:
- 📖 [CLI Guide](./CLI_QUICK_START.md)
- 🚀 [Deploy Guide](./PRODUCTION_DEPLOYMENT.md)
- 📱 [Telegram Setup](./TELEGRAM_MINIAPP_SETUP.md)
- ✅ [Checklist](./PRODUCTION_READY.md)

**Version**: 1.0.0 | **Status**: ✅ Production Ready | **Last Updated**: 2024
