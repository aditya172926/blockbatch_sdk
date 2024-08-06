# Class: BatchTransaction

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `batchContract` | `null` \| `Contract` | Parent Batch Smart Contract Used for aggregating all different transaction batches and executing in single transaction call. | [execute.ts:39](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L39) |
| `batchProcessingContract` | `null` \| `Contract` | Batch smart contract with methods for executing Batched ETH and ERC20 transfer transactions | [execute.ts:33](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L33) |
| `provider` | `null` \| `Provider` | Provider used to interact with the network This is fetched directly if ethereum object is present in Window (being used in browser) | [execute.ts:23](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L23) |
| `signer` | `null` \| `Signer` | Signer used as runner for executing smart contracts transactions | [execute.ts:28](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L28) |

## Methods

### executeERC20Batch()

> **executeERC20Batch**(`erc20Batch`, `allowanceAmount`): `Promise`\<`ContractTransaction`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `erc20Batch` | [`ERC20Batch`](../interfaces/ERC20Batch.md) |
| `allowanceAmount` | [`TokenAllowance`](../interfaces/TokenAllowance.md) |

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[execute.ts:219](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L219)

***

### executeEthBatch()

> **executeEthBatch**(`ethBatch`, `totalEthAmount`): `Promise`\<`ContractTransaction`\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ethBatch` | [`ETHBatch`](../interfaces/ETHBatch.md) |
| `totalEthAmount` | `BigInt` |

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[execute.ts:205](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L205)

***

### init()

> **init**(`initialize`?): `Promise`\<`boolean`\>

Initializes BatchTransaction class by performing setup operations for contracts and class variables

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `initialize`? | [`Initializer`](../interfaces/Initializer.md) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[execute.ts:54](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L54)

***

### processBatchTransactions()

> **processBatchTransactions**(`batchData`, `gasPrice`): `Promise`\<[`InvalidTransactions`](../interfaces/InvalidTransactions.md)[] \| `object`\>

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `batchData` | [`BatchData`](../interfaces/BatchData.md)[] | `undefined` |
| `gasPrice` | `null` \| `bigint` | `null` |

#### Returns

`Promise`\<[`InvalidTransactions`](../interfaces/InvalidTransactions.md)[] \| `object`\>

#### Defined in

[execute.ts:102](https://github.com/aditya172926/token_batch_sdk/blob/e2d7e3905b1c77948c53f97ef3f9dfbbaf62e7d6/src/execute.ts#L102)
