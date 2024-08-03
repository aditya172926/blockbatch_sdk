export const abi = [
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "toAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "recipientAmount",
                "type": "uint256[]"
            }
        ],
        "name": "BatchTransfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "tokenAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "tokenRecipientAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "tokenAmount",
                "type": "uint256[]"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "amount",
                "type": "uint256[]"
            }
        ],
        "name": "BatchTransferCombinedMultiTokens",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "tokenAddress",
                "type": "address[]"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "toAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "recipientAmount",
                "type": "uint256[]"
            }
        ],
        "name": "BatchTransferMultiToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "toAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "recipientAmount",
                "type": "uint256[]"
            }
        ],
        "name": "BatchTransferToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address[]",
                "name": "toAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "recipientAmount",
                "type": "uint256[]"
            }
        ],
        "name": "SimpleBatchTransferToken",
        "type": "event"
    },
    {
        "stateMutability": "nonpayable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "batchTransfer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "tokenAddress",
                "type": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "batchTransferMultiTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "simpleBatchTransferToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]