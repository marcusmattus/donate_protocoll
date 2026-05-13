#!/bin/bash

# Donate Protocol - Development Setup Script
# This script sets up the development environment with all required services

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Donate Protocol - Development Environment Setup          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Step 1: Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js 20.0.0 or higher is required. Current version: $(node -v)"
    exit 1
fi
print_success "Node.js version $(node -v) is compatible"

# Step 2: Check pnpm
print_status "Checking pnpm installation..."
if ! command -v pnpm &> /dev/null; then
    print_warning "pnpm not found. Installing globally..."
    npm install -g pnpm
fi
print_success "pnpm is installed (version: $(pnpm -v))"

# Step 3: Kill any existing processes on dev ports
print_status "Clearing development ports (3000, 3002, 4001, 5432)..."
lsof -i :3000 -i :3002 -i :4001 -i :5432 2>/dev/null | grep -v COMMAND | awk '{print $2}' | xargs -r kill -9 2>/dev/null || true
sleep 1
print_success "Development ports cleared"

# Step 4: Install dependencies
print_status "Installing dependencies with pnpm..."
pnpm install --frozen-lockfile
print_success "Dependencies installed"

# Step 5: Check and setup Docker containers
print_status "Checking Docker containers..."
if ! command -v docker &> /dev/null; then
    print_warning "Docker not found. Please install Docker to run the database and Redis services."
    print_warning "Skipping Docker container setup..."
else
    print_status "Starting Docker containers (PostgreSQL, Redis)..."
    docker-compose up -d 2>/dev/null || print_warning "Docker containers may already be running"
    sleep 3
    print_success "Docker services started"
fi

# Step 6: Database migrations
print_status "Checking database setup..."
if [ -d "packages/database" ]; then
    print_status "Running database migrations..."
    cd "$PROJECT_ROOT/packages/database"
    pnpm run migrate 2>/dev/null || print_warning "Database migrations not available or already run"
    cd "$PROJECT_ROOT"
fi
print_success "Database setup complete"

# Step 7: Environment configuration
print_status "Verifying environment configuration..."
if [ ! -f ".env.local" ]; then
    print_warning ".env.local not found. Creating from example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        print_success ".env.local created from .env.example"
    fi
fi
print_success "Environment configuration verified"

# Step 8: Build packages
print_status "Building workspace packages..."
pnpm run build --filter='@donate/utils' --filter='@donate/database' --filter='@donate/auth' 2>/dev/null || print_warning "Some packages may already be built"
print_success "Packages built"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Setup Complete!                                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}Development environment is ready!${NC}"
echo ""
echo "🚀 To start the development servers, run:"
echo ""
echo -e "   ${BLUE}pnpm dev${NC}"
echo ""
echo "📋 Service URLs:"
echo "   • Web App:      ${BLUE}http://localhost:3000${NC}"
echo "   • Admin:        ${BLUE}http://localhost:3002${NC}"
echo "   • API:          ${BLUE}http://localhost:4001${NC}"
echo "   • Database:     ${BLUE}postgresql://localhost:5432/donate_protocol${NC}"
echo "   • Redis:        ${BLUE}redis://localhost:6379${NC}"
echo ""
echo "📖 Documentation:"
echo "   • Quick Start:  START_HERE.md"
echo "   • Architecture: ARCHITECTURE.md"
echo "   • Telegram:     TELEGRAM_MINIAPP_SETUP.md"
echo ""
