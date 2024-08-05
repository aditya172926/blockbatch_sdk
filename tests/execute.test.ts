import { ethers } from "ethers";
import { PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS } from "../src/constants";
import { BatchTransaction } from "../src/execute";
import { ERC20Batch, EthBatch } from "../src/types";

async function initBatchSDK() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signer = await provider.getSigner();
    const batchsdk = new BatchTransaction();
    const res = await batchsdk.init({
        signer
    });
    return batchsdk;
}

describe("init", () => {
    const wallet = new ethers.Wallet(PRIVATE_KEY);
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

    test("sending provider-less signer, should throw error", async () => {
        const batch = new BatchTransaction();
        expect(batch.init({ signer: wallet })).rejects.toThrow("Provider not found in Signer or Params");
    });

    test("sending only private key, throw error", async () => {
        const batch = new BatchTransaction();
        expect(batch.init({ private_key: PRIVATE_KEY })).rejects.toThrow("Provider not found. Send Provider object with Private Key");
    });

    test("sending only provider, should throw error", async () => {
        const batch = new BatchTransaction();
        expect(batch.init({ provider })).rejects.toThrow("Cannot send only provider. Send either a Private key or Signer as well");
    });

    test("sending no initializers, should throw an error in Node env", async () => {
        const batch = new BatchTransaction();
        expect(batch.init()).rejects.toThrow("ReferenceError: window is not defined");
    });

    test("sending private key & provider, return true", async () => {
        const batch = new BatchTransaction();
        expect(batch.init({ private_key: PRIVATE_KEY, provider })).resolves.toBe(true);
    });

    test("sending signer & provider, return true", async () => {
        const batch = new BatchTransaction();
        expect(batch.init({ signer: wallet, provider })).resolves.toBe(true);
    });
});

describe("executeEthBatch", () => {
    const ethBatch: EthBatch[] = [
        {
            recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            amount: "10"
        },
        {
            recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            amount: "100"
        }
    ]

    test('should return TransactionResponse on successful ETH transfer', async () => {
        const batchsdk = await initBatchSDK();
        expect(batchsdk.executeEthBatch(ethBatch)).resolves.toBeInstanceOf(ethers.TransactionResponse);
    });

    test("throw error without initializing SDK", async() => {
        const batchsdk = new BatchTransaction();
        expect(batchsdk.executeEthBatch(ethBatch)).rejects.toThrow("SDK not initialized properly. Call init() method");
    });

    test("throw error if invalid recipient address provided", async() => {
        const mockETHBatch: EthBatch[] =  [
            {
                recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293Be",
                amount: "10",
            },
            {
                recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                amount: "100",
            }
        ]; 
        const batchsdk = await initBatchSDK();
        expect(batchsdk.executeEthBatch(mockETHBatch)).rejects.toThrow("Invalid recipient address provided 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293Be");
    });


});

describe("executeERC20Batch", () => {
    const erc20Batch: ERC20Batch[] =  [
        {
            recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
            amount: "10",
            tokenAddress: TOKEN_CONTRACT_ADDRESS
        },
        {
            recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            amount: "100",
            tokenAddress: TOKEN_CONTRACT_ADDRESS
        }
    ];

    test('should return TransactionResponse on successful ERC20 token transfer', async() => {
        const batchsdk = await initBatchSDK();
        expect(batchsdk.executeERC20Batch(erc20Batch)).resolves.toBeInstanceOf(ethers.TransactionResponse);
    });

    test("throw error without initializing SDK", async() => {
        const batchsdk = new BatchTransaction();
        expect(batchsdk.executeERC20Batch(erc20Batch)).rejects.toThrow("SDK not initialized properly. Call init() method");
    });

    test("throw error if invalid recipient address provided", async() => {
        const mockErc20Batch: ERC20Batch[] =  [
            {
                recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293Be",
                amount: "10",
                tokenAddress: TOKEN_CONTRACT_ADDRESS
            },
            {
                recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                amount: "100",
                tokenAddress: TOKEN_CONTRACT_ADDRESS
            }
        ];
        const batchsdk = await initBatchSDK();
        expect(batchsdk.executeERC20Batch(mockErc20Batch)).rejects.toThrow("Invalid recipient address provided 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293Be");
    });
});