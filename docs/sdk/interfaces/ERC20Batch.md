# Interface: ERC20Batch

Batch of all transactions for transfering ETH to recipients

## Extends

- [`ETHBatch`](ETHBatch.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `amounts` | `BigInt`[] | Corresponding ETH/ERC20 amount to send to each recipient | [`ETHBatch`](ETHBatch.md).[`amounts`](ETHBatch.md#amounts) | [types.ts:40](https://github.com/aditya172926/token_batch_sdk/blob/4adbc6256382134095165b51ba9b1c8ebc21e466/src/types.ts#L40) |
| `recipients` | `string`[] | Array of addresses for recipients of ETH | [`ETHBatch`](ETHBatch.md).[`recipients`](ETHBatch.md#recipients) | [types.ts:37](https://github.com/aditya172926/token_batch_sdk/blob/4adbc6256382134095165b51ba9b1c8ebc21e466/src/types.ts#L37) |
| `tokens` | `string`[] | Array of ERC20 token addresses for transferring to each recipient | - | [types.ts:46](https://github.com/aditya172926/token_batch_sdk/blob/4adbc6256382134095165b51ba9b1c8ebc21e466/src/types.ts#L46) |
