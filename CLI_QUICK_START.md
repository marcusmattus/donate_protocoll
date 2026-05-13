# CLI Agent Quick Start Guide

## Overview

The Donate Protocol CLI Agent is an interactive command-line tool that helps developers quickly set up, configure, and deploy the platform with support for:
- **Exchange Integration** (Binance, Coinbase, Kraken, Bybit)
- **Telegram MiniApp** (for on-chain trading via Telegram)
- **Production Deployment**
- **Development Server Management**

## Installation

```bash
# Make sure you're in the project root
cd /Users/marcusmattus/donate_protocoll

# Install dependencies
pnpm install
```

## Usage

### Start the CLI Agent

```bash
node scripts/cli-agent.mjs
```

This will present an interactive menu:

```
╔════════════════════════════════════════╗
║  Donate Protocol CLI Agent             ║
║  Version 1.0.0                         ║
╚════════════════════════════════════════╝

📋 Options:
1. Initialize Project
2. Setup Exchange Integration
3. Setup Telegram MiniApp
4. Start Dev Server
5. Build for Production
6. Deploy to Production
7. View Status
8. Exit

Select option (1-8):
```

## Options Explained

### 1. Initialize Project

Sets up the project environment:
- ✓ Checks Node.js version (requires ≥ 20.0.0)
- ✓ Installs pnpm if needed
- ✓ Installs all dependencies with `pnpm install --frozen-lockfile`
- ✓ Creates necessary configuration files

**When to use**: First time setup or after cloning

```bash
# Select option: 1
# The script will:
# - Verify Node version
# - Install pnpm
# - Run pnpm install
```

### 2. Setup Exchange Integration

Configures API credentials for cryptocurrency exchanges:

**Supported Exchanges**:
- 🔴 **Binance** - Most popular, supports spot & futures
- 🔵 **Coinbase** - US-based, good for compliance
- 🟡 **Kraken** - European option, strong security
- 🟣 **Bybit** - Futures trading focused

**Process**:
```bash
# Select option: 2

# For each exchange you want to setup:
Setup binance? (y/n): y
binance API Key: xxx...
binance API Secret: yyy...

# The script will:
# - Prompt for each exchange
# - Save credentials to .env.local
# - Create integration client files
```

**What gets created**:
```
apps/api/src/integrations/exchanges/
├── binance.ts
├── coinbase.ts
├── kraken.ts
└── bybit.ts
```

**⚠️ Important Security Note**:
- `.env.local` is **NEVER** committed to git
- Use `.env.example` for production templates
- Rotate credentials regularly
- Use read-only API keys when possible

### 3. Setup Telegram MiniApp

Creates a fully functional Telegram bot and MiniApp:

**Prerequisites**:
- Telegram Bot Token (from @BotFather)
- Webhook URL (your API endpoint)

**Process**:
```bash
# Select option: 3

# Follow the prompts:
Enter Telegram Bot Token: 123456:ABC-DEF...
Enter Webhook URL: https://api.yourdomain.com/telegram/webhook

# The script will:
# - Save bot credentials
# - Create Telegram handler
# - Create Telegram client
# - Register bot commands
```

**What gets created**:
```
apps/api/src/integrations/telegram/
├── handler.ts      # Webhook handler
├── client.ts       # Bot client
└── routes.ts       # Express routes

apps/miniapp/       # MiniApp frontend
├── src/
│   ├── app.tsx
│   ├── components/
│   └── lib/
└── package.json
```

**MiniApp Features**:
- 📱 Open dashboard from Telegram
- 💰 View portfolio and balance
- 🔄 Execute trades
- 🤝 Configure donations
- 📊 View trading history

### 4. Start Dev Server

Launches the development environment:

```bash
# Select option: 4

# Starts:
# - API Server on http://localhost:3001
# - Web App on http://localhost:3000 (or next available)
# - Hot reload enabled
# - Debug logging

# Access:
# - Web: http://localhost:3000
# - API: http://localhost:3001
# - API Docs: http://localhost:3001/docs (if configured)
```

**Monitor Servers**:
```bash
# In separate terminal
pnpm dev  # View all logs
# or
pnpm api:dev   # API only
pnpm web:dev   # Web only
```

### 5. Build for Production

Creates optimized production builds:

```bash
# Select option: 5

Build type (all/api/web): all

# Options:
# - all   : Build everything
# - api   : Build API only
# - web   : Build web app only

# Output:
# - apps/api/dist/       (API build)
# - apps/web/.next/      (Next.js build)
```

### 6. Deploy to Production

Deploys the platform to production:

```bash
# Select option: 6

Deployment type (docker/manual): docker

# For Docker deployment:
# - Builds all Docker images
# - Starts containers with docker-compose
# - Creates persistent volumes
# - Sets up networking

# For Manual deployment:
# - Shows build commands
# - Shows startup commands
# - Provides PM2 instructions
```

### 7. View Status

Shows the current status of all services:

```bash
# Select option: 7

# Displays:
# - Running services
# - Port assignments
# - Build status
# - Dependency versions
```

## Common Workflows

### First-Time Setup

```bash
node scripts/cli-agent.mjs
# 1. Initialize Project
# 2. Setup Exchange Integration
# 3. Setup Telegram MiniApp
# 4. Start Dev Server
```

### Daily Development

```bash
node scripts/cli-agent.mjs
# 4. Start Dev Server
# (or directly: pnpm dev)
```

### Prepare for Production

```bash
node scripts/cli-agent.mjs
# 5. Build for Production
# 6. Deploy to Production
```

### Add New Exchange

```bash
node scripts/cli-agent.mjs
# 2. Setup Exchange Integration
# Select only the new exchange
```

## Environment Variables

The CLI creates and manages `.env.local` automatically:

```bash
# Exchange Credentials
EXCHANGE_API_KEY_BINANCE=...
EXCHANGE_SECRET_BINANCE=...
EXCHANGE_API_KEY_COINBASE=...
EXCHANGE_SECRET_COINBASE=...

# Telegram Bot
TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBHOOK_URL=...
TELEGRAM_MINIAPP_URL=https://miniapp.yourdomain.com

# API
JWT_SECRET=... (auto-generated)
CORS_ORIGINS=...

# Database
DATABASE_URL=...
```

**View current settings**:
```bash
cat .env.local
```

## Troubleshooting

### Command not found: node scripts/cli-agent.mjs

```bash
# Make sure you're in project root
cd /Users/marcusmattus/donate_protocoll

# Verify file exists
ls -la scripts/cli-agent.mjs

# Try with explicit path
node ./scripts/cli-agent.mjs
```

### Port already in use

```bash
# Kill process using port
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3002 pnpm dev
```

### Exchange connection fails

```bash
# Verify credentials
echo $EXCHANGE_API_KEY_BINANCE

# Test connection manually
curl https://api.binance.com/api/v3/ping

# Check logs
pnpm api:dev 2>&1 | grep -i exchange
```

### Telegram webhook not working

```bash
# Verify webhook URL
curl https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo

# Test webhook locally
curl -X POST http://localhost:3001/telegram/webhook \
  -H 'Content-Type: application/json' \
  -d '{"update_id": 1}'
```

## Advanced Usage

### Custom Configuration

Edit after initial setup:

```bash
# Edit exchange settings
vim .env.local

# Edit API configuration
vim apps/api/.env.local

# Edit Web app configuration
vim apps/web/.env.local
```

### Using PM2 for Production

```bash
# After selecting option 6 -> manual deployment

npm install -g pm2

# Start services
pm2 start apps/api/dist/index.js --name "api"
pm2 start apps/web/.next --name "web" --exec "node"

# Monitor
pm2 monit

# View logs
pm2 logs api
pm2 logs web
```

### Docker Compose Override

```bash
# Create docker-compose.override.yml for local development
cat > docker-compose.override.yml << 'EOF'
version: '3.8'
services:
  api:
    environment:
      LOG_LEVEL: debug
    volumes:
      - ./apps/api/src:/app/src
  web:
    environment:
      DEBUG: 1
    volumes:
      - ./apps/web/src:/app/src
EOF
```

## CLI Options Reference

| Option | Command | Output |
|--------|---------|--------|
| 1 | `pnpm install --frozen-lockfile` | Dependencies installed |
| 2 | Interactive prompt | `.env.local` with exchange keys |
| 3 | Interactive prompt | Telegram handler files created |
| 4 | `pnpm dev` | Services running on :3000, :3001 |
| 5 | `pnpm build` | Optimized builds in dist/ |
| 6 | Docker/Manual | Services deployed |
| 7 | `turbo run dev --dry` | Status report |
| 8 | Exit | Clean exit |

## Next Steps

After setup, read these guides:

1. **[Production Deployment](./PRODUCTION_DEPLOYMENT.md)** - Deploy to production
2. **[Telegram MiniApp](./TELEGRAM_MINIAPP_SETUP.md)** - Telegram integration details
3. **[API Documentation](./docs/API.md)** - API endpoints reference
4. **[Local Development](./LOCAL_DEV_SETUP.md)** - Development best practices

## Support

For issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review logs: `pnpm dev 2>&1`
3. Check [GitHub Issues](https://github.com/yourusername/donate-protocol/issues)
4. Read the [Architecture](./ARCHITECTURE.md) guide

## Version History

- **v1.0.0** (2024) - Initial release
  - Project initialization
  - Exchange integration
  - Telegram MiniApp setup
  - Production deployment
  - Development tools

---

**Last Updated**: 2024
**Maintained By**: Donate Protocol Team
