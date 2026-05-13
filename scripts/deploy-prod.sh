#!/bin/bash

# Donate Protocol - Production Deployment Script
# Deploy application to production environment

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}▶${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Donate Protocol - Production Deployment                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verify environment
print_status "Verifying production environment..."
if [ ! -f ".env.production" ]; then
    print_error ".env.production not found"
    exit 1
fi
print_success "Production environment file found"

# Load environment
export $(cat .env.production | grep -v '^#' | xargs)

# Build all packages
print_status "Building application packages..."
pnpm install --frozen-lockfile
pnpm run build
print_success "Packages built successfully"

# Database migrations
print_status "Running database migrations..."
cd "$PROJECT_ROOT/packages/database"
pnpm run migrate:prod
cd "$PROJECT_ROOT"
print_success "Database migrations completed"

# Build Docker images
print_status "Building Docker images..."
docker build -t donate-api:latest -f apps/api/Dockerfile .
docker build -t donate-web:latest -f apps/web/Dockerfile .
docker build -t donate-admin:latest -f apps/admin/Dockerfile .
print_success "Docker images built"

# Push to registry (if configured)
if [ ! -z "$DOCKER_REGISTRY" ]; then
    print_status "Pushing images to registry..."
    docker tag donate-api:latest $DOCKER_REGISTRY/donate-api:latest
    docker tag donate-web:latest $DOCKER_REGISTRY/donate-web:latest
    docker tag donate-admin:latest $DOCKER_REGISTRY/donate-admin:latest
    
    docker push $DOCKER_REGISTRY/donate-api:latest
    docker push $DOCKER_REGISTRY/donate-web:latest
    docker push $DOCKER_REGISTRY/donate-admin:latest
    print_success "Images pushed to registry"
fi

# Health checks
print_status "Running health checks..."
pnpm run test
print_success "All tests passed"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Deployment Ready!                                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 To deploy, run:"
echo "   docker-compose -f docker-compose.prod.yml up -d"
echo ""
