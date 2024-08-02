// module to execute batch transactions
import { Transaction } from "./types";
import constant from "./constants";
import { ethers } from "ethers";

/**
 * 
 * Transaction cases
 * sending native token
 * sending erc20 tokens
 * calling an external smart contract function
 * 
 * TODO: Differentiate between such calls and generate transaction data
 */
export const executeBatch = async(transactions: Transaction[]): Promise<string> => {
    
}

export const estimateBatchGas = async(transactions: Transaction[]) => {

}