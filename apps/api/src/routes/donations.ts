import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '@donate/database';

const CreateDonationSchema = z.object({
  recipientId: z.string().uuid(),
  amount: z.number().min(0.01).max(10000),
  campaignId: z.string().uuid().optional(),
});

const CreateRuleSchema = z.object({
  name: z.string(),
  ruleType: z.enum(['PERCENTAGE', 'FLAT', 'ROUNDUP']),
  value: z.number().positive(),
  allocations: z.array(
    z.object({
      recipientId: z.string().uuid(),
      percentage: z.number().min(0).max(100),
    })
  ),
  dailyCap: z.number().optional(),
  monthlyCap: z.number().optional(),
  conditions: z.object({}).passthrough().optional(),
});

export async function donationRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request) => {
    await request.jwtVerify();

    const donations = await db.donation.findMany({
      where: { userId: request.user.sub },
      include: {
        allocations: {
          include: { recipient: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return donations;
  });

  fastify.post('/', async (request) => {
    await request.jwtVerify();

    const data = CreateDonationSchema.parse(request.body);

    const recipient = await db.recipientProfile.findUnique({
      where: { id: data.recipientId },
    });

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    const donation = await db.donation.create({
      data: {
        userId: request.user.sub,
        amount: data.amount,
        currency: 'USD',
        status: 'PENDING',
        allocations: {
          create: {
            recipientId: data.recipientId,
            amount: data.amount,
            percentage: 100,
          },
        },
      },
      include: { allocations: true },
    });

    return { id: donation.id, status: donation.status };
  });

  fastify.get('/rules', async (request) => {
    await request.jwtVerify();

    const rules = await db.donationRule.findMany({
      where: { userId: request.user.sub },
      orderBy: { createdAt: 'desc' },
    });

    return rules;
  });

  fastify.post('/rules', async (request) => {
    await request.jwtVerify();

    const data = CreateRuleSchema.parse(request.body);

    const rule = await db.donationRule.create({
      data: {
        userId: request.user.sub,
        name: data.name,
        ruleType: data.ruleType,
        value: data.value,
        allocations: data.allocations,
        dailyCap: data.dailyCap,
        monthlyCap: data.monthlyCap,
        conditions: data.conditions || {},
        status: 'ACTIVE',
      },
    });

    return rule;
  });

  fastify.get('/summary', async (request) => {
    await request.jwtVerify();

    const result = await db.donation.groupBy({
      by: ['userId', 'status'],
      where: { userId: request.user.sub },
      _sum: { amount: true },
      _count: true,
    });

    return {
      total: result.reduce((sum, r) => sum + (r._sum.amount || 0), 0),
      count: result.reduce((sum, r) => sum + r._count, 0),
      byStatus: result,
    };
  });
}
