# Token Batch SDK

Token Batch SDK is used for sending multiple ETH and ERC20 tokens in a single Batch Transaction.

## Docs
Read further about SDK classes and methods [here](https://token-batch-sdk.vercel.app/)

## Installation
```
npm i token_batch_sdk
```

## Import
Sample use of the SDK

```
import { BatchTransaction } from "token_batch_sdk";

const batchSender = new BatchTransaction();
const init = await batchSender.init();
```

## Sending Batch Transaction

### Creating ETH Batch data
To create a batch transaction data for just ETH transfers, provide the `recipient` address and `amount` to transfer, without any `tokenAddress`.

```
// ETH transactions
const batchData: BatchData[] = [
    {
      recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      amount: "0.01"
    },
    {
      recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      amount: "0.02"
    },
]
```

If `tokenAddress` is provided the transaction is going to be considered for ERC20 batch by the SDK.

```
// ERC20 transactions
const batchData: BatchData[] = [
      {
        recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        amount: "1000000",
        tokenAddress: "0x857616Fbc511212A2a848dA64B4fC3b9678af6F9"
      },
      {
        recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        amount: "10",
        tokenAddress: "0x857616Fbc511212A2a848dA64B4fC3b9678af6F9"
      }
  ];
```

You can add all of your ETH/ERC20 transactions in a single BatchData array. The SDK handles to process them in a single batch internally.
```
// ERC20 transactions
const batchData: BatchData[] = [
      // ETH transaction
      {
        recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        amount: "0.01",
      },
      // ERC20 transaction
      {
        recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        amount: "10",
        tokenAddress: "0x857616Fbc511212A2a848dA64B4fC3b9678af6F9"
      }
  ];
```

Call the `processBatchTransactions()` and pass it the batchData to execute the transactions prepared.
```
const response = await batch.processBatchTransactions(batchData);
console.log(`Transaction response ${response?.txn}`);
```

> The `response` object can contain data of the type of `{ txn: ethers.TransactionResponse, invalidTxns: InvalidTransactions[] }` or just `InvalidTransactions[]`. The invalid transactions array contains the data of those transactions in the processed batch which are invalid.
So even if 3 out of 10 transactions might have error in them, the valid 7 transactions will execute.

## System Support

The SDK will support both client-side and backend integrations depending on the arguments provided to the `batchSender.init()` function.

If the **browser** window contains the `ethereum` object, meaning if your browser contains a wallet extension like **Metamask**, then you don't have to provide any arguments to `batchSender.init()` function.
You will be prompted to connect your account internally via the SDK.

If you are already connected to your wallet in your dapp, to prevent the above behaviour of the SDK, pass either the `signer` object or `private_key` (along with `provider`) to `batchSender.init()`.

Example: If dapp already has signer - 
```
const signer: ethers.Signer = {...}; // signer object
await batchSender.init(signer);
```

Or `private key` along with `provider`
```
const provider: ethers.JSONRpcProvider = {...}; // provider object
const PRIVATE_KEY = "0x..."
await batchSender.init(PRIVATE_KEY, provider);
```

The above example code snippets are the only way to use SDK in a **Node (backend)** environment.

## Constants
- Batch Transfer Contract - 0x7FD154df41ec41336A86Ee53a3F7Fe886E80Efc7
- Parent Batching Contract - 0xb8cBB6a9965A851Dcb88Bb1734231c531a0bcdF1

Smart Contracts are deployed on Ethereum Sepolia Testnet