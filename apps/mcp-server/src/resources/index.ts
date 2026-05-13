/**
 * MCP Resources
 *
 * Static and dynamic resources exposed via the MCP protocol.
 * Resources provide read-only access to documentation and platform data.
 */

import { Resource } from '@modelcontextprotocol/sdk/types.js';

export const resources: Resource[] = [
  {
    uri: 'platform://policies',
    name: 'Platform Policies',
    description: 'Terms of service, privacy policy, and donation policy',
    mimeType: 'text/markdown',
  },
  {
    uri: 'platform://faq',
    name: 'Frequently Asked Questions',
    description: 'Common questions about Donate Protocol',
    mimeType: 'application/json',
  },
  {
    uri: 'platform://integrations',
    name: 'Supported Integrations',
    description: 'List of supported brokers, exchanges, and integration guides',
    mimeType: 'application/json',
  },
  {
    uri: 'platform://metrics',
    name: 'Platform Metrics',
    description: 'Real-time public impact metrics',
    mimeType: 'application/json',
  },
  {
    uri: 'platform://trust-safety',
    name: 'Trust & Safety Information',
    description: 'Security practices, compliance, and safety measures',
    mimeType: 'text/markdown',
  },
];
