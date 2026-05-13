/**
 * MCP Tool Handler
 *
 * Implements the business logic for all MCP tools.
 * Routes tool calls to appropriate service functions.
 */

import { prisma } from '@donate/database';
import { hash } from 'bcrypt';

export async function handleToolCall(name: string, args: Record<string, unknown>) {
  // Route to appropriate handler based on tool name
  switch (name) {
    // Public tools
    case 'create_waitlist_signup':
      return handleCreateWaitlistSignup(args);
    case 'create_partner_request':
      return handleCreatePartnerRequest(args);
    case 'get_platform_metrics':
      return handleGetPlatformMetrics(args);
    case 'get_supported_integrations':
      return handleGetSupportedIntegrations(args);

    // User tools
    case 'create_user_profile':
      return handleCreateUserProfile(args);
    case 'connect_trading_account':
      return handleConnectTradingAccount(args);
    case 'list_connected_accounts':
      return handleListConnectedAccounts(args);
    case 'create_donation_rule':
      return handleCreateDonationRule(args);
    case 'simulate_trade_donation':
      return handleSimulateTradeDonation(args);
    case 'get_donation_history':
      return handleGetDonationHistory(args);
    case 'get_user_impact_summary':
      return handleGetUserImpactSummary(args);
    case 'pause_donation_rule':
      return handlePauseDonationRule(args);
    case 'resume_donation_rule':
      return handleResumeDonationRule(args);

    // Campaign tools
    case 'list_campaigns':
      return handleListCampaigns(args);
    case 'get_campaign_details':
      return handleGetCampaignDetails(args);
    case 'list_recipients':
      return handleListRecipients(args);
    case 'get_recipient_profile':
      return handleGetRecipientProfile(args);
    case 'donate_now':
      return handleDonateNow(args);

    // Partner tools
    case 'submit_trade_event':
      return handleSubmitTradeEvent(args);
    case 'register_webhook':
      return handleRegisterWebhook(args);
    case 'list_webhooks':
      return handleListWebhooks(args);

    // Admin tools
    case 'admin_review_partner_request':
      return handleAdminReviewPartnerRequest(args);
    case 'admin_review_recipient':
      return handleAdminReviewRecipient(args);
    case 'admin_list_flagged_activity':
      return handleAdminListFlaggedActivity(args);
    case 'get_audit_log':
      return handleGetAuditLog(args);
    case 'create_support_ticket':
      return handleCreateSupportTicket(args);

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ============================================================================
// PUBLIC TOOLS
// ============================================================================

async function handleCreateWaitlistSignup(args: Record<string, unknown>) {
  const { email, referralSource } = args as { email: string; referralSource?: string };

  const signup = await prisma.waitlistSignup.create({
    data: {
      email,
      referralSource: referralSource || null,
      status: 'PENDING',
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'Successfully added to waitlist',
            signup: {
              id: signup.id,
              email: signup.email,
              createdAt: signup.createdAt,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleCreatePartnerRequest(args: Record<string, unknown>) {
  const { companyName, email, integrationType, description, website, contactName } = args as {
    companyName: string;
    email: string;
    integrationType: string;
    description: string;
    website?: string;
    contactName?: string;
  };

  const request = await prisma.partnerRequest.create({
    data: {
      companyName,
      email,
      integrationType: integrationType.toUpperCase() as any,
      description,
      website: website || null,
      contactName: contactName || null,
      status: 'PENDING',
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'Partner integration request submitted successfully',
            request: {
              id: request.id,
              companyName: request.companyName,
              status: request.status,
              createdAt: request.createdAt,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetPlatformMetrics(_args: Record<string, unknown>) {
  const [totalDonations, totalUsers, totalRecipients, totalCampaigns, donationStats] =
    await Promise.all([
      prisma.donation.count({ where: { status: 'DISBURSED' } }),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.recipient.count({ where: { status: { in: ['VERIFIED', 'ACTIVE'] } } }),
      prisma.campaign.count({ where: { status: 'ACTIVE' } }),
      prisma.donation.aggregate({
        where: { status: 'DISBURSED' },
        _sum: { amount: true },
      }),
    ]);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            totalDonations,
            totalDonationAmount: donationStats._sum.amount || 0,
            totalActiveUsers: totalUsers,
            totalRecipients,
            activeCampaigns: totalCampaigns,
            impactSummary: `Donate Protocol has facilitated ${totalDonations.toLocaleString()} donations totaling $${(donationStats._sum.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to ${totalRecipients} verified nonprofit organizations.`,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetSupportedIntegrations(args: Record<string, unknown>) {
  const { type } = args as { type?: string };

  const where: any = { status: 'ACTIVE' };
  if (type && type !== 'all') {
    where.integrationType = type.toUpperCase();
  }

  const partners = await prisma.partner.findMany({
    where,
    select: {
      id: true,
      name: true,
      integrationType: true,
      description: true,
      website: true,
      logoUrl: true,
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            integrations: partners,
            count: partners.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

// ============================================================================
// USER TOOLS
// ============================================================================

async function handleCreateUserProfile(args: Record<string, unknown>) {
  const { email, name, password } = args as { email: string; name: string; password: string };

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      status: 'ACTIVE',
      role: 'USER',
      kycStatus: 'PENDING',
    },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      createdAt: true,
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'User account created successfully',
            user,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleConnectTradingAccount(args: Record<string, unknown>) {
  const { userId, provider, accountType } = args as {
    userId: string;
    provider: string;
    accountType?: string;
  };

  // In production, this would initiate OAuth flow
  // For now, create a mock connection
  const connection = await prisma.connectedAccount.create({
    data: {
      userId,
      provider,
      providerAccountId: `mock_${Date.now()}`,
      accountType: (accountType?.toUpperCase() || 'BROKERAGE') as any,
      status: 'ACTIVE',
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: `Successfully initiated connection to ${provider}`,
            connection: {
              id: connection.id,
              provider: connection.provider,
              status: connection.status,
              accountType: connection.accountType,
            },
            authUrl: `https://platform.donate-protocol.com/connect/${connection.id}`,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleListConnectedAccounts(args: Record<string, unknown>) {
  const { userId, status } = args as { userId: string; status?: string };

  const where: any = { userId };
  if (status && status !== 'all') {
    where.status = status.toUpperCase();
  }

  const accounts = await prisma.connectedAccount.findMany({
    where,
    select: {
      id: true,
      provider: true,
      accountType: true,
      accountName: true,
      status: true,
      lastSyncedAt: true,
      createdAt: true,
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            accounts,
            count: accounts.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleCreateDonationRule(args: Record<string, unknown>) {
  const {
    userId,
    name,
    ruleType,
    value,
    conditions,
    allocations,
    dailyCap,
    monthlyCap,
  } = args as any;

  const rule = await prisma.donationRule.create({
    data: {
      userId,
      name,
      ruleType: ruleType.toUpperCase(),
      value,
      conditions: conditions || {},
      allocations,
      dailyCap: dailyCap || null,
      monthlyCap: monthlyCap || null,
      status: 'ACTIVE',
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'Donation rule created successfully',
            rule: {
              id: rule.id,
              name: rule.name,
              ruleType: rule.ruleType,
              value: rule.value,
              status: rule.status,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleSimulateTradeDonation(args: Record<string, unknown>) {
  const { userId, symbol, quantity, price, side } = args as {
    userId: string;
    symbol: string;
    quantity: number;
    price: number;
    side: string;
  };

  const tradeValue = quantity * price;

  // Get user's donation rules
  const rules = await prisma.donationRule.findMany({
    where: { userId, status: 'ACTIVE' },
  });

  const appliedRules = [];
  let totalDonation = 0;

  for (const rule of rules) {
    let donation = 0;

    switch (rule.ruleType) {
      case 'PERCENTAGE':
        donation = (tradeValue * rule.value) / 100;
        break;
      case 'FLAT':
        donation = rule.value;
        break;
      case 'ROUNDUP':
        const roundedValue = Math.ceil(tradeValue / rule.value) * rule.value;
        donation = roundedValue - tradeValue;
        break;
    }

    if (donation > 0) {
      appliedRules.push({
        ruleId: rule.id,
        ruleName: rule.name,
        ruleType: rule.ruleType,
        donationAmount: donation,
      });
      totalDonation += donation;
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            trade: {
              symbol,
              quantity,
              price,
              side,
              tradeValue,
            },
            estimatedDonation: totalDonation,
            appliedRules,
            message: `This trade would generate $${totalDonation.toFixed(2)} in donations`,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetDonationHistory(args: Record<string, unknown>) {
  const { userId, startDate, endDate, limit, offset } = args as any;

  const where: any = { userId };
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      where,
      include: {
        rule: { select: { name: true } },
        allocations: {
          include: {
            recipient: { select: { name: true } },
          },
        },
      },
      take: limit || 50,
      skip: offset || 0,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.donation.count({ where }),
  ]);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            donations,
            total,
            hasMore: total > (offset || 0) + donations.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetUserImpactSummary(args: Record<string, unknown>) {
  const { userId, period } = args as { userId: string; period?: string };

  const where: any = { userId, status: 'DISBURSED' };

  // Calculate date range based on period
  if (period && period !== 'all') {
    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    where.createdAt = { gte: startDate };
  }

  const [stats, allocations] = await Promise.all([
    prisma.donation.aggregate({
      where,
      _sum: { amount: true },
      _count: true,
    }),
    prisma.donationAllocation.findMany({
      where: {
        donation: where,
      },
      include: {
        recipient: {
          select: { id: true, name: true, category: true },
        },
      },
    }),
  ]);

  // Group by recipient
  const recipientMap = new Map();
  for (const allocation of allocations) {
    const existing = recipientMap.get(allocation.recipientId) || {
      recipient: allocation.recipient,
      totalDonated: 0,
      donationCount: 0,
    };
    existing.totalDonated += allocation.amount;
    existing.donationCount++;
    recipientMap.set(allocation.recipientId, existing);
  }

  const topRecipients = Array.from(recipientMap.values())
    .sort((a, b) => b.totalDonated - a.totalDonated)
    .slice(0, 5);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            period: period || 'all',
            totalDonated: stats._sum.amount || 0,
            donationCount: stats._count,
            recipientsSupported: recipientMap.size,
            topRecipients,
            impactMessage: `You've donated $${(stats._sum.amount || 0).toFixed(2)} across ${stats._count} donations, supporting ${recipientMap.size} organizations.`,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handlePauseDonationRule(args: Record<string, unknown>) {
  const { userId, ruleId } = args as { userId: string; ruleId: string };

  const rule = await prisma.donationRule.update({
    where: { id: ruleId, userId },
    data: {
      status: 'PAUSED',
      pausedAt: new Date(),
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: `Donation rule "${rule.name}" has been paused`,
            rule: {
              id: rule.id,
              name: rule.name,
              status: rule.status,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleResumeDonationRule(args: Record<string, unknown>) {
  const { userId, ruleId } = args as { userId: string; ruleId: string };

  const rule = await prisma.donationRule.update({
    where: { id: ruleId, userId },
    data: {
      status: 'ACTIVE',
      pausedAt: null,
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: `Donation rule "${rule.name}" has been resumed`,
            rule: {
              id: rule.id,
              name: rule.name,
              status: rule.status,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

// ============================================================================
// CAMPAIGN TOOLS
// ============================================================================

async function handleListCampaigns(args: Record<string, unknown>) {
  const { category, status, limit } = args as any;

  const where: any = {};
  if (status && status !== 'all') {
    where.status = status.toUpperCase();
  }
  if (category) {
    where.recipient = { category };
  }

  const campaigns = await prisma.campaign.findMany({
    where,
    include: {
      recipient: {
        select: {
          name: true,
          category: true,
          logoUrl: true,
        },
      },
    },
    take: limit || 20,
    orderBy: { createdAt: 'desc' },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            campaigns,
            count: campaigns.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetCampaignDetails(args: Record<string, unknown>) {
  const { campaignId } = args as { campaignId: string };

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      recipient: true,
      impactUpdates: {
        orderBy: { publishedAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!campaign) {
    throw new Error('Campaign not found');
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(campaign, null, 2),
      },
    ],
  };
}

async function handleListRecipients(args: Record<string, unknown>) {
  const { category, status, limit } = args as any;

  const where: any = {};
  if (status) {
    if (status === 'verified') {
      where.status = { in: ['VERIFIED', 'ACTIVE'] };
    } else if (status !== 'all') {
      where.status = status.toUpperCase();
    }
  }
  if (category) {
    where.category = category;
  }

  const recipients = await prisma.recipient.findMany({
    where,
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      logoUrl: true,
      totalReceived: true,
      donorCount: true,
      status: true,
    },
    take: limit || 20,
    orderBy: { totalReceived: 'desc' },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            recipients,
            count: recipients.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetRecipientProfile(args: Record<string, unknown>) {
  const { recipientId } = args as { recipientId: string };

  const recipient = await prisma.recipient.findUnique({
    where: { id: recipientId },
    include: {
      campaigns: {
        where: { status: 'ACTIVE' },
        take: 5,
      },
      impactUpdates: {
        orderBy: { publishedAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!recipient) {
    throw new Error('Recipient not found');
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(recipient, null, 2),
      },
    ],
  };
}

async function handleDonateNow(args: Record<string, unknown>) {
  const { userId, recipientId, campaignId, amount, idempotencyKey } = args as any;

  if (!recipientId && !campaignId) {
    throw new Error('Either recipientId or campaignId is required');
  }

  // Get recipient from campaign if campaignId provided
  let targetRecipientId = recipientId;
  if (campaignId && !recipientId) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { recipientId: true },
    });
    targetRecipientId = campaign?.recipientId;
  }

  // Create donation
  const donation = await prisma.donation.create({
    data: {
      userId,
      amount,
      currency: 'USD',
      status: 'PENDING',
      idempotencyKey: idempotencyKey || `donate_${Date.now()}_${Math.random()}`,
    },
  });

  // Create allocation
  await prisma.donationAllocation.create({
    data: {
      donationId: donation.id,
      recipientId: targetRecipientId,
      campaignId: campaignId || null,
      amount,
      percentage: 100,
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: `Donation of $${amount.toFixed(2)} created successfully`,
            donation: {
              id: donation.id,
              amount: donation.amount,
              status: donation.status,
              createdAt: donation.createdAt,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

// ============================================================================
// PARTNER TOOLS
// ============================================================================

async function handleSubmitTradeEvent(args: Record<string, unknown>) {
  const {
    partnerId,
    userId,
    externalTradeId,
    symbol,
    side,
    quantity,
    price,
    fees,
    tradeTimestamp,
  } = args as any;

  const tradeValue = quantity * price;

  const trade = await prisma.tradeEvent.create({
    data: {
      userId,
      partnerId,
      externalTradeId,
      symbol,
      side: side.toUpperCase(),
      quantity,
      price,
      tradeValue,
      fees: fees || 0,
      tradeTimestamp: new Date(tradeTimestamp),
      status: 'RECEIVED',
      connectionId: 'mock_connection', // In production, look up actual connection
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'Trade event submitted successfully',
            trade: {
              id: trade.id,
              externalTradeId: trade.externalTradeId,
              status: trade.status,
              symbol: trade.symbol,
              tradeValue: trade.tradeValue,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleRegisterWebhook(args: Record<string, unknown>) {
  const { partnerId, url, events, secret } = args as any;

  const webhook = await prisma.webhook.create({
    data: {
      partnerId,
      url,
      events,
      secret: secret || `whsec_${Math.random().toString(36).slice(2)}`,
      status: 'ACTIVE',
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'Webhook registered successfully',
            webhook: {
              id: webhook.id,
              url: webhook.url,
              events: webhook.events,
              secret: webhook.secret,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleListWebhooks(args: Record<string, unknown>) {
  const { partnerId } = args as { partnerId: string };

  const webhooks = await prisma.webhook.findMany({
    where: { partnerId },
    select: {
      id: true,
      url: true,
      events: true,
      status: true,
      createdAt: true,
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            webhooks,
            count: webhooks.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

// ============================================================================
// ADMIN TOOLS
// ============================================================================

async function handleAdminReviewPartnerRequest(args: Record<string, unknown>) {
  const { adminId, requestId, decision, notes } = args as any;

  const request = await prisma.partnerRequest.update({
    where: { id: requestId },
    data: {
      status: decision.toUpperCase(),
      reviewedBy: adminId,
      reviewedAt: new Date(),
      reviewNotes: notes || null,
    },
  });

  // If approved, create partner
  if (decision === 'approved') {
    await prisma.partner.create({
      data: {
        name: request.companyName,
        companyName: request.companyName,
        email: request.email,
        integrationType: request.integrationType,
        status: 'ACTIVE',
        description: request.description,
        website: request.website,
        approvedAt: new Date(),
        approvedBy: adminId,
      },
    });
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: `Partner request ${decision}`,
            request: {
              id: request.id,
              companyName: request.companyName,
              status: request.status,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleAdminReviewRecipient(args: Record<string, unknown>) {
  const { adminId, recipientId, action, verificationLevel, notes } = args as any;

  let updateData: any = {};

  switch (action) {
    case 'verify':
      updateData = {
        status: 'VERIFIED',
        verificationLevel: verificationLevel || 'standard',
        verifiedAt: new Date(),
        verifiedBy: adminId,
      };
      break;
    case 'suspend':
      updateData = {
        status: 'SUSPENDED',
        suspendedAt: new Date(),
      };
      break;
    case 'activate':
      updateData = {
        status: 'ACTIVE',
      };
      break;
  }

  const recipient = await prisma.recipient.update({
    where: { id: recipientId },
    data: updateData,
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      actorType: 'admin',
      actorId: adminId,
      action: `recipient_${action}`,
      entityType: 'recipient',
      entityId: recipientId,
      changes: { action, verificationLevel, notes },
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: `Recipient ${action}d successfully`,
            recipient: {
              id: recipient.id,
              name: recipient.name,
              status: recipient.status,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleAdminListFlaggedActivity(args: Record<string, unknown>) {
  const { adminId, entityType, status, severity, limit } = args as any;

  const where: any = {};
  if (entityType && entityType !== 'all') {
    where.entityType = entityType;
  }
  if (status) {
    where.status = status.toUpperCase();
  }
  if (severity) {
    where.severity = severity.toUpperCase();
  }

  const flags = await prisma.fraudFlag.findMany({
    where,
    take: limit || 50,
    orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            flags,
            count: flags.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleGetAuditLog(args: Record<string, unknown>) {
  const { adminId, entityType, entityId, actorId, startDate, endDate, limit } = args as any;

  const where: any = {};
  if (entityType) where.entityType = entityType;
  if (entityId) where.entityId = entityId;
  if (actorId) where.actorId = actorId;
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt.gte = new Date(startDate);
    if (endDate) where.createdAt.lte = new Date(endDate);
  }

  const logs = await prisma.auditLog.findMany({
    where,
    take: limit || 100,
    orderBy: { createdAt: 'desc' },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            logs,
            count: logs.length,
          },
          null,
          2
        ),
      },
    ],
  };
}

async function handleCreateSupportTicket(args: Record<string, unknown>) {
  const { userId, subject, description, category, priority } = args as any;

  const ticket = await prisma.supportTicket.create({
    data: {
      userId,
      subject,
      description,
      category: category || 'other',
      priority: (priority || 'medium').toUpperCase(),
      status: 'OPEN',
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            success: true,
            message: 'Support ticket created successfully',
            ticket: {
              id: ticket.id,
              subject: ticket.subject,
              status: ticket.status,
              priority: ticket.priority,
              createdAt: ticket.createdAt,
            },
          },
          null,
          2
        ),
      },
    ],
  };
}
