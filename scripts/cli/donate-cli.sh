#!/bin/bash
# Donate Protocol CLI Agent
# Universal agent command for OpenClaw integration
# Usage: donate-cli [command] [options]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Version
VERSION="1.0.0"
AGENT_HOME="${DONATE_AGENT_HOME:-.donate-agent}"
API_URL="${DONATE_API_URL:-http://localhost:3001}"
MCP_SERVER="${DONATE_MCP_SERVER:-http://localhost:3002}"

# Ensure agent home exists
mkdir -p ~/$AGENT_HOME

# Help text
show_help() {
    cat << 'HELP'
╔════════════════════════════════════════════════════════════════╗
║                   Donate Protocol CLI Agent                    ║
║              Easy integration with OpenClaw & more             ║
╚════════════════════════════════════════════════════════════════╝

USAGE:
  donate-cli [command] [options]

COMMANDS:
  init                Initialize agent setup
  connect [broker]    Connect to broker (alpaca, coinbase, etc)
  rule [action]       Manage donation rules
  donate              Make one-time donation
  status              Show connection status
  config              Manage configuration
  telegram            Setup Telegram MiniApp
  openclaw            Configure for OpenClaw
  agent               Agent operations
  help                Show this help

QUICK START:
  donate-cli init                    # Initialize agent
  donate-cli connect alpaca          # Connect to Alpaca
  donate-cli rule create -p 0.1      # Create 0.1% donation rule
  donate-cli status                  # Check status

EXAMPLES:
  # Setup with OpenClaw
  donate-cli openclaw --token abc123

  # Setup Telegram MiniApp
  donate-cli telegram setup --token BOT_TOKEN

  # Agent-specific commands
  donate-cli agent list              # List active agents
  donate-cli agent invoke [name]     # Invoke specific agent

For detailed help: donate-cli help [command]
HELP
}

# Show help for specific command
show_command_help() {
    case "$1" in
        init)
            echo "Initialize agent: donate-cli init [--name NAME] [--env ENV]"
            echo "Options: --name (agent name), --env (dev/staging/prod)"
            ;;
        connect)
            echo "Connect broker: donate-cli connect [broker] [options]"
            echo "Brokers: alpaca, coinbase, kraken, robinhood, interactive-brokers"
            echo "Example: donate-cli connect alpaca --api-key KEY --secret SECRET"
            ;;
        rule)
            echo "Manage rules: donate-cli rule [create|list|delete|pause|resume]"
            echo "Create: donate-cli rule create -t percentage -v 0.1"
            echo "  Options: -t (type), -v (value), -d (daily_cap), -m (monthly_cap)"
            ;;
        *)
            show_help
            ;;
    esac
}

# Initialize agent
init_agent() {
    local agent_name="${1:-default}"
    local env="${2:-development}"
    
    echo -e "${BLUE}🚀 Initializing Donate Protocol Agent...${NC}"
    
    # Create agent directory
    mkdir -p ~/$AGENT_HOME/$agent_name
    
    # Generate agent config
    cat > ~/$AGENT_HOME/$agent_name/config.json << CONFEOF
{
  "name": "$agent_name",
  "version": "$VERSION",
  "env": "$env",
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "api_url": "$API_URL",
  "mcp_server": "$MCP_SERVER",
  "connections": [],
  "rules": [],
  "features": {
    "openclaw": false,
    "telegram": false,
    "auto_trade": false
  }
}
CONFEOF

    # Generate API key
    local api_key=$(openssl rand -hex 32)
    echo "$api_key" > ~/$AGENT_HOME/$agent_name/.api-key
    chmod 600 ~/$AGENT_HOME/$agent_name/.api-key
    
    # Generate auth token
    local auth_token=$(openssl rand -hex 64)
    echo "$auth_token" > ~/$AGENT_HOME/$agent_name/.auth-token
    chmod 600 ~/$AGENT_HOME/$agent_name/.auth-token
    
    echo -e "${GREEN}✓ Agent initialized: $agent_name${NC}"
    echo -e "  Location: ~/$AGENT_HOME/$agent_name"
    echo -e "  API Key: ${YELLOW}$api_key${NC}"
    echo -e "  Auth Token: ${YELLOW}$auth_token${NC}"
}

# Connect to broker
connect_broker() {
    local broker="$1"
    local api_key="$2"
    local secret="$3"
    
    echo -e "${BLUE}🔗 Connecting to $broker...${NC}"
    
    case "$broker" in
        alpaca)
            echo -e "${YELLOW}ℹ️  Get credentials at: https://alpaca.markets${NC}"
            ;;
        coinbase)
            echo -e "${YELLOW}ℹ️  Get credentials at: https://www.coinbase.com/settings/api${NC}"
            ;;
        kraken)
            echo -e "${YELLOW}ℹ️  Get credentials at: https://www.kraken.com/settings/api${NC}"
            ;;
        *)
            echo -e "${RED}✗ Unknown broker: $broker${NC}"
            return 1
            ;;
    esac
    
    # Call API to create connection
    curl -s -X POST "$API_URL/connections" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $(cat ~/$AGENT_HOME/default/.auth-token 2>/dev/null || echo '')" \
        -d "{
            \"provider\": \"$broker\",
            \"accountType\": \"trading\"
        }" | jq .
    
    echo -e "${GREEN}✓ Connection initiated${NC}"
}

# Create donation rule
create_rule() {
    local rule_type="$1"
    local value="$2"
    
    echo -e "${BLUE}📝 Creating donation rule...${NC}"
    
    curl -s -X POST "$API_URL/donations/rules" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $(cat ~/$AGENT_HOME/default/.auth-token 2>/dev/null || echo '')" \
        -d "{
            \"name\": \"Auto Donation\",
            \"ruleType\": \"${rule_type^^}\",
            \"value\": $value,
            \"allocations\": [{
                \"recipientId\": \"default\",
                \"percentage\": 100
            }]
        }" | jq .
    
    echo -e "${GREEN}✓ Rule created${NC}"
}

# Setup Telegram
setup_telegram() {
    local action="$1"
    
    case "$action" in
        setup)
            echo -e "${BLUE}📱 Setting up Telegram MiniApp...${NC}"
            echo -e "${YELLOW}ℹ️  Bot token needed: /token on @BotFather${NC}"
            bash scripts/telegram/setup-miniapp.sh
            ;;
        test)
            echo -e "${BLUE}📱 Testing Telegram connection...${NC}"
            bash scripts/telegram/test-connection.sh
            ;;
        *)
            echo "Usage: donate-cli telegram [setup|test]"
            ;;
    esac
}

# Setup OpenClaw
setup_openclaw() {
    echo -e "${BLUE}🔮 Configuring for OpenClaw...${NC}"
    bash scripts/agents/openclaw-setup.sh "$@"
    echo -e "${GREEN}✓ OpenClaw configured${NC}"
}

# Show status
show_status() {
    echo -e "${BLUE}📊 Donate Protocol Status${NC}"
    echo ""
    echo "API Server: $(curl -s $API_URL/health | jq .status 2>/dev/null || echo 'offline')"
    echo "Agent Home: ~/$AGENT_HOME"
    
    if [ -f ~/$AGENT_HOME/default/config.json ]; then
        echo "Default Agent: $(jq .name ~/$AGENT_HOME/default/config.json 2>/dev/null || echo 'unconfigured')"
    fi
}

# Main command handler
case "${1:-help}" in
    init)
        init_agent "${2:-default}" "${3:-development}"
        ;;
    connect)
        connect_broker "$2" "$3" "$4"
        ;;
    rule)
        case "$2" in
            create)
                # Parse options: -t type -v value -d daily -m monthly
                create_rule "percentage" "0.1"
                ;;
            *)
                echo "Rule actions: create|list|delete|pause|resume"
                ;;
        esac
        ;;
    donate)
        echo "Making donation..."
        curl -s -X POST "$API_URL/donations" \
            -H "Authorization: Bearer $(cat ~/$AGENT_HOME/default/.auth-token 2>/dev/null || echo '')" | jq .
        ;;
    status)
        show_status
        ;;
    config)
        echo "Config location: ~/$AGENT_HOME"
        ls -la ~/$AGENT_HOME/*/config.json 2>/dev/null || echo "No agents configured"
        ;;
    telegram)
        setup_telegram "$2"
        ;;
    openclaw)
        setup_openclaw "$2" "$3"
        ;;
    agent)
        bash scripts/agents/agent-manager.sh "$2" "$3"
        ;;
    help)
        show_command_help "$2"
        ;;
    --version|-v)
        echo "Donate Protocol CLI v$VERSION"
        ;;
    *)
        show_help
        ;;
esac
