import { Balances } from './lib/v1/Balances';
import { Base } from './lib/v1/Base';
import { DEX } from './lib/v1/DEX';
import { NFTs } from './lib/v1/NFTS';
import { Transactions } from './lib/v1/Transactions';
import { SDKConfig } from './types';

class Web3CovalentSDK {
  public readonly balances: Balances;
  public readonly transactions: Transactions;
  public readonly nfts: NFTs;
  public readonly dexes: DEX;
  public readonly base: Base;

  constructor(config: SDKConfig) {
    this.balances = new Balances(config);
    this.transactions = new Transactions(config);
    this.nfts = new NFTs(config);
    this.dexes = new DEX(config);
    this.base = new Base(config);
  }
}

export = { Web3CovalentSDK, Transactions, Balances, DEX, NFTs, Base };
