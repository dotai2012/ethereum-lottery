import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class IsAdminService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }
  canActivate() {
      if (this.auth.checkAdmin()) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
}
