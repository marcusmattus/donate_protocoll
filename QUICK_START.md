# Quick Start Guide

## 5-Minute Setup

### Prerequisites

```bash
# Install required tools
brew install node          # Node.js 20+
brew install postgresql@16 # PostgreSQL 16+
brew install redis        # Redis 7+
npm install -g pnpm       # pnpm package manager
```

### Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Start database and Redis
docker-compose up -d

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# 4. Set up database
pnpm db:generate    # Generate Prisma client
pnpm db:push        # Create database schema
pnpm db:seed        # Add sample data

# 5. Start MCP server (for AI agent testing)
pnpm mcp:dev

# OR start all services
pnpm dev
```

## Test Credentials (After Seeding)

```
Admin User:
  Email: admin@donate-protocol.com
  Password: admin123!@#CHANGE_ME

Test User:
  Email: trader@example.com
  Password: test123
```

## MCP Server Usage

### With Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "donate-protocol": {
      "command": "pnpm",
      "args": ["--filter", "@donate/mcp-server", "dev"],
      "cwd": "/path/to/donate-protocol"
    }
  }
}
```

### Test MCP Tools

Try these prompts in Claude Desktop:

```
1. "Show me the current platform metrics"
   → Uses get_platform_metrics tool

2. "Add jane@example.com to the waitlist"
   → Uses create_waitlist_signup tool

3. "Create a new user account for John Trader"
   → Uses create_user_profile tool

4. "List all active campaigns"
   → Uses list_campaigns tool

5. "Simulate a donation for buying 100 shares of AAPL at $150"
   → Uses simulate_trade_donation tool
```

## Common Commands

```bash
# Development
pnpm dev                 # Start all services
pnpm mcp:dev             # MCP server only
pnpm web:dev             # Web app only
pnpm api:dev             # API server only

# Database
pnpm db:studio           # Open Prisma Studio (database GUI)
pnpm db:migrate          # Create and run migrations
pnpm db:push             # Quick schema sync (dev only)
pnpm db:seed             # Seed with sample data

# Building
pnpm build               # Build all packages
pnpm type-check          # Type check everything

# Testing
pnpm test                # Run tests
pnpm lint                # Lint code
pnpm format              # Format with Prettier

# Cleanup
pnpm clean               # Remove build artifacts
docker-compose down -v   # Stop and remove volumes
```

## Project Structure at a Glance

```
donate-protocol/
├── apps/
│   ├── mcp-server/          # ✅ AI agent interface
│   ├── api/                 # REST API server
│   ├── web/                 # Public website
│   └── admin/               # Admin dashboard
│
├── packages/
│   ├── database/            # ✅ Prisma schema & client
│   ├── auth/                # ✅ Authentication
│   ├── utils/               # ✅ Shared utilities
│   ├── ui/                  # Component library
│   ├── sdk/                 # Partner SDK
│   └── integrations/        # Broker adapters
│
└── docs/                    # ✅ Documentation
```

## Key Files

- `ARCHITECTURE.md` - Complete system design
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `packages/database/prisma/schema.prisma` - Database schema
- `apps/mcp-server/src/tools/index.ts` - MCP tool definitions
- `apps/mcp-server/src/handlers/tool-handler.ts` - MCP tool implementations
- `docs/MCP_SERVER.md` - MCP server documentation
- `docs/DEPLOYMENT.md` - Deployment guide

## Troubleshooting

**Database connection failed:**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart services
docker-compose restart postgres

# Check connection
psql postgresql://donate:donate@localhost:5432/donate_protocol
```

**Redis connection failed:**
```bash
# Restart Redis
docker-compose restart redis

# Test connection
redis-cli ping
```

**Prisma client not generated:**
```bash
pnpm db:generate
```

**Port already in use:**
```bash
# Find process using port 5432 (PostgreSQL)
lsof -i :5432

# Kill process
kill -9 <PID>
```

## Next Steps

1. **Explore MCP Server** - Try tools via Claude Desktop
2. **Review Database Schema** - Open Prisma Studio: `pnpm db:studio`
3. **Read Architecture** - Understand system design: `ARCHITECTURE.md`
4. **Check Implementation Status** - See what's done: `IMPLEMENTATION_SUMMARY.md`
5. **Start Building** - Implement API or web app

## Support

- 📖 Documentation: `docs/` directory
- 🐛 Issues: GitHub Issues
- 💬 Questions: support@donate-protocol.com
- 📚 Full Guide: [README.md](./README.md)
