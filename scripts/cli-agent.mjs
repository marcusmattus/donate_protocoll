#!/usr/bin/env node

/**
 * Donate Protocol CLI Agent
 * Easy setup and management tool for developers
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}[${type.toUpperCase()}]${colors.reset} ${message}`);
}

function runCommand(command, silent = false) {
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    if (!silent) log(`✓ ${command}`, 'success');
    return output;
  } catch (error) {
    log(`✗ Failed: ${command}`, 'error');
    if (!silent) console.error(error.message);
    return null;
  }
}

async function initializeProject() {
  log('🚀 Initializing Donate Protocol Project...');
  
  // Check Node version
  const nodeVersion = process.version;
  log(`Node Version: ${nodeVersion}`, 'info');
  
  if (!runCommand('pnpm --version', true)) {
    log('pnpm is not installed. Installing...', 'warning');
    runCommand('npm install -g pnpm');
  }
  
  // Install dependencies
  log('Installing dependencies...', 'info');
  runCommand('pnpm install --frozen-lockfile');
  
  log('✓ Project initialized successfully', 'success');
}

async function setupExchangeIntegration() {
  log('🔌 Exchange Integration Setup');
  
  const exchanges = ['binance', 'coinbase', 'kraken', 'bybit'];
  const selected = [];
  
  for (const exchange of exchanges) {
    const shouldSetup = await question(`Setup ${exchange}? (y/n): `);
    if (shouldSetup.toLowerCase() === 'y') {
      selected.push(exchange);
    }
  }
  
  if (selected.length === 0) {
    log('No exchanges selected', 'warning');
    return;
  }
  
  // Create exchange config file
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  for (const exchange of selected) {
    log(`\nConfiguring ${exchange}...`, 'info');
    const apiKey = await question(`${exchange} API Key: `);
    const apiSecret = await question(`${exchange} API Secret: `);
    
    envContent += `EXCHANGE_API_KEY_${exchange.toUpperCase()}=${apiKey}\n`;
    envContent += `EXCHANGE_SECRET_${exchange.toUpperCase()}=${apiSecret}\n`;
  }
  
  if (fs.existsSync(envPath)) {
    const existing = fs.readFileSync(envPath, 'utf-8');
    fs.writeFileSync(envPath, existing + '\n' + envContent);
  } else {
    fs.writeFileSync(envPath, envContent);
  }
  
  log('✓ Exchange credentials saved to .env.local', 'success');
  log('⚠️  Keep .env.local private and never commit to git', 'warning');
}

async function setupTelegramMiniApp() {
  log('📱 Telegram MiniApp Setup');
  
  const botToken = await question('Enter Telegram Bot Token: ');
  const webhookUrl = await question('Enter Webhook URL (e.g., https://api.yourdomain.com/telegram/webhook): ');
  
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  envContent += `TELEGRAM_BOT_TOKEN=${botToken}\n`;
  envContent += `TELEGRAM_WEBHOOK_URL=${webhookUrl}\n`;
  
  if (fs.existsSync(envPath)) {
    const existing = fs.readFileSync(envPath, 'utf-8');
    fs.writeFileSync(envPath, existing + '\n' + envContent);
  } else {
    fs.writeFileSync(envPath, envContent);
  }
  
  // Create Telegram bot handler
  const handlerPath = path.join(process.cwd(), 'apps/api/src/integrations/telegram/handler.ts');
  const handlerDir = path.dirname(handlerPath);
  
  if (!fs.existsSync(handlerDir)) {
    runCommand(`mkdir -p ${handlerDir}`);
  }
  
  const handlerContent = `import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TelegramClient } from './client';

const telegram = new TelegramClient(process.env.TELEGRAM_BOT_TOKEN || '');

export async function setupTelegramRoutes(fastify: FastifyInstance) {
  fastify.post('/telegram/webhook', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const update = request.body as any;
      await telegram.handleUpdate(update);
      reply.send({ ok: true });
    } catch (error) {
      console.error('Telegram webhook error:', error);
      reply.status(500).send({ ok: false, error: String(error) });
    }
  });

  fastify.post('/telegram/send', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { chatId, message } = request.body as any;
      await telegram.sendMessage(chatId, message);
      reply.send({ ok: true });
    } catch (error) {
      reply.status(500).send({ ok: false, error: String(error) });
    }
  });
}
`;
  
  if (!fs.existsSync(handlerPath)) {
    fs.writeFileSync(handlerPath, handlerContent);
    log(`✓ Created Telegram handler: ${handlerPath}`, 'success');
  }
  
  // Create Telegram client
  const clientPath = path.join(process.cwd(), 'apps/api/src/integrations/telegram/client.ts');
  
  const clientContent = `import axios from 'axios';

export class TelegramClient {
  private apiUrl: string;

  constructor(botToken: string) {
    this.apiUrl = \`https://api.telegram.org/bot\${botToken}\`;
  }

  async handleUpdate(update: any) {
    const { message, callback_query } = update;
    
    if (message?.text) {
      await this.handleMessage(message);
    } else if (callback_query) {
      await this.handleCallback(callback_query);
    }
  }

  private async handleMessage(message: any) {
    const { chat: { id }, text } = message;
    
    if (text === '/start') {
      await this.sendMainMenu(id);
    }
  }

  private async handleCallback(callbackQuery: any) {
    const { from: { id }, data } = callbackQuery;
    
    if (data === 'connect_exchange') {
      // Handle exchange connection
    } else if (data === 'view_dashboard') {
      // Handle dashboard view
    }
  }

  async sendMessage(chatId: number, message: string) {
    await axios.post(\`\${this.apiUrl}/sendMessage\`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
  }

  private async sendMainMenu(chatId: number) {
    await axios.post(\`\${this.apiUrl}/sendMessage\`, {
      chat_id: chatId,
      text: 'Welcome to Donate Protocol! Choose an action:',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📱 Open Dashboard', web_app: { url: process.env.TELEGRAM_MINIAPP_URL } }],
          [{ text: '🔌 Connect Exchange', callback_data: 'connect_exchange' }],
          [{ text: '💰 View Dashboard', callback_data: 'view_dashboard' }]
        ]
      }
    });
  }
}
`;
  
  if (!fs.existsSync(clientPath)) {
    fs.writeFileSync(clientPath, clientContent);
    log(`✓ Created Telegram client: ${clientPath}`, 'success');
  }
  
  log('✓ Telegram MiniApp setup complete', 'success');
}

async function startDevServer() {
  log('🔧 Starting Development Server...');
  
  try {
    runCommand('pnpm dev');
  } catch (error) {
    log('Failed to start dev server', 'error');
  }
}

async function buildProduction() {
  log('🏗️  Building for Production...');
  
  const build = await question('Build type (all/api/web): ');
  
  switch (build.toLowerCase()) {
    case 'api':
      runCommand('pnpm --filter @donate/api build');
      break;
    case 'web':
      runCommand('pnpm --filter @donate/web build');
      break;
    case 'all':
    default:
      runCommand('pnpm build');
  }
  
  log('✓ Build complete', 'success');
}

async function deployProduction() {
  log('🚀 Production Deployment');
  
  const deployType = await question('Deployment type (docker/manual): ');
  
  if (deployType.toLowerCase() === 'docker') {
    log('Building Docker images...', 'info');
    runCommand('docker-compose build');
    
    log('Starting containers...', 'info');
    runCommand('docker-compose up -d');
    
    log('✓ Deployment complete', 'success');
  } else {
    log('Building projects...', 'info');
    runCommand('pnpm build');
    
    log('Starting API...', 'info');
    log('Run: NODE_ENV=production node apps/api/dist/index.js', 'info');
    
    log('Starting Web...', 'info');
    log('Run: pnpm --filter @donate/web start', 'info');
  }
}

async function showMenu() {
  console.clear();
  log('╔════════════════════════════════════════╗', 'info');
  log('║  Donate Protocol CLI Agent             ║', 'info');
  log('║  Version 1.0.0                         ║', 'info');
  log('╚════════════════════════════════════════╝', 'info');
  
  console.log('\n📋 Options:');
  console.log('1. Initialize Project');
  console.log('2. Setup Exchange Integration');
  console.log('3. Setup Telegram MiniApp');
  console.log('4. Start Dev Server');
  console.log('5. Build for Production');
  console.log('6. Deploy to Production');
  console.log('7. View Status');
  console.log('8. Exit\n');
  
  const choice = await question('Select option (1-8): ');
  
  switch (choice) {
    case '1':
      await initializeProject();
      break;
    case '2':
      await setupExchangeIntegration();
      break;
    case '3':
      await setupTelegramMiniApp();
      break;
    case '4':
      await startDevServer();
      break;
    case '5':
      await buildProduction();
      break;
    case '6':
      await deployProduction();
      break;
    case '7':
      runCommand('pnpm turbo run dev --dry');
      break;
    case '8':
      log('Goodbye!', 'success');
      process.exit(0);
      break;
    default:
      log('Invalid option', 'error');
  }
  
  const continueMenu = await question('\nPress Enter to continue...');
  await showMenu();
}

// Main
(async () => {
  try {
    await showMenu();
  } catch (error) {
    log('An error occurred: ' + error, 'error');
    rl.close();
    process.exit(1);
  }
})();
