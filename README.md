# Donate Protocol

> Trade normally. Donate micro-amounts automatically.

[![Build](https://img.shields.io/github/actions/workflow/status/marcusmattus/donate_protocoll/ci.yml?label=build)](https://github.com/marcusmattus/donate_protocoll)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/badge/npm-%40donate--protocol%2Fcli-orange)](https://www.npmjs.com/package/@donate-protocol/cli)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

The social impact trading layer that enables traders to automatically donate micro-amounts from their trades to support real-world communities — without affecting their strategy.

## Quick Start

```bash
# Install the CLI
npm install -g @donate-protocol/cli
# or: pnpm add -g @donate-protocol/cli | yarn global add @donate-protocol/cli | bun add -g @donate-protocol/cli

# Initialize config
donate init

# Connect your exchange (read-only API key)
donate connect --exchange binance

# Start donating from every trade
donate run
```

See the **[CLI Quick Start guide →](./app/cli/page.tsx)** (or visit `/cli` on the web app) for full documentation.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `app/page.tsx` | Landing page with CLI Quick Start section |
| CLI Guide | `app/cli/page.tsx` | Full CLI reference & quick-start walkthrough |
| Waitlist | `app/waitlist/page.tsx` | Early-access signup form |
| Institutional | `app/institutional/page.tsx` | Partner / exchange application |
| Security | `app/security/page.tsx` | Trust & transparency center |
| Success | `app/success/page.tsx` | Post-submission confirmation |

## Overview

Donate Protocol combines:
- **CLI** — install & run locally in seconds
- **MCP Server** — AI-native interface for agentic interactions
- **REST API** — Partner and application integration
- **Plugin SDK** — Embeddable widgets and typed SDKs
- **Web Platform** — Landing page, dashboards, admin tools
- **Event-Driven Core** — Scalable donation processing

## Project Structure

```
donate-protocol/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home / landing (CLI-first)
│   ├── cli/page.tsx      # CLI quick-start guide
│   ├── waitlist/         # Early-access waitlist
│   ├── institutional/    # Partner application
│   ├── security/         # Trust center
│   └── success/          # Confirmation page
├── components/           # Shared React components
├── apps/
│   ├── web/              # Next.js public web app
│   ├── admin/            # Admin dashboard
│   ├── api/              # REST API server
│   └── mcp-server/       # MCP server for AI agents
├── packages/
│   ├── database/         # Prisma schema and client
│   ├── ui/               # Shared React components
│   ├── sdk/              # TypeScript SDK for partners
│   ├── integrations/     # Broker/exchange integrations
│   ├── events/           # Event schemas and queue
│   ├── auth/             # Authentication utilities
│   ├── config/           # Shared configuration
│   └── utils/            # Shared utilities
└── docs/                 # Documentation
```

## Local Development

### Prerequisites

- Node.js 20+ LTS
- pnpm 8+
- PostgreSQL 16+
- Redis 7+
- Docker (optional, for local development)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Start development servers
pnpm dev
```

### Development Servers

- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3001
- **MCP Server**: stdio (use with MCP client)
- **Admin Dashboard**: http://localhost:3002

## Key Features

### For Developers / Traders (CLI)
- Install with one command (`npm i -g @donate-protocol/cli`)
- Connect any major exchange with read-only API keys
- Configure donation rules (round-up, percentage, conditional)
- Run a persistent watcher that fires on every trade event
- `.donaterc` config file — version-controllable, CI-friendly

### For Partners
- REST API for trade event submission
- Webhook system for real-time updates
- Typed SDKs (TypeScript, Python)
- Developer portal and documentation

### For Nonprofits
- Campaign management
- Impact storytelling
- Payout tracking
- Verification system

### For AI Agents
- MCP server with 25+ tools
- Secure, scoped API access
- Real-time platform metrics
- Donation simulation and execution

## Core Concepts

### Donation Rules

Users create rules that automatically calculate donations:

- **Percentage**: 0.1% of each trade value
- **Flat**: $0.25 per trade
- **Round-up**: Round trade value to nearest dollar
- **Conditional**: Only profitable trades, specific symbols, etc.

### Trade Processing Flow

```
1. Trade Event → 2. Rules Engine → 3. Donation Intent → 4. Allocation → 5. Settlement → 6. Payout
```

### Security & Compliance

- End-to-end encryption (AES-256)
- Non-custodial: read-only exchange API access only
- RBAC and least privilege
- Audit logging for all operations
- Fraud detection and monitoring
- KYC/KYB ready architecture

## Available Scripts

```bash
# Development
pnpm dev                 # Start all dev servers
pnpm web:dev             # Start web app only
pnpm api:dev             # Start API server only
pnpm mcp:dev             # Start MCP server only

# Building
pnpm build               # Build all packages and apps
pnpm type-check          # Type check all packages

# Database
pnpm db:generate         # Generate Prisma client
pnpm db:push             # Push schema to database
pnpm db:migrate          # Run migrations
pnpm db:studio           # Open Prisma Studio

# Testing
pnpm test                # Run all tests
pnpm lint                # Lint all packages
pnpm format              # Format code with Prettier

# Cleanup
pnpm clean               # Clean all build artifacts
```

## Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for JWT tokens
- `PLAID_CLIENT_ID` - Plaid API credentials (for broker connections)
- `STRIPE_SECRET_KEY` - Stripe API key (for payouts)
- `SENDGRID_API_KEY` - Email service
- `NODE_ENV` - Environment (development, staging, production)

## Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [CLI Quick Start](./CLI_QUICK_START.md)
- [MCP Server Guide](./docs/MCP_SERVER.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Partner Integration Guide](./docs/PARTNER_INTEGRATION.md)
- [Security Model](./docs/SECURITY.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## Contributing

This is a production platform under active development. Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT — See [LICENSE](./LICENSE) for details.

## Support

- GitHub Issues: https://github.com/marcusmattus/donate_protocoll/issues
- Documentation: https://docs.donate-protocol.com
- Email: support@donate-protocol.com

