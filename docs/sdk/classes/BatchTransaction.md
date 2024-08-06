# Class: BatchTransaction

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `batchContract` | `null` \| `Contract` | Parent Batch Smart Contract Used for aggregating all different transaction batches and executing in single transaction call. | [execute.ts:39](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L39) |
| `batchProcessingContract` | `null` \| `Contract` | Batch smart contract with methods for executing Batched ETH and ERC20 transfer transactions | [execute.ts:33](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L33) |
| `provider` | `null` \| `Provider` | Provider used to interact with the network This is fetched directly if ethereum object is present in Window (being used in browser) | [execute.ts:23](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L23) |
| `signer` | `null` \| `Signer` | Signer used as runner for executing smart contracts transactions | [execute.ts:28](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L28) |

## Methods

### executeERC20Batch()

> **executeERC20Batch**(`erc20Batch`, `allowanceAmount`): `Promise`\<`ContractTransaction`\>

Function to generate transaction data of only batch transactions of ERC20 transfers

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`erc20Batch`

</td>
<td>

[`ERC20Batch`](../interfaces/ERC20Batch.md)

</td>
<td>

takes an array of `recipients` address and corresponding array of ERC20 token address and amounts to transfer to each recipient

</td>
</tr>
<tr>
<td>

`allowanceAmount`

</td>
<td>

[`TokenAllowance`](../interfaces/TokenAllowance.md)

</td>
<td>

total `bigint` amount of respective ERC20 tokens to be approved for `batchProcessingContract` to transfer

</td>
</tr>
</table>

#### Returns

`Promise`\<`ContractTransaction`\>

Populated ERC20 Batch transaction calldata of the smart contract call.

#### Remarks

This function is called internally by `processBatchTransaction`, but is also exported from the class for the 
users to generate the calldata of their batch transactions to use it for their own.

#### Defined in

[execute.ts:251](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L251)

***

### executeEthBatch()

> **executeEthBatch**(`ethBatch`, `totalEthAmount`): `Promise`\<`ContractTransaction`\>

Function to generate transaction data of only batch transactions of ETH transfers

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`ethBatch`

</td>
<td>

[`ETHBatch`](../interfaces/ETHBatch.md)

</td>
<td>

takes an array of `recipients` address and corresponding array of ETH amount to transfer to each recipient

</td>
</tr>
<tr>
<td>

`totalEthAmount`

</td>
<td>

`BigInt`

</td>
<td>

Total amount of ETH that the spender is going to transfer

</td>
</tr>
</table>

#### Returns

`Promise`\<`ContractTransaction`\>

Populated ETH Batch transaction calldata of the smart contract call.

#### Remarks

This function is called internally by `processBatchTransaction`, but is also exported from the class for the 
users to generate the calldata of their batch transactions to use it for their own.

#### Defined in

[execute.ts:225](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L225)

***

### init()

> **init**(`initialize`?): `Promise`\<`boolean`\>

Initializes BatchTransaction class by performing setup operations for contracts and class variables

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`initialize`?

</td>
<td>

[`Initializer`](../interfaces/Initializer.md)

</td>
<td>

optional in Browser if ethereum object present. Required in Node env to pass provider, signer or private key.

</td>
</tr>
</table>

#### Returns

`Promise`\<`boolean`\>

true if successful

#### Defined in

[execute.ts:54](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L54)

***

### processBatchTransactions()

> **processBatchTransactions**(`batchData`, `gasPrice`): `Promise`\<[`InvalidTransactions`](../interfaces/InvalidTransactions.md)[] \| `object`\>

Function to process the ETH and ERC20 batch transactions

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`batchData`

</td>
<td>

[`BatchData`](../interfaces/BatchData.md)[]

</td>
<td>

`undefined`

</td>
<td>

User prepared raw transaction array of {BatchData} type

</td>
</tr>
<tr>
<td>

`gasPrice`

</td>
<td>

`null` \| `bigint`

</td>
<td>

`null`

</td>
<td>

Optional param if you want to send current gasPrice for this transaction.

</td>
</tr>
</table>

#### Returns

`Promise`\<[`InvalidTransactions`](../interfaces/InvalidTransactions.md)[] \| `object`\>

Promise<{ txn: ethers.TransactionResponse, invalidTxns: InvalidTransactions[] } | InvalidTransactions[]>

#### Defined in

[execute.ts:110](https://github.com/aditya172926/token_batch_sdk/blob/61a8d4c29abe90e525e3ce490e931163b1571636/src/execute.ts#L110)
