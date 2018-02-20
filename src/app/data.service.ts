import { AuthService } from './auth.service';
import { WindowService } from './window.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DataService {
  url: String = '';
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private windowRef: WindowService, private http: Http, private auth: AuthService) { }
  authPostReq(url, data) {
    const headers = new Headers();
    this.auth.loadToken();
    headers.append('Authorization', this.auth.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, data, {headers}).map(res => res.json());
  }
  getLinkRef() {
    const {id} = this.user;
    // tslint:disable-next-line:max-line-length
    const ref = `${this.windowRef.nativeWindow.location.protocol}//${this.windowRef.nativeWindow.location.hostname}/register?ref=${id}`;
    return ref;
  }
  updateName(data: Object) {
    return this.authPostReq(`${this.url}user/updatename`, data);
  }
  updateAddress(data: Object) {
    return this.authPostReq(`${this.url}user/updateaddress`, data);
  }
  withdrawalRequest(data) {
    return this.authPostReq(`${this.url}user/withdrawalrequest`, data);
  }
  withdrawalRequestList() {
    return this.authPostReq(`${this.url}user/withdrawalrequestlist`, { withdraw: true });
  }
  payComplete(email) {
    return this.authPostReq(`${this.url}user/paycomplete`, {email});
  }
  updatePassword(data: Object) {
    return this.authPostReq(`${this.url}user/updatepassword`, data);
  }
  pushRefList(data: Object) {
    this.authPostReq(`${this.url}user/updateref`, data);
  }
}
