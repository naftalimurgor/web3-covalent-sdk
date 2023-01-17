import { Balances } from './lib/v1/Balances'
import { Base } from './lib/v1/Base'
import { DEX } from './lib/v1/DEX'
import { NFTs } from './lib/v1/NFTS'
import { Transactions } from './lib/v1/Transactions'
import { SDKConfig } from './types'

/**
 * Base Web3CovalentSDK class
 * @date 1/14/2023 - 11:32:11 AM
 *
 * @class Web3CovalentSDK
 * @typedef {Web3CovalentSDK}
 */
class Web3CovalentSDK {
    /**
     * @link https://www.covalenthq.com/docs/api/#/0/0/USD/1
     * @date 1/14/2023 - 11:32:11 AM
     *
     * @public
     * @readonly
     * @type {Balances}
     */
    public readonly balances: Balances
    /**
     * transactions propery
     * @date 1/14/2023 - 11:32:11 AM
     *
     * @public
     * @readonly
     * @type {Transactions}
     */
    public readonly transactions: Transactions
    /**
     * @link https://www.covalenthq.com/docs/api/#/0/0/USD/1
     * @date 1/14/2023 - 11:32:11 AM
     *
     * @public
     * @readonly
     * @type {NFTs}
     */
    public readonly nfts: NFTs
    /**
     * @link https://www.covalenthq.com/docs/api/#/0/0/USD/1
     * @date 1/14/2023 - 11:32:11 AM
     *
     * @public
     * @readonly
     * @type {DEX}
     */
    public readonly dexes: DEX
    /**
     * base property.
     * @date 1/14/2023 - 11:32:11 AM
     *
     * @public
     * @readonly
     * @type {Base}
     */
    public readonly base: Base

    /**
     * @link https://www.covalenthq.com/docs/api/#/0/0/USD/1
     * Creates an instance of Web3CovalentSDK to access Covalent API.
     * @date 1/14/2023 - 11:32:11 AM
     *
     * @constructor
     * @param {SDKConfig} config
     */
    constructor(config: SDKConfig) {
        this.balances = new Balances(config)
        this.transactions = new Transactions(config)
        this.nfts = new NFTs(config)
        this.dexes = new DEX(config)
        this.base = new Base(config)
    }
}

export { Web3CovalentSDK, Transactions, Balances, DEX, NFTs, Base }
