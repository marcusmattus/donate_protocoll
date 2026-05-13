#!/bin/bash
# OpenClaw Integration for Donate Protocol Agents
# Enables seamless AI agent connection and operation

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔮 Donate Protocol OpenClaw Integration${NC}"
echo ""

# Get OpenClaw token
OPENCLAW_TOKEN="${1:-}"
if [ -z "$OPENCLAW_TOKEN" ]; then
    read -p "Enter OpenClaw API Token: " OPENCLAW_TOKEN
fi

if [ -z "$OPENCLAW_TOKEN" ]; then
    echo -e "${RED}✗ OpenClaw token required${NC}"
    exit 1
fi

# Create OpenClaw config
mkdir -p ~/.donate-agent/openclaw

cat > ~/.donate-agent/openclaw/config.json << CONFEOF
{
  "provider": "openclaw",
  "token": "$OPENCLAW_TOKEN",
  "apiUrl": "https://api.openclaw.com/v1",
  "features": {
    "agentDeployment": true,
    "realTimeSync": true,
    "autoScaling": true,
    "cloudExecution": true
  },
  "agents": [],
  "syncInterval": 300000,
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
CONFEOF

echo -e "${GREEN}✓ OpenClaw configuration saved${NC}"

# Create agent manager
cat > ~/.donate-agent/openclaw/agent-client.js << 'CLIENTEOF'
/**
 * OpenClaw Agent Client for Donate Protocol
 * Manages AI agents with full cloud integration
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class OpenClawAgentClient {
  constructor(token, apiUrl = 'https://api.openclaw.com/v1') {
    this.token = token;
    this.apiUrl = apiUrl;
    this.agents = [];
  }

  async authenticate() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openclaw.com',
        port: 443,
        path: '/v1/auth/verify',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error('Authentication failed'));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  async deployAgent(agentConfig) {
    const payload = JSON.stringify({
      name: agentConfig.name,
      type: agentConfig.type || 'donation',
      config: agentConfig,
      environment: agentConfig.env || 'production'
    });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openclaw.com',
        port: 443,
        path: '/v1/agents/deploy',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 201) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`Deploy failed: ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }

  async listAgents() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openclaw.com',
        port: 443,
        path: '/v1/agents',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error('Failed to list agents'));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });
  }

  async invokeAgent(agentId, input) {
    const payload = JSON.stringify({ input });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openclaw.com',
        port: 443,
        path: `/v1/agents/${agentId}/invoke`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error('Invocation failed'));
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }

  async syncConfig() {
    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    return new Promise((resolve, reject) => {
      const payload = JSON.stringify(config);
      const options = {
        hostname: 'api.openclaw.com',
        port: 443,
        path: '/v1/config/sync',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error('Sync failed'));
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }
}

module.exports = OpenClawAgentClient;
CLIENTEOF

echo -e "${GREEN}✓ OpenClaw agent client created${NC}"

# Create example agent
cat > ~/.donate-agent/openclaw/example-agent.js << 'AGENTEOF'
/**
 * Example Donate Protocol Agent for OpenClaw
 * Fully automated donation management
 */

const OpenClawAgentClient = require('./agent-client');

class DonateAgent {
  constructor(token) {
    this.client = new OpenClawAgentClient(token);
    this.name = 'donate-bot-01';
  }

  async initialize() {
    console.log('🤖 Initializing Donate Protocol Agent...');
    await this.client.authenticate();
    console.log('✓ Authenticated with OpenClaw');
  }

  async deploy() {
    console.log('📦 Deploying agent to OpenClaw...');
    
    const agentConfig = {
      name: this.name,
      type: 'donation',
      env: 'production',
      capabilities: [
        'connect_broker',
        'create_rule',
        'manage_donations',
        'track_impact'
      ],
      autoScale: true,
      maxInstances: 10,
      timeoutSeconds: 300,
      memoryMb: 256
    };

    const result = await this.client.deployAgent(agentConfig);
    console.log('✓ Agent deployed:', result);
    return result;
  }

  async list() {
    console.log('📋 Fetching agents...');
    const agents = await this.client.listAgents();
    console.log('Agents:', agents);
    return agents;
  }

  async invoke(agentId, command) {
    console.log(`🚀 Invoking agent: ${agentId}`);
    const result = await this.client.invokeAgent(agentId, command);
    console.log('Result:', result);
    return result;
  }

  async sync() {
    console.log('🔄 Syncing configuration...');
    const result = await this.client.syncConfig();
    console.log('✓ Synced');
    return result;
  }
}

// Usage
const token = process.env.OPENCLAW_TOKEN;
const agent = new DonateAgent(token);

(async () => {
  try {
    await agent.initialize();
    await agent.deploy();
    await agent.list();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

module.exports = DonateAgent;
AGENTEOF

echo -e "${GREEN}✓ Example agent created${NC}"

# Create CLI wrapper
cat > ~/.donate-agent/openclaw/cli.sh << 'CLIEOF'
#!/bin/bash
# OpenClaw CLI for Donate Agents

OPENCLAW_TOKEN=$(cat config.json | jq -r '.token')

case "$1" in
  deploy)
    node example-agent.js deploy
    ;;
  list)
    node example-agent.js list
    ;;
  invoke)
    node example-agent.js invoke "$2" "$3"
    ;;
  sync)
    node example-agent.js sync
    ;;
  *)
    echo "Usage: ./cli.sh [deploy|list|invoke|sync]"
    ;;
esac
CLIEOF

chmod +x ~/.donate-agent/openclaw/cli.sh

echo -e "${GREEN}✓ CLI wrapper created${NC}"

# Create setup guide
cat > ~/.donate-agent/openclaw/README.md << 'READMEEOF'
# OpenClaw Integration Guide

## Setup Complete!

### Features Enabled:
✅ Cloud agent deployment
✅ Real-time synchronization
✅ Auto-scaling
✅ Cloud execution

### Configuration:
- Location: ~/.donate-agent/openclaw/
- Token: Saved in config.json
- Client: agent-client.js

### Quick Start:

```bash
# Deploy agent
node example-agent.js deploy

# List agents
node example-agent.js list

# Invoke agent
node example-agent.js invoke [agent-id] [command]

# Sync config
node example-agent.js sync
```

### Agent Capabilities:
- Connect to any broker
- Create donation rules automatically
- Manage donations
- Track impact in real-time
- Generate reports

### Example Commands:
```bash
# Connect Alpaca broker
./cli.sh invoke agent-1 '{"action":"connect","broker":"alpaca"}'

# Create donation rule
./cli.sh invoke agent-1 '{"action":"createRule","type":"percentage","value":0.1}'

# Get status
./cli.sh invoke agent-1 '{"action":"status"}'
```

### Monitoring:
- Agents auto-scale based on demand
- All operations logged
- Real-time sync every 5 minutes
- Webhook notifications available

### API Documentation:
https://docs.openclaw.com/donate-protocol
READMEEOF

echo -e "${GREEN}✓ Documentation created${NC}"

echo ""
echo -e "${BLUE}OpenClaw Integration Complete!${NC}"
echo ""
echo "Location: ~/.donate-agent/openclaw/"
echo "Config: config.json"
echo "Client: agent-client.js"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Review config.json"
echo "2. Run: node example-agent.js deploy"
echo "3. Check: node example-agent.js list"
echo ""
echo "Docs: ~/.donate-agent/openclaw/README.md"
