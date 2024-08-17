# Interface: ERC20Batch

Batch of all transactions for transfering ETH to recipients

## Extends

- [`ETHBatch`](ETHBatch.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `amounts` | `BigInt`[] | Corresponding ETH/ERC20 amount to send to each recipient | [`ETHBatch`](ETHBatch.md).[`amounts`](ETHBatch.md#amounts) | [types.ts:40](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L40) |
| `recipients` | `string`[] | Array of addresses for recipients of ETH | [`ETHBatch`](ETHBatch.md).[`recipients`](ETHBatch.md#recipients) | [types.ts:37](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L37) |
| `tokens` | `string`[] | Array of ERC20 token addresses for transferring to each recipient | - | [types.ts:46](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L46) |
