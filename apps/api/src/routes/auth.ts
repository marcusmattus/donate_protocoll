import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { hash, verify } from '@donate/auth';
import { db } from '@donate/database';

const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const data = RegisterSchema.parse(request.body);

    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      reply.statusCode = 409;
      return { error: 'User already exists' };
    }

    const passwordHash = await hash(data.password);

    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        status: 'ACTIVE',
      },
    });

    const token = fastify.jwt.sign({
      sub: user.id,
      email: user.email,
      role: 'USER',
    });

    reply.statusCode = 201;
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  });

  fastify.post('/login', async (request, reply) => {
    const data = LoginSchema.parse(request.body);

    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      reply.statusCode = 401;
      return { error: 'Invalid credentials' };
    }

    const isValid = await verify(data.password, user.passwordHash);
    if (!isValid) {
      reply.statusCode = 401;
      return { error: 'Invalid credentials' };
    }

    const token = fastify.jwt.sign({
      sub: user.id,
      email: user.email,
      role: 'USER',
    });

    return { token, user: { id: user.id, email: user.email, name: user.name } };
  });

  fastify.post('/logout', async (request, reply) => {
    reply.send({ success: true });
  });

  fastify.post('/refresh', async (request) => {
    await request.jwtVerify();

    const token = fastify.jwt.sign({
      sub: request.user.sub,
      email: request.user.email,
      role: request.user.role,
    });

    return { token };
  });
}
