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

### 1. Query NFT data

### 2. Query Transactions

### 3. Query Block Data

### 4. Query xy=k Data

### 5. Query Balances

## Docs

Read more 

## Try out in Code Sandbox

[Code Sandbox]()

## Covalent API endpoints used (V1)

1. Balances endpoint

1. v1/{{chain_id}}/address/{{wallet_address}}/balances_v2/        -Get Token Balances for Address
2. v1/{{chain_id}}/address/{{wallet_address}}/portfolio_v2/       -Get Historic Portfolio value over time
3. v1/{{chain_id}}/tokens/{{ppg_contract_address}}/token_holders/ -Get ERC20 token transfers for address
4. v1/{{chain_id}}/tokens/{{ppg_contract_address}}/token_holders_changes/?starting-block={{starting_block}}&ending-block=latest -Get Token Holders as of any block height

### Transactions endpoints

1. v1/{{chain_id}}/address/{{wallet_address}}/transactions_v2/ -Get Transactions for address
2. v1/{{chain_id}}/transaction_v2/{{txn_hash}}/                -Get A Transaction

### Base (Core) endpoints

1. v1/{{chain_id}}/block_v2/{{block_height}}/            -Get A Block
2. v1/{{chain_id}}/block_v2/{{start_date}}/{{end_date}}/ - Get Block Heights
3. v1/{{chain_id}}/events/address/{{usdc_contract_address}}/?starting-block={{starting_block}}&ending-block={{ending_block}} -Get Log Events by Contract Address
4. v1/{{chain_id}}/events/topics/{{topic_hash}}/?starting-block={{starting_block}}&ending-block={{ending_block}} -Get Log Events by Topic Hash
5. /v1/chains/ -Get all chains
6. /v1/chains/status/ -Get all chain statuses

## xy=k(DEXEs)

1. /v1/{{chain_id}}/xy=k/{{dexname}}/pools/ - Get xy=k pools
2. v1/{{chain_id}}/xy=k/{{dexname}}/pools/address/{{usdc_pool_address}}/ -Get xy=k pools by address
3. v1/{{chain_id}}/xy=k/{{dexname}}/address/{{wallet_address}}/balances/ -Get xy=k address exchange balances
4. v1/{{chain_id}}/xy=k/{{dexname}}/tokens/ -Get xy=k network exchange tokens -Get xy=k supported DEXes
5. v1/xy=k/supported_dexes/ -Get xy=k supported DEXes - Get xy=k single network exchange token-Get xy=k transactions for account address
6. v1/{{chain_id}}/xy=k/{{dexname}}/tokens/address/{{usdc_contract_address}}/-Get xy=k transactions for token address
7. v1/{{chain_id}}/xy=k/{{dexname}}/address/{{wallet_address}}/transactions/ -Get xy=k transactions for exchange
8. v1/{{chain_id}}/xy=k/{{dexname}}/tokens/address/{{link_contract_address}}/transactions/ -Get xy=k ecosystem chart data
9. v1/{{chain_id}}/xy=k/{{dexname}}/pools/address/{{usdc_pool_address}}/transactions/ - Get xy=k transactions for exchange
10. v1/{{chain_id}}/xy=k/{{dexname}}/ecosystem/ -
11. v1/{{chain_id}}/xy=k/{{dexname}}/health/ -Get xy=k health data

## NFTs endpoints

1. v1/{{chain_id}}/tokens/{{ppg_contract_address}}/nft_token_ids/                   - Get NFT external metadata for contract
2. v1/{{chain_id}}/tokens/{{ppg_contract_address}}/nft_transactions/{{token_id}}/   - Get NFT Transactions for contract
3. v1/{{chain_id}}/tokens/{{ppg_contract_address}}/nft_metadata/{{token_id}}/       - Get NFT external metadata for contract

