import { ethers } from "ethers";

/** Batched transaction params with calldata to execute all batch transactions (ETHBatch, ERC20Batch) in a single call*/
export interface BatchTransactionParams {
    /** Addresses of batch smart contracts corresponding to their calldata */
    to: string[],

    /** Corresponding ETH values to be sent along */
    values: BigInt[],

    /** Array of batched transaction calldata */
    data: string[]
}

/** Used for initializing the SDK. It enables the SDK to be used in both browser and node environment */
export interface Initializer {
    provider?: ethers.Provider,
    signer?: ethers.Signer,
    private_key?: string
}

/** Raw Transaction request from the user to be processed into batch transactions */
export interface BatchData {
    /** Address of the recipient of either ETH or ERC20 tokens */
    recipient: string,

    /** Amount of either ETH or ERC20 to send to recipient */
    amount: string,

    /** Address of ERC20 token to transfer to recipient. If not provided, the transaction will be considered for transfering ETH */
    tokenAddress?: string
}

/** Batch of all transactions for transfering ETH to recipients */
export interface ETHBatch {
    /** Array of addresses for recipients of ETH */
    recipients: string[],

    /** Corresponding ETH/ERC20 amount to send to each recipient */
    amounts: BigInt[]
}

/** Batch of all transactions for transfering ETH to recipients */
export interface ERC20Batch extends ETHBatch {
    /** Array of ERC20 token addresses for transferring to each recipient */
    tokens: string[]
}

/** Contains total amount of each type of ERC20 tokens to be approved by the spender */
export interface TokenAllowance {
    [key: string]: bigint
}

/** Contains transaction data of all processed ETH batch transactions and ERC20 batch transactions */
export interface ProcessedBatch {
    /** Transaction calldata for all valid ERC20 batch transactions */
    erc20: ethers.ContractTransaction | null,

    /** Transaction calldata for all valid ETH batch transactions */
    eth: ethers.ContractTransaction | null
}

/** Contains all of the invalid transactions that cannot be included in the Processedbatch */
export interface InvalidTransactions {
    /** Message showing which transaction batch was rejected */
    message: string,

    /** Rejected transaction data */
    batchData: BatchData
}