// module to execute batch transactions
import { abi } from "./abi/BatchTransferContract.abi";
import { BATCH_CONTRACT_ADDRESS, PRIVATE_KEY } from "./constants";
import { EthBatch, Initializer, Transaction } from "./types";
import { ethers } from "ethers";

/**
 * 
 * Transaction cases
 * sending native token - achieved
 * sending erc20 tokens
 * calling an external smart contract function
 * 
 * TODO: Differentiate between such calls and generate transaction data
 */

declare global {
    interface Window {
        ethereum?: any
    }
}

export class BatchTransaction {
    provider: ethers.Provider | null;
    signer: ethers.Signer | null;

    constructor() {
        this.provider = null;
        this.signer = null;
    }

    async setup(initialize?: Initializer): Promise<boolean> {
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

    async executeEthBatch(batchData: EthBatch[]): Promise<string> {
        if (!this.signer || !this.provider) {
            return "Either provider or signer not set"
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
        const txn = await batchContract.batchTransfer(recipients, amounts, { value: ethers.parseEther("110") });
        console.log("Transaction ", txn);
        console.log(await this.provider.getBalance(await this.signer.getAddress()),
            await this.provider.getBalance(recipients[0]),
            await this.provider.getBalance(recipients[1])
        );
        return await this.signer.getAddress();
    }

    async executeERC20Batch() {

    }

    estimateBatchGas = async (transactions: Transaction[]) => {

    }
}