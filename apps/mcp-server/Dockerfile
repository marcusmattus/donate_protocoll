FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages packages
COPY apps/mcp-server apps/mcp-server

RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN pnpm build --filter @donate/mcp-server

CMD ["pnpm", "--filter", "@donate/mcp-server", "start"]
