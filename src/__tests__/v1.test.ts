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
import { BalanceResponse } from '../lib/v1/IBalances.interface'

dotenv.config()

describe('V1 tests', () => {
    const sdKConfig: SDKConfig = {
        // obtain key from: https://www.covalenthq.com/platform/#/
        apiKey: process.env.COVALENT_API_KEY as string,
        apiV1Url: 'https://api.covalenthq.com/v1/',
    }

    const ETHEREUM_CHAIN_ID = 1
    const TEST_ADDRESS = '0x03C0C9636400E8Bb9644A90b49A5eb00d4140562'
    let web3CovalentSDK: Web3CovalentSDK

    beforeAll(() => {
        web3CovalentSDK = new Web3CovalentSDK(sdKConfig)
    })

    test('Should correctly create Instance of Web3CovalentSDK', () => {
        const _web3CovalentSDK = new Web3CovalentSDK(sdKConfig)
        expect(_web3CovalentSDK).toBeInstanceOf(Web3CovalentSDK)
        expect(_web3CovalentSDK.balances).toBeInstanceOf(Balances)
        expect(_web3CovalentSDK.transactions).toBeInstanceOf(Transactions)
        expect(_web3CovalentSDK.nfts).toBeInstanceOf(NFTs)
        expect(_web3CovalentSDK.base).toBeInstanceOf(Base)
        expect(_web3CovalentSDK.dexes).toBeInstanceOf(DEX)
    })

    test('should fetch balance of an address given chainId, and an address', async () => {
        try {
            const result = await web3CovalentSDK.balances.getAddressBalance(
                ETHEREUM_CHAIN_ID,
                TEST_ADDRESS,
            )
            console.info(result)
            expect(result.chain_id).toEqual(ETHEREUM_CHAIN_ID)
        } catch (error) {
            console.error(error)
        }
    })
})
