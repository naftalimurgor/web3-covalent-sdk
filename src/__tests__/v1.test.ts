// NFTs
// DEX
// Transactions
// Balances
// Base
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jest from 'jest'
import * as matchers from 'jest-extended'
expect.extend(matchers)

import { Web3CovalentSDK } from '..'
import { Balances } from '../lib/v1/Balances'
import { Base } from '../lib/v1/Base'
import { DEX } from '../lib/v1/DEX'
import { NFTs } from '../lib/v1/NFTS'
import { Transactions } from '../lib/v1/Transactions'
import { SDKConfig } from '../types'
import * as dotenv from 'dotenv'
import {
    Balance,
    ERC20TokenTransfers,
    Portfolio,
    TokenHolders,
} from '../lib/v1/IBalances.interface'
import { Block, BlockHeightRes, LogEvents, LogEventsByTopicHash } from '../lib/v1/IBase.inteface'
import {
    AddressBalance,
    NetworkExchangeTokens,
    Pools,
    SupportedDexes,
} from '../lib/v1/IDEXes.interface'

dotenv.config()

describe('V1 its', () => {
    const sdKConfig: SDKConfig = {
        // obtain key from: https://www.covalenthq.com/platform/#/
        apiKey: process.env.COVALENT_API_KEY as string,
        apiV1Url: 'https://api.covalenthq.com/v1/',
    }

    const ETHEREUM_CHAIN_ID = 1
    const TEST_ADDRESS = '0xDaF81c3603C83f952376F5829a360A5822f5B5Da'
    let web3CovalentSDK: Web3CovalentSDK

    beforeAll(() => {
        web3CovalentSDK = new Web3CovalentSDK(sdKConfig)
    })

    describe('Web3CovalentSDK Instance', () => {
        it('Should correctly create Instance of Web3CovalentSDK', () => {
            const _web3CovalentSDK = new Web3CovalentSDK(sdKConfig)
            expect(_web3CovalentSDK).toBeInstanceOf(Web3CovalentSDK)
            expect(_web3CovalentSDK.balances).toBeInstanceOf(Balances)
            expect(_web3CovalentSDK.transactions).toBeInstanceOf(Transactions)
            expect(_web3CovalentSDK.nfts).toBeInstanceOf(NFTs)
            expect(_web3CovalentSDK.base).toBeInstanceOf(Base)
            expect(_web3CovalentSDK.dexes).toBeInstanceOf(DEX)
        })
    })

    describe('Balances', () => {
        it('should fetch balance of an address given chainId, and an address', async () => {
            const result = (await web3CovalentSDK.balances.getAddressBalance(
                ETHEREUM_CHAIN_ID,
                TEST_ADDRESS,
            )) as Balance

            expect(result?.chain_id).toEqual(ETHEREUM_CHAIN_ID)
            expect(result?.address).toEqual(TEST_ADDRESS.toLowerCase())
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch historical portfolio value over time', async () => {
            const result = (await web3CovalentSDK.balances.getHistoricPortfolioValueOverTime(
                ETHEREUM_CHAIN_ID,
                TEST_ADDRESS,
            )) as Portfolio

            expect(result?.chain_id).toEqual(ETHEREUM_CHAIN_ID)
            expect(result?.address).toEqual(TEST_ADDRESS.toLowerCase())
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch tokenHolders at a given Height', async () => {
            const blockHeight = Object.freeze({ startingBlock: 15410833, endingBlock: 'latest' })

            const result = (await web3CovalentSDK.balances.getTokenHoldersAtBlockHeight(
                ETHEREUM_CHAIN_ID,
                '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
                blockHeight,
            )) as TokenHolders

            expect(result.items).toBeArray()
            expect(result.items.length).toBe(100)
        }, 10000)

        it('should fetch ERC20 token transfers of an ERC20 for a given Address (EOA)', async () => {
            const walletAddress = '0xDaF81c3603C83f952376F5829a360A5822f5B5Da'
            const usdcTokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

            const result = (await web3CovalentSDK.balances.getERC20TokenTransfersForAddress(
                ETHEREUM_CHAIN_ID,
                usdcTokenAddress,
                walletAddress,
            )) as ERC20TokenTransfers

            expect(result.address).toBe(walletAddress.toLowerCase())
            expect(result.updated_at).toBeString()
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch Token holders token changes between two block heights', async () => {
            const usdcTokenAdddress = '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8'
            const blockHeight = Object.freeze({ startingBlock: 15410833, endingBlock: 'latest' })

            const result =
                (await web3CovalentSDK.balances.getChangesInTokenHoldersBetweenTwoBlockHeights(
                    ETHEREUM_CHAIN_ID,
                    usdcTokenAdddress,
                    blockHeight,
                )) as TokenHolders

            expect(result.items).toBeArray()
        }, 10000)
    })

    describe('Base', () => {
        it('fetch a block given a block height', async () => {
            const chainId = 1
            const blockHeight = 15410959
            const result = (await web3CovalentSDK.base.getBlock(chainId, blockHeight)) as Block
            const block = result.items[0]
            expect(result.items).toBeArray()
            expect(result.updated_at).toBeString()
            expect(block.height).toEqual(blockHeight)
        })

        it('fetch block heights withing given date ranges', async () => {
            const startDate = '2022-01-01'
            const endDate = '2022-01-02'
            const result = (await web3CovalentSDK.base.getBlockHeights(
                ETHEREUM_CHAIN_ID,
                startDate,
                endDate,
            )) as BlockHeightRes
            expect(result.updated_at).toBeString()
            expect(result.items).toBeArray()
        })

        it('should fetch log events for a smart contract', async () => {
            const usdcContractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
            const startingBlock = 15410833
            const endingBlock = 15410838
            const result = (await web3CovalentSDK.base.getLogEventsByContractAddress(
                ETHEREUM_CHAIN_ID,
                usdcContractAddress,
                startingBlock,
                endingBlock,
            )) as LogEvents

            expect(result.updated_at).toBeString()
            expect(result.items).toBeArray()
        })

        it('should fetch log events by topicHash', async () => {
            const topicHash = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
            const startingBlock = 15410833
            const endingBlock = 15410838
            const result = (await web3CovalentSDK.base.getLogEventsByTopicHash(
                ETHEREUM_CHAIN_ID,
                topicHash,
                startingBlock,
                endingBlock,
            )) as LogEventsByTopicHash
            expect(result.updated_at).toBeString()
            expect(result.items).toBeArray()
        })
    })

    describe('DEX', () => {
        it('should get xy=k pool info', async () => {
            const dexname = 'uniswap_v2'
            const result = (await web3CovalentSDK.dexes.getXYPools(
                ETHEREUM_CHAIN_ID,
                dexname,
            )) as Pools
            expect(result.updated_at).toBeString()
            expect(result.items).toBeArray()
            expect(result.pagination).toBeDefined()
        })

        it('should get xy=k pool info by address', async () => {
            const dexName = 'uniswap_v2'
            const usdcPoolAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc'

            const result = (await web3CovalentSDK.dexes.getXYPoolsByAddress(
                ETHEREUM_CHAIN_ID,
                dexName,
                usdcPoolAddress,
            )) as Pools
            expect(result.items).toBeArray()
            expect(result.updated_at).toBeDateString()
        })

        it('should get address exchange balance', async () => {
            const dexName = 'uniswap_v2'
            const walletAddress = '0xDaF81c3603C83f952376F5829a360A5822f5B5Da'

            const result = (await web3CovalentSDK.dexes.getXYAddressExchangeBalances(
                ETHEREUM_CHAIN_ID,
                dexName,
                walletAddress,
            )) as AddressBalance
            expect(result.address).toEqual(walletAddress.toLowerCase())
        })

        it('should fetch network exchange tokens', async () => {
            const dexname = 'uniswap_v2'
            const result = (await web3CovalentSDK.dexes.getXYNetworkExchangeTokens(
                ETHEREUM_CHAIN_ID,
                dexname,
            )) as NetworkExchangeTokens

            expect(result.updated_at).toBeDateString()
            expect(result.items).toBeArray()
        })

        it('should fetch xy=k supported dexes', async () => {
            const result = (await web3CovalentSDK.dexes.getXYSupportedDEXes()) as SupportedDexes

            expect(result.items).toBeArray()
            expect(result.updated_at).toBeDateString()
        })

        // get single network exchange token test:
        it('should fetch xy=k Transaction for account address', async () => {
            const dexname = 'uniswap_v2'
            const walletAddress = '0xDaF81c3603C83f952376F5829a360A5822f5B5Da'
            const result = await web3CovalentSDK.dexes.getXYTransactionsForAccountAddress(
                ETHEREUM_CHAIN_ID,
                dexname,
                walletAddress,
            )

            expect(result).toBeDefined()
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch xy=k Transaction for Token address', async () => {
            const dexname = 'uniswap_v2'
            const linkAddress = '0x514910771AF9Ca656af840dff83E8264EcF986CA'
            const result = await web3CovalentSDK.dexes.getXYTransactionsForTokenAddress(
                ETHEREUM_CHAIN_ID,
                dexname,
                linkAddress,
            )

            expect(result).toBeDefined()
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch xy=k Transaction for Token address', async () => {
            const dexname = 'uniswap_v2'
            const usdcPoolAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc'
            const result = await web3CovalentSDK.dexes.getXYTransactionsForExchange(
                ETHEREUM_CHAIN_ID,
                dexname,
                usdcPoolAddress,
            )

            expect(result).toBeDefined()
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch xy=k Transactions for Exchange', async () => {
            const dexname = 'uniswap_v2'
            const usdcPoolAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc'
            const result = await web3CovalentSDK.dexes.getXYTransactionsForExchange(
                ETHEREUM_CHAIN_ID,
                dexname,
                usdcPoolAddress,
            )

            expect(result).toBeDefined()
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch xy=k Ecosystem Chart Data', async () => {
            const dexname = 'uniswap_v2'
            const result = await web3CovalentSDK.dexes.getXYEcosystemChartData(
                ETHEREUM_CHAIN_ID,
                dexname,
            )

            expect(result).toBeDefined()
            expect(result.items).toBeArray()
        }, 10000)

        it('should fetch xy=k Health Data', async () => {
            const dexname = 'uniswap_v2'
            const result = await web3CovalentSDK.dexes.getXYHealthData(ETHEREUM_CHAIN_ID, dexname)

            expect(result).toBeDefined()
            expect(result.items).toBeArray()
        }, 10000)
    })
    describe('NFTS', () => {
        // it('should fetch NFTToken Ids', async () => {})
    })
})
