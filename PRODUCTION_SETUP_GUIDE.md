# Donate Protocol - Production Ready Setup Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 20.0.0 or higher
- Docker & Docker Compose
- pnpm package manager

### 1. Install & Setup
```bash
# Clone the repository
git clone <repository-url>
cd donate_protocoll

# Run setup script
bash scripts/setup-dev.sh

# Start development
pnpm dev
```

### 2. Access Services
- **Web App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3002
- **API**: http://localhost:4001
- **Database**: postgresql://localhost:5432/donate_protocol
- **Redis**: redis://localhost:6379

---

## 📋 System Architecture

### Services
1. **API Server** (Fastify)
   - Port: 4001
   - REST endpoints for all operations
   - JWT authentication
   - Rate limiting & CORS

2. **Web Application** (Next.js)
   - Port: 3000
   - Public donation interface
   - Real-time updates via WebSocket
   - Mobile responsive

3. **Admin Dashboard** (Next.js)
   - Port: 3002
   - Campaign management
   - Analytics & reporting
   - User administration

4. **MCP Server**
   - OpenClaw agent integration
   - Event streaming
   - Real-time data sync

### Data Storage
- **PostgreSQL**: Main database
- **Redis**: Caching & sessions

---

## 🤖 OpenClaw Agent Integration

### Initialize Agent
```bash
./scripts/donate-cli.sh agent:init
```

This creates:
- Agent configuration in `.agent/config.json`
- Unique Agent ID
- Capabilities list

### Connect to Network
```bash
./scripts/donate-cli.sh agent:connect
```

Starts MCP server on port 9000 with OpenClaw protocol support.

### Verify Connection
```bash
./scripts/donate-cli.sh agent:status
```

Shows:
- Agent ID
- Active capabilities
- Exchange status
- Connection health

---

## 💬 Telegram MiniApp Setup

### 1. Create Telegram Bot
```bash
# Talk to @BotFather on Telegram
/start
/newbot

# Note: Bot Token and Chat ID
```

### 2. Configure in Platform
```bash
./scripts/donate-cli.sh telegram:setup
```

Prompts for:
- Bot Token
- Webhook Secret
- App Short Name
- Webhook URL

### 3. Set Webhook
```bash
curl -X POST https://api.telegram.org/bot{BOT_TOKEN}/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://yourdomain.com/api/telegram/webhook",
    "secret_token": "your_webhook_secret"
  }'
```

### 4. Test Integration
```bash
./scripts/donate-cli.sh telegram:test
```

---

## 🔗 Exchange Integration

### Supported Exchanges
- Binance
- Coinbase Pro
- Kraken
- ByBit

### Setup API Keys
```bash
./scripts/donate-cli.sh exchange:setup
```

Interactive prompt for each exchange:
1. Enter API Key
2. Enter API Secret
3. Optionally configure permissions

### Test Connectivity
```bash
./scripts/donate-cli.sh exchange:test
```

Validates connection to all configured exchanges.

### Security Best Practices
✅ Store keys in environment variables
✅ Use IP whitelisting on exchange accounts
✅ Enable 2FA on exchange accounts
✅ Rotate keys periodically
✅ Use API sub-accounts for different functions

---

## 📊 Dashboard Configuration

### Web App Dashboard
Location: `apps/web/src/app`

Features:
- Campaign display
- Real-time donation tracking
- Analytics dashboard
- Social sharing

### Admin Dashboard
Location: `apps/admin/src/app`

Features:
- Campaign management
- User management
- Analytics & reporting
- Settings configuration

### API Integration
All dashboards connect to API via:
```
NEXT_PUBLIC_API_URL=http://localhost:4001
```

Environment-specific URLs configured in `.env.local` and `.env.production`.

---

## 🐳 Docker Deployment

### Development (local)
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Services Included
- PostgreSQL 16
- Redis 7
- API Server
- Web App
- Admin Dashboard
- Nginx Reverse Proxy

---

## 🚀 Production Deployment

### 1. Prepare Environment
```bash
# Create production config
cp .env.production .env.production.local

# Update with production values
# - Database credentials
# - API keys
# - Telegram tokens
# - Exchange credentials
# - Domain names
```

### 2. Build for Production
```bash
./scripts/donate-cli.sh build:prod
```

### 3. Deploy
```bash
./scripts/donate-cli.sh deploy:prod
```

Or manually:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Verify Deployment
```bash
# Check all services
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 🔐 Security Configuration

### Environment Variables
**Never commit secrets!** Use `.env.production` with:
- Database credentials
- API keys
- JWT secrets
- Telegram tokens

### SSL/TLS Setup
1. Generate certificates:
```bash
certbot certonly --standalone -d yourdomain.com
```

2. Update nginx configuration in `nginx.conf`

3. Mount certificates in docker-compose:
```yaml
volumes:
  - /etc/letsencrypt/live/yourdomain.com:/etc/nginx/ssl:ro
```

### Rate Limiting
API has built-in rate limiting:
- 100 requests per 15 minutes per IP

### CORS Configuration
Update in `.env.production`:
```
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

---

## 📈 Monitoring & Analytics

### Health Checks
```bash
# API health
curl http://localhost:4001/health

# Database health
curl http://localhost:4001/health/db
```

### Logging
- API logs: Pino logger (JSON format)
- App logs: Next.js logging
- Container logs: `docker-compose logs -f`

### Sentry Integration (Optional)
```bash
# Set in .env
SENTRY_DSN=your_sentry_dsn

# Errors auto-reported to Sentry dashboard
```

---

## 🧪 Testing

### Run All Tests
```bash
./scripts/donate-cli.sh test
```

### Specific Test Suites
```bash
pnpm --filter @donate/api test
pnpm --filter @donate/web test
pnpm --filter @donate/admin test
```

---

## 🛠️ CLI Commands Reference

### Development
```bash
./scripts/donate-cli.sh dev              # Start dev servers
./scripts/donate-cli.sh dev:setup        # Setup environment
./scripts/donate-cli.sh dev:clean        # Clean & reset
./scripts/donate-cli.sh dev:status       # Show status
```

### Agent Management
```bash
./scripts/donate-cli.sh agent:init       # Initialize OpenClaw agent
./scripts/donate-cli.sh agent:connect    # Connect to network
./scripts/donate-cli.sh agent:status     # Check agent status
```

### Telegram
```bash
./scripts/donate-cli.sh telegram:setup   # Setup MiniApp
./scripts/donate-cli.sh telegram:test    # Test integration
```

### Exchanges
```bash
./scripts/donate-cli.sh exchange:setup   # Configure exchanges
./scripts/donate-cli.sh exchange:test    # Test connectivity
```

### Build & Deploy
```bash
./scripts/donate-cli.sh build            # Build all
./scripts/donate-cli.sh build:prod       # Production build
./scripts/donate-cli.sh deploy:prod      # Deploy to production
```

---

## 📚 Additional Resources

- **Architecture**: See `ARCHITECTURE.md`
- **API Docs**: Auto-generated at `/api/docs`
- **Telegram Setup**: See `TELEGRAM_MINIAPP_SETUP.md`
- **Quick Reference**: See `QUICK_REFERENCE.md`

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill processes on specific port
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use cleanup script
./scripts/donate-cli.sh dev:clean
```

### Database Connection Failed
```bash
# Check PostgreSQL
docker-compose logs postgres

# Verify connection string in .env.local
DATABASE_URL=postgresql://donate:donate@localhost:5432/donate_protocol
```

### API Not Responding
```bash
# Check API logs
docker-compose logs api

# Or local logs if running tsx
pnpm --filter @donate/api dev
```

### Telegram Webhook Issues
1. Verify bot token: `./scripts/donate-cli.sh telegram:test`
2. Check webhook URL is HTTPS
3. Verify firewall allows Telegram IP ranges
4. Test locally with ngrok: `ngrok http 4001`

---

## 🔄 Maintenance

### Database Backups
```bash
# Create backup
docker-compose exec postgres pg_dump -U donate donate_protocol > backup.sql

# Restore from backup
docker-compose exec -T postgres psql -U donate donate_protocol < backup.sql
```

### Update Dependencies
```bash
pnpm update
pnpm install --frozen-lockfile
```

### Health Monitoring
```bash
# Continuous monitoring
watch -n 5 'curl http://localhost:4001/health'
```

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review logs in `docker-compose logs`
3. Run diagnostics: `./scripts/donate-cli.sh status`
4. File issue on GitHub with logs

---

**Last Updated**: 2026-05-13
**Version**: 1.0.0 (Production Ready)
