// module to execute batch transactions
import { batch_contract_abi } from "./abi/BatchContract.abi";
import { abi } from "./abi/BatchTransferContract.abi";
import { Token_abi } from "./abi/Token.abi";
import { BATCH_ADDRESS, BATCH_CONTRACT_ADDRESS, PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS } from "./constants";
import { BatchTransactionInterface, Initializer, TokenDistribution, Transaction } from "./types";
import { ethers, parseEther } from "ethers";

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
    batchContractAddress: string;
    batchContractAbi: any;

    constructor(batchContractAddress?: string, batchContractAbi?: any) {
        this.provider = null;
        this.signer = null;
        this.batchContractAddress = batchContractAddress ? batchContractAddress : BATCH_CONTRACT_ADDRESS;
        if (batchContractAddress) {
            if (!batchContractAbi)
                throw Error("Provide ABI for the batch contract, else use default");
            this.batchContractAbi = batchContractAbi;
        } else {
            this.batchContractAbi = abi;
        }
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
                        console.error("Error: Must send Provider with Private Key");
                        return false;
                    }
                    this.signer = new ethers.Wallet(initialize.private_key, initialize.provider);
                    this.provider = initialize.provider;
                } else if (initialize.provider) {
                    console.error("Cannot send only provider. Send either a Private key or Signer as well");
                    return false;
                }
                return true;
            } else if (window?.ethereum) { // browser environment
                const provider = new ethers.BrowserProvider(window.ethereum);
                this.signer = await provider.getSigner();
                this.provider = this.signer.provider;
                return true;
            } else {
                console.error("Error: In node environment send Params of Signer or Private Key and Provider");
                return false;
            }
        } catch (error: any) {
            throw Error(error);
        }
    }

    // create your own batch contract which will execute the transactions of other batch contracts.
    // by this we can execute any transasction in any order be it eth transfer, erc20 transfer or some contract call
    async executeBatch(batchTxn: BatchTransactionInterface[]): Promise<string> {
        if (!this.signer || !this.provider) {
            return "Either provider or signer not set"
        }
        let tokenDistribution: TokenDistribution = {
            native: {
                recipients: [],
                amounts: []
            },
            erc20: {
                recipients: [],
                amounts: [],
                tokenAddresses: []
            }
        }
        let totalNativeAmt = BigInt(0);
        for (let txnData of batchTxn) {
            if (txnData.token === ethers.ZeroAddress || !txnData.token) {
                tokenDistribution.native.recipients.push(txnData.recipient);
                tokenDistribution.native.amounts.push(parseEther(txnData.amount));
                totalNativeAmt += parseEther(txnData.amount);
            } else {
                tokenDistribution.erc20.recipients.push(txnData.recipient);
                tokenDistribution.erc20.amounts.push(BigInt(txnData.amount));
                tokenDistribution.erc20.tokenAddresses.push(txnData.token);
            }
        }
        const batchContract = new ethers.Contract(this.batchContractAddress, this.batchContractAbi, this.signer);
        const ethTxnData = await batchContract.batchTransfer.populateTransaction(
            tokenDistribution.native.recipients,
            tokenDistribution.native.amounts,
            { value: totalNativeAmt }
        );

        const erc20TxnData = await batchContract.batchTransferMultiTokens.populateTransaction(
            tokenDistribution.erc20.tokenAddresses,
            tokenDistribution.erc20.recipients,
            tokenDistribution.erc20.amounts, 
            {value: BigInt(0)}
        );

        console.log({
            "ETH Transaction Data": ethTxnData,
            "ERC20 TransactionData": erc20TxnData
        });

        const batch = new ethers.Contract(BATCH_ADDRESS, batch_contract_abi, this.signer);

        let payloadData = [];
        let to = [];
        let values = [];
        let totalValue = BigInt(0);
        for (let data of [erc20TxnData]) {
            payloadData.push(data.data);
            to.push(data.to);
            values.push(data.value);
            totalValue += data.value ? data.value : BigInt(0);
        }
        console.log(payloadData, to, values);

        // const txn = await batch.sendBatchTransactions(
        //     payloadData,
        //     to,
        //     values,
        //     { value: totalValue }
        // );
        // const txn = await this.signer.sendTransaction({
        //     to: BATCH_ADDRESS,
        //     data: temp,
        //     value: txnData.value
        // });
        console.log(tokenDistribution.erc20.tokenAddresses, tokenDistribution.erc20.recipients, tokenDistribution.erc20.amounts)
        const txn = await batchContract.batchTransferMultiTokens(tokenDistribution.erc20.tokenAddresses, tokenDistribution.erc20.recipients, tokenDistribution.erc20.amounts, {gasLimit: 3000000});
        console.log("Transaction ", txn);
        console.table({
            "account0": (await this.provider.getBalance(await this.signer.getAddress())).toString(),
            "account1": (await this.provider.getBalance("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")).toString(),
            "account2": (await this.provider.getBalance("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")).toString()
        }
        );
        return await this.signer.getAddress();
    }

    async executeBatchErc20(addresses: string[], amounts: string[], token: string) {

    }

    async estimateBatchGas(transactions: Transaction[]) {

    }

    private async fetchContractABI(contractAddress: string) {
        try {

        } catch (e) {

        }
    }

    async getBalance(address: string, token_address?: string) {
        const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, Token_abi, this.provider);
        const tokenBalance = await tokenContract.balanceOf(address);
        return tokenBalance;
    }

}