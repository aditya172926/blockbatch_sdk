export const BATCH_CONTRACT_ABI = [
    {
        "stateMutability": "nonpayable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "internalType": "bytes[]",
                "name": "data",
                "type": "bytes[]"
            },
            {
                "internalType": "address[]",
                "name": "to",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "value",
                "type": "uint256[]"
            }
        ],
        "name": "sendBatchTransactions",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]