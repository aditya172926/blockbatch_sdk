// module to execute batch transactions
import { ethers } from "ethers";
import { abi } from "./abi/BatchTransferContract.abi";
import { erc20Abi } from "./abi/Token.abi";
import { BATCH_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constants";
import { ERC20Batch, EthBatch, Initializer } from "./types";

declare global {
    interface Window {
        ethereum?: any
    }
}

export class BatchTransaction {
    provider: ethers.Provider | null;
    signer: ethers.Signer | null;
    batchContract: ethers.Contract | null;

    // can we make the selection of batching contract generalize
    // batchContractAddress: string | null;

    constructor(batchContractAddress?: string) {
        this.provider = null;
        this.signer = null;
        // this.batchContractAddress = null
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

    async executeEthBatch(batchData: EthBatch[]): Promise<ethers.TransactionResponse | Error> {
        try {
            if (!this.signer || !this.provider) {
                throw new Error("Either provider or signer not set");
            }

            let recipients = [];
            let amounts = [];
            let totalAmount = BigInt(0);
            for (let batch of batchData) {
                recipients.push(batch.recipient);
                amounts.push(ethers.parseEther(batch.amount));
                totalAmount += ethers.parseEther(batch.amount);
            }

            const batchContract = new ethers.Contract(BATCH_CONTRACT_ADDRESS, abi, this.signer);
            const txnData = await batchContract.batchTransfer.populateTransaction(recipients, amounts, { value: totalAmount });
            const estimatedGas = await this.estimateBatchGas(txnData);
            const txn = await this.signer.sendTransaction({
                to: txnData.to,
                data: txnData.data,
                value: txnData.value,
                gasLimit: estimatedGas
            });
            if (txn.hash)
                return txn
            throw new Error("Transaction failed ");
        } catch (error) {
            throw new Error(JSON.stringify(error));
        }

    }

    async executeERC20Batch(batchData: ERC20Batch[]): Promise<ethers.TransactionResponse> {
        if (!this.batchContract)
            throw new Error("SDK not initialized properly. Call init() method");
        try {
            let recipients = [];
            let amounts = [];
            let tokens = [];
            let totalAmount = BigInt(0);
            for (let batch of batchData) {
                recipients.push(batch.recipient);
                amounts.push(BigInt(batch.amount));
                tokens.push(batch.tokenAddress);
                totalAmount += BigInt(batch.amount);
            }

            const allowance = await this.erc20Approval(TOKEN_CONTRACT_ADDRESS, BATCH_CONTRACT_ADDRESS, totalAmount);

            const txnData = await this.batchContract.batchTransferMultiTokens.populateTransaction(
                tokens,
                recipients,
                amounts,
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
        const erc20Contract = new ethers.Contract(token, erc20Abi, this.signer);
        const approval = await erc20Contract.approve(spender, amount);
        const address = await this.signer?.getAddress();
        const allowance = await erc20Contract.allowance(address, spender);
        return allowance;
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
        } catch(error: any) {
            throw new Error(error);
        }  
    }
}