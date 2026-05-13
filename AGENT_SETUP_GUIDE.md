# 🤖 Donate Protocol Agent & CLI Setup

## Quick Start (One Command)

```bash
# Universal install - works on Linux, macOS, Windows (WSL)
curl -fsSL https://install.donate-protocol.com/agent | bash

# Or manual
git clone https://github.com/donate-protocol/agents.git
cd donate-protocol
./scripts/cli/donate-cli.sh init
```

## What You Get

- ✅ **donate-cli** - Terminal command for everything
- ✅ **OpenClaw Integration** - Deploy agents to cloud
- ✅ **Telegram MiniApp** - Chat-based interface
- ✅ **Agent Manager** - Run multiple bots
- ✅ **Full Documentation** - All commands explained

## 5-Minute Setup

### Step 1: Initialize
```bash
donate-cli init
# Creates: ~/.donate-agent/default/
# Generates API key + auth token
```

### Step 2: Connect Broker (Alpaca example)
```bash
donate-cli connect alpaca
# Follow OAuth prompt
# Or use: donate-cli connect coinbase
```

### Step 3: Create Rule
```bash
donate-cli rule create -t percentage -v 0.1
# 0.1% of every trade becomes donation
```

### Step 4: Verify
```bash
donate-cli status
# Shows: Connected accounts, rules, agents
```

✅ **Done!** Your agent is now live.

---

## Main Commands

### Initialization
```bash
donate-cli init                          # Create default agent
donate-cli init --name my-bot            # Create named agent
donate-cli init --env production         # Set environment
```

### Broker Connections
```bash
donate-cli connect alpaca                # Connect Alpaca
donate-cli connect coinbase              # Connect Coinbase
donate-cli connect kraken                # Connect Kraken
donate-cli connect interactive-brokers   # Connect IB
donate-cli connect robinhood             # Connect RH
```

### Donation Rules
```bash
donate-cli rule create -t percentage -v 0.1    # 0.1% of trades
donate-cli rule create -t flat -v 0.25         # $0.25 per trade
donate-cli rule create -t roundup              # Round up to nearest $
donate-cli rule list                           # Show all rules
donate-cli rule pause [id]                     # Temporarily disable
donate-cli rule resume [id]                    # Re-enable
donate-cli rule delete [id]                    # Remove
```

### Donations
```bash
donate-cli donate                    # Make one-time donation
donate-cli donations list            # View history
donate-cli donations summary         # Show stats
donate-cli donations export          # Export CSV/JSON
```

### Agent Management
```bash
donate-cli agent list                # List all agents
donate-cli agent create --name bot2  # Create new agent
donate-cli agent status [name]       # Show details
donate-cli agent logs [name]         # View logs
donate-cli agent delete [name]       # Delete agent
```

### Configuration
```bash
donate-cli config show               # View current config
donate-cli config set key value      # Update setting
donate-cli status                    # System status
donate-cli health                    # Health check
```

---

## Telegram MiniApp (One Command)

```bash
# Start Telegram setup
donate-cli telegram setup

# Enter bot token (get from @BotFather)
# MiniApp configured automatically

# Test it
donate-cli telegram test

# Then on Telegram: /start command on your bot
```

### Telegram Features
- `/start` - Welcome & quick start
- `/connect` - Link trading account
- `/donate` - Make donation
- `/status` - Show impact stats
- `/help` - Show all commands

---

## OpenClaw Cloud Deployment

```bash
# Step 1: Get token at https://openclaw.com

# Step 2: Setup
donate-cli openclaw --token YOUR_TOKEN

# Step 3: Deploy agent to cloud
donate-cli agent deploy default

# Step 4: Check status
donate-cli agent status default
```

### OpenClaw Benefits
- ✅ Runs 24/7 in cloud
- ✅ Auto-scales to demand
- ✅ Automatic updates
- ✅ Monitoring & alerts
- ✅ Global deployment

---

## Installation Methods

### Method 1: Curl (Automatic, Linux/macOS/WSL)
```bash
curl -fsSL https://install.donate-protocol.com/agent | bash
donate-cli init
```

### Method 2: Git Clone (Manual, All OS)
```bash
git clone https://github.com/donate-protocol/agents.git
cd donate-protocol
export PATH="$PATH:$(pwd)/scripts/cli"
donate-cli init
```

### Method 3: NPM (Node.js required)
```bash
npm install -g @donate-protocol/agent-cli
donate-cli init
```

### Method 4: Docker (Container)
```bash
docker run -it -v ~/.donate-agent:/root/.donate-agent \
  donate-protocol/agent:latest donate-cli init
```

### Method 5: Manual Add to PATH
```bash
# After cloning repo
cd donate-protocol

# Add to shell
echo "export PATH=\"\$PATH:$(pwd)/scripts/cli\"" >> ~/.bashrc
source ~/.bashrc

# Test
donate-cli --version
```

---

## Environment Variables

```bash
# Optional - set these to override defaults

# API Server
export DONATE_API_URL="http://localhost:3001"  # default
export DONATE_API_URL="https://api.donate-protocol.com"  # production

# Agent Directory
export DONATE_AGENT_HOME="~/.donate-agent"  # default

# Telegram Bot
export TELEGRAM_BOT_TOKEN="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"

# OpenClaw
export OPENCLAW_TOKEN="oclaw_..."

# Brokers
export ALPACA_API_KEY="..."
export ALPACA_SECRET_KEY="..."
export COINBASE_KEY="..."
export COINBASE_SECRET="..."
```

---

## Common Workflows

### Workflow A: Percentage-Based Donations
```bash
donate-cli init
donate-cli connect alpaca
donate-cli rule create -t percentage -v 0.1  # 0.1% of trades
donate-cli status
# Done! All trades now auto-donate 0.1%
```

### Workflow B: Flat Amount per Trade
```bash
donate-cli init
donate-cli connect coinbase
donate-cli rule create -t flat -v 0.50  # $0.50 per trade
# Done! Every trade donates $0.50
```

### Workflow C: Multiple Agents
```bash
donate-cli agent create --name trading-bot
donate-cli agent create --name crypto-bot

# Configure first bot
donate-cli config set name trading-bot
donate-cli connect alpaca
donate-cli rule create -t percentage -v 0.1

# Configure second bot
donate-cli config set name crypto-bot
donate-cli connect coinbase
donate-cli rule create -t percentage -v 0.2

# Deploy both
donate-cli agent deploy trading-bot
donate-cli agent deploy crypto-bot

# Monitor
donate-cli agent status trading-bot
donate-cli agent status crypto-bot
```

### Workflow D: Telegram Bot
```bash
donate-cli init
donate-cli telegram setup
# Enter bot token from @BotFather

# On Telegram app:
# 1. Open your bot
# 2. Send /start
# 3. Click "Open App"
# 4. Connect your broker & create rules
```

### Workflow E: Full Cloud Deployment
```bash
# Local setup
donate-cli init
donate-cli connect alpaca
donate-cli rule create -t percentage -v 0.1

# Deploy to cloud
donate-cli openclaw --token TOKEN
donate-cli agent deploy default

# Telegram bot
donate-cli telegram setup

# Monitor everywhere
# Web: https://app.donate-protocol.com
# Telegram: Your bot
# CLI: donate-cli agent status
```

---

## Troubleshooting

### "donate-cli: command not found"
```bash
# Solution: Add to PATH
export PATH="$PATH:$HOME/.donate-agent"
echo 'export PATH="$PATH:$HOME/.donate-agent"' >> ~/.bashrc

# Or use full path
~/.donate-agent/donate-cli status
```

### "Cannot connect to API"
```bash
# Check if API is running
curl http://localhost:3001/health

# Or use production API
export DONATE_API_URL="https://api.donate-protocol.com"
donate-cli status
```

### "Telegram bot not responding"
```bash
# Check webhook
curl https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo

# Reset webhook
curl https://api.telegram.org/bot$BOT_TOKEN/deleteWebhook

# Set new webhook (replace YOUR_DOMAIN)
curl -X POST https://api.telegram.org/bot$BOT_TOKEN/setWebhook \
  -d url=https://YOUR_DOMAIN/telegram/webhook
```

### "OpenClaw authentication failed"
```bash
# Verify token is set
echo $OPENCLAW_TOKEN

# Test connection
node ~/.donate-agent/openclaw/example-agent.js

# Check token format
# Should be: oclaw_...
```

---

## Directory Structure

```
~/.donate-agent/
├── default/
│   ├── config.json          # Agent configuration
│   ├── .api-key             # API credentials (hidden)
│   ├── .auth-token          # Auth token (hidden)
│   └── logs.txt             # Agent logs
├── openclaw/
│   ├── config.json          # OpenClaw settings
│   ├── agent-client.js      # Cloud integration
│   └── example-agent.js     # Example bot
├── telegram/
│   ├── config.json          # Telegram bot config
│   ├── webhook.js           # Webhook handler
│   └── miniapp.html         # MiniApp interface
└── scripts/
    └── [utility scripts]
```

---

## Next Steps

1. **Install**: `curl -fsSL https://install.donate-protocol.com/agent | bash`
2. **Initialize**: `donate-cli init`
3. **Connect**: `donate-cli connect alpaca` (or your broker)
4. **Setup Rules**: `donate-cli rule create -t percentage -v 0.1`
5. **Verify**: `donate-cli status`
6. *(Optional)* **Telegram**: `donate-cli telegram setup`
7. *(Optional)* **Cloud**: `donate-cli openclaw --token TOKEN`

---

## Support

- **Docs**: https://docs.donate-protocol.com
- **Discord**: https://discord.gg/donate-protocol
- **Issues**: https://github.com/donate-protocol/agents/issues
- **Email**: support@donate-protocol.com

---

## License & Security

- 🔒 All credentials encrypted locally
- 🔐 Uses OAuth for broker connections
- ✅ No passwords stored
- 📄 MIT License

---

**Made with ❤️ for impact.**

Let's make trading meaningful! 🚀
