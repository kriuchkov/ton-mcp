import { describe, it, expect } from 'bun:test';
import { TonAdapter } from '@/adapters/ton';
import { TonClient4 } from '@ton/ton';

import type { AccountInfo } from '@/core/models/account';
import logger from '@/logger';

const TEST_ADDRESS = 'EQBicYUqh1j9Lnqv9ZhECm0XNPaB7_HcwoBb3AJnYYfqB38_';

describe('TonAdapter Integration Tests', () => {
  const tonAdapter = new TonAdapter(new TonClient4({
    endpoint: 'https://testnet-v4.tonhubapi.com',
  }));

  it('should fetch account info from TON blockchain', async () => {
    const accountInfo: AccountInfo = await tonAdapter.fetchAccount(TEST_ADDRESS);
    expect(accountInfo).toBeDefined();
    expect(accountInfo.address).toEqual(TEST_ADDRESS);
    expect(accountInfo.balance).toBeDefined();
    expect(accountInfo.balance.coins).toBeDefined();
    expect(accountInfo.balance.currencies).toBeDefined();

    logger.debug('Account Info:', accountInfo);
    expect(['active', 'inactive']).toContain(accountInfo.status);
  });

  it('should fetch transactions from TON blockchain', async () => {
    const transactions = await tonAdapter.fetchTransactions(TEST_ADDRESS);
    expect(transactions).toBeDefined();
    logger.debug('Transactions:', transactions);
  });


});