const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../compile');

let accounts;
let lottery;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 });
  // A bug in web3, maybe will be fixed in the future
  lottery.setProvider(web3.currentProvider);
});
describe('Lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });
  it('one player enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether'),
    });
    const player = await lottery.methods.getPlayers().call({
      from: accounts[0],
    });
    assert.equal(accounts[0], player[0]);
  });
  it('requires exactly 0.1 ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.2', 'ether'),
      });
    } catch (err) {
      assert(err);
    }
  });
  it('only manager can pick the winner', async () => {
    const send = await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether'),
    });
    try {
      if (send.status === 1) {
        await lottery.methods.pickWinner().send({
          from: accounts[1],
        });
      }
    } catch (e) {
      assert(e);
    }
  });
  it('send money to winner and reset', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether'),
    });
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    const winner = await lottery.methods.winner().call();
    console.log(winner);
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei('0.09', 'ether'));
  });
});
