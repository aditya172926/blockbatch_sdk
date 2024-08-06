# Token Batch SDK

Token Batch SDK is used for sending multiple ETH and ERC20 tokens in a single Batch Transaction.

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
```
const batchData: BatchData[] = [
      {
        recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        amount: "0.01"
      },
      {
        recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        amount: "10",
        tokenAddress: "0x857616Fbc511212A2a848dA64B4fC3b9678af6F9"
      }
    ];
const txn = await batch.processBatchTransactions(batchData);
```

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