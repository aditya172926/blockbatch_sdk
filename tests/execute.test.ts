import { ethers } from "ethers";
import { PRIVATE_KEY, TOKEN_CONTRACT_ADDRESS } from "../src/constants";
import { BatchTransaction } from "../src/execute";
import { BatchTransactionInterface, Transaction } from "../src/types";

describe("setup", () => {
    const wallet = new ethers.Wallet(PRIVATE_KEY);
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    test("sending provider-less signer, should return false", async () => {
        const batch = new BatchTransaction();
        expect(await batch.setup({ signer: wallet })).toBe(false);
    });

    test("sending only private key, return false", async () => {
        const batch = new BatchTransaction();
        expect(await batch.setup({ private_key: PRIVATE_KEY })).toBe(false);
    });

    test("sending only provider, return false", async () => {
        const batch = new BatchTransaction();
        expect(await batch.setup({ provider })).toBe(false);
    });

    test("sending private key & provider, return true", async () => {
        const batch = new BatchTransaction();
        expect(await batch.setup({ private_key: PRIVATE_KEY, provider })).toBe(true);
    });

    test("sending signer & provider, return true", async () => {
        const batch = new BatchTransaction();
        expect(await batch.setup({ signer: wallet, provider })).toBe(true);
    });
});

describe("executeBatch", () => {
    const addresses = ["0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"];
    const amounts = [BigInt(1000000000000), BigInt(1000000000000)];

    test('should return the connected wallet address', async () => {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
        const signer = await provider.getSigner();
        const batchTxn = new BatchTransaction();
        const res = await batchTxn.setup({
            signer
        });
        console.log(res);
        const txnData: BatchTransactionInterface[] = [
            {
                amount: "10",
                recipient: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                token: TOKEN_CONTRACT_ADDRESS
            },
            {
                amount: "100",
                recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                token: TOKEN_CONTRACT_ADDRESS
            }
        ]
        expect(await batchTxn.executeBatch(txnData)).toBe(signer.address);
    })
});

describe("fetch balance", () => {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    test("return erc20 balance of address", async() => {
        const signer = await provider.getSigner(0);
        const batch = new BatchTransaction();
        const setup = await batch.setup({
            signer
        });
        const balance = await batch.getBalance(signer.address);
        expect(balance).toBe(BigInt("1000000"));
    });
})