import { ErrorResponse } from './IBalances.interface'

/**
 * Token IDs for NFT Token IDs fetched
 * @param {updated_at} Datetime string of NFTTokenIds update time
 * @param {items} An array of TokenMetadata
 */
export interface NFTTokenIds {
    updated_at: string
    items: Array<TokenMetadata>
}

interface TokenMetadata {
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    supports_erc?: any
    logo_url: string
    token_id: string
}

/**
 * @interface interface for @class NFTs class
 */
export interface INFTs {
    getNFTTokenIDsForContract: (
        chainId: string,
        tokenId: number,
        contractAddress: string,
    ) => Promise<NFTTokenIds | ErrorResponse>

    getNFTTransactionsForContract: (
        chainId: string,
        tokenId: number,
        contractAddress: string,
        pageSize?: number,
        pageNumber?: number,
    ) => Promise<Record<string, string>>

    getExternalNFTContractMetadata: (
        chainId: string,
        contractAddress: string,
        tokenId: number,
    ) => Promise<Record<string, string>>
}
