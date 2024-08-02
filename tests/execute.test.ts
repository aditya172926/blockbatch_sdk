import constants from "../src/constants";
import { executeBatch } from "../src/execute";

describe("executeBatch", () => {
    test('should return a string', async () => {
        expect(await executeBatch()).toBe(constants.PRIVATE_KEY);
    })
})