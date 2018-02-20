const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { abi, bytecode } = require('./config/compile');
const { mnemonic, network } = require('./config/provider');

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);
(async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 });
  // Lost provider bug, temporary fix
  result.setProvider(web3.currentProvider);
  // Lost provider bug, temporary fix
  console.log('Contract deployed to', result.options.address);
})();

