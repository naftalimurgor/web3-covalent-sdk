import { ErrorResponse } from './IBalances.interface';

export interface TransactionResponse {
  updated_at: string;
  items: Array<Transaction>;
  pagination?: number;
}

interface Transaction {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
  from_address: string;
  from_address_label?: any;
  to_address: string;
  to_address_label?: any;
  value: string;
  value_quote: number;
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  fees_paid: string;
  gas_quote: number;
  gas_quote_rate: number;
  log_events: Array<Logevent>;
}

interface Logevent {
  block_signed_at: string;
  block_height: number;
  tx_offset: number;
  log_offset: number;
  tx_hash: string;
  raw_log_topics: Array<string>;
  sender_contract_decimals: number;
  sender_name?: string;
  sender_contract_ticker_symbol?: string;
  sender_address: string;
  sender_address_label?: any;
  sender_logo_url: string;
  raw_log_data: string;
  decoded?: Decoded;
}

interface Decoded {
  name: string;
  signature: string;
  params: Param[];
}

interface Param {
  name: string;
  type: string;
  indexed: boolean;
  decoded: boolean;
  value: string;
}

export interface AddressTransactions {
  address: string;
  updated_at: string;
  next_update_at: string;
  quote_currency: string;
  chain_id: number;
  items: Array<Transactions>;
  pagination: Pagination;
}

interface Pagination {
  has_more: boolean;
  page_number: number;
  page_size: number;
  total_count?: any;
}

interface Transactions {
  block_signed_at: string;
  block_height: number;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
  from_address: string;
  from_address_label?: any;
  to_address: string;
  to_address_label?: any;
  value: string;
  value_quote: number;
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  fees_paid: string;
  gas_quote: number;
  gas_quote_rate: number;
  log_events: any[];
}

export interface ITransactions {
  getAddressTransactions: (
    chainId: string,
    walletAddress: string,
    pageSize: number
  ) => Promise<AddressTransactions | ErrorResponse>;

  getTransaction: (
    chainId: string,
    transactionHash: string
  ) => Promise<TransactionResponse | ErrorResponse>;
}
