const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const fs = require("fs");
const mnemonic = fs
  .readFileSync(".secret")
  .toString()
  .trim();

// 0x989fB14FFA05EFb1af69BAc7ef3B1F417D514043

module.exports = {
  networks: {
    testnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://api.baobab.klaytn.net:8651"),
      network_id: "1001", // Klaytn baobab 테스트넷의 네트워크 ID
      gas: 20000000,
      gasPrice: null,
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://api.cypress.klaytn.net:8651"),
      network_id: "8217", // Klaytn 메인넷의 네트워크 ID
      gas: 20000000,
      gasPrice: null,
    },
  },
  compilers: {
    solc: {
      version: "0.5.6", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
