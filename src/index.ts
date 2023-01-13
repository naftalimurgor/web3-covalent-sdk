import { Balances } from './lib/v1/Balances';
import { NFTs } from './lib/v1/NFTS';
import { Transactions } from './lib/v1/Transactions';
import { SDKConfig } from './types';

class Web3CovalentSDK {
  public readonly balances: Balances;
  public readonly transactions: Transactions;
  public readonly nfts: NFTs;

  constructor(config: SDKConfig) {
    this.balances = new Balances(config);
    this.transactions = new Transactions(config);
    this.nfts = new NFTs(config);
  }
}

export = { Web3CovalentSDK, Transactions };
