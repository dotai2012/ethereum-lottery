import { CookieService } from 'ngx-cookie-service';
import { DataService } from './../../data.service';
import { WindowService } from './../../window.service';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  notFoundMeta: Boolean = false;
  isInTheGame;
  accounts = [];
  players = [];
  prize;

  constructor(
    private data: DataService,
    private web3: Web3Service,
    private cookie: CookieService) { }

  async ngOnInit() {
      try {
        this.accounts = await this.web3.instance.eth.getAccounts();
        this.players = await this.web3.Contract().methods.getPlayers().call();
        this.isInTheGame = this.players.indexOf(this.accounts[0]);
        this.web3.instance.eth.getBalance(this.web3.Contract().options.address).then(value => {
          this.prize =  this.web3.instance.utils.fromWei(value, 'ether');
        });
      } catch (error) {
        this.notFoundMeta = true;
      }
  }
  getDate() {
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return utc;
  }
  async onPlay() {
    if (this.isInTheGame === -1) {
      try {
        const play = await this.web3.Contract().methods.enter('lotto').send({
          from: this.accounts[0],
          value: this.web3.instance.utils.toWei('0.05', 'ether'),
        });
        if (play) {
          this.data.pushRefList({_id: this.cookie.get('Ref'), ref: JSON.parse(localStorage.getItem('user')).email});
        }
      } catch (error) {
        console.log('Rejected');
      }
    }
  }

}
