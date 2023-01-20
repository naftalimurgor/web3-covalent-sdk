import { ErrorResponse } from './IBalances.interface'

export interface Block {
    updated_at: string
    items: Array<BlockMetadata>
    pagination?: any
}

interface BlockMetadata {
    signed_at: string
    height: number
}

export interface BlockHeightResponse {
    updated_at: string
    items: Array<BlockHeightMetadata>
    pagination: Pagination
}

interface Pagination {
    has_more: boolean
    page_number: number
    page_size: number
    total_count?: any
}

interface BlockHeightMetadata {
    signed_at: string
    height: number
}

export interface LogEventsResponse {
    updated_at: string
    items: Array<LogEventMetadata>
    pagination: Pagination
}

interface Pagination {
    has_more: boolean
    page_number: number
    page_size: number
    total_count?: any
}

export interface LogEventMetadata {
    block_signed_at: string
    block_height: number
    tx_offset: number
    log_offset: number
    tx_hash: string
    raw_log_topics: Array<string>
    sender_contract_decimals: number
    sender_name: string
    sender_contract_ticker_symbol?: any
    sender_address: string
    sender_address_label?: any
    sender_logo_url: string
    raw_log_data: string
    decoded: Decoded
}

interface Decoded {
    name: string
    signature: string
    params: Array<Param>
}

interface Param {
    name: string
    type: string
    indexed: boolean
    decoded: boolean
    value: boolean | string
}

export interface LogEventsByTopicHash {
    updated_at: string
    items: Array<TopicEventMetadata>
    pagination: Pagination
}

interface Pagination {
    has_more: boolean
    page_number: number
    page_size: number
    total_count?: any
}

interface TopicEventMetadata {
    block_signed_at: string
    block_height: number
    tx_offset: number
    log_offset: number
    tx_hash: string
    raw_log_topics: Array<string>
    sender_contract_decimals: number
    sender_name?: any
    sender_contract_ticker_symbol?: any
    sender_address: string
    sender_address_label?: any
    sender_logo_url: string
    raw_log_data: string
    decoded: Decoded
}

interface Decoded {
    name: string
    signature: string
    params: Param[]
}

export interface IBase {
    getBlock: (
        chainId: number,
        blockHeight: number,
        pageSize?: number,
    ) => Promise<ErrorResponse | Block>

    getBlockHeights: (
        chainId: number,
        startDate: string,
        endDate: string,
        pageSize: number,
    ) => Promise<ErrorResponse | BlockHeightResponse>

    getLogEventsByContractAddress: (
        chainId: number,
        contractAddress: string,
        startingBlock: number,
        endingBlock: number,
        pageSize: number,
    ) => Promise<ErrorResponse | LogEventsResponse>

    getLogEventsByTopicHash: (
        chainId: number,
        topicHash: string,
        startingBlock: number,
        pageSize: number,
    ) => Promise<ErrorResponse | LogEventsByTopicHash>
}
