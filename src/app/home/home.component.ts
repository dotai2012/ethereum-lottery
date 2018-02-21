import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Style, Params, Width, Height } from '../particles';
import * as Chart from 'chart.js';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  particleStyle = Style;
  particleParams = Params;
  particleWidth = Width;
  particleHeight = Height;
  totalPrize;
  showPrize: Boolean = false;
  showPrizeList: Boolean = false;
  lastWinner;
  lastConsolationPrize;
  canvas: any;
  ctx: any;
  constructor(private web3: Web3Service, private modal: NgbModal ) { }

  async ngOnInit() {
    try {
      this.lastWinner = await this.web3.Contract().methods.lastWinner().call();
      this.lastConsolationPrize = await this.web3.Contract().methods.getLastConsolationPrize().call();
      if (this.lastConsolationPrize.length !== 0) {
        this.showPrizeList = true;
      }
      const balance = await this.web3.instance.eth.getBalance(this.web3.Contract().options.address);
      this.totalPrize = await this.web3.instance.utils.fromWei(balance, 'ether');
      if (this.totalPrize >= 1) {
        this.showPrize = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  ngAfterViewInit() {
    this.canvas = document.getElementById('prizeRatio');
    this.ctx = this.canvas.getContext('2d');
    const config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
            70, 15, 12, 3,
          ],
          backgroundColor: [
            '#e74c3c', '#2980b9', '#e67e22', '#9b59b6',
          ],
          label: 'Dataset',
        }],
        labels: [
          'Giai Dac Biet',
          'Giai Khuyến Khích',
          'Marketing',
          'Nha Phat Trien',
        ],
      },
      options: {
        responsive: true,
      },
    };
    const myChart = new Chart(this.ctx, config);
  }
  open(content) {
    this.modal.open(content).result;
  }
}
