import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

import type { TonOperations } from '@/core/ports/incoming';

export class McpAdapter {
  private readonly server: McpServer;
  private readonly tonOperations: TonOperations;

  constructor(tonOperations: TonOperations) {
    this.server = new McpServer({name: 'TON MCP Server', version: '0.1.0'});
    this.tonOperations = tonOperations;
  }

  setupResources(): void {
    this.server.resource('account', new ResourceTemplate('account://{address}', { list: undefined }),
      async (uri, { address }) => {
        if (!address) {
          throw new Error('Address is required');
        }
        const account = await this.tonOperations.getAccount(address);
        return {
          contents: [
            {
              uri: uri.href,
              text: `Balance: ${account.balance}, Status: ${account.status}`,
            },
          ],
        };
      }
    );
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}