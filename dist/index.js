"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BatchTransaction: () => BatchTransaction
});
module.exports = __toCommonJS(src_exports);

// src/execute.ts
var import_ethers = require("ethers");

// src/abi/BatchContract.abi.ts
var BATCH_CONTRACT_ABI = [
  {
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "bytes[]",
        "name": "data",
        "type": "bytes[]"
      },
      {
        "internalType": "address[]",
        "name": "to",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "value",
        "type": "uint256[]"
      }
    ],
    "name": "sendBatchTransactions",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

// src/abi/BatchTransferContract.abi.ts
var BATCH_PROCESS_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "toAddress",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "recipientAmount",
        "type": "uint256[]"
      }
    ],
    "name": "BatchTransfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "tokenAddress",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "tokenRecipientAddress",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "tokenAmount",
        "type": "uint256[]"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "amount",
        "type": "uint256[]"
      }
    ],
    "name": "BatchTransferCombinedMultiTokens",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "tokenAddress",
        "type": "address[]"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "toAddress",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "recipientAmount",
        "type": "uint256[]"
      }
    ],
    "name": "BatchTransferMultiToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "toAddress",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "recipientAmount",
        "type": "uint256[]"
      }
    ],
    "name": "BatchTransferToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address[]",
        "name": "toAddress",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "recipientAmount",
        "type": "uint256[]"
      }
    ],
    "name": "SimpleBatchTransferToken",
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "name": "batchTransfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "tokenAddress",
        "type": "address[]"
      },
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "batchTransferMultiTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "name": "simpleBatchTransferToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// src/abi/Token.abi.ts
var erc20Abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "initialSupply",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// src/constants.ts
var BATCH_PROCESS_CONTRACT_ADDRESS = "0x7FD154df41ec41336A86Ee53a3F7Fe886E80Efc7";
var BATCH_CONTRACT_ADDRESS = "0xb8cBB6a9965A851Dcb88Bb1734231c531a0bcdF1";
var DEFAULT_GAS_LIMIT = 3e5;

// src/execute.ts
var BatchTransaction = class {
  provider;
  signer;
  batchProcessingContract;
  batchContract;
  constructor() {
    this.provider = null;
    this.signer = null;
    this.batchProcessingContract = null;
    this.batchContract = null;
  }
  async init(initialize) {
    const setup = await this.setup(initialize);
    if (setup) {
      this.batchProcessingContract = new import_ethers.ethers.Contract(BATCH_PROCESS_CONTRACT_ADDRESS, BATCH_PROCESS_ABI, this.signer);
      this.batchContract = new import_ethers.ethers.Contract(BATCH_CONTRACT_ADDRESS, BATCH_CONTRACT_ABI, this.signer);
      return true;
    }
    return false;
  }
  async setup(initialize) {
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
          this.signer = new import_ethers.ethers.Wallet(initialize.private_key, initialize.provider);
          this.provider = initialize.provider;
        } else if (initialize.provider) {
          throw new Error("Cannot send only provider. Send either a Private key or Signer as well");
        }
        return true;
      } else if (window) {
        if (window.ethereum) {
          const provider = new import_ethers.ethers.BrowserProvider(window.ethereum);
          this.signer = await provider.getSigner();
          this.provider = this.signer.provider;
          return true;
        }
        throw new Error("No ethereum object found in browser window");
      } else {
        throw new Error("In node environment send Params of Signer or Private Key and Provider");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async processBatchTransactions(batchData, gasPrice = null) {
    try {
      let ethBatch = {
        recipients: [],
        amounts: []
      };
      let erc20Batch = {
        recipients: [],
        amounts: [],
        tokens: []
      };
      let totalEthAmount = BigInt(0);
      let allowanceAmount = {};
      let invalidTxns = [];
      for (let batch of batchData) {
        if (!import_ethers.ethers.isAddress(batch.recipient)) {
          invalidTxns.push({ message: `Invalid recipient address provided ${batch.recipient}`, batchData: batch });
          continue;
        }
        if (batch.tokenAddress) {
          if (!import_ethers.ethers.isAddress(batch.tokenAddress)) {
            invalidTxns.push({
              message: `Invalid token address provided ${batch.tokenAddress}`,
              batchData: batch
            });
            continue;
          }
          erc20Batch.recipients.push(batch.recipient);
          erc20Batch.amounts.push(BigInt(batch.amount));
          erc20Batch.tokens.push(batch.tokenAddress);
          if (allowanceAmount[batch.tokenAddress]) {
            allowanceAmount[batch.tokenAddress] += BigInt(batch.amount);
          } else {
            allowanceAmount[batch.tokenAddress] = BigInt(batch.amount);
          }
        } else {
          ethBatch.recipients.push(batch.recipient);
          ethBatch.amounts.push(import_ethers.ethers.parseEther(batch.amount));
          totalEthAmount += import_ethers.ethers.parseEther(batch.amount);
        }
      }
      if (ethBatch.recipients.length == 0 && erc20Batch.recipients.length == 0)
        return invalidTxns;
      let response = {
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
      let batchTxnParams = {
        data: [],
        values: [],
        to: []
      };
      if (response.erc20) {
        batchTxnParams.data.push(response.erc20.data);
        batchTxnParams.values.push(response.erc20.value ? response.erc20.value : BigInt(0));
        batchTxnParams.to.push(response.erc20.to);
        totalEthValue += response.erc20.value ? response.erc20.value : BigInt(0);
      }
      if (response.eth) {
        batchTxnParams.data.push(response.eth.data);
        batchTxnParams.values.push(response.eth.value ? response.eth.value : BigInt(0));
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
        const txn = await this.sendTransaction(txnData, gasLimit, gasPrice);
        await txn.wait();
        return { txn, invalidTxns };
      }
      throw new Error("Transaction failed. Failed to generate batch Transaction Data");
    } catch (error) {
      throw new Error(error);
    }
  }
  async executeEthBatch(ethBatch, totalEthAmount) {
    if (!this.batchProcessingContract)
      throw new Error("SDK not initialized properly. Call init() method");
    try {
      if (!this.signer || !this.provider) {
        throw new Error("Either provider or signer not set");
      }
      const txnData = await this.batchProcessingContract.batchTransfer.populateTransaction(ethBatch.recipients, ethBatch.amounts, { value: totalEthAmount });
      return txnData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async executeERC20Batch(erc20Batch, allowanceAmount) {
    if (!this.batchProcessingContract)
      throw new Error("SDK not initialized properly. Call init() method");
    try {
      for (let key in allowanceAmount) {
        const _allowance = await this.erc20Approval(key, BATCH_PROCESS_CONTRACT_ADDRESS, (0, import_ethers.toBigInt)(allowanceAmount[key]));
      }
      const spender = await this.signer?.getAddress();
      const txnData = await this.batchProcessingContract.batchTransferMultiTokens.populateTransaction(
        erc20Batch.tokens,
        erc20Batch.recipients,
        erc20Batch.amounts,
        spender
      );
      return txnData;
    } catch (error) {
      throw new Error(error);
    }
  }
  async erc20Approval(token, spender, amount) {
    try {
      const erc20Contract = new import_ethers.ethers.Contract(token, erc20Abi, this.signer);
      const _approval = await erc20Contract.approve(spender, amount);
      const address = await this.signer?.getAddress();
      const allowance = await erc20Contract.allowance(address, spender);
      return allowance;
    } catch (error) {
      throw new Error(error);
    }
  }
  async estimateBatchGas(transactionData) {
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
  async sendTransaction(transactionData, gasLimit, gasPrice) {
    try {
      const gasFees = gasPrice ? gasLimit * gasPrice : null;
      const txn = await this.signer?.sendTransaction({
        to: transactionData.to,
        data: transactionData.data,
        value: transactionData.value,
        gasLimit,
        gasPrice: gasFees
      });
      if (txn?.hash)
        return txn;
      throw new Error("Transaction Failed");
    } catch (error) {
      throw new Error(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BatchTransaction
});
