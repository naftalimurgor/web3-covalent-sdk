import { SDKConfig } from '../../types'
import { get } from '../../utils'

import {
    Balance,
    BlockHeight,
    ERC20TokenTransfers,
    ErrorResponse,
    IBalances,
    Portfolio,
    TokenHolders,
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
     * V1 Covalent API key
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
     * @returns {(Promise<ErrorResponse | Balance>)}
     */
    public readonly getTokenBalancesForAddress = async (
        chainId: number,
        address: string,
    ): Promise<ErrorResponse | Balance> => {
        const url = `${this.API_URL}${chainId}/address/${address}/balances_v2/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data as Balance
            else throw new Error(result.message)
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
     * @returns {(Promise<ErrorResponse | Portfolio>)}
     */
    public readonly getHistoricPortfolioValueOverTime = async (
        chainId: number,
        address: string,
    ): Promise<ErrorResponse | Portfolio> => {
        const url = `${this.API_URL}${chainId}/address/${address}/portfolio_v2/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as Portfolio
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getHistoricPortfolioValueOverTime ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch Token Holders of a certain token at a given Block Height
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId  of the network to query
     * @param {string} contractAddress Address of the token contract
     * @param {{ startBlock: number; endingBlock: number }} blockHeight
     * @returns {(Promise<ErrorResponse | TokenHolders>)}
     */
    public readonly getTokenHoldersAtBlockHeight = async (
        chainId: number,
        contractAddress: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _blockHeight: BlockHeight,
    ): Promise<ErrorResponse | TokenHolders> => {
        const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/token_holders/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data as TokenHolders
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to geTokenHoldersAtBlockHeight  ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch ERC20 token transfers for a given token
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId chainId for the network to fetch data from
     * @param {string} contractAddress ERC20 token adress
     * @param {string} walletAddress wallet adress to query
     * @returns {(Promise<ErrorResponse | ERC20TokenTransfers>)}
     */
    public readonly getERC20TokenTransfersForAddress = async (
        chainId: number,
        contractAddress: string,
        walletAddress: string,
    ): Promise<ErrorResponse | ERC20TokenTransfers> => {
        const url = `${this.API_URL}${chainId}/address/${walletAddress}/transfers_v2/?contract-address=${contractAddress}&key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as ERC20TokenTransfers
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getERC20TokenTransfers ${error}`)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch changes in Token holders between two block heights.
     * @date 1/13/2023 - 2:39:51 PM
     *
     * @public
     * @async
     * @param {number} chainId
     * @param {string} contractAddress
     * @param {{ startBlock: number; endingBlock: number }} blockHeight
     * @returns {(Promise<TokenHolders | ErrorResponse>)}
     */
    public readonly getChangesInTokenHoldersBetweenTwoBlockHeights = async (
        chainId: number,
        contractAddress: string,
        blockHeight: BlockHeight,
    ): Promise<TokenHolders | ErrorResponse> => {
        const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/token_holders_changes/?starting-block=${blockHeight.startingBlock}&ending-block=${blockHeight.endingBlock}&key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data as TokenHolders
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getChangesInTokenHoldersBetweenTwoBlocHeights  ${error}`)
            return error as ErrorResponse
        }
    }
}
