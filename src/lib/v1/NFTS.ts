import { ErrorResponse, SDKConfig } from '../../types';
import { get } from '../../utils';
import { INFTs, NFTTokenIds } from './INFTS';

export class NFTs implements INFTs {
  private API_URL!: string;

  private API_KEY!: string;

  constructor(config: SDKConfig) {
    this.API_KEY = config.apiKey;
    this.API_URL = config.apiV1Url;
  }

  public getNFTTokenIDsForContract = async (
    chainId: string,
    contractAddress: string,
    pageSize?: number | undefined,
    _pageNumber?: number | undefined
  ): Promise<NFTTokenIds | ErrorResponse> => {
    const url = `${this.API_URL}${chainId}/tokens/${contractAddress}}/nft_metadata/{{token_id}}/&page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result as NFTTokenIds;
    } catch (error) {
      console.error(`Failed to getNFTTokenIDsForContrac e: `, error);
      return error as ErrorResponse;
    }
  };

  public getNFTTransactionsForContract = async (
    chainId: string,
    tokenId: number,
    contractAddress: string,
    pageSize?: number | undefined,
    _pageNumber?: number | undefined
  ): Promise<any> => {
    const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/nft_transactions/${tokenId}/&page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      console.error(`Failed to getNFTTokenIDsForContrac e: `, error);
      return error;
    }
  };

  public getExternalNFTContractMetadata = async (
    chainId: string,
    contractAddress: string,
    tokenId: number,
    pageSize?: number
  ): Promise<any> => {
    const url = `${this.API_URL}${chainId}/tokens/${contractAddress}/nft_metadata/${tokenId}/&page_size=${pageSize}&key=${this.API_KEY}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      console.error(`Failed to getExternalNFTContractMetadata e: `, error);
      return error;
    }
  };
}
