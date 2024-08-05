import { ethers } from "ethers";
import { PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS } from "../src/constants";
import { BatchTransaction } from "../src/execute";
import { ERC20Batch, EthBatch } from "../src/types";

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

    test('should return TransactionResponse', async () => {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const signer = await provider.getSigner();
        const batchTxn = new BatchTransaction();
        const res = await batchTxn.init({
            signer
        });
        console.log(res);
        expect(batchTxn.executeEthBatch(ethBatch)).resolves.toBeInstanceOf(ethers.TransactionResponse);
    })
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
    ]
    test('should return TransactionResponse', async() => {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const signer = await provider.getSigner();
        const batchTxn = new BatchTransaction();
        const res = await batchTxn.init({
            signer
        });
        expect(batchTxn.executeERC20Batch(erc20Batch)).resolves.toBeInstanceOf(ethers.TransactionResponse);
    });

    test("throw error without initializing SDK", async() => {
        const batchTxn = new BatchTransaction();
        await expect(batchTxn.executeERC20Batch(erc20Batch)).rejects.toThrow("SDK not initialized properly. Call init() method");
    })
});