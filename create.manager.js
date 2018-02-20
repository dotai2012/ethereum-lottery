const User = require('./model/user');
const manager = require('./config/manager');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { mnemonic, network } = require('./config/provider');

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const { name, email, password } = manager;
  const newUser = new User({
    name,
    email,
    password,
    address: accounts[0],
    withdraw: false,
    manager: true,
  });
  User.addUser(newUser, (err) => {
    if (err) {
      console.log({ success: false, msg: 'Failed to create manager', debug: err });
    } else {
      console.log({ success: true, msg: 'Created manager' });
    }
  });
})();
