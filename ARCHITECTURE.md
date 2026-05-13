# Donate Protocol - Platform Architecture

## Executive Summary

Donate Protocol is a production-ready social impact trading platform that enables traders to automatically donate micro-amounts from their trades to support real people and communities. The platform is built as a comprehensive ecosystem including:

- **MCP Server**: AI-native interface exposing platform capabilities to agents and tools
- **REST API**: Partner and application integration layer
- **Plugin SDK**: Embeddable widgets and typed SDKs for external integrations
- **Web Platform**: Landing page, user dashboards, admin tools
- **Event-Driven Core**: Asynchronous donation processing and impact tracking
- **Compliance-Ready**: Audit trails, fraud detection, secure fund handling

## System Design

### Architecture Principles

1. **Security First**: Every operation is authenticated, authorized, and audited
2. **Event-Driven**: Trade events flow through queues for reliable processing
3. **Idempotent Operations**: Critical financial operations can be safely retried
4. **Modular Design**: Clear separation between services and packages
5. **Type Safety**: End-to-end TypeScript with runtime validation
6. **Scalable**: Horizontal scaling for API, workers, and MCP servers
7. **Observable**: Comprehensive logging, tracing, and metrics

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
├─────────────┬──────────────┬──────────────┬────────────────────┤
│  Web App    │  MCP Clients │  Partner SDKs│  Mobile Apps       │
└─────────────┴──────────────┴──────────────┴────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                            │
├─────────────┬──────────────┬──────────────┬────────────────────┤
│  REST API   │  MCP Server  │  GraphQL API │  Webhooks          │
└─────────────┴──────────────┴──────────────┴────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                   Application Services Layer                     │
├─────────────┬──────────────┬──────────────┬────────────────────┤
│ User Mgmt   │ Trade Ingest │ Donation Eng │ Impact Tracking    │
│ Auth/AuthZ  │ Rules Engine │ Payout Svc   │ Campaign Mgmt      │
│ Partner Mgmt│ Fraud Detect │ Notification │ Admin/Compliance   │
└─────────────┴──────────────┴──────────────┴────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                      Data & Event Layer                          │
├─────────────┬──────────────┬──────────────┬────────────────────┤
│ PostgreSQL  │  Redis Cache │  Event Queue │  Object Storage    │
│ (Prisma)    │  (Sessions)  │  (BullMQ)    │  (S3-compatible)   │
└─────────────┴──────────────┴──────────────┴────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                   External Integrations                          │
├─────────────┬──────────────┬──────────────┬────────────────────┤
│ Brokers     │ Exchanges    │ Payment Proc │ Email Service      │
│ (Plaid, etc)│ (APIs)       │ (Stripe)     │ (SendGrid)         │
└─────────────┴──────────────┴──────────────┴────────────────────┘
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: React Context + TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Authentication**: NextAuth.js

### Backend
- **Runtime**: Node.js 20+ LTS
- **Language**: TypeScript 5+
- **API Framework**: Fastify (high performance, schema-based)
- **MCP Server**: @modelcontextprotocol/sdk
- **Validation**: Zod
- **Queue**: BullMQ (Redis-backed)
- **Scheduling**: node-cron
- **Testing**: Vitest + Supertest

### Database & Storage
- **Primary Database**: PostgreSQL 16+
- **ORM**: Prisma
- **Cache**: Redis 7+
- **Object Storage**: S3-compatible (AWS S3, MinIO, Cloudflare R2)
- **Search** (future): Elasticsearch or Typesense

### Infrastructure
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **CI/CD**: GitHub Actions
- **Container**: Docker + Docker Compose
- **Orchestration**: Kubernetes (production) / Docker Compose (dev)
- **Hosting**: Vercel (frontend) + Railway/Fly.io (backend)
- **Monitoring**: Datadog / Grafana + Prometheus
- **Logging**: Pino + OpenTelemetry
- **Secrets**: Vault / AWS Secrets Manager / Doppler

### Development Tools
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **API Spec**: OpenAPI 3.1
- **Code Generation**: Prisma Client, OpenAPI TypeScript
- **Git Hooks**: Husky + lint-staged

## Core Services

### 1. User Service
**Responsibilities:**
- User registration, authentication, profile management
- Session management and token issuance
- KYC/identity verification triggers
- User preferences and settings
- Privacy controls and data exports

**Key Operations:**
- `createUser(data)` - Register new user
- `authenticateUser(credentials)` - Login
- `updateUserProfile(userId, data)` - Update profile
- `deleteUser(userId)` - GDPR-compliant deletion
- `getUserImpactSummary(userId)` - Aggregate donation impact

### 2. Connection Service
**Responsibilities:**
- Broker/exchange account linking (Plaid, direct APIs)
- OAuth flows for partner integrations
- Connection health monitoring
- Token refresh and re-authentication
- Account disconnection and data cleanup

**Key Operations:**
- `initiateBrokerConnection(userId, broker)` - Start OAuth flow
- `completeBrokerConnection(userId, authCode)` - Exchange token
- `listConnections(userId)` - Get all connected accounts
- `disconnectAccount(connectionId)` - Revoke and cleanup
- `refreshConnectionToken(connectionId)` - Maintain connection

### 3. Trade Ingestion Service
**Responsibilities:**
- Receive trade events from partners via webhook or polling
- Validate and normalize trade data
- Deduplicate trade events
- Enqueue trades for donation processing
- Handle trade corrections and cancellations

**Key Operations:**
- `ingestTrade(partnerId, tradeEvent)` - Receive trade webhook
- `pollPartnerTrades(partnerId)` - Fetch trades via API
- `validateTradeEvent(event)` - Schema validation
- `handleTradeCorrection(tradeId, correction)` - Update existing trade
- `handleTradeCancellation(tradeId)` - Reverse donations if needed

### 4. Rules Engine Service
**Responsibilities:**
- Store and evaluate user donation rules
- Calculate donation amounts per trade
- Apply caps, minimums, thresholds
- Handle rule priority and conflicts
- Support rule scheduling (pause/resume)

**Key Operations:**
- `createDonationRule(userId, rule)` - Define donation logic
- `evaluateTrade(userId, trade)` - Calculate donation for trade
- `applyRuleCaps(userId, donationIntent)` - Enforce limits
- `pauseRule(ruleId)` - Temporarily disable
- `resumeRule(ruleId)` - Re-enable

**Rule Types:**
- Percentage-based: `0.1%` of trade value
- Flat amount: `$0.50` per trade
- Round-up: Round trade value to nearest dollar
- Conditional: Only for profitable trades, specific symbols, etc.

### 5. Donation Engine Service
**Responsibilities:**
- Process donation intents from rules engine
- Allocate donations across recipients/campaigns
- Track donation lifecycle (pending → settled → disbursed)
- Handle failed donations and retries
- Maintain donation ledger for reconciliation

**Key Operations:**
- `createDonationIntent(userId, tradeId, amount)` - Record intent
- `allocateDonation(donationId, allocations)` - Distribute to recipients
- `settleDonation(donationId)` - Confirm funds received
- `disburseDonation(donationId)` - Trigger payout
- `reverseDonation(donationId, reason)` - Handle cancellations

**Donation State Machine:**
```
PENDING → ALLOCATED → SETTLED → DISBURSED
    ↓         ↓          ↓
  FAILED   FAILED    FAILED
    ↓         ↓          ↓
 RETRYING  RETRYING  RETRYING
```

### 6. Campaign & Recipient Service
**Responsibilities:**
- Manage nonprofit/recipient profiles
- Handle campaign creation and lifecycle
- Track recipient eligibility and verification
- Store payout information (bank details, crypto wallets)
- Generate impact stories and updates

**Key Operations:**
- `createRecipient(data)` - Onboard nonprofit
- `verifyRecipient(recipientId)` - KYB/compliance check
- `createCampaign(recipientId, campaign)` - Launch fundraising
- `updateCampaignProgress(campaignId, metrics)` - Track impact
- `deactivateRecipient(recipientId, reason)` - Compliance action

### 7. Payout Service
**Responsibilities:**
- Aggregate donations for batch payouts
- Execute payouts via Stripe Connect, wire, crypto
- Handle payout failures and retries
- Track payout status and reconciliation
- Generate payout reports for recipients

**Key Operations:**
- `schedulePayout(recipientId, amount)` - Queue payout
- `executePayout(payoutId)` - Process via payment rails
- `verifyPayout(payoutId)` - Confirm delivery
- `retryFailedPayout(payoutId)` - Handle failures
- `generatePayoutReport(recipientId, period)` - Reporting

### 8. Partner Integration Service
**Responsibilities:**
- Partner onboarding and API key management
- Webhook registration and delivery
- Rate limiting and quota enforcement
- Integration health monitoring
- Partner analytics and reporting

**Key Operations:**
- `createPartner(application)` - Onboard new partner
- `issueAPIKey(partnerId, scopes)` - Generate credentials
- `registerWebhook(partnerId, url, events)` - Subscribe to events
- `deliverWebhook(webhookId, payload)` - Send event
- `getPartnerMetrics(partnerId)` - Usage analytics

### 9. Fraud & Compliance Service
**Responsibilities:**
- Monitor for suspicious patterns
- Flag high-risk users, trades, donations
- Generate compliance reports
- Support admin review workflows
- Maintain audit logs

**Key Operations:**
- `evaluateUserRisk(userId)` - Risk scoring
- `flagSuspiciousActivity(entityType, entityId, reason)` - Alert
- `reviewFlaggedActivity(flagId, decision)` - Admin action
- `generateComplianceReport(period)` - Regulatory reporting
- `queryAuditLog(filters)` - Investigation

### 10. Notification Service
**Responsibilities:**
- Send email notifications
- Trigger webhooks to partners
- In-app notification delivery
- Notification preferences management
- Template management

**Key Operations:**
- `sendEmail(userId, template, data)` - Email delivery
- `sendWebhook(partnerId, event, payload)` - Partner notification
- `createInAppNotification(userId, notification)` - Alert user
- `markNotificationRead(notificationId)` - Update status
- `updateNotificationPreferences(userId, prefs)` - User settings

## Security & Compliance

### Authentication & Authorization

**Authentication Methods:**
- **Users**: Email/password, OAuth (Google, GitHub), Magic links
- **Partners**: API keys with scopes, OAuth 2.0 client credentials
- **MCP Clients**: API keys with role-based scopes
- **Internal Services**: Service-to-service JWT tokens

**Authorization Model (RBAC):**
- **Roles**: `user`, `partner`, `recipient`, `admin`, `superadmin`, `mcp_agent`
- **Permissions**: Granular permissions per resource (read, write, delete)
- **Scopes**: API keys have limited scopes (e.g., `trades:write`, `donations:read`)

### Data Security

- **Encryption at Rest**: Database encryption, encrypted S3 buckets
- **Encryption in Transit**: TLS 1.3 for all connections
- **PII Handling**: Separate encrypted fields for SSN, bank details
- **Secret Management**: Vault/AWS Secrets Manager for API keys, tokens
- **Webhook Signatures**: HMAC-SHA256 for webhook verification
- **Rate Limiting**: Per-user, per-partner, per-IP limits

### Audit & Compliance

- **Audit Logs**: All financial operations, admin actions, data access
- **Retention**: 7 years for financial records, configurable for others
- **GDPR**: Right to access, deletion, data portability
- **SOC 2**: Audit trail, access controls, change management
- **KYC/KYB**: Integration points for identity verification (Plaid, Stripe Identity)
- **AML**: Transaction monitoring, flagging patterns

### Fraud Prevention

- **Rate Limits**: Prevent abuse of donation flows
- **Anomaly Detection**: Unusual donation patterns, velocity checks
- **Device Fingerprinting**: Track suspicious devices
- **IP Blocking**: Geo-restrictions, blocklists
- **Manual Review**: Admin workflows for flagged activity

## Donation Logic

### Rule Evaluation Flow

```typescript
// Pseudocode for trade donation processing
async function processTrade(trade: TradeEvent) {
  // 1. Validate trade
  const validatedTrade = await validateTrade(trade);

  // 2. Get user's active donation rules
  const rules = await getDonationRules(validatedTrade.userId, { active: true });

  // 3. Evaluate each rule
  const donationIntents = [];
  for (const rule of rules) {
    if (ruleApplies(rule, validatedTrade)) {
      const amount = calculateDonation(rule, validatedTrade);
      if (amount > 0) {
        donationIntents.push({ ruleId: rule.id, amount });
      }
    }
  }

  // 4. Apply caps and limits
  const cappedIntents = await applyCaps(validatedTrade.userId, donationIntents);

  // 5. Create donation records
  for (const intent of cappedIntents) {
    await createDonation({
      userId: validatedTrade.userId,
      tradeId: validatedTrade.id,
      ruleId: intent.ruleId,
      amount: intent.amount,
      status: 'pending'
    });
  }

  // 6. Enqueue for allocation
  await enqueueDonationAllocation(validatedTrade.userId);
}
```

### Calculation Examples

**Percentage-Based:**
```typescript
// User rule: 0.1% of trade value
// Trade: BUY 100 shares AAPL @ $150 = $15,000
// Donation: $15,000 * 0.001 = $15.00
```

**Flat Amount:**
```typescript
// User rule: $0.25 per trade
// Trade: Any trade
// Donation: $0.25
```

**Round-Up:**
```typescript
// User rule: Round up to nearest $5
// Trade value: $142.37
// Donation: $5.00 - $0.37 = $4.63
```

**Conditional:**
```typescript
// User rule: 0.5% if profit > $10
// Trade: SELL 50 shares TSLA, profit = $125
// Donation: $125 * 0.005 = $0.625 → min $0.01 = $0.63 (rounded)
```

### Caps & Limits

- **Daily Cap**: Max $10/day (configurable)
- **Monthly Cap**: Max $100/month (configurable)
- **Per-Trade Minimum**: $0.01 (avoid micro-transactions)
- **Per-Trade Maximum**: $50 (prevent errors)

### Edge Cases

1. **Trade Cancellation**: Reverse donation if trade cancelled within settlement window
2. **Trade Correction**: Recalculate donation based on corrected values
3. **Insufficient Balance**: Queue donation until user adds funds
4. **Recipient Deactivated**: Reallocate to default fund or refund
5. **Duplicate Trades**: Deduplicate using broker trade ID
6. **Concurrent Trades**: Handle race conditions with optimistic locking

## MCP Server Design

### Overview

The MCP (Model Context Protocol) server exposes Donate Protocol capabilities to AI agents, enabling natural language interactions with the platform.

### Tools

#### Public Tools (No Auth Required)

**create_waitlist_signup**
```typescript
{
  name: "create_waitlist_signup",
  description: "Add an email to the launch waitlist",
  inputSchema: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      referralSource: { type: "string", optional: true }
    },
    required: ["email"]
  }
}
```

**create_partner_request**
```typescript
{
  name: "create_partner_request",
  description: "Submit a partner integration request",
  inputSchema: {
    type: "object",
    properties: {
      companyName: { type: "string" },
      email: { type: "string", format: "email" },
      integrationType: { enum: ["broker", "exchange", "wallet", "app"] },
      description: { type: "string" },
      website: { type: "string", format: "uri", optional: true }
    },
    required: ["companyName", "email", "integrationType", "description"]
  }
}
```

**get_platform_metrics**
```typescript
{
  name: "get_platform_metrics",
  description: "Get public platform impact metrics",
  inputSchema: {
    type: "object",
    properties: {}
  },
  output: {
    totalDonations: "number",
    totalDonorsAmount: "number",
    totalRecipients: "number",
    totalTrades: "number",
    totalImpact: "string" // Narrative summary
  }
}
```

#### User Tools (Requires User Auth)

**create_user_profile**
```typescript
{
  name: "create_user_profile",
  description: "Create a new user account",
  inputSchema: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      name: { type: "string" },
      password: { type: "string", minLength: 8 }
    },
    required: ["email", "name", "password"]
  },
  auth: "none", // Special case - creates auth
  rateLimit: "5 per hour per IP"
}
```

**connect_trading_account**
```typescript
{
  name: "connect_trading_account",
  description: "Initiate connection to a broker or exchange",
  inputSchema: {
    type: "object",
    properties: {
      provider: { enum: ["robinhood", "coinbase", "alpaca", "interactive_brokers"] },
      accountType: { enum: ["brokerage", "crypto"] }
    },
    required: ["provider"]
  },
  auth: "user",
  output: {
    authUrl: "string", // OAuth URL for user to complete
    connectionId: "string"
  }
}
```

**create_donation_rule**
```typescript
{
  name: "create_donation_rule",
  description: "Create a donation rule for automatic giving",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      ruleType: { enum: ["percentage", "flat", "roundup"] },
      value: { type: "number" }, // percentage (0-100) or dollar amount
      conditions: {
        type: "object",
        properties: {
          symbols: { type: "array", items: { type: "string" }, optional: true },
          minTradeValue: { type: "number", optional: true },
          onlyProfitable: { type: "boolean", optional: true }
        }
      },
      allocations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            recipientId: { type: "string" },
            percentage: { type: "number", min: 0, max: 100 }
          }
        }
      },
      dailyCap: { type: "number", optional: true },
      monthlyCap: { type: "number", optional: true }
    },
    required: ["name", "ruleType", "value", "allocations"]
  },
  auth: "user",
  idempotencyKey: true
}
```

**simulate_trade_donation**
```typescript
{
  name: "simulate_trade_donation",
  description: "Simulate how much would be donated for a hypothetical trade",
  inputSchema: {
    type: "object",
    properties: {
      symbol: { type: "string" },
      quantity: { type: "number" },
      price: { type: "number" },
      side: { enum: ["buy", "sell"] }
    },
    required: ["symbol", "quantity", "price", "side"]
  },
  auth: "user",
  output: {
    tradeValue: "number",
    estimatedDonation: "number",
    appliedRules: "array",
    recipients: "array"
  }
}
```

**get_donation_history**
```typescript
{
  name: "get_donation_history",
  description: "Retrieve user's donation history",
  inputSchema: {
    type: "object",
    properties: {
      startDate: { type: "string", format: "date", optional: true },
      endDate: { type: "string", format: "date", optional: true },
      limit: { type: "number", default: 50, max: 200 },
      offset: { type: "number", default: 0 }
    }
  },
  auth: "user",
  output: {
    donations: "array",
    total: "number",
    hasMore: "boolean"
  }
}
```

**get_user_impact_summary**
```typescript
{
  name: "get_user_impact_summary",
  description: "Get aggregated impact metrics for the user",
  inputSchema: {
    type: "object",
    properties: {
      period: { enum: ["week", "month", "year", "all"], default: "all" }
    }
  },
  auth: "user",
  output: {
    totalDonated: "number",
    totalTrades: "number",
    recipientsSupported: "number",
    impactStories: "array",
    topRecipients: "array"
  }
}
```

#### Campaign & Recipient Tools

**list_campaigns**
```typescript
{
  name: "list_campaigns",
  description: "Browse active donation campaigns",
  inputSchema: {
    type: "object",
    properties: {
      category: { type: "string", optional: true },
      status: { enum: ["active", "completed", "all"], default: "active" },
      limit: { type: "number", default: 20, max: 100 }
    }
  },
  auth: "optional", // Public but may personalize if authed
  output: {
    campaigns: "array"
  }
}
```

**donate_now**
```typescript
{
  name: "donate_now",
  description: "Make a one-time donation to a recipient or campaign",
  inputSchema: {
    type: "object",
    properties: {
      recipientId: { type: "string", optional: true },
      campaignId: { type: "string", optional: true },
      amount: { type: "number", min: 1 }
    }
  },
  auth: "user",
  idempotencyKey: true,
  output: {
    donationId: "string",
    status: "string",
    receiptUrl: "string"
  }
}
```

#### Partner Tools (Requires Partner Auth)

**create_partner_api_key**
```typescript
{
  name: "create_partner_api_key",
  description: "Generate a new API key for partner integration",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      scopes: { type: "array", items: { type: "string" } },
      expiresAt: { type: "string", format: "date-time", optional: true }
    },
    required: ["name", "scopes"]
  },
  auth: "partner",
  output: {
    apiKey: "string", // Only shown once
    keyId: "string"
  }
}
```

**register_webhook**
```typescript
{
  name: "register_webhook",
  description: "Register a webhook endpoint for events",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string", format: "uri" },
      events: { type: "array", items: { type: "string" } },
      secret: { type: "string", optional: true } // For signature verification
    },
    required: ["url", "events"]
  },
  auth: "partner",
  output: {
    webhookId: "string",
    secret: "string" // Generated if not provided
  }
}
```

#### Admin Tools (Requires Admin Auth)

**admin_review_partner_request**
```typescript
{
  name: "admin_review_partner_request",
  description: "Approve or reject a partner integration request",
  inputSchema: {
    type: "object",
    properties: {
      requestId: { type: "string" },
      decision: { enum: ["approved", "rejected"] },
      notes: { type: "string", optional: true }
    },
    required: ["requestId", "decision"]
  },
  auth: "admin",
  auditLog: true
}
```

**admin_list_flagged_activity**
```typescript
{
  name: "admin_list_flagged_activity",
  description: "Retrieve flagged users, donations, or other suspicious activity",
  inputSchema: {
    type: "object",
    properties: {
      entityType: { enum: ["user", "donation", "recipient", "partner"], optional: true },
      status: { enum: ["pending", "reviewed", "resolved"], default: "pending" },
      limit: { type: "number", default: 50 }
    }
  },
  auth: "admin",
  output: {
    flags: "array"
  }
}
```

### Resources

MCP resources provide read-only access to documentation and data.

**resource://platform/policies**
```typescript
{
  uri: "platform://policies",
  mimeType: "text/markdown",
  description: "Platform terms of service, privacy policy, and donation policy"
}
```

**resource://platform/faq**
```typescript
{
  uri: "platform://faq",
  mimeType: "application/json",
  description: "Frequently asked questions with categories"
}
```

**resource://platform/integrations**
```typescript
{
  uri: "platform://integrations",
  mimeType: "application/json",
  description: "List of supported brokers, exchanges, and integration guides"
}
```

**resource://platform/metrics**
```typescript
{
  uri: "platform://metrics",
  mimeType: "application/json",
  description: "Real-time public impact metrics"
}
```

### Auth & Security for MCP

- **API Key Authentication**: Each MCP client gets a unique API key
- **Role-Based Access**: Keys have roles (user, partner, admin, agent)
- **Scoped Permissions**: Tools check permissions before execution
- **Rate Limiting**: Per-key rate limits prevent abuse
- **Audit Logging**: All MCP tool calls are logged with actor, action, timestamp
- **Idempotency**: Financial operations require idempotency keys
- **Webhook Verification**: Partner webhooks use HMAC signatures

## API Design

### REST API Endpoints

**Base URL**: `https://api.donate-protocol.com/v1`

#### Authentication

- `POST /auth/register` - Create user account
- `POST /auth/login` - Email/password login
- `POST /auth/logout` - Invalidate session
- `POST /auth/refresh` - Refresh access token
- `POST /auth/reset-password` - Request password reset
- `POST /auth/verify-email` - Verify email address

#### Users

- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update user profile
- `DELETE /users/me` - Delete account (GDPR)
- `GET /users/me/impact` - Get impact summary
- `POST /users/me/export` - Request data export

#### Connections

- `GET /connections` - List connected accounts
- `POST /connections` - Initiate new connection
- `GET /connections/:id` - Get connection details
- `DELETE /connections/:id` - Disconnect account
- `POST /connections/:id/refresh` - Refresh token

#### Donation Rules

- `GET /donation-rules` - List user's rules
- `POST /donation-rules` - Create new rule
- `GET /donation-rules/:id` - Get rule details
- `PATCH /donation-rules/:id` - Update rule
- `DELETE /donation-rules/:id` - Delete rule
- `POST /donation-rules/:id/pause` - Pause rule
- `POST /donation-rules/:id/resume` - Resume rule

#### Donations

- `GET /donations` - List user's donations
- `POST /donations` - Create one-time donation
- `GET /donations/:id` - Get donation details
- `GET /donations/summary` - Aggregated stats

#### Campaigns & Recipients

- `GET /campaigns` - List public campaigns
- `GET /campaigns/:id` - Campaign details
- `GET /recipients` - List recipients
- `GET /recipients/:id` - Recipient profile

#### Waitlist & Partner Requests

- `POST /waitlist` - Join waitlist
- `POST /partner-requests` - Submit integration request

#### Partner API (Requires Partner Auth)

- `POST /partner/trades` - Submit trade event
- `GET /partner/webhooks` - List webhooks
- `POST /partner/webhooks` - Register webhook
- `DELETE /partner/webhooks/:id` - Delete webhook
- `GET /partner/metrics` - Integration metrics
- `POST /partner/api-keys` - Generate API key
- `GET /partner/api-keys` - List API keys
- `DELETE /partner/api-keys/:id` - Revoke API key

#### Admin API (Requires Admin Auth)

- `GET /admin/users` - List users with filters
- `GET /admin/users/:id` - User admin view
- `PATCH /admin/users/:id/status` - Suspend/activate user
- `GET /admin/partner-requests` - Review queue
- `PATCH /admin/partner-requests/:id` - Approve/reject
- `GET /admin/flags` - Flagged activity
- `PATCH /admin/flags/:id` - Resolve flag
- `GET /admin/audit-logs` - Audit trail
- `GET /admin/compliance/reports` - Generate reports

### Webhook Events

Partners can subscribe to the following events:

**User Events:**
- `user.connected` - User connected their account
- `user.disconnected` - User disconnected

**Donation Events:**
- `donation.created` - New donation recorded
- `donation.allocated` - Donation allocated to recipients
- `donation.settled` - Funds settled
- `donation.failed` - Donation failed

**Trade Events:**
- `trade.processed` - Trade successfully processed
- `trade.failed` - Trade processing failed

**Payout Events:**
- `payout.scheduled` - Payout scheduled for recipient
- `payout.completed` - Payout successfully delivered
- `payout.failed` - Payout failed

### Webhook Payload Structure

```json
{
  "id": "evt_1234567890",
  "type": "donation.created",
  "created": "2026-05-10T12:00:00Z",
  "data": {
    "object": {
      "id": "don_abcdefg",
      "userId": "usr_12345",
      "amount": 5.00,
      "currency": "USD",
      "status": "pending"
    }
  },
  "partnerId": "prt_xyz"
}
```

### API Versioning

- **URL Versioning**: `/v1/`, `/v2/`
- **Deprecation Policy**: 6 months notice for breaking changes
- **Sunset Header**: `Sunset: Sat, 01 Jan 2027 00:00:00 GMT`
- **Backward Compatibility**: Additive changes only in minor versions

## Database Schema

See `packages/database/prisma/schema.prisma` for full schema.

### Key Entities

**users**
- `id` (UUID, PK)
- `email` (unique)
- `password_hash`
- `name`
- `status` (active, suspended, deleted)
- `email_verified_at`
- `kyc_status` (pending, verified, failed)
- `created_at`, `updated_at`

**connected_accounts**
- `id` (UUID, PK)
- `user_id` (FK → users)
- `provider` (robinhood, coinbase, etc.)
- `provider_account_id`
- `account_type` (brokerage, crypto)
- `access_token` (encrypted)
- `refresh_token` (encrypted)
- `status` (active, disconnected, error)
- `last_synced_at`

**donation_rules**
- `id` (UUID, PK)
- `user_id` (FK → users)
- `name`
- `rule_type` (percentage, flat, roundup)
- `value` (decimal)
- `conditions` (JSONB)
- `allocations` (JSONB)
- `daily_cap`, `monthly_cap`
- `status` (active, paused)
- `created_at`, `updated_at`

**trade_events**
- `id` (UUID, PK)
- `user_id` (FK → users)
- `connection_id` (FK → connected_accounts)
- `partner_id` (FK → partners)
- `external_trade_id` (unique per partner)
- `symbol`, `side`, `quantity`, `price`
- `trade_value`, `trade_timestamp`
- `status` (received, processed, failed)
- `processed_at`

**donations**
- `id` (UUID, PK)
- `user_id` (FK → users)
- `trade_id` (FK → trade_events, nullable)
- `rule_id` (FK → donation_rules, nullable)
- `amount`, `currency`
- `status` (pending, allocated, settled, disbursed, failed)
- `idempotency_key`
- `created_at`, `updated_at`

**donation_allocations**
- `id` (UUID, PK)
- `donation_id` (FK → donations)
- `recipient_id` (FK → recipients)
- `campaign_id` (FK → campaigns, nullable)
- `amount`
- `percentage`

**recipients**
- `id` (UUID, PK)
- `name`, `description`
- `category` (health, education, environment, etc.)
- `ein` (Tax ID, encrypted)
- `status` (pending, verified, active, suspended)
- `verification_level`
- `payout_info` (JSONB, encrypted)
- `created_at`, `updated_at`

**campaigns**
- `id` (UUID, PK)
- `recipient_id` (FK → recipients)
- `name`, `description`
- `goal_amount`, `raised_amount`
- `status` (active, completed, cancelled)
- `start_date`, `end_date`

**payouts**
- `id` (UUID, PK)
- `recipient_id` (FK → recipients)
- `amount`, `currency`
- `status` (scheduled, processing, completed, failed)
- `payment_method`, `payment_reference`
- `scheduled_at`, `completed_at`

**partners**
- `id` (UUID, PK)
- `name`, `company_name`
- `integration_type` (broker, exchange, wallet, app)
- `status` (pending, active, suspended)
- `webhook_secret`
- `created_at`, `updated_at`

**api_keys**
- `id` (UUID, PK)
- `partner_id` (FK → partners, nullable)
- `user_id` (FK → users, nullable)
- `key_hash` (hashed API key)
- `name`, `scopes` (array)
- `role` (user, partner, admin, agent)
- `last_used_at`, `expires_at`

**webhooks**
- `id` (UUID, PK)
- `partner_id` (FK → partners)
- `url`, `events` (array)
- `secret`, `status`

**webhook_deliveries**
- `id` (UUID, PK)
- `webhook_id` (FK → webhooks)
- `event_type`, `payload` (JSONB)
- `status` (pending, delivered, failed)
- `attempts`, `last_attempt_at`
- `response_code`, `response_body`

**audit_logs**
- `id` (UUID, PK)
- `actor_type`, `actor_id`
- `action`, `entity_type`, `entity_id`
- `changes` (JSONB)
- `ip_address`, `user_agent`
- `created_at`

**fraud_flags**
- `id` (UUID, PK)
- `entity_type`, `entity_id`
- `flag_type`, `severity`
- `reason`, `metadata` (JSONB)
- `status` (pending, reviewed, resolved)
- `reviewed_by`, `reviewed_at`

## Operational Considerations

### Deployment Strategy

**Phase 1: MVP (Months 1-2)**
- Landing page + waitlist
- Basic user auth
- Manual partner onboarding
- Single broker integration (test mode)
- MCP server (basic tools)

**Phase 2: Private Beta (Months 3-4)**
- User dashboard
- Donation rule creation
- Live broker integration (1-2 partners)
- Impact tracking
- Admin dashboard

**Phase 3: Public Launch (Months 5-6)**
- Multiple broker/exchange integrations
- Partner API + webhooks
- Campaign system
- Advanced MCP tools
- Mobile-responsive web app

**Phase 4: Scale (Months 7+)**
- SDK releases
- Embeddable widgets
- Advanced analytics
- International expansion
- Additional payment rails

### Environment Management

**Environments:**
- `local` - Developer machines
- `development` - Shared dev environment
- `staging` - Pre-production testing
- `production` - Live platform

**Configuration:**
- `.env.local` - Local overrides
- `.env.development` - Dev defaults
- `.env.staging` - Staging config
- `.env.production` - Production secrets (vault)

### CI/CD Pipeline

```yaml
# .github/workflows/main.yml
on: [push, pull_request]

jobs:
  test:
    - Lint (ESLint, Prettier)
    - Type check (tsc)
    - Unit tests (Vitest)
    - Integration tests
    - E2E tests (Playwright)

  build:
    - Build all packages
    - Build Docker images
    - Push to registry

  deploy:
    - Deploy to staging (on main branch)
    - Run smoke tests
    - Deploy to production (on tag)
```

### Monitoring & Observability

**Metrics:**
- API request rate, latency, error rate
- Donation processing throughput
- Webhook delivery success rate
- Queue depth and lag
- Database query performance
- Cache hit rate

**Logging:**
- Structured JSON logs (Pino)
- Log levels: error, warn, info, debug
- Request IDs for tracing
- Sensitive data redaction

**Tracing:**
- OpenTelemetry instrumentation
- Distributed tracing across services
- Database query tracing

**Alerting:**
- API error rate > 5%
- Donation processing lag > 5 minutes
- Failed payouts
- Fraud flag spike
- Database connection pool exhaustion

### Backup & Recovery

**Database:**
- Daily automated backups
- Point-in-time recovery enabled
- 30-day retention
- Cross-region replication

**Object Storage:**
- Versioning enabled
- Lifecycle policies
- Cross-region replication

**Disaster Recovery:**
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 15 minutes
- Documented runbooks
- Quarterly DR drills

## Success Metrics

**Platform Metrics:**
- Total donations processed
- Total donation amount
- Active users
- Connected accounts
- Trade events processed
- Recipient disbursements

**User Engagement:**
- Daily active users (DAU)
- Monthly active users (MAU)
- Donation rule creation rate
- Average donations per user
- User retention (day 7, day 30)

**Partner Metrics:**
- Active integrations
- API request volume
- Webhook delivery success rate
- Partner NPS

**Operational:**
- API uptime (target: 99.9%)
- P50/P95/P99 latency
- Error rate (target: <0.1%)
- Support ticket volume
- Time to resolution

This architecture provides a comprehensive foundation for building Donate Protocol as a production-ready, scalable, and secure social impact trading platform.
