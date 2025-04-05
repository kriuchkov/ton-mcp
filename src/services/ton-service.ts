import type { TonPort } from '@/core/ports/outgoing';
import type { AccountInfo } from '@/core/models/account';
import type { TonOperations } from '@/core/ports/incoming';

export class TonService implements TonOperations {
  private readonly tonPort: TonPort;

  constructor(tonPort: TonPort) {
    this.tonPort = tonPort;
  }

  async getAccount(address: string): Promise<AccountInfo> {
    return this.tonPort.fetchAccount(address);
  }
}