# Donate Protocol MCP Server Guide

## Overview

The Donate Protocol MCP (Model Context Protocol) Server exposes platform capabilities to AI agents and tools, enabling natural language interactions with donation workflows, user management, and platform administration.

## Installation

### Prerequisites

- Node.js 20+ LTS
- pnpm 8+
- PostgreSQL 16+ (running)
- Redis 7+ (running)

### Setup

```bash
# Install dependencies
pnpm install

# Set up database
pnpm db:generate
pnpm db:push
pnpm db:seed

# Start MCP server
pnpm mcp:dev
```

## Configuration

The MCP server can be configured for use with various MCP clients:

### Claude Desktop Configuration

Add to your Claude Desktop config file (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
{
  "mcpServers": {
    "donate-protocol": {
      "command": "node",
      "args": ["/path/to/donate-protocol/apps/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://donate:donate@localhost:5432/donate_protocol",
        "REDIS_URL": "redis://localhost:6379",
        "JWT_SECRET": "your-secret-key"
      }
    }
  }
}
```

### VS Code Cline Configuration

In Cline settings, add the MCP server:

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

## Available Tools

The MCP server exposes 25+ tools organized by category:

### Public Tools (No Authentication)

#### create_waitlist_signup
Add an email to the platform launch waitlist.

**Input:**
```json
{
  "email": "trader@example.com",
  "referralSource": "twitter"
}
```

**Output:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "signup": {
    "id": "...",
    "email": "trader@example.com",
    "createdAt": "2026-05-10T12:00:00Z"
  }
}
```

#### create_partner_request
Submit a partner integration request.

**Input:**
```json
{
  "companyName": "Acme Trading",
  "email": "api@acmetrading.com",
  "integrationType": "broker",
  "description": "We want to integrate our brokerage platform",
  "website": "https://acmetrading.com"
}
```

#### get_platform_metrics
Get public platform impact metrics.

**Input:** (none)

**Output:**
```json
{
  "totalDonations": 15432,
  "totalDonationAmount": 125430.50,
  "totalActiveUsers": 3521,
  "totalRecipients": 87,
  "activeCampaigns": 23,
  "impactSummary": "Donate Protocol has facilitated 15,432 donations totaling $125,430.50 to 87 verified nonprofit organizations."
}
```

### User Tools (Require User Authentication)

#### create_user_profile
Create a new user account.

**Input:**
```json
{
  "email": "newuser@example.com",
  "name": "Jane Trader",
  "password": "SecurePassword123!"
}
```

#### connect_trading_account
Initiate connection to a broker/exchange.

**Input:**
```json
{
  "userId": "usr_123",
  "provider": "robinhood",
  "accountType": "brokerage"
}
```

**Output:**
```json
{
  "success": true,
  "message": "Successfully initiated connection to robinhood",
  "connection": {
    "id": "conn_abc",
    "provider": "robinhood",
    "status": "ACTIVE"
  },
  "authUrl": "https://platform.donate-protocol.com/connect/conn_abc"
}
```

#### create_donation_rule
Create an automatic donation rule.

**Input:**
```json
{
  "userId": "usr_123",
  "name": "0.1% of all trades",
  "ruleType": "percentage",
  "value": 0.1,
  "allocations": [
    {
      "recipientId": "rec_health",
      "percentage": 50
    },
    {
      "recipientId": "rec_education",
      "percentage": 50
    }
  ],
  "dailyCap": 10,
  "monthlyCap": 100
}
```

#### simulate_trade_donation
Simulate donation amount for a hypothetical trade.

**Input:**
```json
{
  "userId": "usr_123",
  "symbol": "AAPL",
  "quantity": 100,
  "price": 150,
  "side": "buy"
}
```

**Output:**
```json
{
  "trade": {
    "symbol": "AAPL",
    "quantity": 100,
    "price": 150,
    "side": "buy",
    "tradeValue": 15000
  },
  "estimatedDonation": 15.00,
  "appliedRules": [
    {
      "ruleId": "rule_123",
      "ruleName": "0.1% of all trades",
      "ruleType": "PERCENTAGE",
      "donationAmount": 15.00
    }
  ],
  "message": "This trade would generate $15.00 in donations"
}
```

#### get_donation_history
Retrieve donation history with filters.

**Input:**
```json
{
  "userId": "usr_123",
  "startDate": "2026-01-01",
  "endDate": "2026-05-10",
  "limit": 50
}
```

#### get_user_impact_summary
Get aggregated impact metrics.

**Input:**
```json
{
  "userId": "usr_123",
  "period": "month"
}
```

**Output:**
```json
{
  "period": "month",
  "totalDonated": 127.50,
  "donationCount": 45,
  "recipientsSupported": 3,
  "topRecipients": [
    {
      "recipient": {
        "name": "Global Health Initiative",
        "category": "health"
      },
      "totalDonated": 65.00,
      "donationCount": 23
    }
  ],
  "impactMessage": "You've donated $127.50 across 45 donations, supporting 3 organizations."
}
```

### Campaign Tools

#### list_campaigns
Browse active donation campaigns.

**Input:**
```json
{
  "category": "health",
  "status": "active",
  "limit": 20
}
```

#### donate_now
Make a one-time donation.

**Input:**
```json
{
  "userId": "usr_123",
  "campaignId": "camp_emergency",
  "amount": 25.00,
  "idempotencyKey": "donate_2026_05_10_abc123"
}
```

### Partner Tools (Require Partner Authentication)

#### submit_trade_event
Submit a trade event for processing.

**Input:**
```json
{
  "partnerId": "prt_broker",
  "userId": "usr_123",
  "externalTradeId": "trade_external_789",
  "symbol": "TSLA",
  "side": "sell",
  "quantity": 50,
  "price": 180.50,
  "fees": 1.25,
  "tradeTimestamp": "2026-05-10T14:30:00Z"
}
```

#### register_webhook
Register a webhook for events.

**Input:**
```json
{
  "partnerId": "prt_broker",
  "url": "https://api.partner.com/webhooks/donate",
  "events": ["donation.created", "donation.settled", "payout.completed"],
  "secret": "optional_webhook_secret"
}
```

### Admin Tools (Require Admin Authentication)

#### admin_review_partner_request
Approve or reject partner requests.

#### admin_review_recipient
Verify or suspend recipient organizations.

#### admin_list_flagged_activity
Retrieve flagged activity for review.

#### get_audit_log
Query audit logs for compliance.

## Available Resources

Resources provide read-only access to documentation and data:

### platform://policies
Terms of service, privacy policy, and donation policy.

**Usage:**
```
Read resource: platform://policies
```

### platform://faq
Frequently asked questions organized by category.

### platform://integrations
List of supported brokers, exchanges, and integration guides.

### platform://metrics
Real-time public impact metrics (updated live).

### platform://trust-safety
Security practices, compliance information, and safety measures.

## Authentication & Security

### User Authentication

Most tools require a `userId` parameter representing an authenticated user. In production, this would be extracted from a JWT token or session.

```typescript
// Example: Extract user from auth context
const token = request.headers.authorization?.replace('Bearer ', '');
const user = verifyToken(token);

// Use user.userId in tool calls
```

### API Key Authentication

Partner tools require API key authentication:

```typescript
// Partner makes API call with key
headers: {
  'X-API-Key': 'dpk_your_api_key_here'
}
```

### Rate Limiting

All tools are rate-limited:
- Public tools: 10 requests/minute
- User tools: 60 requests/minute
- Partner tools: 1000 requests/minute
- Admin tools: 100 requests/minute

### Audit Logging

All tool calls are automatically logged with:
- Actor (user, partner, admin, agent)
- Action (tool name)
- Timestamp
- Request parameters (excluding sensitive data)
- Response status

## Error Handling

Tools return standardized error responses:

```json
{
  "error": "Error",
  "message": "User not found",
  "code": "USER_NOT_FOUND",
  "details": {
    "userId": "usr_invalid"
  }
}
```

Common error codes:
- `AUTHENTICATION_REQUIRED` - No auth token provided
- `UNAUTHORIZED` - Invalid permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Best Practices

### Idempotency

For financial operations (donations), always provide an `idempotencyKey`:

```json
{
  "userId": "usr_123",
  "amount": 50.00,
  "idempotencyKey": "donate_2026_05_10_unique_id"
}
```

### Pagination

Use pagination for large result sets:

```json
{
  "limit": 50,
  "offset": 0
}
```

### Error Recovery

Implement retry logic with exponential backoff for transient errors:

```typescript
async function callToolWithRetry(toolName, args, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callTool(toolName, args);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

### Security

- Never log sensitive data (passwords, API keys, tokens)
- Validate all user input
- Use HTTPS for all webhook URLs
- Verify webhook signatures
- Implement proper RBAC checks

## Examples

### Example 1: User Signs Up and Creates First Donation Rule

```typescript
// 1. Create user account
const user = await callTool('create_user_profile', {
  email: 'trader@example.com',
  name: 'John Trader',
  password: 'SecurePass123!'
});

// 2. Connect brokerage account
const connection = await callTool('connect_trading_account', {
  userId: user.user.id,
  provider: 'robinhood'
});

// 3. Browse campaigns to support
const campaigns = await callTool('list_campaigns', {
  category: 'health',
  status: 'active'
});

// 4. Create donation rule
const rule = await callTool('create_donation_rule', {
  userId: user.user.id,
  name: 'Support healthcare 0.1%',
  ruleType: 'percentage',
  value: 0.1,
  allocations: [
    { recipientId: campaigns.campaigns[0].recipientId, percentage: 100 }
  ],
  monthlyCap: 100
});

// 5. Simulate impact
const simulation = await callTool('simulate_trade_donation', {
  userId: user.user.id,
  symbol: 'AAPL',
  quantity: 100,
  price: 150,
  side: 'buy'
});
```

### Example 2: Partner Submits Trade and Monitors Status

```typescript
// 1. Submit trade event
const trade = await callTool('submit_trade_event', {
  partnerId: 'prt_broker',
  userId: 'usr_trader',
  externalTradeId: 'trade_12345',
  symbol: 'TSLA',
  side: 'buy',
  quantity: 50,
  price: 200,
  tradeTimestamp: new Date().toISOString()
});

// 2. Register webhook to track donations
const webhook = await callTool('register_webhook', {
  partnerId: 'prt_broker',
  url: 'https://api.mybroker.com/webhooks/donate',
  events: ['donation.created', 'donation.settled']
});

// 3. Webhook will receive events like:
// POST https://api.mybroker.com/webhooks/donate
// {
//   "id": "evt_123",
//   "type": "donation.created",
//   "data": {
//     "donationId": "don_abc",
//     "tradeId": "trade_12345",
//     "amount": 10.00
//   }
// }
```

## Troubleshooting

### Common Issues

**Issue: "Database connection failed"**
- Ensure PostgreSQL is running: `docker-compose ps`
- Check DATABASE_URL in .env.local
- Run `pnpm db:push` to sync schema

**Issue: "Tool not found"**
- Check tool name spelling (case-sensitive)
- Ensure you're using the correct MCP server version
- Restart the MCP server

**Issue: "Unauthorized"**
- Verify JWT token is valid
- Check token hasn't expired
- Ensure user has required role/permissions

### Debug Mode

Enable debug logging:

```bash
DEBUG=donate:* pnpm mcp:dev
```

### Health Check

Verify MCP server is working:

```bash
# Call a public tool
echo '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "get_platform_metrics", "arguments": {}}, "id": 1}' | pnpm mcp:dev
```

## Support

- GitHub Issues: Report bugs and request features
- Email: support@donate-protocol.com
- Documentation: https://docs.donate-protocol.com
