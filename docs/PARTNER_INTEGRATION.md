# API Integration Guide

## Exchange & Broker Connections

### Supported Integrations

#### Stock Brokers
- **Alpaca** - Stocks & options
- **Interactive Brokers** - Global markets
- **Robinhood** - Stocks, crypto, options
- **Webull** - Stocks & crypto

#### Crypto Exchanges
- **Coinbase** - Pro & advanced trading
- **Kraken** - Spot & futures
- **Binance** - Spot trading
- **FTX** - (Planned) Spot & derivatives

#### Traditional Brokers
- **Charles Schwab** - Stocks & options
- **Fidelity** - Comprehensive trading
- **TD Ameritrade** - Integrated
- **E*TRADE** - Legacy platform

### Integration Architecture

```
┌─────────────────────┐
│   Trading Platform  │
│  (Broker/Exchange)  │
└──────────┬──────────┘
           │
      OAuth 2.0 / API Keys
           │
┌──────────▼──────────┐
│  Donation Protocol  │
│   Connection Layer  │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼────┐   ┌───▼────┐
│ Plaid  │   │ Direct  │
│ (KYC)  │   │  OAuth  │
└────────┘   └────────┘
```

## Implementation Steps

### 1. Connect Trading Account

```typescript
// Step 1: Initiate connection
const connection = await POST /connections
  {
    "provider": "alpaca",
    "accountType": "brokerage"
  }

// Step 2: User authorizes in OAuth flow
// -> Browser redirects to Alpaca OAuth endpoint
// -> User grants permissions
// -> Callback to our app

// Step 3: Exchange auth code for token
const token = await handleOAuthCallback(code);

// Step 4: Store encrypted token
await db.connectedAccount.create({
  userId: request.user.id,
  provider: "alpaca",
  accessToken: encrypt(token.access_token),
  refreshToken: encrypt(token.refresh_token),
  status: "ACTIVE"
})
```

### 2. Ingest Trades

```typescript
// Partner submits trade event
POST /partner/trades
  X-API-Key: <partner-key>
  {
    "externalTradeId": "alpaca-trade-12345",
    "symbol": "AAPL",
    "side": "BUY",
    "quantity": 100,
    "price": 150.25,
    "tradeValue": 15025.00,
    "tradeTimestamp": "2024-05-13T10:30:00Z"
  }

// Response
{
  "id": "trade-abc123",
  "status": "RECEIVED"
}
```

### 3. Process Donations

```typescript
// Rules engine evaluates trade
const rule = await db.donationRule.findFirst({
  where: {
    userId: trade.userId,
    ruleType: "PERCENTAGE",
    status: "ACTIVE"
  }
});

// Calculate donation
const donationAmount = trade.tradeValue * (rule.value / 100);

// Create donation intent
const donation = await db.donation.create({
  userId: trade.userId,
  tradeId: trade.id,
  ruleId: rule.id,
  amount: donationAmount,
  currency: "USD",
  status: "PENDING"
});

// Allocate to recipients
await db.donationAllocation.create({
  donationId: donation.id,
  recipientId: rule.allocations[0].recipientId,
  percentage: 100,
  amount: donationAmount
});
```

### 4. Webhook Notifications

```typescript
// Send webhook to partner
const payload = {
  id: "evt_123",
  type: "donation.created",
  created: new Date().toISOString(),
  data: {
    object: {
      id: "don_abc",
      userId: "usr_xyz",
      amount: 15.03,
      currency: "USD",
      status: "PENDING"
    }
  }
};

// Sign webhook
const signature = generateHMAC(
  JSON.stringify(payload),
  partner.webhookSecret
);

// Deliver
await fetch(partner.webhookUrl, {
  method: 'POST',
  headers: {
    'X-Donate-Signature': signature,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});
```

## API Endpoints Reference

### Authentication

```bash
# Register user
POST /auth/register
{
  "email": "trader@example.com",
  "name": "John Trader",
  "password": "secure_password_123"
}

# Login
POST /auth/login
{
  "email": "trader@example.com",
  "password": "secure_password_123"
}
Response: { "token": "jwt_token", "user": {...} }

# Refresh token
POST /auth/refresh
Authorization: Bearer jwt_token
```

### Connections

```bash
# List connected accounts
GET /connections
Authorization: Bearer jwt_token

# Initiate new connection
POST /connections
{
  "provider": "alpaca",
  "accountType": "brokerage"
}
Response: { "authUrl": "https://...", "connectionId": "..." }

# Disconnect account
DELETE /connections/:id
Authorization: Bearer jwt_token

# Refresh token for connection
POST /connections/:id/refresh
Authorization: Bearer jwt_token
```

### Donation Rules

```bash
# List rules
GET /donations/rules
Authorization: Bearer jwt_token

# Create rule
POST /donations/rules
{
  "name": "Regular Contribution",
  "ruleType": "PERCENTAGE",
  "value": 0.1,
  "allocations": [
    {
      "recipientId": "rec_123",
      "percentage": 100
    }
  ],
  "dailyCap": 10,
  "monthlyCap": 100
}

# Pause rule
POST /donations/rules/:id/pause

# Resume rule
POST /donations/rules/:id/resume

# Delete rule
DELETE /donations/rules/:id
```

### Donations

```bash
# List donations
GET /donations
Authorization: Bearer jwt_token

# Get donation details
GET /donations/:id

# Create manual donation
POST /donations
{
  "recipientId": "rec_123",
  "amount": 50.00,
  "campaignId": "camp_456"
}

# Get donation summary
GET /donations/summary
```

### Campaigns

```bash
# List active campaigns
GET /campaigns

# Get campaign details
GET /campaigns/:id

# List recipients
GET /campaigns/recipients

# Get recipient profile
GET /campaigns/recipients/:id
```

### Partner API

```bash
# Submit trade
POST /partner/trades
X-API-Key: partner_key_xyz
{
  "externalTradeId": "trade_123",
  "symbol": "AAPL",
  "side": "BUY",
  "quantity": 100,
  "price": 150.25,
  "tradeValue": 15025.00,
  "tradeTimestamp": "2024-05-13T10:30:00Z"
}

# List webhooks
GET /partner/webhooks
X-API-Key: partner_key_xyz

# Register webhook
POST /partner/webhooks
X-API-Key: partner_key_xyz
{
  "url": "https://partner.com/webhook",
  "events": ["donation.created", "donation.settled"]
}

# Get metrics
GET /partner/metrics
X-API-Key: partner_key_xyz
```

### Admin API

```bash
# List partner requests
GET /admin/partner-requests
Authorization: Bearer admin_token

# Review partner request
PATCH /admin/partner-requests/:id
{
  "requestId": "preq_123",
  "decision": "APPROVED",
  "notes": "Verified company details"
}

# List flagged activity
GET /admin/flags
Authorization: Bearer admin_token

# Get audit logs
GET /admin/audit-logs
Authorization: Bearer admin_token
```

## Error Handling

### Common Errors

```json
{
  "code": "INVALID_REQUEST",
  "message": "Email is required",
  "statusCode": 400
}

{
  "code": "UNAUTHORIZED",
  "message": "Invalid credentials",
  "statusCode": 401
}

{
  "code": "FORBIDDEN",
  "message": "Insufficient permissions",
  "statusCode": 403
}

{
  "code": "NOT_FOUND",
  "message": "Recipient not found",
  "statusCode": 404
}

{
  "code": "CONFLICT",
  "message": "User already exists",
  "statusCode": 409
}

{
  "code": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred",
  "statusCode": 500
}
```

## Rate Limiting

- **Per User**: 1000 requests/hour
- **Per IP**: 100 requests/minute
- **Per Partner**: 10,000 requests/day
- **Webhook Delivery**: 3 retry attempts with exponential backoff

## Testing Integration

```bash
# Test connection
curl https://api.donate-protocol.com/health

# Test auth
curl -X POST https://api.donate-protocol.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'

# Test partner API
curl -X POST https://api.donate-protocol.com/partner/trades \
  -H "X-API-Key: test_key" \
  -H "Content-Type: application/json" \
  -d '{
    "externalTradeId": "test_123",
    "symbol": "AAPL",
    "side": "BUY",
    "quantity": 10,
    "price": 150,
    "tradeValue": 1500,
    "tradeTimestamp": "2024-05-13T10:30:00Z"
  }'
```

## Security Considerations

- Always use HTTPS
- Rotate API keys regularly
- Verify webhook signatures
- Use environment variables for secrets
- Implement request signing for sensitive operations
- Monitor for suspicious activity
- Keep integration tokens encrypted
- Log all API access for audit trail
