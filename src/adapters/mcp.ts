import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import type { TonOperations } from '@/core/ports/incoming';
import type {
  CallToolResult,
  ReadResourceResult,
} from '@modelcontextprotocol/sdk/types.js';

export class McpAdapter {
  private readonly server: McpServer;
  private readonly tonOperations: TonOperations;

  constructor(tonOperations: TonOperations) {
    const version = require('../../package.json').version;
    this.server = new McpServer({ name: 'TON MCP Server', version });
    this.tonOperations = tonOperations;
  }

  async getAccountResponse(
    address: string | string[] | undefined
  ): Promise<ReadResourceResult | CallToolResult> {
    if (!address) {
      throw new Error('Address is required');
    }
    const addresses = Array.isArray(address) ? address : [address];
    const accounts = await Promise.all(
      addresses.map((address) => this.tonOperations.getAccount(address))
    );
    const result = accounts.map((account) => ({
      uri: `account://${account.address}`,
      type: 'text',
      text: `Balance: ${account.balance.coins} TON, Status: ${account.status}`,
    }));
    return {
      contents: result,
      content: result,
    };
  }

  setupResources(): void {
    this.server.resource(
      'account',
      new ResourceTemplate('account://{address}', { list: undefined }),
      async (_uri, { address }) =>
        this.getAccountResponse(address) as Promise<ReadResourceResult>
    );
    this.server.tool(
      'get-account',
      'Get account information',
      {
        address: z.string().or(z.array(z.string())),
      },
      async ({ address }) =>
        this.getAccountResponse(address) as Promise<CallToolResult>
    );
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}
