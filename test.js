const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
let provider = new HDWalletProvider(mnemonic, "http://localhost:8545");
console.log(provider.addresses);

//0xe14c882cbdc576c69a5bc2bf3297ca48ba9c8a9b
