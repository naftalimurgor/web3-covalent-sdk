import { SDKConfig } from '../../types';
import { get } from '../../utils';
import { IDEXes } from './IDEXes.interface';

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
  private V1_API_URI!: string;

  /**
   * Description placeholder
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @private
   * @type {!string}
   */
  private API_KEY!: string;

  /**
   * Creates an instance of DEX.
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @constructor
   * @param {SDKConfig} config
   */
  constructor(config: SDKConfig) {
    this.API_KEY = config.apiKey;
    this.V1_API_URI = config.apiV1Url;
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
    pageSize: number
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/pools/page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

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
    pageSize?: number | undefined
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/pools/address/${usdcPoolAddress}/page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

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
    pageSize?: number | undefined
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/address/${walletAddress}/balances/page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

  /**
   * Fetch network Tokens for given DEX
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @async
   * @param {number} chainId
   * @param {string} dexName
   * @param {?(number | undefined)} [pageSize]
   * @returns {Promise<any>}
   */
  public getXYNetworkExchangeTokens = async (
    chainId: number,
    dexName: string,
    pageSize?: number | undefined
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/tokens/page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

  /**
   * Fetch all supported DEXEs
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @async
   * @returns {Promise<any>}
   */
  public getXYSupportedDEXes = async (): Promise<any> => {
    const url = `${this.V1_API_URI}/xy=k/supported_dexes/&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

  /**
   * Fetch single network exchange token for a specific DEX.
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @async
   * @param {string} chainId
   * @param {string} dexName
   * @param {string} usdcContractAddress
   * @param {number} [pageSize=100]
   * @returns {Promise<any>}
   */
  public getXYSingleNetworkExchangeToken = async (
    chainId: string,
    dexName: string,
    usdcContractAddress: string,
    pageSize = 100
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/tokens/address/${usdcContractAddress}/page_size=${pageSize}&key=${this.API_KEY}`;

    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

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
    pageSize?: number | undefined
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/address/${walletAddress}/transactions/page_size=${pageSize}&key=${this.API_KEY}`;

    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

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
    pageSize = 100
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/tokens/address/${linkContractAdress}/transactions/page_size=${pageSize}&key=${this.API_KEY}`;

    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

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
    pageSize: number
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/pools/address/${usdcContractAddress}/transactions/page_size=${pageSize}&key=${this.API_KEY}`;

    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

  /**
   *
   * Fetch ecosystem chart data for a specific DEX.
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @async
   * @param {number} chainId
   * @param {string} dexName
   * @param {?(number | undefined)} [pageSize]
   * @returns {Promise<any>}
   */
  public getXYEcosystemChartData = async (
    chainId: number,
    dexName: string,
    pageSize?: number | undefined
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/ecosystem/page_size=${pageSize}&key=${this.API_KEY}`;

    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };

  /**
   * Fetch last synced block height data and latest block height for a specific DEX.
   * @date 1/13/2023 - 6:02:32 PM
   *
   * @async
   * @param {number} chainId
   * @param {string} dexName
   * @param {?(number | undefined)} [pageSize]
   * @returns {Promise<any>}
   */
  public getXYHealthData = async (
    chainId: number,
    dexName: string,
    pageSize?: number | undefined
  ): Promise<any> => {
    const url = `${this.V1_API_URI}/${chainId}/xy=k/${dexName}/health/page_size=${pageSize}&key=${pageSize}`;

    try {
      const result = await get(url);
      return result;
    } catch (error) {
      return error;
    }
  };
}
