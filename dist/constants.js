"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants.ts
var constants_exports = {};
__export(constants_exports, {
  BATCH_CONTRACT_ADDRESS: () => BATCH_CONTRACT_ADDRESS,
  BATCH_PROCESS_CONTRACT_ADDRESS: () => BATCH_PROCESS_CONTRACT_ADDRESS,
  BLOCKSCOUT_EXPLORER: () => BLOCKSCOUT_EXPLORER,
  DEFAULT_GAS_LIMIT: () => DEFAULT_GAS_LIMIT,
  PRIVATE_KEY: () => PRIVATE_KEY,
  TOKEN_CONTRACT_ADDRESS: () => TOKEN_CONTRACT_ADDRESS
});
module.exports = __toCommonJS(constants_exports);
var BATCH_PROCESS_CONTRACT_ADDRESS = "0xd7aeb1fCACBC7fc2C34A27d71B61DbBe043aC97E";
var BATCH_CONTRACT_ADDRESS = "0x909e24D7e79F45937705e8A8899aa52255bB3E1F";
var DEFAULT_GAS_LIMIT = 3e5;
var BLOCKSCOUT_EXPLORER = "https://eth-sepolia.blockscout.com/tx";
var PRIVATE_KEY = "";
var TOKEN_CONTRACT_ADDRESS = "0xb65aA0c58B7F0Cd8D07fba21A2daDC8667326629";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BATCH_CONTRACT_ADDRESS,
  BATCH_PROCESS_CONTRACT_ADDRESS,
  BLOCKSCOUT_EXPLORER,
  DEFAULT_GAS_LIMIT,
  PRIVATE_KEY,
  TOKEN_CONTRACT_ADDRESS
});
