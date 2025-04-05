
import type { TonPort } from '@/core/ports/outgoing';
import type * as models from '@/core/models'; 
import { TonClient4, Address, toNano,fromNano, WalletContractV4, internal, beginCell} from '@ton/ton';
import logger from '@/logger';

const log = logger.getSubLogger({ name: 'TonAdapter' });

export class TonAdapter implements TonPort {
  private readonly client: TonClient4;

  constructor(client: TonClient4) {
    this.client = client;
  }

  async fetchAccount(address: string): Promise<models.AccountInfo> {
    let last = await this.client.getLastBlock();
    const seqno = last.last.seqno;

    log.debug('Seqno:', seqno, 'Address:', address);
    let accountLite = await this.client.getAccount(seqno, Address.parse(address));
    return {
      address,
      balance: accountLite.account.balance,
      status: accountLite.account.state.type === 'active' ? 'active' : 'inactive',
    };
  } 

  async fetchTransactions(address: string): Promise<models.Transaction[]> {
    const last = await this.client.getLastBlock();
    const seqno = last.last.seqno;

    const tonAddress = Address.parse(address);
    let account = await this.client.getAccount(seqno, Address.parse(address));
    let transactions = await this.client.getAccountTransactions(tonAddress, BigInt(account.account.last!.lt), Buffer.from(account.account.last!.hash, 'base64'));

    let result: models.Transaction[] = [];
    for (const transaction of transactions) {
      result.push({
        address: transaction.tx.address,
        lt: transaction.tx.lt,
        prevTransactionHash: transaction.tx.prevTransactionHash,
        prevTransactionLt: transaction.tx.prevTransactionLt,
        outMessagesCount: transaction.tx.outMessagesCount,
      });
    }
    return result;
  }  
}