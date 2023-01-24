import { ErrorResponse, SDKConfig } from '../../types'
import { get } from '../../utils'
import { INFTs, NFTTokenIds } from './INFTS'

/**
 * NFTs Class
 * @date 1/14/2023 - 10:57:39 AM
 *
 * @export
 * @class NFTs
 * @typedef {NFTs}
 * @implements {INFTs}
 */
export class NFTs implements INFTs {
    /**
     * Covalent API HTTPURL
     * @date 1/14/2023 - 10:57:39 AM
     *
     * @private
     * @type {!string}
     */
    private API_URL!: string

    /**
     * API key for authenticating requests to the Covalent API passed as a param: &key=api_key
     * @date 1/14/2023 - 10:57:39 AM
     *
     * @private
     * @type {!string}
     */
    private API_KEY!: string

    /**
     * Creates an instance of NFTs.
     * @date 1/14/2023 - 10:57:39 AM
     *
     * @constructor
     * @param {SDKConfig} config
     */
    constructor(config: SDKConfig) {
        this.API_KEY = config.apiKey
        this.API_URL = config.apiV1Url
    }

    /**
     * Fetch TokenIDs for NFT contract
     * @date 1/14/2023 - 10:57:39 AM
     *
     * @async
     * @param {string} chainId
     * @param {string} contractAddress
     * @param {?(number | undefined)} [pageSize]
     * @param {?(number | undefined)} [_pageNumber]
     * @returns {(Promise<NFTTokenIds | ErrorResponse>)}
     */
    public getNFTTokenIDsForContract = async (
        chainId: string,
        contractAddress: string,
    ): Promise<NFTTokenIds | ErrorResponse> => {
        const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/nft_metadata/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getNFTTokenIDsForContrac e: `, error)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch Transactions for NFT contract
     * @date 1/14/2023 - 10:57:39 AM
     *
     * @async
     * @param {string} chainId
     * @param {number} tokenId
     * @param {string} contractAddress
     * @param {?(number | undefined)} [pageSize]
     * @param {?(number | undefined)} [_pageNumber]
     * @returns {Promise<any>}
     */
    public getNFTTransactionsForContract = async (
        chainId: string,
        tokenId: number,
        contractAddress: string,
    ): Promise<any> => {
        const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/nft_transactions/${tokenId}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getNFTTransactionsForContract e: `, error)
            return error
        }
    }

    /**
     * Fetch external NFT Contract Metadata
     * @date 1/14/2023 - 10:57:39 AM
     *
     * @async
     * @param {string} chainId
     * @param {string} contractAddress
     * @param {number} tokenId
     * @param {?number} [pageSize]
     * @returns {Promise<any>}
     */
    public getExternalNFTContractMetadata = async (
        chainId: string,
        contractAddress: string,
        tokenId: number,
    ): Promise<any> => {
        const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getExternalNFTContractMetadata e: `, error)
            return error
        }
    }
}
