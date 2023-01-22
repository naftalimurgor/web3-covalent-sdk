import { SDKConfig } from '../../types'
import { get } from '../../utils'
import { ErrorResponse } from './IBalances.interface'
import { AddressBalance, IDEXes, Pools, SupportedDexes } from './IDEXes.interface'

/**
 * DEX class for fetching xy=k dex data
 * @date 1/13/2023 - 6:02:32 PM
 *
 * @export
 * @class DEX
 * @typedef {DEX}
 * @implements {IDEXes}
 */
export class DEX implements IDEXes {
    /**
     * Description placeholder
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @private
     * @type {!string}
     */
    private API_URI!: string

    /**
     * Description placeholder
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @private
     * @type {!string}
     */
    private API_KEY!: string

    /**
     * Creates an instance of DEX.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @constructor
     * @param {SDKConfig} config
     */
    constructor(config: SDKConfig) {
        this.API_KEY = config.apiKey
        this.API_URI = config.apiV1Url
    }

    /**
     * Fetch xy=k DEX data
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId chainId for the network
     * @param {string} dexName uniswap, sushiswap
     * @param {number} pageSize number of pools to fetch
     * @returns {Promise<any>}
     */
    public getXYPools = async (
        chainId: number,
        dexName: string,
    ): Promise<Pools | ErrorResponse> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/pools/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data as Pools
            else throw new Error(result.message)
        } catch (error) {
            return error as Pools
        }
    }

    /**
     * Fetch XY Pools by their address
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId chainId for the network
     * @param {string} dexName uniswap, sushiswap
     * @param {string} usdcPoolAddress
     * @param {?(number | undefined)} [pageSize]
     * @returns {Promise<any>}
     */
    public getXYPoolsByAddress = async (
        chainId: number,
        dexName: string,
        usdcPoolAddress: string,
    ): Promise<Pools | ErrorResponse> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/pools/address/${usdcPoolAddress}/?key=${this.API_KEY}`
        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            console.error(`failed to getXYPoolsByAddress e:`, error)
            return error as ErrorResponse
        }
    }

    /**
     * Fetch Address account balances.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId chainId for the network
     * @param {string} dexName name of the dex e.g sushiswap
     * @param {string} walletAddress
     * @param {?(number | undefined)} [pageSize]
     * @returns {Promise<any>}
     */
    public getXYAddressExchangeBalances = async (
        chainId: number,
        dexName: string,
        walletAddress: string,
    ): Promise<AddressBalance | ErrorResponse> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/address/${walletAddress}/balances/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data as AddressBalance
            else throw new Error(result.message)
        } catch (error) {
            return error as ErrorResponse
        }
    }

    /**
     * Fetch network Tokens for given DEX
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId
     * @param {string} dexName
     * @returns {Promise<any>}
     */
    public getXYNetworkExchangeTokens = async (chainId: number, dexName: string): Promise<any> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/tokens/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error as ErrorResponse
        }
    }

    /**
     * Fetch all supported DEXEs
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @returns {Promise<SupportedDexes|ErrorResponse>}
     */
    public getXYSupportedDEXes = async (): Promise<SupportedDexes | ErrorResponse> => {
        const url = `${this.API_URI}xy=k/supported_dexes/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data as SupportedDexes
            else throw new Error(result.message) as ErrorResponse
        } catch (error) {
            return error as ErrorResponse
        }
    }

    /**
     * Fetch single network exchange token for a specific DEX.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {string} chainId
     * @param {string} dexName
     * @param {string} usdcContractAddress
     * @returns {Promise<any>}
     */
    public getXYSingleNetworkExchangeToken = async (
        chainId: string,
        dexName: string,
        usdcContractAddress: string,
    ): Promise<any | ErrorResponse> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/tokens/address/${usdcContractAddress}/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error as ErrorResponse
        }
    }

    /**
     * Fetch transactions for account address for a specific DEX.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId
     * @param {string} dexName
     * @param {string} walletAddress
     * @param {?(number | undefined)} [pageSize]
     * @returns {Promise<any>}
     */
    public getXYTransactionsForAccountAddress = async (
        chainId: number,
        dexName: string,
        walletAddress: string,
    ): Promise<any> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/address/${walletAddress}/transactions/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error
        }
    }

    /**
     * Fetch transactions for token address for a specific DEX
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId
     * @param {string} dexName
     * @param {string} linkContractAdress
     * @param {number} [pageSize=100]
     * @returns {Promise<any>}
     */
    public getXYTransactionsForTokenAddress = async (
        chainId: number,
        dexName: string,
        linkContractAdress: string,
    ): Promise<any> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/tokens/address/${linkContractAdress}/transactions/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error
        }
    }

    /**
     * Fetch transactions for exchange for a specific DEX.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId
     * @param {string} dexName
     * @param {string} usdcContractAddress
     * @param {number} pageSize
     * @returns {Promise<any>}
     */
    public getXYTransactionsForExchange = async (
        chainId: number,
        dexName: string,
        usdcContractAddress: string,
    ): Promise<any> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/pools/address/${usdcContractAddress}/transactions/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error
        }
    }

    /**
     *
     * Fetch ecosystem chart data for a specific DEX.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId
     * @param {string} dexName
     * @returns {Promise<any>}
     */
    public getXYEcosystemChartData = async (chainId: number, dexName: string): Promise<any> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/ecosystem/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error
        }
    }

    /**
     * Fetch last synced block height data and latest block height for a specific DEX.
     * @date 1/13/2023 - 6:02:32 PM
     *
     * @async
     * @param {number} chainId
     * @param {string} dexName
     * @returns {Promise<any>}
     */
    public getXYHealthData = async (chainId: number, dexName: string): Promise<any> => {
        const url = `${this.API_URI}${chainId}/xy=k/${dexName}/health/?key=${this.API_KEY}`

        try {
            const result = await get(url)
            if (result.data) return result.data
            else throw new Error(result.message)
        } catch (error) {
            return error
        }
    }
}
