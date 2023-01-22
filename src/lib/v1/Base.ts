import { SDKConfig } from '../../types'
import { get } from '../../utils'
import { ErrorResponse } from './IBalances.interface'
import { Block, IBase, LogEventsByTopicHash, LogEvents, BlockHeightRes } from './IBase.inteface'

/**
 * Class for Base Covalent API calls
 * @date 1/13/2023 - 2:32:33 PM
 *
 * @export
 * @class Base
 * @typedef {Base}
 * @implements {IBase}
 */
export class Base implements IBase {
    /**
     * @property {string} API_URL for Covalent API
     */
    private API_URL!: string

    /**
     * API key to use fo making calls to Covalent API V1 passed as a parameter &key=api_key
     * @date 1/13/2023 - 2:32:33 PM
     *
     * @private
     * @type {!string}
     */
    private API_KEY!: string

    /**
     * Creates an instance of Base.
     * @date 1/13/2023 - 2:32:33 PM
     *
     * @constructor
     * @param {SDKConfig} config
     */
    constructor(config: SDKConfig) {
        this.API_KEY = config.apiKey
        this.API_URL = config.apiV1Url
    }

    /**
     * Fetch A single Block.
     * @date 1/13/2023 - 2:32:33 PM
     *
     * @public
     * @async
     * @param {number} chainId for the network
     * @param {number} blockHeight blockHeight to get Block from
     * @param {number} [pageSize=100] Number of Blocks to fetch
     * @returns {(Promise<ErrorResponse | Block>)}
     */
    public async getBlock(chainId: number, blockHeight: number): Promise<ErrorResponse | Block> {
        const url = `${this.API_URL}${chainId}/block_v2/${blockHeight}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as Block
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getBlock e: `, error)
            return error as ErrorResponse
        }
    }

    /**
     * Get Block Heights withing given dates
     * @date 1/13/2023 - 2:32:33 PM
     *
     * @public
     * @async
     * @param {number} chainId
     * @param {string} startDate Datestring of the start date: YYYY:MM:mm:ss
     * @param {string} endDate Datestring of the end date: YYYY:MM:mm:ss
     * @param {number} [pageSize=100]
     * @returns {(Promise<ErrorResponse | BlockHeight>)}
     */
    public async getBlockHeights(
        chainId: number,
        startDate: string,
        endDate: string,
    ): Promise<ErrorResponse | BlockHeightRes> {
        const url = `${this.API_URL}${chainId}/block_v2/${startDate}/${endDate}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as BlockHeightRes
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getBlockHeights e: `, error)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch Events for a smart contract
     * @date 1/13/2023 - 2:32:33 PM
     *
     * @public
     * @async
     * @param {number} chainId of the Chain
     * @param {string} contractAddress of the Contract
     * @param {number} startingBlock Block height to fetch logs from
     * @param {number} endingBlock block height to fetch logs up to
     * @returns {(Promise<ErrorResponse | LogEvents>)}
     */
    public async getLogEventsByContractAddress(
        chainId: number,
        contractAddress: string,
        startingBlock: number,
        endingBlock: number,
    ): Promise<ErrorResponse | LogEvents> {
        const url = `${this.API_URL}${chainId}/events/address/${contractAddress}/?starting-block=${startingBlock}&ending-block=${endingBlock}&key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as LogEvents
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getLogEventsByContractAddress e: `, error)
            return error as ErrorResponse
        }
    }

    /**
     * Description placeholder
     * @date 1/13/2023 - 2:32:33 PM
     *
     * @public
     * @async
     * @param {number} chainId chainId for the network to query contract log Events
     * @param {string} topicHash
     * @param {number} startingBlock starting Block to fetch from,
     * @param {number} endingBlock end Block to fetch upto
     * @param {number} [pageSize=100] Number of Events to fetch, default is 100.
     * @returns {(Promise<ErrorResponse | LogEventsByTopicHash>)}
     */
    public async getLogEventsByTopicHash(
        chainId: number,
        topicHash: string,
        startingBlock: number,
        endingBlock: number,
    ): Promise<ErrorResponse | LogEventsByTopicHash> {
        const url = `${this.API_URL}${chainId}/events/topics/${topicHash}/?starting-block=${startingBlock}&ending-block=${endingBlock}&key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as LogEventsByTopicHash
            else throw new Error(result.message)
        } catch (error) {
            console.error(`Failed to getLogEventsByTopicHash e: `, error)
            return error as ErrorResponse
        }
    }
}
