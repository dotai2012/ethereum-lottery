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
  canvas: any;
  ctx: any;
  constructor(private web3: Web3Service ) { }

  ngOnInit() {
    this.web3.instance.eth.getBalance(this.web3.Contract().options.address).then(value => {
      this.totalPrize =  this.web3.instance.utils.fromWei(value, 'ether');
      if (this.totalPrize >= 1) {
        this.showPrize = true;
      }
    });
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
          'Giai An Ui',
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
}
