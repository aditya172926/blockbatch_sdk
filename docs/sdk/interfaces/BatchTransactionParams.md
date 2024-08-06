# Interface: BatchTransactionParams

Batched transaction params with calldata to execute all batch transactions (ETHBatch, ERC20Batch) in a single call

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `data` | `string`[] | Array of batched transaction calldata | [types.ts:12](https://github.com/aditya172926/token_batch_sdk/blob/12dc19b29cb01a1648e7086fe30b09d794a6d59d/src/types.ts#L12) |
| `to` | `string`[] | Addresses of batch smart contracts corresponding to their calldata | [types.ts:6](https://github.com/aditya172926/token_batch_sdk/blob/12dc19b29cb01a1648e7086fe30b09d794a6d59d/src/types.ts#L6) |
| `values` | `BigInt`[] | Corresponding ETH values to be sent along | [types.ts:9](https://github.com/aditya172926/token_batch_sdk/blob/12dc19b29cb01a1648e7086fe30b09d794a6d59d/src/types.ts#L9) |
