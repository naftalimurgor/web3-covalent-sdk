// Standard HTTP Error codes supported by Covalent API V1: https://www.covalenthq.com/docs/api/
type ERR_BAD_REQUEST = 400
type ERR_UNAUTHORIZED = 401
type ERR_NOT_FOUND = 404
type ERR_TOO_MANY_REQUESTS = 429
type SERVER_ERRORS = 500 | 502 | 503

type ERROR_CODE =
    | ERR_BAD_REQUEST
    | ERR_UNAUTHORIZED
    | ERR_NOT_FOUND
    | ERR_TOO_MANY_REQUESTS
    | SERVER_ERRORS

export type ErrorResponse = {
    data: string // @todo update this type incrementally, should be null if there is an error?
    error: boolean
    error_code: ERROR_CODE
}

export interface BalanceResponse {
    address: string
    updated_at: string
    next_update_at: string
    quote_currency: string
    chain_id: number
    items: Array<Item>
    pagination?: any
}

interface Item {
    contract_decimals: number
    contract_name?: string
    contract_ticker_symbol?: string
    contract_address: string
    supports_erc?: string[]
    logo_url: string
    last_transferred_at: string
    native_token: boolean
    type: string
    balance: string
    balance_24h: string
    quote_rate?: number
    quote_rate_24h?: number
    quote: number
    quote_24h?: number
    nft_data?: any
}

export interface PortfolioResponse {
    address: string
    update_at: number
    next_update_at: number
    quote_currency: string
    chain_id: string
    items: Array<Transaction>
}

type Transaction = {
    block_signed_at: string
    block_height: number
    tx_hash: string
    tx_offest: number
    successful: number
    from_address: string
    from_address_label: string
    to_address: string
    to_address_label: string
    value: number
    value_quote: number
    gas_offered: number
    gas_spent: number
    gas_price: number
    fees_paid: number
    gas_quote: number
    gas_quote_rate: number
    transfers: Array<Transfer>
}

type Transfer = {
    block_signed_at: string
    tx_hash: string
    from_address: string
    from_address_label: string
    to_address: string
    to_address_label: string
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    logo_url: string
    transfer_type: string // IN/OUT
    delta: number
    balance: number
    quote_rate: number
    delta_quote: number
    balance_quote: number
    method_calls?: Array<MethodCall>
}

type MethodCall = {
    sender_address: string
    method: string
}

export interface ERC20TokenTransfers {
    address: string
    updated_at: string
    next_update_at: string
    quote_currency: string
    chain_id: number
    items: Array<Item>
    pagination: Pagination
}

interface Pagination {
    has_more: boolean
    page_number: number
    page_size: number
    total_count?: any
}

interface Item {
    block_signed_at: string
    block_height: number
    tx_hash: string
    tx_offset: number
    successful: boolean
    from_address: string
    from_address_label?: any
    to_address: string
    to_address_label?: any
    value: string
    value_quote: number
    gas_offered: number
    gas_spent: number
    gas_price: number
    fees_paid?: any
    gas_quote: number
    gas_quote_rate: number
    transfers: Array<ERC20Transfer>
}

interface ERC20Transfer {
    block_signed_at: string
    tx_hash: string
    from_address: string
    from_address_label?: any
    to_address: string
    to_address_label?: any
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    logo_url: string
    transfer_type: string
    delta: string
    balance?: any
    quote_rate: number
    delta_quote: number
    balance_quote?: any
    method_calls?: any
}

export interface TokenHoldersResponse {}

type BlockHeight = {
    startBlock: number
    endingBlock: number
}

export interface IBalances {
    getAddressBalance: (
        chainId: number,
        address: string,
    ) => Promise<BalanceResponse | ErrorResponse>

    getHistoricPortfolioValueOverTime: (
        chainId: number,
        address: string,
    ) => Promise<ErrorResponse | PortfolioResponse>

    geTokenHoldersAtBlockHeight: (
        chainId: number,
        address: string,
        blockHeight: BlockHeight,
    ) => Promise<ErrorResponse | TokenHoldersResponse>

    getERC20TokenTransfers: (
        chainId: number,
        contractAddress: string,
        walletAddress: string,
    ) => Promise<ErrorResponse | ERC20TokenTransfers>

    getChangesInTokenHoldersBetweenTwoblockHeights: (
        chainId: number,
        contractAddress: string,
        blockHeight: BlockHeight,
    ) => Promise<ErrorResponse | TokenHoldersResponse>
}
