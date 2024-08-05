import { ethers } from "ethers";
import { PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS } from "../src/constants";
import { BatchTransaction } from "../src/execute";
import { ERC20Batch, EthBatch } from "../src/types";

describe("init", () => {
    const wallet = new ethers.Wallet(PRIVATE_KEY);
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    test("sending provider-less signer, should return false", async () => {
        const batch = new BatchTransaction();
        expect(await batch.init({ signer: wallet })).toBe(false);
    });

    test("sending only private key, return false", async () => {
        const batch = new BatchTransaction();
        expect(await batch.init({ private_key: PRIVATE_KEY })).toBe(false);
    });

    test("sending only provider, return false", async () => {
        const batch = new BatchTransaction();
        expect(await batch.init({ provider })).toBe(false);
    });

    test("sending private key & provider, return true", async () => {
        const batch = new BatchTransaction();
        expect(await batch.init({ private_key: PRIVATE_KEY, provider })).toBe(true);
    });

    test("sending signer & provider, return true", async () => {
        const batch = new BatchTransaction();
        expect(await batch.init({ signer: wallet, provider })).toBe(true);
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

    test('should return the connected wallet address', async () => {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const signer = await provider.getSigner();
        const batchTxn = new BatchTransaction();
        const res = await batchTxn.init({
            signer
        });
        console.log(res);
        expect(await batchTxn.executeEthBatch(ethBatch)).toBeInstanceOf(ethers.TransactionResponse);
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
    test('should return true if successful', async() => {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const signer = await provider.getSigner();
        const batchTxn = new BatchTransaction();
        const res = await batchTxn.init({
            signer
        });
        expect(await batchTxn.executeERC20Batch(erc20Batch)).toBeInstanceOf(ethers.TransactionResponse);
    });
});