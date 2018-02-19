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
  name: String;
  email: String;
  instancePassword = 'Change password';
  password = 'Change password';
  disabled: Boolean = true;
  isUpdated: Boolean = false;
  constructor(private data: DataService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(value => {
      this.userProfile = value.user;
      this.email = this.userProfile.email;
      this.name = this.userProfile.name;
    });
  }
  onChangePassword() {
    console.log(this.disabled);
    if (this.password !== this.instancePassword) {
      this.disabled = false;
    }
  }
  onUpdateName() {
    this.isUpdated = true;
    this.data.updateName({email: this.email, name: this.name}).subscribe(console.log);
  }
  onUpdatePassword() {
    this.isUpdated = true;
    this.data.updatePassword({email: this.email, password: this.password}).subscribe(console.log);
  }
}
