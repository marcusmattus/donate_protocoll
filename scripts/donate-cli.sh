#!/bin/bash

# Donate Protocol - Agent CLI Tool
# Complete CLI for managing the donation platform with OpenClaw integration

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Helper functions
print_header() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║  $1"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
}

print_status() { echo -e "${BLUE}▶${NC} $1"; }
print_success() { echo -e "${GREEN}✓${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }
print_info() { echo -e "${CYAN}ℹ${NC} $1"; }

# Show usage
show_usage() {
    cat << EOF
╔════════════════════════════════════════════════════════════╗
║        Donate Protocol - Agent CLI                        ║
║        OpenClaw Integration & Development Tool            ║
╚════════════════════════════════════════════════════════════╝

USAGE: ./donate-cli.sh [COMMAND] [OPTIONS]

COMMANDS:

  🚀 Development
    dev                   Start development environment
    dev:setup             Setup development environment
    dev:clean             Clean development environment
    dev:status            Show development status

  🐳 Docker
    docker:build          Build Docker images
    docker:push           Push images to registry
    docker:start          Start Docker containers
    docker:stop           Stop Docker containers
    docker:logs           Show Docker container logs

  📦 Build & Deploy
    build                 Build all packages
    build:prod            Build for production
    deploy:prod           Deploy to production
    deploy:staging        Deploy to staging

  🤖 OpenClaw Integration
    agent:init            Initialize OpenClaw agent
    agent:connect         Connect to OpenClaw network
    agent:status          Show agent status
    agent:test            Test agent connectivity
    agent:logs            Show agent logs

  💬 Telegram MiniApp
    telegram:setup        Setup Telegram MiniApp
    telegram:webhook      Configure webhook
    telegram:test         Test Telegram integration
    telegram:deploy       Deploy to Telegram

  🔗 Exchange Integration
    exchange:setup        Setup exchange connections
    exchange:test         Test exchange connectivity
    exchange:status       Show exchange status
    exchange:keys         Manage API keys securely

  📊 Dashboard
    dashboard:dev         Start dashboard dev server
    dashboard:build       Build dashboard
    dashboard:test        Test dashboard

  🗄️ Database
    db:migrate            Run database migrations
    db:reset              Reset database (development only)
    db:backup             Create database backup
    db:restore            Restore from backup

  🧪 Testing
    test                  Run all tests
    test:unit             Run unit tests
    test:integration      Run integration tests
    test:e2e              Run end-to-end tests
    test:coverage         Generate coverage report

  🔐 Security
    security:check        Run security checks
    security:audit        Audit dependencies
    security:keys         Manage secrets/keys

  📖 Help
    help                  Show this help message
    docs                  Show documentation index
    status                Show system status

EXAMPLES:

  # Start development environment
  ./donate-cli.sh dev

  # Initialize OpenClaw agent
  ./donate-cli.sh agent:init

  # Setup Telegram MiniApp
  ./donate-cli.sh telegram:setup

  # Deploy to production
  ./donate-cli.sh deploy:prod

  # Test exchange integration
  ./donate-cli.sh exchange:test

  # Show help
  ./donate-cli.sh help

EOF
}

# Command: dev
cmd_dev() {
    print_header "Starting Development Environment"
    cd "$PROJECT_ROOT/.."
    pnpm dev
}

# Command: dev:setup
cmd_dev_setup() {
    print_header "Setting Up Development Environment"
    bash "$PROJECT_ROOT/../scripts/setup-dev.sh"
}

# Command: dev:clean
cmd_dev_clean() {
    print_status "Cleaning development environment..."
    lsof -i :3000 -i :3002 -i :4001 2>/dev/null | grep -v COMMAND | awk '{print $2}' | xargs -r kill -9 2>/dev/null || true
    rm -rf node_modules pnpm-lock.yaml
    print_success "Development environment cleaned"
}

# Command: dev:status
cmd_dev_status() {
    print_header "Development Environment Status"
    echo "Checking services..."
    echo ""
    
    # Check ports
    for port in 3000 3002 4001 5432 6379; do
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo -e "${GREEN}✓${NC} Port $port is active"
        else
            echo -e "${RED}✗${NC} Port $port is inactive"
        fi
    done
    echo ""
    
    # Check services
    echo "Service URLs:"
    echo "  • Web:  http://localhost:3000"
    echo "  • Admin: http://localhost:3002"
    echo "  • API:  http://localhost:4001"
}

# Command: agent:init
cmd_agent_init() {
    print_header "Initializing OpenClaw Agent"
    
    print_status "Creating agent configuration..."
    
    # Create agent config directory
    mkdir -p "$PROJECT_ROOT/../.agent"
    
    # Generate agent ID
    AGENT_ID=$(uuidgen | tr '[:upper:]' '[:lower:]')
    
    cat > "$PROJECT_ROOT/../.agent/config.json" << EOF
{
  "agentId": "$AGENT_ID",
  "name": "Donate Protocol Agent",
  "version": "1.0.0",
  "capabilities": [
    "exchange-integration",
    "dashboard-management",
    "telegram-miniapp",
    "fundraising-campaigns",
    "user-management"
  ],
  "openclaw": {
    "enabled": true,
    "network": "mainnet",
    "protocol": "mcp",
    "endpoints": [
      "ws://localhost:9000"
    ]
  },
  "exchanges": {
    "binance": { "enabled": true },
    "coinbase": { "enabled": true },
    "kraken": { "enabled": true },
    "bybit": { "enabled": true }
  },
  "telegram": {
    "enabled": true,
    "miniApp": true
  }
}
EOF
    
    print_success "Agent initialized with ID: $AGENT_ID"
    echo "Configuration saved to: .agent/config.json"
}

# Command: agent:connect
cmd_agent_connect() {
    print_header "Connecting to OpenClaw Network"
    
    if [ ! -f "$PROJECT_ROOT/../.agent/config.json" ]; then
        print_error "Agent not initialized. Run: ./donate-cli.sh agent:init"
        exit 1
    fi
    
    print_status "Connecting to OpenClaw endpoints..."
    print_status "Starting MCP server on port 9000..."
    
    cd "$PROJECT_ROOT/.."
    pnpm --filter @donate/mcp-server dev
}

# Command: agent:status
cmd_agent_status() {
    print_header "Agent Status"
    
    if [ ! -f "$PROJECT_ROOT/../.agent/config.json" ]; then
        print_error "Agent not initialized"
        exit 1
    fi
    
    AGENT_ID=$(jq -r '.agentId' "$PROJECT_ROOT/../.agent/config.json")
    echo "Agent ID: $AGENT_ID"
    echo ""
    echo "Capabilities:"
    jq -r '.capabilities[]' "$PROJECT_ROOT/../.agent/config.json" | sed 's/^/  • /'
    echo ""
    echo "Exchange Status:"
    jq -r '.exchanges | keys[]' "$PROJECT_ROOT/../.agent/config.json" | while read ex; do
        status=$(jq -r ".exchanges.\"$ex\".enabled" "$PROJECT_ROOT/../.agent/config.json")
        if [ "$status" = "true" ]; then
            echo -e "  • $ex: ${GREEN}enabled${NC}"
        else
            echo -e "  • $ex: ${RED}disabled${NC}"
        fi
    done
}

# Command: telegram:setup
cmd_telegram_setup() {
    print_header "Setting Up Telegram MiniApp"
    
    print_status "Telegram MiniApp Configuration Wizard"
    echo ""
    
    read -p "Enter Telegram Bot Token: " BOT_TOKEN
    read -p "Enter Webhook Secret: " WEBHOOK_SECRET
    read -p "Enter App Short Name: " APP_SHORTNAME
    read -p "Enter Webhook URL (e.g., https://yourdomain.com/api/telegram/webhook): " WEBHOOK_URL
    
    # Update .env
    if grep -q "TELEGRAM_BOT_TOKEN" "$PROJECT_ROOT/../.env.local"; then
        sed -i '' "s|TELEGRAM_BOT_TOKEN=.*|TELEGRAM_BOT_TOKEN=$BOT_TOKEN|" "$PROJECT_ROOT/../.env.local"
    else
        echo "TELEGRAM_BOT_TOKEN=$BOT_TOKEN" >> "$PROJECT_ROOT/../.env.local"
    fi
    
    if grep -q "TELEGRAM_WEBHOOK_SECRET" "$PROJECT_ROOT/../.env.local"; then
        sed -i '' "s|TELEGRAM_WEBHOOK_SECRET=.*|TELEGRAM_WEBHOOK_SECRET=$WEBHOOK_SECRET|" "$PROJECT_ROOT/../.env.local"
    else
        echo "TELEGRAM_WEBHOOK_SECRET=$WEBHOOK_SECRET" >> "$PROJECT_ROOT/../.env.local"
    fi
    
    if grep -q "NEXT_PUBLIC_TELEGRAM_APP_SHORTNAME" "$PROJECT_ROOT/../.env.local"; then
        sed -i '' "s|NEXT_PUBLIC_TELEGRAM_APP_SHORTNAME=.*|NEXT_PUBLIC_TELEGRAM_APP_SHORTNAME=$APP_SHORTNAME|" "$PROJECT_ROOT/../.env.local"
    else
        echo "NEXT_PUBLIC_TELEGRAM_APP_SHORTNAME=$APP_SHORTNAME" >> "$PROJECT_ROOT/../.env.local"
    fi
    
    print_success "Telegram MiniApp configured!"
    echo "Webhook URL: $WEBHOOK_URL"
    echo ""
    print_info "Next steps:"
    echo "  1. Set webhook with Telegram bot: setWebhook $WEBHOOK_URL"
    echo "  2. Test integration: ./donate-cli.sh telegram:test"
    echo "  3. Deploy: ./donate-cli.sh telegram:deploy"
}

# Command: telegram:test
cmd_telegram_test() {
    print_header "Testing Telegram Integration"
    
    print_status "Testing Telegram webhook..."
    
    BOT_TOKEN=$(grep TELEGRAM_BOT_TOKEN "$PROJECT_ROOT/../.env.local" | cut -d= -f2)
    
    if [ -z "$BOT_TOKEN" ]; then
        print_error "Telegram Bot Token not configured"
        exit 1
    fi
    
    print_info "Sending test message..."
    # Test API connectivity
    RESPONSE=$(curl -s -X GET "https://api.telegram.org/bot$BOT_TOKEN/getMe" | jq -r '.ok')
    
    if [ "$RESPONSE" = "true" ]; then
        print_success "Telegram bot token is valid!"
    else
        print_error "Telegram bot token is invalid"
        exit 1
    fi
}

# Command: exchange:setup
cmd_exchange_setup() {
    print_header "Setting Up Exchange Integration"
    
    echo "Available exchanges:"
    echo "  1. Binance"
    echo "  2. Coinbase"
    echo "  3. Kraken"
    echo "  4. Bybit"
    echo "  5. All"
    echo ""
    read -p "Select exchange to configure (1-5): " EXCHANGE_CHOICE
    
    case $EXCHANGE_CHOICE in
        1|5)
            read -p "Binance API Key: " BINANCE_KEY
            read -p "Binance API Secret: " BINANCE_SECRET
            sed -i '' "s|EXCHANGE_API_KEY_BINANCE=.*|EXCHANGE_API_KEY_BINANCE=$BINANCE_KEY|" "$PROJECT_ROOT/../.env.local"
            sed -i '' "s|EXCHANGE_SECRET_BINANCE=.*|EXCHANGE_SECRET_BINANCE=$BINANCE_SECRET|" "$PROJECT_ROOT/../.env.local"
            print_success "Binance configured"
            [[ $EXCHANGE_CHOICE == 5 ]] && EXCHANGE_CHOICE=2 || exit 0
            ;;&
        2|5)
            read -p "Coinbase API Key: " COINBASE_KEY
            read -p "Coinbase API Secret: " COINBASE_SECRET
            sed -i '' "s|EXCHANGE_API_KEY_COINBASE=.*|EXCHANGE_API_KEY_COINBASE=$COINBASE_KEY|" "$PROJECT_ROOT/../.env.local"
            sed -i '' "s|EXCHANGE_SECRET_COINBASE=.*|EXCHANGE_SECRET_COINBASE=$COINBASE_SECRET|" "$PROJECT_ROOT/../.env.local"
            print_success "Coinbase configured"
            [[ $EXCHANGE_CHOICE == 5 ]] && EXCHANGE_CHOICE=3 || exit 0
            ;;&
        3|5)
            read -p "Kraken API Key: " KRAKEN_KEY
            read -p "Kraken API Secret: " KRAKEN_SECRET
            sed -i '' "s|EXCHANGE_API_KEY_KRAKEN=.*|EXCHANGE_API_KEY_KRAKEN=$KRAKEN_KEY|" "$PROJECT_ROOT/../.env.local"
            sed -i '' "s|EXCHANGE_SECRET_KRAKEN=.*|EXCHANGE_SECRET_KRAKEN=$KRAKEN_SECRET|" "$PROJECT_ROOT/../.env.local"
            print_success "Kraken configured"
            [[ $EXCHANGE_CHOICE == 5 ]] && EXCHANGE_CHOICE=4 || exit 0
            ;;&
        4|5)
            read -p "Bybit API Key: " BYBIT_KEY
            read -p "Bybit API Secret: " BYBIT_SECRET
            sed -i '' "s|EXCHANGE_API_KEY_BYBIT=.*|EXCHANGE_API_KEY_BYBIT=$BYBIT_KEY|" "$PROJECT_ROOT/../.env.local"
            sed -i '' "s|EXCHANGE_SECRET_BYBIT=.*|EXCHANGE_SECRET_BYBIT=$BYBIT_SECRET|" "$PROJECT_ROOT/../.env.local"
            print_success "Bybit configured"
            ;;
    esac
    
    echo ""
    print_info "Exchange configurations saved to .env.local"
    print_info "Test connectivity: ./donate-cli.sh exchange:test"
}

# Command: exchange:test
cmd_exchange_test() {
    print_header "Testing Exchange Integration"
    
    print_status "Testing exchange connectivity..."
    
    # Test Binance
    print_info "Testing Binance..."
    BINANCE_RESPONSE=$(curl -s https://api.binance.com/api/v3/ping | jq -r '.' 2>/dev/null)
    if [ ! -z "$BINANCE_RESPONSE" ]; then
        print_success "Binance: OK"
    else
        print_error "Binance: Connection failed"
    fi
    
    # Test Coinbase
    print_info "Testing Coinbase..."
    COINBASE_RESPONSE=$(curl -s https://api.coinbase.com/v2/currencies | jq -r '.data[0].id' 2>/dev/null)
    if [ ! -z "$COINBASE_RESPONSE" ]; then
        print_success "Coinbase: OK"
    else
        print_error "Coinbase: Connection failed"
    fi
    
    print_success "Exchange connectivity tests completed"
}

# Command: db:migrate
cmd_db_migrate() {
    print_header "Running Database Migrations"
    cd "$PROJECT_ROOT/.."
    pnpm --filter @donate/database run migrate
}

# Command: build
cmd_build() {
    print_header "Building All Packages"
    cd "$PROJECT_ROOT/.."
    pnpm run build
    print_success "Build completed successfully"
}

# Command: build:prod
cmd_build_prod() {
    print_header "Building for Production"
    cd "$PROJECT_ROOT/.."
    NODE_ENV=production pnpm run build
    print_success "Production build completed"
}

# Command: deploy:prod
cmd_deploy_prod() {
    print_header "Deploying to Production"
    bash "$PROJECT_ROOT/../scripts/deploy-prod.sh"
}

# Command: test
cmd_test() {
    print_header "Running All Tests"
    cd "$PROJECT_ROOT/.."
    pnpm run test
}

# Command: help
cmd_help() {
    show_usage
}

# Command: status
cmd_status() {
    print_header "System Status"
    
    print_info "Node.js: $(node -v)"
    print_info "pnpm: $(pnpm -v)"
    
    echo ""
    cmd_dev_status
}

# Main command router
main() {
    if [ $# -eq 0 ]; then
        show_usage
        exit 0
    fi
    
    COMMAND="$1"
    
    case "$COMMAND" in
        dev)                cmd_dev ;;
        dev:setup)          cmd_dev_setup ;;
        dev:clean)          cmd_dev_clean ;;
        dev:status)         cmd_dev_status ;;
        agent:init)         cmd_agent_init ;;
        agent:connect)      cmd_agent_connect ;;
        agent:status)       cmd_agent_status ;;
        telegram:setup)     cmd_telegram_setup ;;
        telegram:test)      cmd_telegram_test ;;
        exchange:setup)     cmd_exchange_setup ;;
        exchange:test)      cmd_exchange_test ;;
        db:migrate)         cmd_db_migrate ;;
        build)              cmd_build ;;
        build:prod)         cmd_build_prod ;;
        deploy:prod)        cmd_deploy_prod ;;
        test)               cmd_test ;;
        status)             cmd_status ;;
        help|--help|-h)     cmd_help ;;
        *)
            print_error "Unknown command: $COMMAND"
            echo ""
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
