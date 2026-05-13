FROM node:20-alpine AS builder
WORKDIR /app

# Copy monorepo files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/api apps/api

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build
RUN pnpm build --filter @donate/api

# Production
FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm

# Copy package files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/api apps/api
COPY --from=builder /app/apps/api/dist /app/apps/api/dist

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "apps/api/dist/index.js"]
