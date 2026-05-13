/**
 * MCP Tool Definitions
 *
 * All available tools exposed by the Donate Protocol MCP server.
 * Tools are organized by category: public, user, campaign, partner, and admin.
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const tools: Tool[] = [
  // ============================================================================
  // PUBLIC TOOLS (No Authentication Required)
  // ============================================================================

  {
    name: 'create_waitlist_signup',
    description: 'Add an email address to the platform launch waitlist',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'Email address to add to waitlist',
        },
        referralSource: {
          type: 'string',
          description: 'Optional referral source (e.g., "twitter", "friend")',
        },
      },
      required: ['email'],
    },
  },

  {
    name: 'create_partner_request',
    description: 'Submit a partner integration request for broker/exchange/wallet integration',
    inputSchema: {
      type: 'object',
      properties: {
        companyName: {
          type: 'string',
          description: 'Company or organization name',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Contact email',
        },
        integrationType: {
          type: 'string',
          enum: ['broker', 'exchange', 'wallet', 'app', 'other'],
          description: 'Type of integration',
        },
        description: {
          type: 'string',
          description: 'Description of the proposed integration',
        },
        website: {
          type: 'string',
          format: 'uri',
          description: 'Company website URL',
        },
        contactName: {
          type: 'string',
          description: 'Contact person name',
        },
      },
      required: ['companyName', 'email', 'integrationType', 'description'],
    },
  },

  {
    name: 'get_platform_metrics',
    description: 'Get public platform impact metrics (total donations, recipients, etc.)',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },

  {
    name: 'get_supported_integrations',
    description: 'List supported brokers, exchanges, and integrations',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['broker', 'exchange', 'wallet', 'all'],
          description: 'Filter by integration type',
        },
      },
    },
  },

  // ============================================================================
  // USER TOOLS (Require User Authentication)
  // ============================================================================

  {
    name: 'create_user_profile',
    description: 'Create a new user account on the platform',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
        name: {
          type: 'string',
        },
        password: {
          type: 'string',
          minLength: 8,
          description: 'Password (min 8 characters)',
        },
      },
      required: ['email', 'name', 'password'],
    },
  },

  {
    name: 'connect_trading_account',
    description: 'Initiate connection to a brokerage or exchange account',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'User ID (from authentication context)',
        },
        provider: {
          type: 'string',
          enum: ['robinhood', 'coinbase', 'alpaca', 'interactive_brokers', 'test_broker'],
          description: 'Broker or exchange provider',
        },
        accountType: {
          type: 'string',
          enum: ['brokerage', 'crypto'],
        },
      },
      required: ['userId', 'provider'],
    },
  },

  {
    name: 'list_connected_accounts',
    description: 'List all connected trading accounts for a user',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['active', 'disconnected', 'error', 'all'],
          description: 'Filter by connection status',
        },
      },
      required: ['userId'],
    },
  },

  {
    name: 'create_donation_rule',
    description: 'Create an automatic donation rule for trades',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        name: {
          type: 'string',
          description: 'Rule name (e.g., "0.1% of all trades")',
        },
        ruleType: {
          type: 'string',
          enum: ['percentage', 'flat', 'roundup', 'conditional'],
        },
        value: {
          type: 'number',
          description: 'Percentage (0-100) or dollar amount',
        },
        conditions: {
          type: 'object',
          description: 'Optional conditions (symbols, minTradeValue, onlyProfitable, etc.)',
          properties: {
            symbols: {
              type: 'array',
              items: { type: 'string' },
            },
            minTradeValue: {
              type: 'number',
            },
            onlyProfitable: {
              type: 'boolean',
            },
          },
        },
        allocations: {
          type: 'array',
          description: 'How to allocate donations across recipients/campaigns',
          items: {
            type: 'object',
            properties: {
              recipientId: { type: 'string' },
              campaignId: { type: 'string' },
              percentage: { type: 'number' },
            },
            required: ['percentage'],
          },
        },
        dailyCap: {
          type: 'number',
          description: 'Maximum donation per day (optional)',
        },
        monthlyCap: {
          type: 'number',
          description: 'Maximum donation per month (optional)',
        },
      },
      required: ['userId', 'name', 'ruleType', 'value', 'allocations'],
    },
  },

  {
    name: 'simulate_trade_donation',
    description: 'Simulate how much would be donated for a hypothetical trade',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        symbol: {
          type: 'string',
          description: 'Stock or crypto symbol (e.g., "AAPL", "BTC")',
        },
        quantity: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        side: {
          type: 'string',
          enum: ['buy', 'sell'],
        },
      },
      required: ['userId', 'symbol', 'quantity', 'price', 'side'],
    },
  },

  {
    name: 'get_donation_history',
    description: "Retrieve a user's donation history with filtering",
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        limit: {
          type: 'number',
          default: 50,
          maximum: 200,
        },
        offset: {
          type: 'number',
          default: 0,
        },
      },
      required: ['userId'],
    },
  },

  {
    name: 'get_user_impact_summary',
    description: "Get aggregated impact metrics for a user's donations",
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        period: {
          type: 'string',
          enum: ['week', 'month', 'year', 'all'],
          default: 'all',
        },
      },
      required: ['userId'],
    },
  },

  {
    name: 'pause_donation_rule',
    description: 'Temporarily pause an automatic donation rule',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        ruleId: {
          type: 'string',
        },
      },
      required: ['userId', 'ruleId'],
    },
  },

  {
    name: 'resume_donation_rule',
    description: 'Resume a paused donation rule',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        ruleId: {
          type: 'string',
        },
      },
      required: ['userId', 'ruleId'],
    },
  },

  // ============================================================================
  // CAMPAIGN & RECIPIENT TOOLS
  // ============================================================================

  {
    name: 'list_campaigns',
    description: 'Browse active donation campaigns',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Filter by category (health, education, environment)',
        },
        status: {
          type: 'string',
          enum: ['active', 'completed', 'all'],
          default: 'active',
        },
        limit: {
          type: 'number',
          default: 20,
          maximum: 100,
        },
      },
    },
  },

  {
    name: 'get_campaign_details',
    description: 'Get detailed information about a specific campaign',
    inputSchema: {
      type: 'object',
      properties: {
        campaignId: {
          type: 'string',
        },
      },
      required: ['campaignId'],
    },
  },

  {
    name: 'list_recipients',
    description: 'List verified nonprofit recipients',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['verified', 'active', 'all'],
        },
        limit: {
          type: 'number',
          default: 20,
        },
      },
    },
  },

  {
    name: 'get_recipient_profile',
    description: 'Get detailed profile and impact metrics for a recipient',
    inputSchema: {
      type: 'object',
      properties: {
        recipientId: {
          type: 'string',
        },
      },
      required: ['recipientId'],
    },
  },

  {
    name: 'donate_now',
    description: 'Make a one-time donation to a recipient or campaign',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        recipientId: {
          type: 'string',
          description: 'Recipient ID (required if no campaignId)',
        },
        campaignId: {
          type: 'string',
          description: 'Campaign ID (required if no recipientId)',
        },
        amount: {
          type: 'number',
          minimum: 1,
          description: 'Donation amount in USD',
        },
        idempotencyKey: {
          type: 'string',
          description: 'Unique key to prevent duplicate donations',
        },
      },
      required: ['userId', 'amount'],
    },
  },

  // ============================================================================
  // PARTNER TOOLS (Require Partner Authentication)
  // ============================================================================

  {
    name: 'submit_trade_event',
    description: 'Submit a trade event for donation processing (Partner API)',
    inputSchema: {
      type: 'object',
      properties: {
        partnerId: {
          type: 'string',
        },
        userId: {
          type: 'string',
        },
        externalTradeId: {
          type: 'string',
          description: "Partner's unique trade ID",
        },
        symbol: {
          type: 'string',
        },
        side: {
          type: 'string',
          enum: ['buy', 'sell'],
        },
        quantity: {
          type: 'number',
        },
        price: {
          type: 'number',
        },
        fees: {
          type: 'number',
        },
        tradeTimestamp: {
          type: 'string',
          format: 'date-time',
        },
      },
      required: [
        'partnerId',
        'userId',
        'externalTradeId',
        'symbol',
        'side',
        'quantity',
        'price',
        'tradeTimestamp',
      ],
    },
  },

  {
    name: 'register_webhook',
    description: 'Register a webhook endpoint for event notifications (Partner API)',
    inputSchema: {
      type: 'object',
      properties: {
        partnerId: {
          type: 'string',
        },
        url: {
          type: 'string',
          format: 'uri',
        },
        events: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Event types to subscribe to',
        },
        secret: {
          type: 'string',
          description: 'Optional secret for signature verification',
        },
      },
      required: ['partnerId', 'url', 'events'],
    },
  },

  {
    name: 'list_webhooks',
    description: 'List registered webhooks for a partner',
    inputSchema: {
      type: 'object',
      properties: {
        partnerId: {
          type: 'string',
        },
      },
      required: ['partnerId'],
    },
  },

  // ============================================================================
  // ADMIN TOOLS (Require Admin Authentication)
  // ============================================================================

  {
    name: 'admin_review_partner_request',
    description: 'Approve or reject a partner integration request (Admin)',
    inputSchema: {
      type: 'object',
      properties: {
        adminId: {
          type: 'string',
        },
        requestId: {
          type: 'string',
        },
        decision: {
          type: 'string',
          enum: ['approved', 'rejected'],
        },
        notes: {
          type: 'string',
        },
      },
      required: ['adminId', 'requestId', 'decision'],
    },
  },

  {
    name: 'admin_review_recipient',
    description: 'Verify or suspend a recipient organization (Admin)',
    inputSchema: {
      type: 'object',
      properties: {
        adminId: {
          type: 'string',
        },
        recipientId: {
          type: 'string',
        },
        action: {
          type: 'string',
          enum: ['verify', 'suspend', 'activate'],
        },
        verificationLevel: {
          type: 'string',
          enum: ['basic', 'standard', 'enhanced'],
        },
        notes: {
          type: 'string',
        },
      },
      required: ['adminId', 'recipientId', 'action'],
    },
  },

  {
    name: 'admin_list_flagged_activity',
    description: 'Retrieve flagged users, donations, or suspicious activity (Admin)',
    inputSchema: {
      type: 'object',
      properties: {
        adminId: {
          type: 'string',
        },
        entityType: {
          type: 'string',
          enum: ['user', 'donation', 'recipient', 'partner', 'all'],
        },
        status: {
          type: 'string',
          enum: ['pending', 'investigating', 'resolved'],
          default: 'pending',
        },
        severity: {
          type: 'string',
          enum: ['low', 'medium', 'high', 'critical'],
        },
        limit: {
          type: 'number',
          default: 50,
        },
      },
      required: ['adminId'],
    },
  },

  {
    name: 'get_audit_log',
    description: 'Query audit logs for compliance and investigation (Admin)',
    inputSchema: {
      type: 'object',
      properties: {
        adminId: {
          type: 'string',
        },
        entityType: {
          type: 'string',
        },
        entityId: {
          type: 'string',
        },
        actorId: {
          type: 'string',
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        limit: {
          type: 'number',
          default: 100,
        },
      },
      required: ['adminId'],
    },
  },

  {
    name: 'create_support_ticket',
    description: 'Create a support ticket for user issues',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
        },
        subject: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        category: {
          type: 'string',
          enum: ['billing', 'technical', 'account', 'donation', 'other'],
        },
        priority: {
          type: 'string',
          enum: ['low', 'medium', 'high', 'urgent'],
          default: 'medium',
        },
      },
      required: ['userId', 'subject', 'description'],
    },
  },
];
