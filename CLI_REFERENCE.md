# Donate Protocol CLI Tool - Complete Reference

The **Donate Protocol CLI** is a comprehensive command-line tool for managing the donation platform, including OpenClaw agent integration, Telegram MiniApp setup, exchange connections, and production deployment.

## 🚀 Quick Start

```bash
# View help
./scripts/donate-cli.sh help

# Start development
./scripts/donate-cli.sh dev

# Initialize OpenClaw agent
./scripts/donate-cli.sh agent:init

# Setup Telegram MiniApp
./scripts/donate-cli.sh telegram:setup

# Deploy to production
./scripts/donate-cli.sh deploy:prod
```

---

## 📖 Command Categories

### 🚀 Development Commands

#### `dev`
Start all development servers in watch mode.
```bash
./scripts/donate-cli.sh dev
```
- Starts: Web (3000), Admin (3002), API (4001), MCP Server (9000)
- Auto-reloads on file changes
- Full hot-module replacement

#### `dev:setup`
Initial setup of development environment.
```bash
./scripts/donate-cli.sh dev:setup
```
Performs:
- Node.js version check
- pnpm installation
- Port cleanup
- Dependency installation
- Docker service startup
- Database migration

#### `dev:clean`
Clean development environment and reset state.
```bash
./scripts/donate-cli.sh dev:clean
```
- Kills processes on dev ports
- Removes node_modules
- Clears lock file
- Ready for fresh start

#### `dev:status`
Display current development environment status.
```bash
./scripts/donate-cli.sh dev:status
```
Shows:
- Active services and their ports
- Service URLs
- Database status
- Redis status

---

### 🤖 OpenClaw Agent Commands

#### `agent:init`
Initialize OpenClaw agent integration.
```bash
./scripts/donate-cli.sh agent:init
```
Creates:
- `.agent/config.json` with unique Agent ID
- Default capabilities
- Exchange configurations
- Telegram MiniApp settings

**Output**:
```
Agent initialized with ID: a1b2c3d4-e5f6-4789-a0b1-c2d3e4f5a6b7
Configuration saved to: .agent/config.json
```

#### `agent:connect`
Connect agent to OpenClaw network.
```bash
./scripts/donate-cli.sh agent:connect
```
- Requires agent initialization first
- Starts MCP server on port 9000
- Connects to OpenClaw protocol
- Enables distributed functionality

#### `agent:status`
Display current agent status and capabilities.
```bash
./scripts/donate-cli.sh agent:status
```
Shows:
- Agent ID
- Registered capabilities
- Exchange availability
- Connection health

---

### 💬 Telegram MiniApp Commands

#### `telegram:setup`
Interactive setup wizard for Telegram MiniApp.
```bash
./scripts/donate-cli.sh telegram:setup
```

**Prompts**:
1. Telegram Bot Token (from @BotFather)
2. Webhook Secret (for security)
3. App Short Name (identifier)
4. Webhook URL (your server endpoint)

**Updates**:
- `.env.local` with Telegram credentials
- Ready for webhook configuration

#### `telegram:test`
Verify Telegram integration is working.
```bash
./scripts/donate-cli.sh telegram:test
```
Tests:
- Bot token validity
- Webhook connectivity
- Message delivery
- WebApp initialization

---

### 🔗 Exchange Integration Commands

#### `exchange:setup`
Interactive configuration for exchange API keys.
```bash
./scripts/donate-cli.sh exchange:setup
```

**Supported Exchanges**:
1. Binance
2. Coinbase Pro
3. Kraken
4. ByBit
5. All (configure all at once)

**For Each Exchange**:
- Enter API Key
- Enter API Secret
- Optionally configure permissions

**Stores in**: `.env.local` with encryption support

#### `exchange:test`
Test connectivity to all configured exchanges.
```bash
./scripts/donate-cli.sh exchange:test
```

Tests:
- Binance API connectivity
- Coinbase API connectivity
- Kraken API connectivity
- ByBit API connectivity

**Output**:
```
Testing exchange connectivity...
Testing Binance...
✓ Binance: OK
Testing Coinbase...
✓ Coinbase: OK
...
Exchange connectivity tests completed
```

---

### 📦 Build & Deployment Commands

#### `build`
Build all workspace packages for development.
```bash
./scripts/donate-cli.sh build
```
- Compiles TypeScript
- Bundles web applications
- Optimizes assets
- Minimal tree-shaking

#### `build:prod`
Build entire application for production.
```bash
./scripts/donate-cli.sh build:prod
```
- Full optimization
- Minification enabled
- Source maps excluded
- Production environment variables

#### `deploy:prod`
Complete production deployment process.
```bash
./scripts/donate-cli.sh deploy:prod
```

Steps:
1. Verify `.env.production` exists
2. Install dependencies with frozen lockfile
3. Build all packages
4. Run database migrations
5. Build Docker images
6. (Optional) Push to registry
7. Run all tests
8. Report success

**Prerequisites**:
- `.env.production` configured
- Docker installed and running
- Sufficient disk space for images

---

### 🗄️ Database Commands

#### `db:migrate`
Run database migrations.
```bash
./scripts/donate-cli.sh db:migrate
```
- Applies pending migrations
- Maintains schema version
- Can be run multiple times safely

#### `db:backup`
Create database backup.
```bash
./scripts/donate-cli.sh db:backup
```
Creates timestamped SQL dump in `backups/` directory.

#### `db:restore`
Restore database from backup.
```bash
./scripts/donate-cli.sh db:restore
```
Prompts for backup file and restores state.

---

### 🧪 Testing Commands

#### `test`
Run all project tests.
```bash
./scripts/donate-cli.sh test
```
- Unit tests
- Integration tests
- API tests
- Component tests

#### `test:unit`
Run unit tests only.
```bash
./scripts/donate-cli.sh test:unit
```

#### `test:integration`
Run integration tests.
```bash
./scripts/donate-cli.sh test:integration
```

#### `test:coverage`
Generate test coverage report.
```bash
./scripts/donate-cli.sh test:coverage
```

---

### 📊 Dashboard Commands

#### `dashboard:dev`
Start dashboard development server.
```bash
./scripts/donate-cli.sh dashboard:dev
```
- Admin dashboard on port 3002
- Hot reload enabled
- Connected to API on 4001

#### `dashboard:build`
Build dashboard for production.
```bash
./scripts/donate-cli.sh dashboard:build
```

---

### 🔐 Security Commands

#### `security:check`
Run security vulnerability checks.
```bash
./scripts/donate-cli.sh security:check
```
- Scans dependencies
- Reports vulnerabilities
- Suggests fixes

#### `security:audit`
Audit all dependencies for security issues.
```bash
./scripts/donate-cli.sh security:audit
```

---

## ⚙️ Environment Variables

### Development (`.env.local`)
```bash
NODE_ENV=development
API_PORT=4001
NEXT_PUBLIC_API_URL=http://localhost:4001
DATABASE_URL=postgresql://donate:donate@localhost:5432/donate_protocol
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret-key-change-in-production
```

### Production (`.env.production`)
```bash
NODE_ENV=production
API_PORT=4001
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://...
DATABASE_SSL=true
JWT_SECRET=<secure-random-key>
EXCHANGE_API_KEY_BINANCE=<your-key>
EXCHANGE_SECRET_BINANCE=<your-secret>
TELEGRAM_BOT_TOKEN=<your-token>
```

---

## 🐳 Docker Integration

### Docker Commands
```bash
# Build images
./scripts/donate-cli.sh docker:build

# Start containers
./scripts/donate-cli.sh docker:start

# View logs
./scripts/donate-cli.sh docker:logs

# Stop containers
./scripts/donate-cli.sh docker:stop
```

---

## 📋 Service Ports

| Service | Port | Environment |
|---------|------|-------------|
| Web App | 3000 | dev/prod |
| Admin | 3002 | dev/prod |
| API | 4001 | dev/prod |
| MCP Server | 9000 | dev |
| PostgreSQL | 5432 | dev/prod |
| Redis | 6379 | dev/prod |
| Nginx | 80/443 | prod |

---

## 🔧 Troubleshooting

### Command Not Found
Ensure script is executable:
```bash
chmod +x ./scripts/donate-cli.sh
```

### Port Already in Use
```bash
./scripts/donate-cli.sh dev:clean
```

### Environment Not Found
Create from example:
```bash
cp .env.example .env.local
```

### Docker Connection Issues
Verify Docker is running:
```bash
docker ps
```

---

## 📚 Additional Resources

- **Setup Guide**: `PRODUCTION_SETUP_GUIDE.md`
- **Architecture**: `ARCHITECTURE.md`
- **Quick Start**: `START_HERE.md`
- **Telegram Setup**: `TELEGRAM_MINIAPP_SETUP.md`

---

## 💡 Best Practices

1. **Always run `dev:setup` on first clone**
2. **Use `dev:clean` if environment becomes unstable**
3. **Test exchanges before going to production**
4. **Backup database before major migrations**
5. **Run tests before pushing to production**
6. **Keep secrets in `.env.production` (never commit)**
7. **Use agent:status regularly to monitor**
8. **Test Telegram webhook after deployment**

---

## 🆘 Support

For issues:
1. Run `./scripts/donate-cli.sh status` for diagnostics
2. Check logs: `docker-compose logs`
3. Review documentation files
4. Verify environment variables
5. File issue with output from `donate-cli.sh status`

---

**Last Updated**: 2026-05-13
**Version**: 1.0.0
