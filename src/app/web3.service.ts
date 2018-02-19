import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { abi, adress } from './blockchain.interface';

declare function require(name: String);
const Web3 = require('web3');

@Injectable()
export class Web3Service {
  instance;
  constructor(private winRef: WindowService) {
    try {
      const web3 = new Web3(this.winRef.nativeWindow.web3.currentProvider);
      this.instance = web3;
    } catch (error) {
      return error;
    }
  }
  Contract() {
    try {
      return new this.instance.eth.Contract(abi, adress);
    } catch (error) {
      return error;
    }
  }
}
