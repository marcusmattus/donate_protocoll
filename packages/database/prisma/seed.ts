import { PrismaClient, UserRole, UserStatus, KYCStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await hash('admin123!@#CHANGE_ME', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@donate-protocol.com' },
    update: {},
    create: {
      email: 'admin@donate-protocol.com',
      passwordHash: adminPassword,
      name: 'Platform Administrator',
      role: UserRole.SUPERADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      kycStatus: KYCStatus.VERIFIED,
      kycVerifiedAt: new Date(),
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create test user
  const testPassword = await hash('test123', 12);
  const testUser = await prisma.user.upsert({
    where: { email: 'trader@example.com' },
    update: {},
    create: {
      email: 'trader@example.com',
      passwordHash: testPassword,
      name: 'Test Trader',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      kycStatus: KYCStatus.VERIFIED,
    },
  });
  console.log('✅ Created test user:', testUser.email);

  // Create sample recipients
  const recipients = await Promise.all([
    prisma.recipient.create({
      data: {
        name: 'Global Health Initiative',
        description: 'Providing healthcare access to underserved communities worldwide',
        category: 'health',
        email: 'contact@globalhealthfund.org',
        website: 'https://globalhealthfund.org',
        status: 'VERIFIED',
        verificationLevel: 'enhanced',
        verifiedAt: new Date(),
        organizationType: '501c3',
      },
    }),
    prisma.recipient.create({
      data: {
        name: 'Education For All',
        description: 'Bringing quality education to children in developing countries',
        category: 'education',
        email: 'info@educationforall.org',
        website: 'https://educationforall.org',
        status: 'VERIFIED',
        verificationLevel: 'standard',
        verifiedAt: new Date(),
        organizationType: '501c3',
      },
    }),
    prisma.recipient.create({
      data: {
        name: 'Clean Water Project',
        description: 'Building water infrastructure in communities without clean water access',
        category: 'environment',
        email: 'support@cleanwater.org',
        website: 'https://cleanwater.org',
        status: 'ACTIVE',
        verificationLevel: 'basic',
        verifiedAt: new Date(),
        organizationType: '501c3',
      },
    }),
  ]);
  console.log(`✅ Created ${recipients.length} sample recipients`);

  // Create sample campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        recipientId: recipients[0].id,
        name: 'Emergency Medical Supplies for Rural Clinics',
        description:
          'Providing essential medical supplies to 50 rural clinics serving 100,000+ people',
        story:
          'Many rural communities lack access to basic medical supplies. This campaign aims to provide essential equipment and medicines to clinics that serve some of the most underserved populations.',
        goalAmount: 50000,
        raisedAmount: 12500,
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      },
    }),
    prisma.campaign.create({
      data: {
        recipientId: recipients[1].id,
        name: 'School Construction in Remote Villages',
        description: 'Building 10 new schools to provide education access to 2,000 children',
        story:
          'Children in remote villages often walk hours to reach the nearest school. This campaign will build schools in their communities, making education accessible to all.',
        goalAmount: 100000,
        raisedAmount: 35000,
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
      },
    }),
  ]);
  console.log(`✅ Created ${campaigns.length} sample campaigns`);

  // Create sample partner
  const partner = await prisma.partner.create({
    data: {
      name: 'Test Broker',
      companyName: 'Test Brokerage Inc.',
      email: 'api@testbroker.com',
      integrationType: 'BROKER',
      status: 'ACTIVE',
      description: 'Test broker for development',
      website: 'https://testbroker.com',
      webhookSecret: 'test_webhook_secret_' + Math.random().toString(36),
      apiVersion: 'v1',
      rateLimitTier: 'standard',
      approvedAt: new Date(),
    },
  });
  console.log('✅ Created test partner:', partner.name);

  console.log('🌱 Database seeding completed!');
  console.log('\n📋 Test Credentials:');
  console.log('   Admin: admin@donate-protocol.com / admin123!@#CHANGE_ME');
  console.log('   User:  trader@example.com / test123');
  console.log('\n⚠️  Remember to change the admin password in production!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
