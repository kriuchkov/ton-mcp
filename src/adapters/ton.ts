
import type { TonPort } from '@/core/ports/outgoing';
import type { AccountInfo } from '@/core/models/account';
import { TonClient, Address, toNano,fromNano, WalletContractV4, internal, beginCell} from '@ton/ton';
import logger from '@/logger';

export class TonAdapter implements TonPort {
  private readonly client: TonClient;

  constructor(client: TonClient) {
    this.client = client;
  }

  async fetchAccount(address: string): Promise<AccountInfo> {
    const tonAddress = Address.parse(address);
    const account = await this.client.getContractState(tonAddress);
    const balance = await this.client.getBalance(tonAddress);

    return {
      address,
      balance: fromNano(balance.toString()),
      status: account.state === 'active' ? 'active' : 'inactive',
    };
  }
}