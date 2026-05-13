#!/usr/bin/env node

/**
 * Donate Protocol MCP Server
 *
 * Model Context Protocol server exposing Donate Protocol capabilities to AI agents.
 * Provides tools for user management, donation processing, campaign discovery,
 * and platform administration.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { tools } from './tools/index.js';
import { handleToolCall } from './handlers/tool-handler.js';
import { resources } from './resources/index.js';
import { handleReadResource } from './handlers/resource-handler.js';
import { prisma } from '@donate/database';

const server = new Server(
  {
    name: 'donate-protocol-mcp',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const result = await handleToolCall(request.params.name, request.params.arguments ?? {});
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [
        {
          type: 'text',
          text: `Error executing tool: ${message}`,
        },
      ],
      isError: true,
    };
  }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources,
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  try {
    const content = await handleReadResource(request.params.uri);
    return {
      contents: [content],
    };
  } catch (error) {
    throw new Error(`Resource not found: ${request.params.uri}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Donate Protocol MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
