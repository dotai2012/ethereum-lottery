import { WindowService } from './../../window.service';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {
  userProfile;
  // tslint:disable-next-line:max-line-length
  linkRef = `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}/register?ref=${JSON.parse(localStorage.getItem('user')).id}`;
  totalRef = 0;
  email: string;
  withdraw: boolean;
  withdrawText = 'Rút Tiền';
  address: string;
  refList: string;
  bonus;

  disabledReq1 = true;
  disabledReq2 = false;

  isSent = false;
  balance: number;
  constructor(private data: DataService,
              private auth: AuthService,
              private modal: NgbModal,
              private title: Title,
              private windowRef: WindowService) { }

  ngOnInit() {
    this.title.setTitle('Giới Thiệu Bạn Bè | Blockchain Lotto');
    this.auth.getProfile().subscribe(value => {
      this.userProfile = value.user;
      this.email = this.userProfile.email;
      this.withdraw = this.userProfile.withdraw;
      this.bonus = this.userProfile.bonus;
      this.balance = this.userProfile.ref.length * 0.000035 + this.bonus;
      this.address = this.userProfile.address;
      this.totalRef = this.userProfile.totalRef;
      this.refList = this.userProfile.ref.slice(-5);
      if (this.balance >= 0.0007 && this.withdraw === false) {
        this.disabledReq1 = false;
      } else {
        this.withdrawText = 'Pending';
      }
    });
  }

  open(content) {
    this.modal.open(content);
  }
  onWithdrawalRequest() {
    this.data.updateAddress({email: this.email, address: this.address}).subscribe();
    this.data.withdrawalRequest({email: this.email, withdraw: true}).subscribe();
    this.isSent = true;
    this.disabledReq2 = true;
  }
}
