# 🚀 Getting Started - Donate Protocol

**Start here to get the platform running in 5 minutes!**

## Step 1: Prerequisites Check (1 minute)

Ensure you have:
```bash
# Check Node.js (need 20+)
node -v              # Should show v20+

# Check Git
git -v               # Should be installed

# Check Docker (for database/services)
docker -v            # Should be installed
docker-compose -v    # Should be installed
```

If missing, install from:
- **Node.js**: https://nodejs.org/
- **Docker**: https://www.docker.com/
- **Git**: https://git-scm.com/

## Step 2: Clone & Setup (2 minutes)

```bash
# 1. Navigate to where you want the project
cd ~/projects

# 2. Clone repository
git clone https://github.com/marcusmattus/donate_protocoll.git
cd donate_protocoll

# 3. Run automated setup
bash scripts/setup-dev.sh
```

**What this does:**
- ✓ Checks Node.js version
- ✓ Installs pnpm
- ✓ Clears development ports
- ✓ Installs dependencies
- ✓ Starts Docker services
- ✓ Prepares environment

## Step 3: Start Services (2 minutes)

```bash
# Start all development servers
pnpm dev
```

**Wait for "Ready in X.Xs" messages then visit:**
- 🌐 Web App: http://localhost:3000
- 📊 Admin: http://localhost:3002
- ⚙️ API: http://localhost:4001

## Step 4: Verify Everything Works

```bash
# In a new terminal, run:
./scripts/donate-cli.sh status

# Should show:
# ✓ Port 3000 is active
# ✓ Port 3002 is active
# ✓ Port 4001 is active
```

## ✅ Success!

Everything is running! Now you can:

### For Development
```bash
./scripts/donate-cli.sh help
```

### For Integration
```bash
./scripts/donate-cli.sh agent:init           # OpenClaw setup
./scripts/donate-cli.sh telegram:setup       # Telegram setup
./scripts/donate-cli.sh exchange:setup       # Exchange setup
```

### For Production
```bash
./scripts/donate-cli.sh deploy:prod
```

## 📚 Next Steps

1. **Understand the structure**: Read `PRODUCTION_SETUP_GUIDE.md`
2. **Learn all CLI commands**: Read `CLI_REFERENCE.md`
3. **Setup integrations**: Read `TELEGRAM_MINIAPP_SETUP.md`
4. **Deploy to production**: See deployment section below

## 🆘 Having Issues?

### Port already in use?
```bash
./scripts/donate-cli.sh dev:clean
pnpm dev
```

### Services not starting?
```bash
# Check what's running
docker-compose ps

# View logs
docker-compose logs

# Restart everything
docker-compose down
docker-compose up -d
pnpm dev
```

### API not responding?
```bash
# Check API logs
docker-compose logs api

# Or if running locally
pnpm --filter @donate/api dev
```

## 📖 Documentation Quick Links

| Document | When to Read |
|----------|-------------|
| **COMPLETE_SETUP.md** | Platform overview |
| **PRODUCTION_SETUP_GUIDE.md** | Detailed setup instructions |
| **CLI_REFERENCE.md** | All CLI commands |
| **PRODUCTION_READY_SUMMARY.md** | Current status |
| **TELEGRAM_MINIAPP_SETUP.md** | Telegram integration |
| **ARCHITECTURE.md** | How system works |

## 🎯 Common Commands

### Start Development
```bash
pnpm dev
```

### Check Status
```bash
./scripts/donate-cli.sh status
```

### View Logs
```bash
docker-compose logs -f
```

### Run Tests
```bash
./scripts/donate-cli.sh test
```

### Build for Production
```bash
./scripts/donate-cli.sh build:prod
```

### Deploy to Production
```bash
./scripts/donate-cli.sh deploy:prod
```

## 🌟 What You Can Do Now

✅ Access dashboard at http://localhost:3000  
✅ Manage campaigns in admin at http://localhost:3002  
✅ Use API at http://localhost:4001  
✅ Setup OpenClaw agent integration  
✅ Configure Telegram MiniApp  
✅ Add exchange API connections  

## 🚀 Ready?

```bash
# Make sure you're in the project directory
cd donate_protocoll

# Run this ONE command to see everything
pnpm dev

# Then open browser to:
# http://localhost:3000
```

**That's it! You're running the full platform! 🎉**

For more advanced setup, see `PRODUCTION_SETUP_GUIDE.md`.
