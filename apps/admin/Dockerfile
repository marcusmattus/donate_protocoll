FROM node:20-alpine AS builder
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/admin apps/admin

RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm build --filter @donate/admin

FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/admin apps/admin
COPY --from=builder /app/apps/admin/.next /app/apps/admin/.next

RUN pnpm install --frozen-lockfile --prod

EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["pnpm", "--filter", "@donate/admin", "start"]
