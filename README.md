<p align="center">
  <img width="250" height="250" src="https://github.com/naftalimurgor/web3-covalent-sdk/blob/main/web3-covalent-sdk.png">
</p>

# web3-covalent-sdk

A full-fledged sdk for the Covalent Unified API for querying on-chain data across mutliple chains.

Check out [Covalent API](https://www.covalenthq.com/platform/#/) for more info.

## Quick Start

### Installation

If using npm:

```sh
npm i web3-covalent-sdk
```

or with Yarn:

```sh
yarn add web3-covalent-sdk
```

## Usecase addressed

A unified JavaScript SDK written in TypeScript that can be used in a Reactjs web application (in the Model Layer, taking into account that React applications follow the MVVM pattern) to access the Covalent Unified API as all-in-one library for Frontend projects.

## Pitch Deck

[View Pitch Deck](https://www.canva.com/design/DAFXW9uylME/o4EpvuYo8YAALjvrDuSRZg/view?utm_content=DAFXW9uylME&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

## Usage

Create a config object:

```typescript
const sdKConfig: SDKConfig = {
    // obtain key from: https://www.covalenthq.com/platform/#/
    apiKey: process.env.COVALENT_API_KEY as string,
    apiV1Url: 'https://api.covalenthq.com/v1/',
}
```

Create an instance of the Web3CovalentSDK class:

```typescript
import {Web3CovalentSDK} from 'web3-covalent-sdk'

web3CovalentSDK = new Web3CovalentSDK(sdKConfig)
```

### 1. Query NFT data

To query NFT TokenIds:

```typescript
const contractAddress = '0xBd3531dA5CF5857e7CfAA92426877b022e612cf'
const ethereumChainId = 1

const nftData = await web3CovalentSDK.nfts.getNFTTokenIDsForContract(ethereumChainId, tokenId, contractAddress)
console.info(nftData.items)
```

### 2. Query Transactions

To fetch a transaction based on the Transaction Hash:

```typescript
const ethereumChainId = 1
const txhash = '0x9508e372d64c9dd36befe55ba58d66bbbc67f07ceff05c55b2ad2795bbf13a7a'

const transaction = await web3CovalentSDK.transactions.getTransaction(ethereumChainId, txhash)
console.info(transaction)
```

### 3. Query Block Data

To fetch a block at a certain height:

```typescript
const chainId = 1
const blockHeight = 15410959
const result = await web3CovalentSDK.base.getBlock(chainId, blockHeight)

const block = result.items[0]
console.info(block)
```

### 4. Query xy=k Data

To query xy=k data:

```typescript
const ethereumChainId = 1
const dexname = 'uniswap_v2'

const xyPools = (await web3CovalentSDK.dexes.getXYPools(
    ethereumChainId,
    dexname,
))

console.info(xypools.items)
```

### 5. Query Balances

To query balance balance of and address:

```typescript
const ethereumChainId = 1
const address = '0xDaF81c3603C83f952376F5829a360A5822f5B5Da'

const balances = (await web3CovalentSDK.balances.getAddressBalance(
      ethereumChainId,
      TEST_ADDRESS,
))

console.info(balances.items)
```

## Docs

Read more in the [docs](https://naftalimurgor.github.io/web3-covalent-sdk/)

## Try out in Code Sandbox

[Code Sandbox]()

## Changelog

view [api changelogs](CHANGELOG.md)
