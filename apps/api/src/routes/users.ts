import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '@donate/database';

const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
});

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/me', async (request) => {
    await request.jwtVerify();

    const user = await db.user.findUnique({
      where: { id: request.user.sub },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  });

  fastify.patch('/me', async (request) => {
    await request.jwtVerify();

    const data = UpdateProfileSchema.parse(request.body);

    const user = await db.user.update({
      where: { id: request.user.sub },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
      },
    });

    return user;
  });

  fastify.delete('/me', async (request, reply) => {
    await request.jwtVerify();

    await db.user.update({
      where: { id: request.user.sub },
      data: { status: 'DELETED' },
    });

    reply.statusCode = 204;
  });

  fastify.get('/me/impact', async (request) => {
    await request.jwtVerify();

    const donations = await db.donation.groupBy({
      by: ['userId'],
      where: { userId: request.user.sub },
      _sum: { amount: true },
      _count: true,
    });

    const totalDonated = donations[0]?._sum.amount || 0;
    const totalTrades = await db.tradeEvent.count({
      where: { userId: request.user.sub },
    });

    const recipients = await db.recipientProfile.count({
      where: {
        donationAllocations: {
          some: {
            donation: {
              userId: request.user.sub,
            },
          },
        },
      },
    });

    return {
      totalDonated,
      totalTrades,
      recipientsSupported: recipients,
      impactScore: totalDonated * 100,
    };
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params as { id: string };

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  });
}
