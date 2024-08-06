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

// src/abi/BatchContract.abi.ts
var BatchContract_abi_exports = {};
__export(BatchContract_abi_exports, {
  BATCH_CONTRACT_ABI: () => BATCH_CONTRACT_ABI
});
module.exports = __toCommonJS(BatchContract_abi_exports);
var BATCH_CONTRACT_ABI = [
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
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BATCH_CONTRACT_ABI
});
