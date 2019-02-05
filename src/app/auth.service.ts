import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  url = '';
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  getProfile() {
   const headers = new Headers();
   this.loadToken();
   headers.append('Authorization', this.authToken);
   headers.append('Content-Type', 'application/json');
   return this.http.get(`${this.url}user/profile`, {headers}).pipe(map(res => res.json()));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return token;
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}user/register`, user, {headers}).pipe(map(res => res.json()));
  }
  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}user/authenticate`, user, {headers}).pipe(map(res => res.json()));
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  checkLoggedIn() {
      return tokenNotExpired('id_token');
  }
  checkAdmin() {
    const manager = JSON.parse(localStorage.getItem('user')).manager;
    return manager;
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
