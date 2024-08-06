[**token_batch_sdk v1.0.3**](../index.md) • **Docs**

***

# Class: BatchTransaction

## Constructors

### new BatchTransaction()

> **new BatchTransaction**(): [`BatchTransaction`](BatchTransaction.md)

#### Returns

[`BatchTransaction`](BatchTransaction.md)

#### Defined in

[execute.ts:20](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L20)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| `batchContract` | `null` \| `Contract` | [execute.ts:18](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L18) |
| `batchProcessingContract` | `null` \| `Contract` | [execute.ts:17](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L17) |
| `provider` | `null` \| `Provider` | [execute.ts:15](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L15) |
| `signer` | `null` \| `Signer` | [execute.ts:16](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L16) |

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

[execute.ts:216](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L216)

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

[execute.ts:202](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L202)

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

[execute.ts:51](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L51)

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

[execute.ts:99](https://github.com/aditya172926/token_batch_sdk/blob/31ad48448e12602e3d1d599287f9584562d727a8/src/execute.ts#L99)
