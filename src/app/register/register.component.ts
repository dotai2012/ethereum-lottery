import { DataService } from './../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showAlert: Boolean = false;
  name: String;
  email: String;
  password: String;
  confirm: String;
  params;

  constructor(
    private validate: ValidateService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService,
    private data: DataService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Đăng Ký Tài Khoản | Blockchain Lotto');
    this.auth.logout();
    this.route.queryParams.subscribe(params => {this.params = params; });
    if (this.params.ref) {
      this.cookie.set( 'Ref', this.params.ref );
    }
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm: this.confirm
    };
    // Validate Fields
    if (this.validate.validateRegister(user) && this.validate.validateEmail(this.email)) {
      if (this.cookie.get('Ref') !== '') {
        user['bonus'] = 0.000025;
      } else {
        user['bonus'] = 0;
      }
        this.auth.registerUser(user).subscribe(data => {
          if (data.success) {
            this.router.navigate(['/login']);
          } else {
            console.log(data);
            this.router.navigate(['/register']);
          }
        });
      } else {
        this.showAlert = true;
      }
  }

}
