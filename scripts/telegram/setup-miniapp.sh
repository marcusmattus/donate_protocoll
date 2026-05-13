#!/bin/bash
# Telegram MiniApp Setup for Donate Protocol
# Creates a fully functional Telegram bot with MiniApp integration

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}📱 Donate Protocol Telegram MiniApp Setup${NC}"
echo ""

# Get bot token
read -p "Enter Telegram Bot Token (get from @BotFather): " BOT_TOKEN
if [ -z "$BOT_TOKEN" ]; then
    echo "Bot token required"
    exit 1
fi

# Get app URL
read -p "Enter MiniApp URL (e.g., https://app.donate-protocol.com): " APP_URL
if [ -z "$APP_URL" ]; then
    echo "App URL required"
    exit 1
fi

echo -e "${BLUE}Creating Telegram bot configuration...${NC}"

# Create config directory
mkdir -p ~/.donate-agent/telegram

# Save configuration
cat > ~/.donate-agent/telegram/config.json << CONFEOF
{
  "botToken": "$BOT_TOKEN",
  "appUrl": "$APP_URL",
  "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "webhookPath": "/telegram/webhook",
  "commands": ["start", "connect", "donate", "status", "help"],
  "miniAppSettings": {
    "headerColor": "#6366f1",
    "backButtonShown": true,
    "expandable": true,
    "verticalDragSupported": false
  }
}
CONFEOF

echo -e "${GREEN}✓ Telegram configuration saved${NC}"

# Create webhook handler
cat > ~/.donate-agent/telegram/webhook.js << 'WEBHOOKEOF'
// Telegram Webhook Handler for Donate Protocol
const https = require('https');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API_URL = process.env.API_URL || 'http://localhost:3001';

exports.handler = async (event) => {
  try {
    const update = JSON.parse(event.body);
    
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      
      switch(text) {
        case '/start':
          await sendMessage(chatId, '👋 Welcome to Donate Protocol!\n\nUse /help to see available commands.');
          break;
        case '/help':
          await sendMessage(chatId, 'Commands:\n/start - Start\n/connect - Connect broker\n/donate - Make donation\n/status - Show status');
          break;
        case '/connect':
          await sendMiniApp(chatId, 'Connect Trading Account');
          break;
        case '/donate':
          await sendMiniApp(chatId, 'Donate Now');
          break;
        case '/status':
          await sendStatus(chatId);
          break;
        default:
          await sendMessage(chatId, '❓ Unknown command. Use /help');
      }
    }
    
    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: error.message };
  }
};

async function sendMessage(chatId, text) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

async function sendMiniApp(chatId, text) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      reply_markup: {
        inline_keyboard: [[{
          text: '🚀 Open App',
          web_app: { url: process.env.MINIAPP_URL }
        }]]
      }
    })
  });
}

async function sendStatus(chatId) {
  try {
    const response = await fetch(`${API_URL}/users/me/impact`);
    const data = await response.json();
    
    const text = `📊 Your Impact:\n\n` +
                 `💰 Total Donated: $${data.totalDonated}\n` +
                 `📈 Trades: ${data.totalTrades}\n` +
                 `❤️ Recipients: ${data.recipientsSupported}`;
    
    await sendMessage(chatId, text);
  } catch (error) {
    await sendMessage(chatId, '❌ Error fetching status');
  }
}
WEBHOOKEOF

echo -e "${GREEN}✓ Webhook handler created${NC}"

# Create MiniApp HTML
cat > ~/.donate-agent/telegram/miniapp.html << 'MINIAPPEOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Donate Protocol</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
    .container { max-width: 500px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .button { width: 100%; padding: 12px; background: #6366f1; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin-bottom: 10px; }
    .button:hover { background: #4f46e5; }
    .stat { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .stat-value { font-weight: bold; color: #6366f1; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💚 Donate Protocol</h1>
      <p>Trade for Impact</p>
    </div>
    
    <div class="card">
      <h2>Your Impact</h2>
      <div class="stat">
        <span>Total Donated</span>
        <span class="stat-value" id="totalDonated">$0.00</span>
      </div>
      <div class="stat">
        <span>Trades</span>
        <span class="stat-value" id="trades">0</span>
      </div>
      <div class="stat">
        <span>Recipients</span>
        <span class="stat-value" id="recipients">0</span>
      </div>
    </div>
    
    <button class="button" onclick="connectBroker()">🔗 Connect Broker</button>
    <button class="button" onclick="createRule()">📝 Create Rule</button>
    <button class="button" onclick="donate()">💳 Donate Now</button>
    <button class="button" onclick="Telegram.WebApp.close()">❌ Close</button>
  </div>

  <script>
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    const API_URL = 'http://localhost:3001';
    const token = tg.initData;
    
    async function fetchImpact() {
      try {
        const resp = await fetch(`${API_URL}/users/me/impact`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await resp.json();
        document.getElementById('totalDonated').textContent = `$${data.totalDonated.toFixed(2)}`;
        document.getElementById('trades').textContent = data.totalTrades;
        document.getElementById('recipients').textContent = data.recipientsSupported;
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
    async function connectBroker() {
      tg.sendData(JSON.stringify({ action: 'connect' }));
      tg.close();
    }
    
    async function createRule() {
      const rule = prompt('Enter donation percentage (e.g., 0.1):');
      if (rule) {
        tg.sendData(JSON.stringify({ action: 'createRule', value: parseFloat(rule) }));
        tg.close();
      }
    }
    
    async function donate() {
      tg.sendData(JSON.stringify({ action: 'donate' }));
      tg.close();
    }
    
    // Load data on startup
    fetchImpact();
    setInterval(fetchImpact, 30000); // Refresh every 30 seconds
  </script>
</body>
</html>
MINIAPPEOF

echo -e "${GREEN}✓ MiniApp HTML created${NC}"

# Create setup instructions
cat > ~/.donate-agent/telegram/SETUP.md << 'SETUPEOF'
# Telegram MiniApp Setup Complete

## Next Steps:

1. **Bot Token Saved**: ~/.donate-agent/telegram/config.json

2. **Set Webhook** (If using webhook):
```bash
curl -X POST https://api.telegram.org/bot$BOT_TOKEN/setWebhook \
  -d url=https://your-domain.com/telegram/webhook
```

3. **Deploy MiniApp**:
   - Copy miniapp.html to your web server
   - Update AppUrl in config.json
   - Configure webhook.js as Lambda function or server endpoint

4. **Bot Commands** (Set in BotFather):
   - start - Welcome message
   - help - Show commands
   - connect - Connect trading account
   - donate - Make donation
   - status - Show impact stats

5. **Test Bot**:
   - Open Telegram
   - Search for your bot
   - Send /start
   - Try commands

## Features:
✅ One-click broker connection
✅ Quick donation rules
✅ Real-time impact tracking
✅ Telegram notifications
✅ MiniApp interface

## Support:
For issues, visit: https://docs.donate-protocol.com/telegram
SETUPEOF

echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Configuration saved to:${NC}"
echo "  Config: ~/.donate-agent/telegram/config.json"
echo "  Webhook: ~/.donate-agent/telegram/webhook.js"
echo "  MiniApp: ~/.donate-agent/telegram/miniapp.html"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Set bot commands in BotFather"
echo "  2. Deploy webhook handler"
echo "  3. Test with /start command"
echo ""
echo -e "${YELLOW}See ~/.donate-agent/telegram/SETUP.md for details${NC}"
