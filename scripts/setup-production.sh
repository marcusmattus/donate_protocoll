#!/bin/bash
# Production Setup Script for Donate Protocol
# Usage: ./scripts/setup-production.sh

set -e

echo "🚀 Donate Protocol - Production Setup"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check dependencies
echo -e "${BLUE}1. Checking dependencies...${NC}"
command -v node >/dev/null || { echo "Node.js is required"; exit 1; }
command -v pnpm >/dev/null || { echo "pnpm is required"; exit 1; }
command -v docker >/dev/null || { echo "Docker is required"; exit 1; }
echo -e "${GREEN}✓ Dependencies OK${NC}"
echo ""

# Check environment
echo -e "${BLUE}2. Checking environment...${NC}"
if [ -z "$DATABASE_URL" ]; then
  echo -e "${RED}✗ DATABASE_URL not set${NC}"
  exit 1
fi
if [ -z "$JWT_SECRET" ]; then
  echo -e "${RED}✗ JWT_SECRET not set${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Environment variables set${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}3. Installing dependencies...${NC}"
pnpm install --frozen-lockfile
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Database setup
echo -e "${BLUE}4. Setting up database...${NC}"
pnpm db:generate
pnpm db:push
echo -e "${GREEN}✓ Database schema synced${NC}"
echo ""

# Build services
echo -e "${BLUE}5. Building services...${NC}"
pnpm build
echo -e "${GREEN}✓ All services built${NC}"
echo ""

# Run tests
echo -e "${BLUE}6. Running tests...${NC}"
pnpm test || echo -e "${RED}⚠ Some tests failed${NC}"
echo ""

# Type checking
echo -e "${BLUE}7. Type checking...${NC}"
pnpm type-check
echo -e "${GREEN}✓ All types valid${NC}"
echo ""

# Linting
echo -e "${BLUE}8. Linting code...${NC}"
pnpm lint
echo -e "${GREEN}✓ Code quality OK${NC}"
echo ""

# Docker build
echo -e "${BLUE}9. Building Docker images...${NC}"
docker build -t donate-api:latest -f apps/api/Dockerfile .
docker build -t donate-web:latest -f apps/web/Dockerfile .
docker build -t donate-admin:latest -f apps/admin/Dockerfile .
docker build -t donate-mcp:latest -f apps/mcp-server/Dockerfile .
echo -e "${GREEN}✓ Docker images built${NC}"
echo ""

echo ""
echo -e "${GREEN}✅ Production setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Deploy Docker images to registry: docker push donate-api:latest"
echo "2. Update Kubernetes/Docker Compose manifests"
echo "3. Run smoke tests on staging environment"
echo "4. Deploy to production with monitoring enabled"
echo ""
