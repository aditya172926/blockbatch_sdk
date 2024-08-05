// module to execute batch transactions
import { ethers, toBigInt } from "ethers";
import { abi } from "./abi/BatchTransferContract.abi";
import { erc20Abi } from "./abi/Token.abi";
import { BATCH_CONTRACT_ADDRESS } from "./constants";
import { BatchData, ERC20Batch, ETHBatch, Initializer, TokenAllowance } from "./types";

declare global {
    interface Window {
        ethereum?: any
    }
}

export class BatchTransaction {
    provider: ethers.Provider | null;
    signer: ethers.Signer | null;
    batchContract: ethers.Contract | null;

    /**
     * Stuff this class can do so far
     * Send ETH in batch transactions
     * Send ERC20 in batch transactions
     * Send multi erc20 tokens in batch transactions
     * Estimate gas for batch transactions - gas fees for slow, medium and fast transactions remaining
     * 
     */

    constructor() {
        this.provider = null;
        this.signer = null;
        this.batchContract = null;
    }

    async init(initialize?: Initializer) {
        const setup = await this.setup(initialize);
        if (setup) {
            this.batchContract = new ethers.Contract(BATCH_CONTRACT_ADDRESS, abi, this.signer);
            return true
        }
        return false;
    }

    private async setup(initialize?: Initializer): Promise<boolean> {
        try {
            if (initialize) {
                if (initialize.signer) {
                    this.signer = initialize.signer;
                    if (this.signer.provider)
                        this.provider = this.signer.provider;
                    else if (initialize.provider)
                        this.provider = initialize.provider;
                    else {
                        throw new Error("Provider not found in Signer or Params");
                    }
                } else if (initialize.private_key) {
                    if (!initialize.provider) {
                        throw new Error("Provider not found. Send Provider object with Private Key");
                    }
                    this.signer = new ethers.Wallet(initialize.private_key, initialize.provider);
                    this.provider = initialize.provider;
                } else if (initialize.provider) {
                    throw new Error("Cannot send only provider. Send either a Private key or Signer as well");
                }
                return true;
            } else if (window) { // browser environment
                if (window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    this.signer = await provider.getSigner();
                    this.provider = this.signer.provider;
                    return true;
                }
                throw new Error("No ethereum object found in browser window");
            } else {
                throw new Error("In node environment send Params of Signer or Private Key and Provider");
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async processBatchTransactions(batchData: BatchData[]) {
        let ethBatch: ETHBatch = {
            recipients: [],
            amounts: []
        };
        let erc20Batch: ERC20Batch = {
            recipients: [],
            amounts: [],
            tokens: []
        };

        let totalEthAmount = BigInt(0);
        let allowanceAmount: TokenAllowance = {};

        for (let batch of batchData) {
            if (!ethers.isAddress(batch.recipient))
                throw new Error(`Invalid recipient address passed ${batch.recipient}`);
            if (batch.tokenAddress) { // batching erc20
                if (!ethers.isAddress(batch.tokenAddress))
                    throw new Error(`Invalid token address passed ${batch.tokenAddress}`);
                erc20Batch.recipients.push(batch.recipient);
                erc20Batch.amounts.push(BigInt(batch.amount));
                erc20Batch.recipients.push(batch.recipient);
                if (allowanceAmount[batch.tokenAddress!]) {
                    allowanceAmount[batch.tokenAddress!] += BigInt(batch.amount);
                } else {
                    allowanceAmount[batch.tokenAddress!] = BigInt(batch.amount);
                }
            } else { // batching eth
                ethBatch.recipients.push(batch.recipient);
                ethBatch.amounts.push(ethers.parseEther(batch.amount));
                totalEthAmount += ethers.parseEther(batch.amount);
            }
        }

        let ethBatchTransaction: ethers.TransactionResponse;
        let erc20BatchTransaction: ethers.TransactionResponse;
        if (ethBatch.recipients.length > 0)
            ethBatchTransaction = await this.executeEthBatch(ethBatch, totalEthAmount);
        if (erc20Batch.recipients.length > 0)
            erc20BatchTransaction = await this.executeERC20Batch(erc20Batch, allowanceAmount);

    }

    async executeEthBatch(ethBatch: ETHBatch, totalEthAmount: BigInt): Promise<ethers.TransactionResponse> {
        if (!this.batchContract)
            throw new Error("SDK not initialized properly. Call init() method");
        try {
            if (!this.signer || !this.provider) {
                throw new Error("Either provider or signer not set");
            }

            const batchContract = new ethers.Contract(BATCH_CONTRACT_ADDRESS, abi, this.signer);
            const txnData = await batchContract.batchTransfer.populateTransaction(ethBatch.recipients, ethBatch.amounts, { value: totalEthAmount });
            const estimatedGas = await this.estimateBatchGas(txnData);

            const txn = await this.sendTransaction(txnData, estimatedGas);
            if (txn.hash)
                return txn;
            throw new Error("Transaction failed ");
        } catch (error: any) {
            throw new Error(error);
        }

    }

    async executeERC20Batch(erc20Batch: ERC20Batch, allowanceAmount: TokenAllowance): Promise<ethers.TransactionResponse> {
        if (!this.batchContract)
            throw new Error("SDK not initialized properly. Call init() method");
        try {
            // let recipients = [];
            // let amounts = [];
            // let tokens = [];
            // let allowanceAmount: TokenAllowance = {};
            // for (let batch of batchData) {
            //     if (!ethers.isAddress(batch.recipient))
            //         throw new Error(`Invalid recipient address provided ${batch.recipient}`);
            //     recipients.push(batch.recipient);
            //     amounts.push(BigInt(batch.amount));
            //     tokens.push(batch.tokenAddress);
            //     if (allowanceAmount[batch.tokenAddress!]) {
            //         allowanceAmount[batch.tokenAddress!] += BigInt(batch.amount);
            //     } else {
            //         allowanceAmount[batch.tokenAddress!] = BigInt(batch.amount);
            //     }
            // }

            for (let key in allowanceAmount) {
                const _allowance = await this.erc20Approval(key, BATCH_CONTRACT_ADDRESS, toBigInt(allowanceAmount[key]));
            }

            const txnData = await this.batchContract.batchTransferMultiTokens.populateTransaction(
                erc20Batch.tokens,
                erc20Batch.recipients,
                erc20Batch.amounts,
            );

            const estimatedGas = await this.estimateBatchGas(txnData);
            const txn = await this.sendTransaction(txnData, estimatedGas)
            if (txn)
                return txn;
            throw new Error("Transaction failed");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    private async erc20Approval(token: string, spender: string, amount: BigInt) {
        try {
            const erc20Contract = new ethers.Contract(token, erc20Abi, this.signer);
            const approval = await erc20Contract.approve(spender, amount);
            const address = await this.signer?.getAddress();
            const allowance = await erc20Contract.allowance(address, spender);
            return allowance;
        } catch (error) {
            console.log(error);
        }
    }

    private async estimateBatchGas(transactionData: ethers.ContractTransaction) {
        try {
            const estimatedGas = await this.signer?.estimateGas(transactionData);
            if (estimatedGas)
                return estimatedGas;
            throw new Error("Gas Estimation failed");
        } catch (error) {
            return BigInt(300000);
        }

    }

    private async sendTransaction(transactionData: ethers.ContractTransaction, gasLimit: bigint): Promise<ethers.TransactionResponse> {
        try {
            const txn = await this.signer?.sendTransaction({
                to: transactionData.to,
                data: transactionData.data,
                value: transactionData.value,
                gasLimit: gasLimit
            });
            if (txn?.hash)
                return txn;
            throw new Error("Transaction Failed")
        } catch (error: any) {
            throw new Error(error);
        }
    }
}