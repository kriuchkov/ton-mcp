

import type { AccountInfo } from '@/core/models/account';

export interface TonOperations {
  getAccount(address: string): Promise<AccountInfo>;
}