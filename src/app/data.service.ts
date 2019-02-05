import { AuthService } from './auth.service';
import { WindowService } from './window.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  url = '';

  constructor(private windowRef: WindowService, private http: Http, private auth: AuthService) { }
  authPostReq(url, data) {
    const headers = new Headers();
    this.auth.loadToken();
    headers.append('Authorization', this.auth.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, data, {headers}).pipe(map(res => res.json()));
  }
  updateName(data: object) {
    return this.authPostReq(`${this.url}user/updatename`, data);
  }
  updateAddress(data: object) {
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
  updatePassword(data: object) {
    return this.authPostReq(`${this.url}user/updatepassword`, data);
  }
  pushRefList(data: object) {
    return this.authPostReq(`${this.url}user/updateref`, data);
  }
}
