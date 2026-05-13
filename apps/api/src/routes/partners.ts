import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '@donate/database';

const SubmitTradeSchema = z.object({
  externalTradeId: z.string(),
  symbol: z.string(),
  side: z.enum(['BUY', 'SELL']),
  quantity: z.number().positive(),
  price: z.number().positive(),
  tradeValue: z.number().positive(),
  tradeTimestamp: z.string().datetime(),
});

export async function partnerRoutes(fastify: FastifyInstance) {
  fastify.post('/trades', async (request, reply) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      reply.statusCode = 401;
      return { error: 'Missing API key' };
    }

    const partner = await prisma.partner.findFirst({
      where: {
        apiKeys: {
          some: {
            keyHash: apiKey,
            status: 'ACTIVE',
          },
        },
      },
    });

    if (!partner) {
      reply.statusCode = 401;
      return { error: 'Invalid API key' };
    }

    const data = SubmitTradeSchema.parse(request.body);

    const trade = await prisma.tradeEvent.create({
      data: {
        externalTradeId: data.externalTradeId,
        symbol: data.symbol,
        side: data.side,
        quantity: data.quantity,
        price: data.price,
        tradeValue: data.tradeValue,
        tradeTimestamp: new Date(data.tradeTimestamp),
        status: 'RECEIVED',
        partnerId: partner.id,
      },
    });

    reply.statusCode = 201;
    return { id: trade.id, status: trade.status };
  });

  fastify.get('/webhooks', async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new Error('Unauthorized');
    }

    const partner = await prisma.partner.findFirst({
      where: {
        apiKeys: {
          some: {
            keyHash: apiKey,
            status: 'ACTIVE',
          },
        },
      },
    });

    if (!partner) {
      throw new Error('Invalid API key');
    }

    const webhooks = await prisma.webhook.findMany({
      where: { partnerId: partner.id },
    });

    return webhooks;
  });

  fastify.get('/metrics', async (request) => {
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new Error('Unauthorized');
    }

    const partner = await prisma.partner.findFirst({
      where: {
        apiKeys: {
          some: {
            keyHash: apiKey,
            status: 'ACTIVE',
          },
        },
      },
    });

    if (!partner) {
      throw new Error('Invalid API key');
    }

    const tradeCount = await prisma.tradeEvent.count({
      where: { partnerId: partner.id },
    });

    const totalVolume = await prisma.tradeEvent.aggregate({
      where: { partnerId: partner.id },
      _sum: { tradeValue: true },
    });

    return {
      trades: tradeCount,
      totalVolume: totalVolume._sum.tradeValue || 0,
      status: partner.status,
    };
  });
}
