import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Style, Params, Width, Height } from '../particles';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  particleStyle = Style;
  particleParams = Params;
  particleWidth = Width;
  particleHeight = Height;
  canvas: any;
  ctx: any;
  constructor() { }

  ngAfterViewInit() {
    this.canvas = document.getElementById('prizeRatio');
    this.ctx = this.canvas.getContext('2d');
    const config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
            70, 20, 7, 3,
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
