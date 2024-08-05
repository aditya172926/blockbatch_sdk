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
                        console.error("Error: Provider not found in Signer or Params");
                        return false;
                    }
                } else if (initialize.private_key) {
                    if (!initialize.provider) {
                        console.log("Error: Must send Provider with Private Key");
                        return false;
                    }
                    this.signer = new ethers.Wallet(initialize.private_key, initialize.provider);
                    this.provider = initialize.provider;
                } else if (initialize.provider) {
                    console.log("Cannot send only provider. Send either a Private key or Signer as well");
                    return false;
                }
                console.log(this.signer, this.provider);
                return true;
            } else if (window?.ethereum) { // browser environment
                const provider = new ethers.BrowserProvider(window.ethereum);
                this.signer = await provider.getSigner();
                this.provider = this.signer.provider;
                return true;
            } else {
                console.log("Error: In node environment send Params of Signer or Private Key and Provider");
                return false;
            }
        } catch (error: any) {
            throw Error(error);
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
            console.log("estimated gas ", estimatedGas);
            const txn = await this.signer.sendTransaction({
                to: txnData.to,
                data: txnData.data,
                value: txnData.value,
                gasLimit: estimatedGas
            });
            console.log("Transaction ", txn);
            if (txn.hash)
                return txn
            throw new Error("Transaction failed ");
        } catch (error) {
            console.error(error);
            throw new Error(JSON.stringify(error));
        }

    }

    async executeERC20Batch(batchData: ERC20Batch[]): Promise<ethers.TransactionResponse | Error> {
        try {
            if (!this.batchContract)
                throw new Error("SDK not initialized properly. Call init() method");
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
            console.log("Allowance ", allowance);

            const txnData = await this.batchContract.batchTransferMultiTokens.populateTransaction(
                tokens,
                recipients,
                amounts,
            );

            const estimatedGas = await this.estimateBatchGas(txnData);
            const txn = await this.signer?.sendTransaction({
                to: txnData.to,
                data: txnData.data,
                value: txnData.value,
                gasLimit: estimatedGas
            })
            console.log("ERC20 transaction ", txn);
            if (txn?.hash)
                return txn;
            throw new Error("Transaction failed");
        } catch (error) {
            throw new Error(JSON.stringify(error));
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
        const estimatedGas = await this.signer?.estimateGas(transactionData);
        return estimatedGas;
    }
}