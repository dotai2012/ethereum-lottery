import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Style, Params, Width, Height } from '../particles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  particleStyle = Style;
  particleParams = Params;
  particleWidth = Width;
  particleHeight = Height;
  constructor(private router: Router) { }
  ngOnInit() {
    if(this.router.url === '/dashboard'){
      this.router.navigate(['/dashboard/play']);
    }
  }

}
