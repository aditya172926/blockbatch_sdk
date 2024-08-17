# BlockBatch SDK

BlockBatch SDK is used for sending multiple ETH and ERC20 tokens in a single Batch Transaction.

## Docs
Read further about SDK classes and methods [here](https://token-batch-sdk.vercel.app/)

## Demo
Try out the SDK demo in this [code sandbox](https://codesandbox.io/p/github/aditya172926/sdk_example/main?import=true&layout=%257B%2522sidebarPanel%2522%253A%2522GIT%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clzppn85900063j6q2lleb0ja%2522%252C%2522sizes%2522%253A%255B27.626386652716576%252C72.37361334728342%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clzppn85800023j6q3o78wap3%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clzppn85800043j6qeb9ghg1j%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clzppn85800053j6qwbpdytsd%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clzppn85800023j6q3o78wap3%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clzppn85700013j6qsb0m1hpa%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522clzppn85800023j6q3o78wap3%2522%252C%2522activeTabId%2522%253A%2522clzppn85700013j6qsb0m1hpa%2522%257D%252C%2522clzppn85800053j6qwbpdytsd%2522%253A%257B%2522id%2522%253A%2522clzppn85800053j6qwbpdytsd%2522%252C%2522activeTabId%2522%253A%2522clzppr7v000si3j6qq23wpesv%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A2222%252C%2522id%2522%253A%2522clzppnejs004d3j6qmzep4crt%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%2522%257D%252C%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522clzppr7v000si3j6qq23wpesv%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522clzppn85800043j6qeb9ghg1j%2522%253A%257B%2522id%2522%253A%2522clzppn85800043j6qeb9ghg1j%2522%252C%2522activeTabId%2522%253A%2522clzppnamf003b3j6qipfesh8y%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clzppn85800033j6q1mqoqfhj%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clzppn65m000qdbi6esll7n2d%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clzppnamf003b3j6qipfesh8y%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522CSB_RUN_OUTSIDE_CONTAINER%253D1%2520devcontainer%2520templates%2520apply%2520--template-id%2520%255C%2522ghcr.io%252Fdevcontainers%252Ftemplates%252Ftypescript-node%255C%2522%2520--template-args%2520%27%257B%257D%27%2520--features%2520%27%255B%255D%27%2522%252C%2522id%2522%253A%2522clzppolgw008j3j6q475ciuve%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Installation
```
npm i blockbatch
```

## Import
Sample use of the SDK

```
import { BatchTransaction } from "blockbatch";

const batchSender = new BatchTransaction();
const init = await batchSender.init();
```

## Sending Batch Transaction

### Creating ETH/ERC20 Batch data
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

> [!IMPORTANT]
Users should understand the type of amount they are passing for the transaction in the batch.
Amount of ETH passed in `BatchData` has the unit of `ether` and not `wei` or `gwei`.
And the amount of ERC20 tokens to send should be formatted according to the number of decimals that token has.
Example - Amount 10 in ETH batch means sending **10 ether**.
Amount 10 in ERC20 batch means sending **10\*(1e(-18)) ERC20 tokens**. (ERC20 tokens have 18 decimal places by default).

Call the `processBatchTransactions()` and pass it the batchData to execute the transactions prepared.
```
const response = await batch.processBatchTransactions(batchData);
console.log(`Transaction response ${response?.txn}`);
```
> [!NOTE]
 The `response` object can contain data of the type of `{ txn: ethers.TransactionResponse, invalidTxns: InvalidTransactions[] }` or just `InvalidTransactions[]`. The invalid transactions array contains the data of those transactions in the processed batch which are invalid.
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

> [!WARNING]
Its always better to not share your private key. The SDK doesn't store any of the keys. It will always be better to use the `signer` object generated and passed in the SDK (if required).

## Constants
- Batch Transfer Contract - 0x7FD154df41ec41336A86Ee53a3F7Fe886E80Efc7
- Parent Batching Contract - 0xb8cBB6a9965A851Dcb88Bb1734231c531a0bcdF1

Smart Contracts used Repository - https://github.com/aditya172926/batching_eth_contract

Smart Contracts are deployed on Ethereum Sepolia Testnet

## Smart contracts

Verified on Blockscout

- BatchContract.sol: [0x909e24D7e79F45937705e8A8899aa52255bB3E1F](https://optimism-sepolia.blockscout.com/address/0x909e24D7e79F45937705e8A8899aa52255bB3E1F#code)
- BatchTransferContract: [0xd7aeb1fCACBC7fc2C34A27d71B61DbBe043aC97E](https://optimism-sepolia.blockscout.com/address/0xd7aeb1fCACBC7fc2C34A27d71B61DbBe043aC97E#code)
- Token Contract: [0xb65aA0c58B7F0Cd8D07fba21A2daDC8667326629](https://optimism-sepolia.blockscout.com/address/0xb65aA0c58B7F0Cd8D07fba21A2daDC8667326629#code)

## Classes

- [BatchTransaction](classes/BatchTransaction.md)

## Interfaces

- [BatchData](interfaces/BatchData.md)
- [BatchTransactionParams](interfaces/BatchTransactionParams.md)
- [ERC20Batch](interfaces/ERC20Batch.md)
- [ETHBatch](interfaces/ETHBatch.md)
- [Initializer](interfaces/Initializer.md)
- [InvalidTransactions](interfaces/InvalidTransactions.md)
- [ProcessedBatch](interfaces/ProcessedBatch.md)
- [TokenAllowance](interfaces/TokenAllowance.md)
