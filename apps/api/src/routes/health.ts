import { FastifyInstance } from 'fastify';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => ({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  }));

  fastify.get('/ready', async () => ({
    ready: true,
    timestamp: new Date().toISOString(),
  }));
}
