import { describe, it, expect } from 'bun:test';
import { TonAdapter } from '@/adapters/ton';
import { TonClient } from '@ton/ton';

import type { AccountInfo } from '@/core/models/account';
import logger from '@/logger';

const TEST_ADDRESS = 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N';

describe('TonAdapter Integration Tests', () => {
  const tonAdapter = new TonAdapter(new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  }));

  it('should fetch account info from TON blockchain', async () => {
    const accountInfo: AccountInfo = await tonAdapter.fetchAccount(TEST_ADDRESS);
    expect(accountInfo).toBeDefined();
    expect(accountInfo.address).toEqual(TEST_ADDRESS);
    expect(accountInfo.balance).toBeString();

    logger.debug('Account Info:', accountInfo);
    
    expect(Number(accountInfo.balance)).toBeGreaterThanOrEqual(0);
    expect(['active', 'inactive']).toContain(accountInfo.status);
  });
});