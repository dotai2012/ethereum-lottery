import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDashboard: Boolean = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    if (this.router.url !== '/') {
      if (this.router.url !== '/referal') {
        this.isDashboard = true;
      }
    }
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
