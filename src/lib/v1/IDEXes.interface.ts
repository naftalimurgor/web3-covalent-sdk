import { ErrorResponse } from './IBalances.interface'

/**
 * @param {updated_at} Datestring showing when pool was updated
 * @param {items} An array of Pool Metadata fetched
 * @param {pagination} Pagination info of the pool info
 */
export interface Pools {
    updated_at: string
    items: Array<PoolMetadata>
    pagination: Pagination
}

interface Pagination {
    has_more: boolean
    page_number: number
    page_size: number
    total_count?: any
}

interface PoolMetadata {
    exchange: string
    swap_count_24h: number
    total_liquidity_quote: number
    volume_24h_quote: number
    fee_24h_quote: number
    total_supply: string
    quote_rate: number
    block_height: number
    token_0: Token0
    token_1: Token0
    chain_name: string
    chain_id: string
    dex_name: string
    volume_7d_quote: number
    annualized_fee: number
}

interface Token0 {
    contract_address: string
    contract_name: string
    volume_in_24h: string
    volume_out_24h: string
    quote_rate?: any
    reserve: string
    logo_url: string
    contract_ticker_symbol: string
    contract_decimals: number
    volume_in_7d: string
    volume_out_7d: string
}

/**
 * @todo Add complete Types for Responses from the Covalent V1 API
 * @interface IDEXes for DEX class
 */
export interface IDEXes {
    getXYPools: (chainId: number, dexName: string, pageSize: number) => Promise<any>

    getXYPoolsByAddress: (
        chainId: number,
        dexName: string,
        usdcPoolAddress: string,
        pageSize?: number,
    ) => Promise<Pools | ErrorResponse>

    getXYAddressExchangeBalances: (
        chainId: number,
        dexName: string,
        walletAddress: string,
        pageSize?: number,
    ) => Promise<ErrorResponse>

    getXYNetworkExchangeTokens: (
        chainId: number,
        dexName: string,
        pageSize?: number,
    ) => Promise<any>

    getXYSupportedDEXes: (pageSize: number) => Promise<ErrorResponse | {}>

    getXYSingleNetworkExchangeToken: (
        chainId: string,
        dexName: string,
        usdcContractAddress: string,
        pageSize?: number,
    ) => Promise<ErrorResponse | {}>

    getXYTransactionsForAccountAddress: (
        chainId: number,
        dexName: string,
        walletAddress: string,
        pageSize?: number,
    ) => Promise<ErrorResponse | {}>

    getXYTransactionsForTokenAddress: (
        chainId: number,
        dexName: string,
        linkContractAdress: string,
    ) => Promise<ErrorResponse | {}>

    getXYTransactionsForExchange: (
        chainId: number,
        dexName: string,
        usdcContractAddress: string,
        pageSize: number,
    ) => Promise<ErrorResponse | {}>

    getXYEcosystemChartData: (
        chainId: number,
        dexName: string,
        pageSize?: number,
    ) => Promise<ErrorResponse | {}>

    getXYHealthData: (
        chainId: number,
        dexName: string,
        pageSize?: number,
    ) => Promise<ErrorResponse | {}>
}
