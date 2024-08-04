import { ethers } from "ethers"

export interface Transaction {
    address: string,
    value: string,
    data: string
}

export interface Initializer {
    provider?: ethers.Provider,
    signer?: ethers.Signer,
    private_key?: string
}

export interface EthBatch {
    recipient: string,
    amount: string
}

export interface ERC20Batch extends EthBatch {
    tokenAddress: string
}