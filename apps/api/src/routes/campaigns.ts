import { FastifyInstance } from 'fastify';
import { db } from '@donate/database';

export async function campaignRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    const campaigns = await db.campaign.findMany({
      where: { status: 'ACTIVE' },
      include: {
        recipient: {
          select: { id: true, name: true, category: true, description: true },
        },
      },
      take: 20,
    });

    return campaigns;
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params as { id: string };

    const campaign = await db.campaign.findUnique({
      where: { id },
      include: {
        recipient: true,
        impactUpdates: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    return campaign;
  });

  fastify.get('/recipients', async () => {
    const recipients = await db.recipientProfile.findMany({
      where: { status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        campaigns: { take: 1 },
      },
      take: 50,
    });

    return recipients;
  });

  fastify.get('/recipients/:id', async (request) => {
    const { id } = request.params as { id: string };

    const recipient = await db.recipientProfile.findUnique({
      where: { id },
      include: {
        campaigns: { where: { status: 'ACTIVE' } },
      },
    });

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    return recipient;
  });
}
