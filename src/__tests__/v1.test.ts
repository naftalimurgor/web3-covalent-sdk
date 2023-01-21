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
            console.info(blockHeight)

            const result =
                (await web3CovalentSDK.balances.getChangesInTokenHoldersBetweenTwoBlockHeights(
                    ETHEREUM_CHAIN_ID,
                    usdcTokenAdddress,
                    blockHeight,
                )) as TokenHolders
            console.info(result)
            expect(result.items).toBeArray()
        }, 10000)
    })

    // describe('Base', () => {
    //     it('fetch a block', async () => {
    //         const chainId = 1
    //         const blockHeight = 15410959
    //         const pageSize = 0
    //         const result = (await web3CovalentSDK.base.getBlock(
    //             chainId,
    //             blockHeight,
    //             pageSize,
    //         )) as Block

    //         const block = result.items[0]
    //         expect(result.items).toBeArray()
    //         expect(result.updated_at).toBeString()
    //         expect(block.height).toEqual(blockHeight)
    //     })
    // })
})
