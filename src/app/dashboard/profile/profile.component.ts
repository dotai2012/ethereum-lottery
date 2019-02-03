import { AuthService } from './../../auth.service';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile;
  name: string;
  email: string;
  password = 'Change password';
  confirmPassword = 'Change password';
  disabled = true;
  isUpdated = false;
  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(value => {
      this.userProfile = value.user;
      this.email = this.userProfile.email;
      this.name = this.userProfile.name;
    });
  }
  onChangePassword() {
    if (this.password !== this.confirmPassword) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
  onUpdateName() {
    this.isUpdated = true;
    this.data.updateName({email: this.email, name: this.name}).subscribe();
  }
  onUpdatePassword() {
    if (this.password === this.confirmPassword) {
      this.isUpdated = true;
      this.data.updatePassword({email: this.email, password: this.password}).subscribe();
    }
  }
}
