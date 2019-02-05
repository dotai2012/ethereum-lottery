import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showAlert: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title,
    ) { }

  ngOnInit() {
    this.title.setTitle('Log In | Blockchain Lotto');
    if (this.authService.loadToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['/dashboard']);
        } else {
          this.showAlert = true;
        }
    });
  }

}
