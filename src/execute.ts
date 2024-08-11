import { ethers, toBigInt } from "ethers";
import { BATCH_CONTRACT_ABI } from "./abi/BatchContract.abi";
import { BATCH_PROCESS_ABI } from "./abi/BatchTransferContract.abi";
import { erc20Abi } from "./abi/Token.abi";
import { BATCH_CONTRACT_ADDRESS, BATCH_PROCESS_CONTRACT_ADDRESS, BLOCKSCOUT_EXPLORER, DEFAULT_GAS_LIMIT } from "./constants";
import { BatchData, BatchTransactionParams, ERC20Batch, ETHBatch, Initializer, InvalidTransactions, ProcessedBatch, TokenAllowance } from "./types";

declare global {
    interface Window {
        ethereum?: any
    }
}

/**
 * @hideconstructor
 */
export class BatchTransaction {
    /**
     * Provider used to interact with the network
     * This is fetched directly if ethereum object is present in Window (being used in browser)
     *
     */
    provider: ethers.Provider | null;

    /**
     * Signer used as runner for executing smart contracts transactions
     */
    signer: ethers.Signer | null;

    /**
     * Batch smart contract with methods for executing Batched ETH and ERC20 transfer transactions
     */
    batchProcessingContract: ethers.Contract | null;

    /**
     * Parent Batch Smart Contract
     * Used for aggregating all different transaction batches and executing in single transaction call.
     */
    batchContract: ethers.Contract | null;

    constructor() {
        this.provider = null;
        this.signer = null;
        this.batchProcessingContract = null;
        this.batchContract = null;
    }

    /**
     * Initializes BatchTransaction class by performing setup operations for contracts and class variables
     * 
     * @param initialize - optional in Browser if ethereum object present. Required in Node env to pass provider, signer or private key.
     * @returns true if successful
     */
    async init(initialize?: Initializer): Promise<boolean> {
        const setup = await this.setup(initialize);
        if (setup) {
            this.batchProcessingContract = new ethers.Contract(BATCH_PROCESS_CONTRACT_ADDRESS, BATCH_PROCESS_ABI, this.signer);
            this.batchContract = new ethers.Contract(BATCH_CONTRACT_ADDRESS, BATCH_CONTRACT_ABI, this.signer);
            return true;
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

    /**
     * Function to process the ETH and ERC20 batch transactions
     * 
     * @param batchData - User prepared raw transaction array of {BatchData} type
     * @param gasPrice - Optional param if you want to send current gasPrice for this transaction.
     * 
     * @returns Promise<{ txn: ethers.TransactionResponse, invalidTxns: InvalidTransactions[] } | InvalidTransactions[]>
     */
    async processBatchTransactions(
        batchData: BatchData[],
        gasPrice: bigint | null = null
    ): Promise<{ txn: ethers.TransactionResponse, invalidTxns: InvalidTransactions[], link: string|null } | InvalidTransactions[]> {
        try {
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
            let invalidTxns: InvalidTransactions[] = [];

            for (let batch of batchData) {
                if (!ethers.isAddress(batch.recipient)) {
                    invalidTxns.push({ message: `Invalid recipient address provided ${batch.recipient}`, batchData: batch });
                    continue;
                }
                if (batch.tokenAddress) { // batching erc20
                    if (!ethers.isAddress(batch.tokenAddress)) {
                        invalidTxns.push({
                            message: `Invalid token address provided ${batch.tokenAddress}`,
                            batchData: batch
                        });
                        continue;
                    }

                    erc20Batch.recipients.push(batch.recipient);
                    erc20Batch.amounts.push(BigInt(batch.amount));
                    erc20Batch.tokens.push(batch.tokenAddress);
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

            if (ethBatch.recipients.length == 0 && erc20Batch.recipients.length == 0)
                return invalidTxns;

            let response: ProcessedBatch = {
                erc20: null,
                eth: null
            };

            if (ethBatch.recipients.length > 0) {
                const ethBatchTransactionData = await this.executeEthBatch(ethBatch, totalEthAmount);
                response["eth"] = ethBatchTransactionData;
            }
            if (erc20Batch.recipients.length > 0) {
                const erc20BatchTransactionData = await this.executeERC20Batch(erc20Batch, allowanceAmount);
                response["erc20"] = erc20BatchTransactionData;
            }

            let totalEthValue = BigInt(0);
            let batchTxnParams: BatchTransactionParams = {
                data: [],
                values: [],
                to: []
            }

            if (response.erc20) {
                batchTxnParams.data.push(response.erc20.data);
                batchTxnParams.values.push(response.erc20.value ? response.erc20.value : BigInt(0))
                batchTxnParams.to.push(response.erc20.to);
                totalEthValue += response.erc20.value ? response.erc20.value : BigInt(0);
            }
            if (response.eth) {
                batchTxnParams.data.push(response.eth.data);
                batchTxnParams.values.push(response.eth.value ? response.eth.value : BigInt(0))
                batchTxnParams.to.push(response.eth.to);
                totalEthValue += response.eth.value ? response.eth.value : BigInt(0);
            }

            const txnData = await this.batchContract?.sendBatchTransactions.populateTransaction(
                batchTxnParams.data,
                batchTxnParams.to,
                batchTxnParams.values,
                { value: totalEthValue }
            );
            if (txnData) {
                const gasLimit = await this.estimateBatchGas(txnData);
                const txn = await this.sendTransaction(txnData, gasLimit, gasPrice); // this is gasPrice
                const receipt = await txn.wait();
                const link = this.getTxnLink(txn.hash);
                return { txn, invalidTxns, link };
            }
            throw new Error("Transaction failed. Failed to generate batch Transaction Data");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Function to generate transaction data of only batch transactions of ETH transfers
     *
     * @param ethBatch - takes an array of `recipients` address and corresponding array of ETH amount to transfer to each recipient
     * @param totalEthAmount - Total amount of ETH that the spender is going to transfer
     * 
     * @remarks
     * This function is called internally by `processBatchTransaction`, but is also exported from the class for the 
     * users to generate the calldata of their batch transactions to use it for their own.
     * 
     * @returns Populated ETH Batch transaction calldata of the smart contract call.
     */
    async executeEthBatch(ethBatch: ETHBatch, totalEthAmount: BigInt): Promise<ethers.ContractTransaction> {
        if (!this.batchProcessingContract)
            throw new Error("SDK not initialized properly. Call init() method");
        try {
            if (!this.signer || !this.provider) {
                throw new Error("Either provider or signer not set");
            }
            const txnData = await this.batchProcessingContract.batchTransfer.populateTransaction(ethBatch.recipients, ethBatch.amounts, { value: totalEthAmount });
            return txnData;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Function to generate transaction data of only batch transactions of ERC20 transfers
     * 
     * @param erc20Batch - takes an array of `recipients` address and corresponding array of ERC20 token address and amounts to transfer to each recipient
     * @param allowanceAmount - total `bigint` amount of respective ERC20 tokens to be approved for `batchProcessingContract` to transfer
     * 
     * @remarks
     * This function is called internally by `processBatchTransaction`, but is also exported from the class for the 
     * users to generate the calldata of their batch transactions to use it for their own.
     * 
     * @returns Populated ERC20 Batch transaction calldata of the smart contract call.
     */
    async executeERC20Batch(erc20Batch: ERC20Batch, allowanceAmount: TokenAllowance): Promise<ethers.ContractTransaction> {
        if (!this.batchProcessingContract)
            throw new Error("SDK not initialized properly. Call init() method");
        try {
            for (let key in allowanceAmount) {
                const _allowance = await this.erc20Approval(key, BATCH_PROCESS_CONTRACT_ADDRESS, toBigInt(allowanceAmount[key]));
            }

            const spender = await this.signer?.getAddress();

            const txnData = await this.batchProcessingContract.batchTransferMultiTokens.populateTransaction(
                erc20Batch.tokens,
                erc20Batch.recipients,
                erc20Batch.amounts,
                spender
            );

            return txnData;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    getTxnLink(hash?: string) {
        console.log("Transaction hash", hash);
        if (!hash)
            return null;
        return `${BLOCKSCOUT_EXPLORER}/transactions/${hash}`;
    }

    private async erc20Approval(token: string, spender: string, amount: BigInt) {
        try {
            const erc20Contract = new ethers.Contract(token, erc20Abi, this.signer);
            const _approval = await erc20Contract.approve(spender, amount);
            const address = await this.signer?.getAddress();
            const allowance = await erc20Contract.allowance(address, spender);
            return allowance;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    private async estimateBatchGas(transactionData: ethers.ContractTransaction) {
        try {
            const gasLimit = await this.signer?.estimateGas(transactionData);
            if (gasLimit) {
                return gasLimit;
            }
            throw new Error("Gas Estimation failed");
        } catch (error) {
            return BigInt(DEFAULT_GAS_LIMIT);
        }
    }

    private async sendTransaction(transactionData: ethers.ContractTransaction, gasLimit: bigint, gasPrice: bigint | null): Promise<ethers.TransactionResponse> {
        try {
            const gasFees = gasPrice ? gasLimit * gasPrice : null
            const txn = await this.signer?.sendTransaction({
                to: transactionData.to,
                data: transactionData.data,
                value: transactionData.value,
                gasLimit,
                gasPrice: gasFees
            });
            if (txn?.hash)
                return txn;
            throw new Error("Transaction Failed")
        } catch (error: any) {
            throw new Error(error);
        }
    }
}