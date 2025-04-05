
import type { AccountInfo } from '@/core/models/account';

export interface TonPort {
  fetchAccount(address: string): Promise<AccountInfo>;
}