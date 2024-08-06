import { ethers } from "ethers";
import { BatchData, ERC20Batch, ETHBatch, Initializer, ProcessedBatch, TokenAllowance } from "./types";
declare global {
    interface Window {
        ethereum?: any;
    }
}
export declare class BatchTransaction {
    provider: ethers.Provider | null;
    signer: ethers.Signer | null;
    batchProcessingContract: ethers.Contract | null;
    batchContract: ethers.Contract | null;
    /**
     * Stuff this class can do so far
     * Send ETH in batch transactions
     * Send ERC20 in batch transactions
     * Send multi erc20 tokens in batch transactions
     * Estimate gas for batch transactions - gas fees for slow, medium and fast transactions remaining
     *
     */
    constructor();
    init(initialize?: Initializer): Promise<boolean>;
    private setup;
    processBatchTransactions(batchData: BatchData[]): Promise<ProcessedBatch>;
    executeEthBatch(ethBatch: ETHBatch, totalEthAmount: BigInt): Promise<ethers.ContractTransaction>;
    executeERC20Batch(erc20Batch: ERC20Batch, allowanceAmount: TokenAllowance): Promise<ethers.ContractTransaction>;
    private erc20Approval;
    private estimateBatchGas;
    private sendTransaction;
}
