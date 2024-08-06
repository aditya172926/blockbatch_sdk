# Interface: ProcessedBatch

Contains transaction data of all processed ETH batch transactions and ERC20 batch transactions

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `erc20` | `null` \| `ContractTransaction` | Transaction calldata for all valid ERC20 batch transactions | [types.ts:57](https://github.com/aditya172926/token_batch_sdk/blob/12dc19b29cb01a1648e7086fe30b09d794a6d59d/src/types.ts#L57) |
| `eth` | `null` \| `ContractTransaction` | Transaction calldata for all valid ETH batch transactions | [types.ts:60](https://github.com/aditya172926/token_batch_sdk/blob/12dc19b29cb01a1648e7086fe30b09d794a6d59d/src/types.ts#L60) |
