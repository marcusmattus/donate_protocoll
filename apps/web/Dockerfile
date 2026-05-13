FROM node:20-alpine AS builder
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/web apps/web

RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm build --filter @donate/web

FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/web apps/web
COPY --from=builder /app/apps/web/.next /app/apps/web/.next

RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["pnpm", "--filter", "@donate/web", "start"]
