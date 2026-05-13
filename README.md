# Donate Protocol

A production-ready social impact trading platform that enables traders to automatically donate micro-amounts from their trades to support real people and communities.

## Overview

Donate Protocol combines:
- **MCP Server**: AI-native interface for agentic interactions
- **REST API**: Partner and application integration
- **Plugin SDK**: Embeddable widgets and typed SDKs
- **Web Platform**: Landing page, dashboards, admin tools
- **Event-Driven Core**: Scalable donation processing

## Quick Start

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

## Project Structure

```
donate-protocol/
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

## Key Features

### For Traders
- Connect brokerage/exchange accounts
- Set up automatic donation rules
- Track donation history and impact
- View supported recipients and campaigns

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

- End-to-end encryption
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
- [MCP Server Guide](./docs/MCP_SERVER.md)
- [API Reference](./docs/API_REFERENCE.md)
- [Partner Integration Guide](./docs/PARTNER_INTEGRATION.md)
- [Security Model](./docs/SECURITY.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## Contributing

This is a production platform under active development. Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

Proprietary - All rights reserved

## Support

- Documentation: https://docs.donate-protocol.com
- Email: support@donate-protocol.com
- GitHub Issues: For bug reports and feature requests
