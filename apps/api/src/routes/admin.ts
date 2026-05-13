import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '@donate/database';

const ReviewPartnerSchema = z.object({
  requestId: z.string().uuid(),
  decision: z.enum(['APPROVED', 'REJECTED']),
  notes: z.string().optional(),
});

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/partner-requests', async (request) => {
    await request.jwtVerify();

    if (request.user.role !== 'ADMIN' && request.user.role !== 'SUPERADMIN') {
      throw new Error('Forbidden');
    }

    const requests = await prisma.partnerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return requests;
  });

  fastify.patch('/partner-requests/:id', async (request) => {
    await request.jwtVerify();

    if (request.user.role !== 'ADMIN' && request.user.role !== 'SUPERADMIN') {
      throw new Error('Forbidden');
    }

    const data = ReviewPartnerSchema.parse(request.body);

    const partnerRequest = await prisma.partnerRequest.update({
      where: { id: data.requestId },
      data: {
        status: data.decision,
        reviewedAt: new Date(),
        reviewNotes: data.notes,
      },
    });

    if (data.decision === 'APPROVED') {
      await prisma.partner.create({
        data: {
          companyName: partnerRequest.companyName,
          email: partnerRequest.email,
          integrationType: partnerRequest.integrationType,
          status: 'ACTIVE',
        },
      });
    }

    return partnerRequest;
  });

  fastify.get('/flags', async (request) => {
    await request.jwtVerify();

    if (request.user.role !== 'ADMIN' && request.user.role !== 'SUPERADMIN') {
      throw new Error('Forbidden');
    }

    const flags = await prisma.fraudFlag.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });

    return flags;
  });

  fastify.get('/audit-logs', async (request) => {
    await request.jwtVerify();

    if (request.user.role !== 'ADMIN' && request.user.role !== 'SUPERADMIN') {
      throw new Error('Forbidden');
    }

    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return logs;
  });
}
