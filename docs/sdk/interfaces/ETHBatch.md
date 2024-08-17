# Interface: ETHBatch

Batch of all transactions for transfering ETH to recipients

## Extended by

- [`ERC20Batch`](ERC20Batch.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `amounts` | `BigInt`[] | Corresponding ETH/ERC20 amount to send to each recipient | [types.ts:40](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L40) |
| `recipients` | `string`[] | Array of addresses for recipients of ETH | [types.ts:37](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L37) |
