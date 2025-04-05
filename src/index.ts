import { TonClient4} from '@ton/ton';

import { TonService } from '@/services/ton-service';
import { TonAdapter } from '@/adapters/ton';
import { McpAdapter } from './adapters/mcp';
import logger from './logger';


async function main() {
  try {
    logger.info('starting TON MCP server on Bun...');

    const endpoint = Bun.env.TON_API_ENDPOINT || 'https://testnet.toncenter.com/api/v2/jsonRPC';
    logger.info(`Using TON API endpoint: ${endpoint}`);
    const tonAdapter = new TonAdapter(new TonClient4({endpoint}));
    
    const tonService = new TonService(tonAdapter);
    const mcpAdapter = new McpAdapter(tonService);
    
    mcpAdapter.setupResources();
    await mcpAdapter.start();
    logger.info('TON MCP server started successfully');
  } catch (error) {
    logger.error('error starting TON MCP server:', error);
  }
}

main();