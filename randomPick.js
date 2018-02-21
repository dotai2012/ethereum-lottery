const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { abi } = require('./config/compile');
const { mnemonic, network } = require('./config/provider');
const contractAddr = require('./config/contract.addr');

const provider = new HDWalletProvider(mnemonic, network);
const web3 = new Web3(provider);

(async () => {
  const date = new Date();
  const getWeekDay = date.getDay();
  const lottery = await web3.eth.Contract(abi, contractAddr);
  const players = await lottery.methods.getPlayers().call();
  if (getWeekDay === 5 && players.length >= 10) {
    const randomTo = players.length - 1;
    const randomList = [];
    const randomLength = randomTo / 20;
    let i = 1;
    while (i <= randomLength) {
      const random = Math.floor(Math.random() * randomTo);
      if (randomList.indexOf(random) === -1) {
        randomList.push(random);
        i += 1;
      }
    }
    const pick = await lottery.methods.pickConsolationPrize(randomList).call();
    console.log(pick);
  }
})();
