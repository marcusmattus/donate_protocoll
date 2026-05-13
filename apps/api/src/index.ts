import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import { logger } from './lib/logger';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/users';
import { donationRoutes } from './routes/donations';
import { campaignRoutes } from './routes/campaigns';
import { partnerRoutes } from './routes/partners';
import { adminRoutes } from './routes/admin';
import { healthRoutes } from './routes/health';

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || 'localhost';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

export async function createServer() {
  const fastify = Fastify({
    logger: true,
  });

  // Security middleware
  await fastify.register(helmet, {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
  });

  // CORS
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
  });

  // Rate limiting
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
  });

  // JWT authentication
  await fastify.register(jwt, {
    secret: JWT_SECRET,
  });

  // Custom authentication decorator
  fastify.decorate('authenticate', async function (request) {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw new Error('Unauthorized');
    }
  });

  // API routes
  await fastify.register(healthRoutes, { prefix: '/health' });
  await fastify.register(authRoutes, { prefix: '/auth' });
  await fastify.register(userRoutes, { prefix: '/users' });
  await fastify.register(donationRoutes, { prefix: '/donations' });
  await fastify.register(campaignRoutes, { prefix: '/campaigns' });
  await fastify.register(partnerRoutes, { prefix: '/partner' });
  await fastify.register(adminRoutes, { prefix: '/admin' });

  // Error handling
  fastify.setErrorHandler((error, request, reply) => {
    logger.error(error);
    reply.statusCode = error.statusCode || 500;
    reply.send({
      code: error.code,
      message: error.message,
      statusCode: error.statusCode || 500,
    });
  });

  return fastify;
}

async function start() {
  try {
    const fastify = await createServer();
    await fastify.listen({ port: PORT, host: HOST });
    logger.info(`Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}
