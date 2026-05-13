/**
 * MCP Resource Handler
 *
 * Handles reading of static and dynamic resources.
 */

import { prisma } from '@donate/database';

export async function handleReadResource(uri: string) {
  switch (uri) {
    case 'platform://policies':
      return {
        uri,
        mimeType: 'text/markdown',
        text: getPolicies(),
      };

    case 'platform://faq':
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(getFAQ(), null, 2),
      };

    case 'platform://integrations':
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(await getIntegrations(), null, 2),
      };

    case 'platform://metrics':
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(await getMetrics(), null, 2),
      };

    case 'platform://trust-safety':
      return {
        uri,
        mimeType: 'text/markdown',
        text: getTrustSafety(),
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
}

function getPolicies() {
  return `# Donate Protocol Policies

## Terms of Service

By using Donate Protocol, you agree to:

1. **Account Accuracy**: Provide accurate information when connecting trading accounts
2. **Donation Authorization**: Authorize automatic donations according to your configured rules
3. **Compliance**: Comply with all applicable laws and regulations
4. **Responsible Use**: Use the platform for legitimate charitable giving

## Privacy Policy

### Data Collection
We collect:
- Account information (email, name)
- Trading account connection data (encrypted)
- Donation history and preferences
- Platform usage analytics

### Data Usage
Your data is used to:
- Process donations and allocate to recipients
- Provide impact reporting
- Improve platform services
- Comply with legal requirements

### Data Security
- End-to-end encryption for sensitive data
- SOC 2 compliant infrastructure
- Regular security audits
- No sale of personal data

## Donation Policy

### How Donations Work
1. You configure donation rules (percentage, flat amount, etc.)
2. When you make trades, donations are calculated automatically
3. Donations are aggregated and allocated to your chosen recipients
4. Recipients receive payouts on a regular schedule

### Tax Deductibility
Donations through Donate Protocol may be tax-deductible. We provide annual donation summaries for tax purposes. Consult your tax advisor for specific guidance.

### Refund Policy
Donations are generally final. Refunds may be issued in cases of:
- Technical errors
- Unauthorized donations
- Recipient fraud or disqualification

Contact support@donate-protocol.com for refund requests.
`;
}

function getFAQ() {
  return [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How does Donate Protocol work?',
          answer:
            'Donate Protocol automatically donates a small amount from each of your trades to verified nonprofits. You set up rules (like 0.1% of each trade), connect your brokerage account, and donations happen automatically.',
        },
        {
          question: 'Which brokers and exchanges are supported?',
          answer:
            'We support major brokers like Robinhood, Interactive Brokers, Alpaca, and exchanges like Coinbase. Check platform://integrations for the full list.',
        },
        {
          question: 'Is my trading data secure?',
          answer:
            'Yes. We use bank-level encryption, never store your brokerage passwords, and only request read access to trade history. Your credentials are encrypted at rest and in transit.',
        },
      ],
    },
    {
      category: 'Donations',
      questions: [
        {
          question: 'How much should I donate per trade?',
          answer:
            'Most users donate 0.05% - 0.5% of each trade. For a $1,000 trade, 0.1% equals $1. You can set daily or monthly caps to control total giving.',
        },
        {
          question: 'Can I choose which nonprofits to support?',
          answer:
            'Absolutely! You can allocate your donations across multiple verified recipients and campaigns. Browse recipients using the list_recipients tool.',
        },
        {
          question: 'Are donations tax-deductible?',
          answer:
            'Donations to 501(c)(3) organizations are typically tax-deductible in the US. We provide annual summaries for tax filing. Consult your tax advisor.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'How do I integrate Donate Protocol as a partner?',
          answer:
            'Submit a partner integration request using create_partner_request. Our team will review and provide API credentials and documentation.',
        },
        {
          question: 'What APIs does Donate Protocol offer?',
          answer:
            'We provide REST APIs for trade submission, webhook APIs for events, and an MCP server for AI agent integration. See our developer docs for details.',
        },
      ],
    },
  ];
}

async function getIntegrations() {
  const partners = await prisma.partner.findMany({
    where: { status: 'ACTIVE' },
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
    integrations: partners,
    categories: {
      brokers: partners.filter((p) => p.integrationType === 'BROKER'),
      exchanges: partners.filter((p) => p.integrationType === 'EXCHANGE'),
      wallets: partners.filter((p) => p.integrationType === 'WALLET'),
      apps: partners.filter((p) => p.integrationType === 'APP'),
    },
    integrationGuide: {
      gettingStarted:
        'Use the connect_trading_account tool to initiate a connection to your broker or exchange.',
      authenticationFlow:
        'Most integrations use OAuth 2.0. You will be redirected to the broker to authorize access.',
      supportedFeatures: ['Trade history sync', 'Automatic donation calculation', 'Real-time updates'],
    },
  };
}

async function getMetrics() {
  const [totalDonations, totalAmount, totalRecipients, totalUsers] = await Promise.all([
    prisma.donation.count({ where: { status: 'DISBURSED' } }),
    prisma.donation.aggregate({
      where: { status: 'DISBURSED' },
      _sum: { amount: true },
    }),
    prisma.recipient.count({ where: { status: { in: ['VERIFIED', 'ACTIVE'] } } }),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
  ]);

  return {
    totalDonations,
    totalDonationAmount: totalAmount._sum.amount || 0,
    totalRecipients,
    activeUsers: totalUsers,
    updatedAt: new Date().toISOString(),
  };
}

function getTrustSafety() {
  return `# Trust & Safety

## Security Practices

### Data Protection
- **Encryption**: AES-256 encryption at rest, TLS 1.3 in transit
- **Access Control**: Role-based access control (RBAC) with least privilege
- **Authentication**: Multi-factor authentication for sensitive operations
- **Monitoring**: 24/7 security monitoring and alerting

### Financial Security
- **PCI Compliance**: Payment processing through PCI-compliant providers
- **Fraud Detection**: Real-time transaction monitoring
- **Audit Trails**: Complete audit logs for all financial operations
- **Reconciliation**: Daily reconciliation of donations and payouts

## Compliance

### Regulatory Framework
- **501(c)(3) Verification**: All recipients verified as legitimate nonprofits
- **KYC/KYB**: Know Your Customer and Know Your Business processes
- **AML**: Anti-money laundering monitoring
- **Data Privacy**: GDPR and CCPA compliant

### Recipient Verification
Recipients undergo:
1. Organization identity verification
2. Tax-exempt status confirmation
3. Background checks
4. Ongoing compliance monitoring

## User Safety

### Account Protection
- Strong password requirements
- Session management
- Suspicious activity detection
- Account recovery procedures

### Donation Safety
- Donation caps and limits
- Refund policy for errors
- Transparent allocation reporting
- Recipient accountability

## Reporting Issues

If you notice suspicious activity:
- Email: security@donate-protocol.com
- Support: Use create_support_ticket tool
- Emergency: Call +1-XXX-XXX-XXXX

We take security seriously and respond to all reports within 24 hours.
`;
}
