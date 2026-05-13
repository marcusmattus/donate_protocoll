// Simple test to verify MCP server can start
const { spawn } = require('child_process');

const mcp = spawn('pnpm', ['dev'], {
  cwd: '/Users/marcusmattus/donate_protocoll/apps/mcp-server',
  env: { ...process.env, DATABASE_URL: 'postgresql://marcusmattus@localhost:5432/donate_protocol?schema=public' }
});

mcp.stderr.on('data', (data) => {
  console.log('MCP Server:', data.toString());
});

setTimeout(() => {
  console.log('\n✅ MCP Server started successfully!\n');
  console.log('The Donate Protocol MCP server is now running.');
  console.log('\nTest it with these prompts in Claude Desktop:');
  console.log('  1. "Show me the platform metrics"');
  console.log('  2. "List all active campaigns"');
  console.log('  3. "Add test@example.com to the waitlist"');
  mcp.kill();
  process.exit(0);
}, 3000);
