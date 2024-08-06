[**sdk v1.0.2**](../index.md) • **Docs**

***

# Class: BatchTransaction

## Constructors

### new BatchTransaction()

> **new BatchTransaction**(): [`BatchTransaction`](BatchTransaction.md)

#### Returns

[`BatchTransaction`](BatchTransaction.md)

#### Defined in

[execute.ts:20](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L20)

## Properties

### batchContract

> **batchContract**: `null` \| `Contract`

#### Defined in

[execute.ts:18](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L18)

***

### batchProcessingContract

> **batchProcessingContract**: `null` \| `Contract`

#### Defined in

[execute.ts:17](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L17)

***

### provider

> **provider**: `null` \| `Provider`

#### Defined in

[execute.ts:15](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L15)

***

### signer

> **signer**: `null` \| `Signer`

#### Defined in

[execute.ts:16](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L16)

## Methods

### executeERC20Batch()

> **executeERC20Batch**(`erc20Batch`, `allowanceAmount`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **erc20Batch**: [`ERC20Batch`](../interfaces/ERC20Batch.md)

• **allowanceAmount**: [`TokenAllowance`](../interfaces/TokenAllowance.md)

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[execute.ts:192](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L192)

***

### executeEthBatch()

> **executeEthBatch**(`ethBatch`, `totalEthAmount`): `Promise`\<`ContractTransaction`\>

#### Parameters

• **ethBatch**: [`ETHBatch`](../interfaces/ETHBatch.md)

• **totalEthAmount**: `BigInt`

#### Returns

`Promise`\<`ContractTransaction`\>

#### Defined in

[execute.ts:178](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L178)

***

### init()

> **init**(`initialize`?): `Promise`\<`boolean`\>

#### Parameters

• **initialize?**: [`Initializer`](../interfaces/Initializer.md)

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[execute.ts:27](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L27)

***

### processBatchTransactions()

> **processBatchTransactions**(`batchData`, `gasPrice`): `Promise`\<[`InvalidTransactions`](../interfaces/InvalidTransactions.md)[] \| `object`\>

#### Parameters

• **batchData**: [`BatchData`](../interfaces/BatchData.md)[]

• **gasPrice**: `null` \| `bigint` = `null`

#### Returns

`Promise`\<[`InvalidTransactions`](../interfaces/InvalidTransactions.md)[] \| `object`\>

#### Defined in

[execute.ts:75](https://github.com/aditya172926/batching_eth/blob/10726dea18f0dc502053946db34a4d893b011b64/src/execute.ts#L75)
