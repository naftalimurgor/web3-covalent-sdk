import { SDKConfig } from '../../types'
import { get } from '../../utils'

import {
    BalanceResponse,
    ERC20TokenTransfers,
    ErrorResponse,
    IBalances,
    PortfolioResponse,
    TokenHoldersResponse,
} from './IBalances.interface'

/**
 * Balances Class
 * @date 1/13/2023 - 2:39:51 PM
 *
 * @export
 * @class Balances
 * @typedef {Balances}
 * @implements {IBalances}
 */
export class Balances implements IBalances {
    /**
     * V1 Covalent API url
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @private
     * @type {!string}
     */
    private readonly API_URL!: string

    /**
     * V1 Covalent API url
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @private
     * @type {!string}
     */
    private readonly API_KEY!: string

    /**
     * @constructor
     * @param {SDKConfig} config
     */
    constructor(config: SDKConfig) {
        this.API_KEY = config.apiKey
        this.API_URL = config.apiV1Url
    }

    /**
     * Fetch balance of a certain Address
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId chainId of the network to query
     * @param {string} address
     * @returns {(Promise<ErrorResponse | BalanceResponse>)}
     */
    public readonly getAddressBalance = async (
        chainId: number,
        address: string,
    ): Promise<ErrorResponse | BalanceResponse> => {
        const url = `${this.API_URL}${chainId}/address/${address}/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            return result as BalanceResponse
        } catch (error) {
            console.error(`Failed to getAddressBalance ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch historic portfolio over time of an account
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId chainId of the network
     * @param {string} address of the account(can be E.O.A) or contract address
     * @returns {(Promise<ErrorResponse | PortfolioResponse>)}
     */
    public readonly getHistoricPortfolioValueOverTime = async (
        chainId: number,
        address: string,
    ): Promise<ErrorResponse | PortfolioResponse> => {
        const url = `${this.API_URL}${chainId}/address/${address}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            return result as PortfolioResponse
        } catch (error) {
            console.error(`Failed to getAddressBalance ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch Token Holders of a certain token at a given Block Height
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId hainId of the network
     * @param {string} contractAddress Address of the token contract
     * @param {{ startBlock: number; endingBlock: number }} blockHeight
     * @returns {(Promise<ErrorResponse | TokenHoldersResponse>)}
     */
    public readonly geTokenHoldersAtBlockHeight = async (
        chainId: number,
        contractAddress: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _blockHeight: { readonly startBlock: number; readonly endingBlock: number },
    ): Promise<ErrorResponse | TokenHoldersResponse> => {
        const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/token_holders/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            return result as TokenHoldersResponse
        } catch (error) {
            console.error(`Failed to getAddressBalance ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch ERC20 token transfers for a given toke
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId chainId for the network to fetch data from
     * @param {string} contractAddress ERC20 token adress
     * @param {string} walletAddress wallet adress to query
     * @returns {(Promise<ErrorResponse | ERC20TokenTransfers>)}
     */
    public readonly getERC20TokenTransfers = async (
        chainId: number,
        contractAddress: string,
        walletAddress: string,
    ): Promise<ErrorResponse | ERC20TokenTransfers> => {
        const url = `${this.API_URL}${chainId}}/address/${walletAddress}/transfers_v2/?contract-address=${contractAddress}?key=${this.API_KEY}`

        try {
            const result = await get(url)
            return result as ERC20TokenTransfers
        } catch (error) {
            console.error(`Failed to getAddressBalance ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Description placeholder
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId
     * @param {string} contractAddress
     * @param {{ startBlock: number; endingBlock: number }} blockHeight
     * @returns {(Promise<TokenHoldersResponse | ErrorResponse>)}
     */
    public readonly getChangesInTokenHoldersBetweenTwoblockHeights = async (
        chainId: number,
        contractAddress: string,
        blockHeight: { readonly startBlock: number; readonly endingBlock: number },
    ): Promise<TokenHoldersResponse | ErrorResponse> => {
        const url = `${this.API_URL}${chainId}/${chainId}}/tokens/${contractAddress}/token_holders_changes/?starting-block=${blockHeight.startBlock}&ending-block=${blockHeight.endingBlock}`

        try {
            const result = await get(url)
            return result as TokenHoldersResponse
        } catch (error) {
            console.error(`Failed to getAddressBalance ${error}`)
            return error as ErrorResponse
        }
    }
}
