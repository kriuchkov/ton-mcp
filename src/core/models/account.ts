export interface AccountInfo {
  address: string;
  balance: {
    coins: string;
    currencies: Record<string, string>;
  }
  status: string;
}
