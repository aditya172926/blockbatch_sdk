import { ethers } from "ethers"

export interface Transaction {
    from: string,
    to: string,
    value?: string,
    data: string
}

export interface Initializer {
    provider?: ethers.Provider,
    signer?: ethers.Signer,
    private_key?: string
}

export interface BatchTransactionInterface {
    recipient: string,
    token: string, // Address(0) for native token transfer
    amount: string
}

export interface NativeTokenBatch {
    recipients: string[],
    amounts: BigInt[]
}

export interface ERC20TokenBatch extends NativeTokenBatch {
    tokenAddresses: string[]
}

export interface TokenDistribution {
    native: NativeTokenBatch,
    erc20: ERC20TokenBatch
}