const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const Caver = require("caver-js");
const fs = require("fs");
const mnemonic = fs.readFileSync("../.secret").toString().trim();

const contractAddress = fs.readFileSync("../deployedAddress").toString().trim();
const contractABI = JSON.parse(fs.readFileSync("../deployedABI").toString().trim());

const provider = new HDWalletProvider(mnemonic, "https://api.baobab.klaytn.net:8651");

const fromAddress = provider.getAddress(0);
//const toAddress = "0xaa0701279d5026cab16dcc05cdfe22aba7c5c576";
const toAddress = "0x69Ee2472cd2395A2b77d07921a2bCF0F5a1Ae8Ef";
const baobab = "https://api.baobab.klaytn.net:8651";
const cypress = "https://api.cypress.klaytn.net:8651";

const caver = new Caver(cypress);
const privKey = caver.utils.toHex(provider.wallets[fromAddress]._privKey);
console.log(privKey);
const keyring = caver.wallet.keyring.createWithSingleKey(fromAddress, privKey);
caver.wallet.add(keyring);

const contract = new caver.contract(contractABI, contractAddress);

async function transfer(to, amount) {
  const receipt = await contract.methods.transfer(to, caver.utils.toPeb(amount, "KLAY")).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function addOperator(address) {
  const receipt = await contract.methods.addOperator(address).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}
async function removeOperator(address) {
  const receipt = await contract.methods.removeOperator(address).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function transferOwnership(address) {
  const receipt = await contract.methods.transferOwnership(address).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function lock(address) {
  const receipt = await contract.methods.lock(address).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function unlock(address) {
  const receipt = await contract.methods.unlock(address).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function pause() {
  const receipt = await contract.methods.pause().send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function unpause() {
  const receipt = await contract.methods.pause().send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function burn(amount) {
  const receipt = await contract.methods.burn(caver.utils.toPeb(amount, "KLAY")).send({ from: fromAddress, gas: 200000 });
  console.log(receipt.transactionHash);
}

async function balanceOf(address) {
  const balance = await contract.methods.balanceOf(address).call({ from: fromAddress });
  console.log(caver.utils.convertFromPeb(balance, "KLAY"));
}

console.log(process.argv);
//balanceOf(toAddress);
transfer(toAddress, 9000000);
