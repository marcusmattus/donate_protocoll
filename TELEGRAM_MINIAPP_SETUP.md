# Telegram MiniApp Integration Guide

## Overview

This guide shows how to integrate a Telegram MiniApp with the Donate Protocol platform, enabling users to trade and donate directly from Telegram.

## Prerequisites

- Telegram Bot (created via @BotFather)
- Bot token and webhook URL
- Deployed API server with HTTPS
- MiniApp hosted URL

## Step 1: Create Telegram Bot

### Via BotFather

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow prompts:
   - **Name**: "Donate Protocol Bot"
   - **Username**: "donate_protocol_bot" (must be unique)
4. Save the **Bot Token**

### Get Bot Commands

```
/setcommands

start - Start using Donate Protocol
help - Show help information
dashboard - Open trading dashboard
balance - Check wallet balance
donate - Manage donation settings
```

## Step 2: Setup Webhook

### Generate Bot Token

```bash
export TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"
```

### Set Webhook URL

```bash
curl -X POST \
  https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://api.yourdomain.com/telegram/webhook",
    "allowed_updates": ["message", "callback_query", "web_app_data"]
  }'
```

### Verify Webhook

```bash
curl https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo
```

## Step 3: Configure MiniApp

### Create MiniApp URL

The MiniApp URL must be served over HTTPS and hosted separately:

```
https://miniapp.yourdomain.com
```

### Set MiniApp Command

```bash
curl -X POST \
  https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setMyCommands \
  -H 'Content-Type: application/json' \
  -d '{
    "commands": [
      {
        "command": "start",
        "description": "Start using Donate Protocol"
      },
      {
        "command": "dashboard",
        "description": "Open trading dashboard"
      }
    ]
  }'
```

### Register Web App

```bash
curl -X POST \
  https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setMyDefaultAdministratorRights \
  -H 'Content-Type: application/json' \
  -d '{
    "rights": {
      "can_manage_topics": false
    }
  }'
```

## Step 4: Create MiniApp Frontend

### Directory Structure

```
apps/
  miniapp/
    src/
      app.tsx
      components/
        Dashboard.tsx
        Trading.tsx
        Wallet.tsx
      lib/
        telegram.ts
    package.json
```

### Main App Component

```tsx
// apps/miniapp/src/app.tsx

import React, { useEffect, useState } from 'react';
import { useTelegram } from './lib/telegram';
import Dashboard from './components/Dashboard';

export function App() {
  const { user, isReady, sendData, openLink } = useTelegram();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      setLoading(false);
    }
  }, [isReady]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <header className="p-4 bg-opacity-50 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white">Donate Protocol</h1>
        <p className="text-sm text-gray-200">{user?.first_name} ({user?.id})</p>
      </header>

      <main className="p-4">
        <Dashboard user={user} onSendData={sendData} />
      </main>

      <footer className="p-4 bg-black bg-opacity-20 text-center text-sm text-gray-300">
        Powered by Donate Protocol
      </footer>
    </div>
  );
}
```

### Telegram Integration Library

```typescript
// apps/miniapp/src/lib/telegram.ts

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_bot?: boolean;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  openLink: (url: string, try_instant_view?: boolean) => void;
  openTelegramLink: (url: string) => void;
  showAlert: (alert: string, onclose?: () => void) => void;
  showConfirm: (message: string, callback?: (ok: boolean) => void) => void;
  initData: string;
  initDataUnsafe: { user?: TelegramUser; query_id?: string };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export function useTelegram() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;

      // Set up WebApp
      webApp.expand();
      setUser(webApp.initDataUnsafe.user || null);
      setIsReady(true);
      webApp.ready();

      // Enable back button
      if (webApp.isClosingConfirmationEnabled) {
        webApp.disableClosingConfirmation();
      }
    }
  }, []);

  const sendData = (data: string | object) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(
        typeof data === 'string' ? data : JSON.stringify(data)
      );
    }
  };

  const showAlert = (message: string) => {
    window.Telegram?.WebApp?.showAlert(message);
  };

  const showConfirm = (message: string) => {
    return new Promise<boolean>(resolve => {
      window.Telegram?.WebApp?.showConfirm(message, ok => {
        resolve(ok);
      });
    });
  };

  const openLink = (url: string) => {
    window.Telegram?.WebApp?.openLink(url);
  };

  return {
    isReady,
    user,
    sendData,
    showAlert,
    showConfirm,
    openLink,
  };
}
```

### Dashboard Component

```tsx
// apps/miniapp/src/components/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Trading } from './Trading';
import { Wallet } from './Wallet';

interface DashboardProps {
  user: any;
  onSendData: (data: any) => void;
}

export function Dashboard({ user, onSendData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'trading' | 'wallet'>('trading');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}/balance`, {
        headers: {
          'Authorization': `Bearer ${user.id}`
        }
      });
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-gray-600 text-sm font-semibold">Total Balance</h2>
        <p className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('trading')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            activeTab === 'trading'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Trading
        </button>
        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
            activeTab === 'wallet'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Wallet
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'trading' && <Trading onTrade={fetchBalance} />}
      {activeTab === 'wallet' && <Wallet balance={balance} />}
    </div>
  );
}

export default Dashboard;
```

## Step 5: Setup Bot Handler in API

### Create Handler

```typescript
// apps/api/src/routes/telegram.ts

import { FastifyInstance } from 'fastify';
import crypto from 'crypto';

export async function telegramRoutes(fastify: FastifyInstance) {
  // Verify webhook signature
  fastify.post<{ Body: any }>('/telegram/webhook', async (request, reply) => {
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    
    // Verify the webhook is from Telegram
    const hash = request.headers['x-telegram-bot-api-secret-hash'] as string;
    if (hash) {
      const hmac = crypto
        .createHmac('sha256', telegramToken || '')
        .update(JSON.stringify(request.body))
        .digest('hex');
      
      if (hmac !== hash) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }
    }

    try {
      const update = request.body;

      if (update.message) {
        await handleMessage(fastify, update.message);
      } else if (update.callback_query) {
        await handleCallback(fastify, update.callback_query);
      } else if (update.web_app_data) {
        await handleWebAppData(fastify, update.web_app_data);
      }

      reply.send({ ok: true });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal server error' });
    }
  });
}

async function handleMessage(fastify: FastifyInstance, message: any) {
  const chatId = message.chat.id;
  const text = message.text;

  if (text === '/start') {
    await sendStartMessage(chatId);
  } else if (text === '/help') {
    await sendHelpMessage(chatId);
  }
}

async function handleCallback(fastify: FastifyInstance, callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'open_dashboard') {
    // Open MiniApp
    const webAppUrl = process.env.TELEGRAM_MINIAPP_URL;
    await sendMessage(chatId, '📱 Opening Dashboard...', {
      inline_keyboard: [[
        { text: 'Open Dashboard', web_app: { url: webAppUrl } }
      ]]
    });
  }
}

async function handleWebAppData(fastify: FastifyInstance, webAppData: any) {
  // Process data from MiniApp
  const data = JSON.parse(webAppData.data);
  // Handle trade data, etc.
}

async function sendStartMessage(chatId: number) {
  await sendMessage(
    chatId,
    '👋 Welcome to Donate Protocol!\n\nTrade crypto and donate to causes you care about.',
    {
      inline_keyboard: [[
        { text: '📱 Open Dashboard', web_app: { url: process.env.TELEGRAM_MINIAPP_URL } },
        { text: '❓ Help', callback_data: 'help' }
      ]]
    }
  );
}

async function sendHelpMessage(chatId: number) {
  await sendMessage(
    chatId,
    `📚 **Donate Protocol Help**\n\n` +
    `💰 **Trading**: Execute trades on multiple exchanges\n` +
    `🤝 **Donations**: Automatically donate a percentage of profits\n` +
    `📊 **Dashboard**: View your portfolio and history\n\n` +
    `Use /start to open the dashboard.`
  );
}

async function sendMessage(
  chatId: number,
  text: string,
  reply_markup?: any
) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
      reply_markup
    })
  });
}
```

## Step 6: Testing

### Local Testing

```bash
# Start API
pnpm api:dev

# In another terminal, start MiniApp
pnpm --filter @donate/miniapp dev

# Send test message to bot
curl -X POST https://api.yourdomain.com/telegram/webhook \
  -H 'Content-Type: application/json' \
  -d '{
    "update_id": 123456,
    "message": {
      "message_id": 1,
      "date": 1234567890,
      "chat": { "id": 123456789, "type": "private" },
      "text": "/start",
      "from": { "id": 123456789, "first_name": "Test", "is_bot": false }
    }
  }'
```

### Production Testing

1. Find your bot in Telegram search
2. Send `/start` command
3. Tap "Open Dashboard" button
4. Test trading and donation features

## Step 7: Deployment

### Build MiniApp

```bash
pnpm --filter @donate/miniapp build
```

### Deploy to Hosting

```bash
# Upload build to your hosting provider
scp -r apps/miniapp/dist/* user@miniapp.yourdomain.com:/var/www/miniapp
```

### Update Webhook

```bash
curl -X POST \
  https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://api.yourdomain.com/telegram/webhook"
  }'
```

## Security Considerations

1. **Verify Webhook Signature**: Always validate that webhook requests come from Telegram
2. **Store Secrets Safely**: Never commit bot token to git
3. **Rate Limiting**: Implement rate limiting for bot commands
4. **Validate User Input**: Sanitize all data from MiniApp
5. **HTTPS Only**: All MiniApp URLs must be HTTPS
6. **User Authentication**: Verify user IDs from Telegram
7. **Data Encryption**: Encrypt sensitive data in transit

## Troubleshooting

### Webhook Not Receiving Updates

- Verify HTTPS certificate is valid
- Check webhook URL is accessible
- Review bot logs for errors
- Ensure allowed_updates includes required types

### MiniApp Not Loading

- Check MiniApp URL is accessible
- Verify HTTPS certificate
- Check browser console for errors
- Review CORS configuration

### User Data Not Available

- Verify user is authenticated in Telegram
- Check initDataUnsafe contains user object
- Verify bot token is correct

## Additional Resources

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Web Apps](https://core.telegram.org/bots/webapps)
- [Security Checklist](https://core.telegram.org/bots/webapps#validate-data-received-via-the-web-app)

---

**Version**: 1.0.0
**Last Updated**: 2024
