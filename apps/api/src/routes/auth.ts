import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@donate/database';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

function generateToken(user: { id: string; email: string }) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const data = RegisterSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      reply.statusCode = 409;
      return { error: 'User already exists' };
    }

    const passwordHash = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
      },
    });

    const token = generateToken(user);
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  });

  fastify.post('/login', async (request, reply) => {
    const data = LoginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      reply.statusCode = 401;
      return { error: 'Invalid email or password' };
    }

    const passwordValid = await compare(data.password, user.passwordHash);
    if (!passwordValid) {
      reply.statusCode = 401;
      return { error: 'Invalid email or password' };
    }

    const token = generateToken(user);
    return { token, user: { id: user.id, email: user.email } };
  });
}
