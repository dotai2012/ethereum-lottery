import { CookieService } from 'ngx-cookie-service';
import { DataService } from './../../data.service';
import { WindowService } from './../../window.service';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  notFoundMeta: Boolean = false;
  isInTheGame;
  disablePlay: Boolean = true;
  accounts = [];
  players = [];
  totalPrize;

  constructor(
    private data: DataService,
    private web3: Web3Service,
    private cookie: CookieService,
    private title: Title) { }

  async ngOnInit() {
    this.title.setTitle('Chương Trình Xổ Số | Blockchain Lotto');
      try {
        this.accounts = await this.web3.instance.eth.getAccounts();
        this.players = await this.web3.Contract().methods.getPlayers().call();
        this.isInTheGame = this.players.indexOf(this.accounts[0]);
        if (this.isInTheGame === -1) {
          this.disablePlay = false;
        }
        this.web3.instance.eth.getBalance(this.web3.Contract().options.address).then(value => {
          this.totalPrize =  this.web3.instance.utils.fromWei(value, 'ether');
        });
      } catch (error) {
        this.notFoundMeta = true;
      }
  }
  getDate() {
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return utc;
  }
  onPlay() {
    if (this.isInTheGame === -1) {
      try {
        const play = this.web3.Contract().methods.enter('lotto').send({
          from: this.accounts[0],
          value: this.web3.instance.utils.toWei('0.05', 'ether'),
        }).on('transactionHash', (hash) => {
          this.data.pushRefList({_id: this.cookie.get('Ref'), ref: JSON.parse(localStorage.getItem('user')).email, hash});
      });
      } catch (error) {
        console.log('Rejected');
      }
    }
  }

}
