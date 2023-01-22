import { ErrorResponse, SDKConfig } from '../../types'
import { get } from '../../utils'
import { AddressTransactions, ITransactions, Transaction } from './ITransactions.interface'

/**
 * Transactions class
 * @date 1/13/2023 - 6:30:02 PM
 *
 * @export
 * @class Transactions
 * @typedef {Transactions}
 * @implements {ITransactions}
 */
export class Transactions implements ITransactions {
    /**
     * Covalent API HTTP url
     * @date 1/13/2023 - 6:30:02 PM
     *
     * @private
     * @type {!string}
     */
    private API_URL!: string

    /**
     * API key for authenticating access to Covalent API
     * @date 1/13/2023 - 6:30:02 PM
     *
     * @private
     * @type {!string}
     */
    private API_KEY!: string

    /**
     * Creates an instance of Transactions.
     * @date 1/13/2023 - 6:30:02 PM
     *
     * @constructor
     * @param {SDKConfig} config
     */
    constructor(config: SDKConfig) {
        this.API_KEY = config.apiKey
        this.API_URL = config.apiV1Url
    }

    /**
     * Fetch all transactions along with their decoded log events.
     * @date 1/13/2023 - 6:30:02 PM
     *
     * @async
     * @param {string} chainId
     * @param {string} walletAddress
     * @param {number} [pageSize=1]
     * @returns {(Promise<AddressTransactions | ErrorResponse>)}
     */
    public getAddressTransactions = async (
        chainId: string,
        walletAddress: string,
    ): Promise<AddressTransactions | ErrorResponse> => {
        const url = `${this.API_URL}${chainId}/address/${walletAddress}/transactions_v2/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as AddressTransactions
            else throw new Error(result.message)
        } catch (error) {
            return error as ErrorResponse
        }
    }

    /**
     * Fetch transaction data with their decoded event logs based on txHash
     * @date 1/13/2023 - 6:30:02 PM
     *
     * @async
     * @param {string} chainId
     * @param {string} transactionHash
     * @returns {(Promise<Transaction | ErrorResponse>)}
     */
    public getTransaction = async (
        chainId: number,
        transactionHash: string,
    ): Promise<Transaction | ErrorResponse> => {
        const url = `${this.API_URL}${chainId}/transaction_v2/${transactionHash}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as Transaction
            else throw new Error(result.message)
        } catch (error) {
            return error as ErrorResponse
        }
    }
}
