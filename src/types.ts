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