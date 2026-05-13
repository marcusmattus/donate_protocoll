/**
 * @donate/auth
 *
 * Authentication and authorization utilities for Donate Protocol.
 * Provides JWT token management, password hashing, and permission checking.
 */

import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import type { User, UserRole } from '@donate/database';

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-CHANGE-IN-PRODUCTION';
const JWT_EXPIRES_IN = '7d';

// ============================================================================
// Types
// ============================================================================

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthContext {
  user: TokenPayload;
  isAuthenticated: boolean;
}

// ============================================================================
// Password Hashing
// ============================================================================

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return compare(password, hash);
}

// ============================================================================
// JWT Token Management
// ============================================================================

/**
 * Generate a JWT token for a user
 */
export function generateToken(user: Pick<User, 'id' | 'email' | 'role'>): string {
  const payload: Omit<TokenPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Decode a token without verification (for debugging)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}

// ============================================================================
// Authorization Helpers
// ============================================================================

/**
 * Check if a user has a specific role
 */
export function hasRole(user: TokenPayload, role: UserRole): boolean {
  return user.role === role;
}

/**
 * Check if a user has admin privileges
 */
export function isAdmin(user: TokenPayload): boolean {
  return user.role === 'ADMIN' || user.role === 'SUPERADMIN';
}

/**
 * Check if a user has superadmin privileges
 */
export function isSuperAdmin(user: TokenPayload): boolean {
  return user.role === 'SUPERADMIN';
}

/**
 * Check if a user is a partner
 */
export function isPartner(user: TokenPayload): boolean {
  return user.role === 'PARTNER';
}

/**
 * Require admin role or throw error
 */
export function requireAdmin(user: TokenPayload): void {
  if (!isAdmin(user)) {
    throw new Error('Admin privileges required');
  }
}

/**
 * Require specific role or throw error
 */
export function requireRole(user: TokenPayload, role: UserRole): void {
  if (!hasRole(user, role)) {
    throw new Error(`${role} role required`);
  }
}

/**
 * Check if user owns a resource
 */
export function canAccessResource(user: TokenPayload, resourceOwnerId: string): boolean {
  // Admins can access all resources
  if (isAdmin(user)) {
    return true;
  }

  // Users can only access their own resources
  return user.userId === resourceOwnerId;
}

/**
 * Require resource ownership or throw error
 */
export function requireResourceAccess(user: TokenPayload, resourceOwnerId: string): void {
  if (!canAccessResource(user, resourceOwnerId)) {
    throw new Error('Unauthorized access to resource');
  }
}

// ============================================================================
// Permission Scopes (for API keys)
// ============================================================================

export const SCOPES = {
  // User scopes
  'users:read': 'Read user profile',
  'users:write': 'Update user profile',

  // Donation scopes
  'donations:read': 'Read donation history',
  'donations:write': 'Create donations',

  // Rules scopes
  'rules:read': 'Read donation rules',
  'rules:write': 'Create and update donation rules',

  // Connection scopes
  'connections:read': 'Read connected accounts',
  'connections:write': 'Connect and disconnect accounts',

  // Trade scopes (for partners)
  'trades:write': 'Submit trade events',
  'trades:read': 'Read trade history',

  // Webhook scopes (for partners)
  'webhooks:read': 'Read webhook registrations',
  'webhooks:write': 'Create and manage webhooks',

  // Admin scopes
  'admin:read': 'Read admin data',
  'admin:write': 'Perform admin actions',

  // Full access
  'platform:full': 'Full platform access',
} as const;

export type Scope = keyof typeof SCOPES;

/**
 * Check if a list of scopes includes a required scope
 */
export function hasScope(userScopes: string[], requiredScope: Scope): boolean {
  return userScopes.includes(requiredScope) || userScopes.includes('platform:full');
}

/**
 * Require a scope or throw error
 */
export function requireScope(userScopes: string[], requiredScope: Scope): void {
  if (!hasScope(userScopes, requiredScope)) {
    throw new Error(`Scope ${requiredScope} required`);
  }
}

// ============================================================================
// Validation Schemas
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8).max(128),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8).max(128),
});

// ============================================================================
// API Key Management
// ============================================================================

/**
 * Generate a secure random API key
 */
export function generateApiKey(): string {
  const prefix = 'dpk'; // donate protocol key
  const randomPart = Buffer.from(
    Array.from({ length: 32 }, () => Math.floor(Math.random() * 256))
  ).toString('base64url');

  return `${prefix}_${randomPart}`;
}

/**
 * Hash an API key for storage
 */
export async function hashApiKey(apiKey: string): Promise<string> {
  return hash(apiKey, 10);
}

/**
 * Compare an API key with a hash
 */
export async function compareApiKey(apiKey: string, hash: string): Promise<boolean> {
  return compare(apiKey, hash);
}

// ============================================================================
// Session Management
// ============================================================================

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create a session from a token
 */
export function createSession(token: string, metadata?: Partial<Session>): Session {
  const payload = verifyToken(token);
  const expiresAt = payload.exp ? new Date(payload.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return {
    userId: payload.userId,
    token,
    expiresAt,
    ...metadata,
  };
}

/**
 * Check if a session is expired
 */
export function isSessionExpired(session: Session): boolean {
  return session.expiresAt < new Date();
}

// ============================================================================
// Rate Limiting Helpers
// ============================================================================

export interface RateLimit {
  maxRequests: number;
  windowMs: number;
}

export const RATE_LIMITS = {
  auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  api: { maxRequests: 100, windowMs: 60 * 1000 }, // 100 requests per minute
  webhook: { maxRequests: 1000, windowMs: 60 * 1000 }, // 1000 requests per minute
} as const;

// Export common types
export type { User, UserRole };
