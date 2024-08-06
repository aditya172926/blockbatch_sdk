import { ethers } from "ethers"

export interface BatchTransactionParams {
    to: string[],
    values: BigInt[],
    data: string[]
}

export interface Initializer {
    provider?: ethers.Provider,
    signer?: ethers.Signer,
    private_key?: string
}

export interface BatchData {
    recipient: string,
    amount: string,
    tokenAddress?: string
}

export interface ETHBatch {
    recipients: string[],
    amounts: BigInt[]
}

export interface ERC20Batch extends ETHBatch {
    tokens: string[]
}

export interface TokenAllowance {
    [key: string]: bigint
}

export interface ProcessedBatch {
    erc20: ethers.ContractTransaction | null,
    eth: ethers.ContractTransaction | null
}