# Interface: ProcessedBatch

Contains transaction data of all processed ETH batch transactions and ERC20 batch transactions

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `erc20` | `null` \| `ContractTransaction` | Transaction calldata for all valid ERC20 batch transactions | [types.ts:57](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L57) |
| `eth` | `null` \| `ContractTransaction` | Transaction calldata for all valid ETH batch transactions | [types.ts:60](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L60) |
