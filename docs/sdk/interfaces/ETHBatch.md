# Interface: ETHBatch

Batch of all transactions for transfering ETH to recipients

## Extended by

- [`ERC20Batch`](ERC20Batch.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `amounts` | `BigInt`[] | Corresponding ETH/ERC20 amount to send to each recipient | [types.ts:40](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/types.ts#L40) |
| `recipients` | `string`[] | Array of addresses for recipients of ETH | [types.ts:37](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/types.ts#L37) |
