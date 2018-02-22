const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { abi } = require('./config/compile');
const { mnemonic, network } = require('./config/provider');
const contractAddr = require('./config/contract.addr');

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

(async () => {
  try {
    const date = new Date();
    const getWeekDay = date.getDay();
    const accounts = await web3.eth.getAccounts();
    const lottery = await new web3.eth.Contract(JSON.parse(abi), contractAddr);
    const players = await lottery.methods.getPlayers().call();
    if (getWeekDay === 3) {
      const randomTo = players.length - 1;
      const randomList = [];
      const randomLength = (randomTo / 20) * 3;
      let i = 1;
      while (i <= randomLength) {
        const random = Math.floor(Math.random() * randomTo);
        if (randomList.indexOf(random) === -1) {
          randomList.push(random);
          i += 1;
        }
      }
      if (randomList.length > 0) {
        const winner = await lottery.methods.pickWinner().send({
          from: accounts[0],
          gas: 1000000,
        });
        console.log(winner);
        const pick = await lottery.methods.pickConsolationPrize(randomList).send({
          from: accounts[0],
          gas: 1000000,
        });
        console.log(pick);
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
