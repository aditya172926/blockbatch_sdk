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
  BICONOMY_BATCH_CONTRACT: () => BICONOMY_BATCH_CONTRACT,
  CHAIN_ID: () => CHAIN_ID,
  PRIVATE_KEY: () => PRIVATE_KEY,
  TOKEN_CONTRACT_ADDRESS: () => TOKEN_CONTRACT_ADDRESS
});
module.exports = __toCommonJS(constants_exports);
var BATCH_PROCESS_CONTRACT_ADDRESS = "0x7FD154df41ec41336A86Ee53a3F7Fe886E80Efc7";
var BATCH_CONTRACT_ADDRESS = "0xb8cBB6a9965A851Dcb88Bb1734231c531a0bcdF1";
var CHAIN_ID = 31337;
var BICONOMY_BATCH_CONTRACT = "0x0000002512019Dafb59528B82CB92D3c5D2423aC";
var PRIVATE_KEY = "";
var TOKEN_CONTRACT_ADDRESS = "0x857616Fbc511212A2a848dA64B4fC3b9678af6F9";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BATCH_CONTRACT_ADDRESS,
  BATCH_PROCESS_CONTRACT_ADDRESS,
  BICONOMY_BATCH_CONTRACT,
  CHAIN_ID,
  PRIVATE_KEY,
  TOKEN_CONTRACT_ADDRESS
});
