import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  withdrawalRequestList;
  accounts = [];
  constructor(private data: DataService, private web3: Web3Service) { }

  async ngOnInit() {
    this.data.withdrawalRequestList().subscribe(value => {
      this.withdrawalRequestList = value;
    });
    try {
      this.accounts = await this.web3.instance.eth.getAccounts();
    } catch (error) {
      console.log(error);
    }
  }
  async onPay(email, amount, address) {
    const pay = await this.web3.instance.eth.sendTransaction({
      from: this.accounts[0],
      to: address,
      value: this.web3.instance.utils.toWei(amount.toString(), 'ether'),
    });
    this.data.payComplete(email);
  }
}
