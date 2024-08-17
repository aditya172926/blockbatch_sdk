# Interface: BatchData

Raw Transaction request from the user to be processed into batch transactions

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `amount` | `string` | Amount of either ETH or ERC20 to send to recipient | [types.ts:28](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L28) |
| `recipient` | `string` | Address of the recipient of either ETH or ERC20 tokens | [types.ts:25](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L25) |
| `tokenAddress?` | `string` | Address of ERC20 token to transfer to recipient. If not provided, the transaction will be considered for transfering ETH | [types.ts:31](https://github.com/aditya172926/blockbatch_sdk/blob/a5dca5c82410ff4ac5e2011d910300ee9e4569fa/src/types.ts#L31) |
