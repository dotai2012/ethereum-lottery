import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Giới Thiệu Bạn Bè | Blockchain Lotto');
  }

}
