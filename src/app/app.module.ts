import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParticlesModule } from 'angular-particle';

import { ValidateService } from './validate.service';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';
import { CookieService } from 'ngx-cookie-service';
import { Web3Service } from './web3.service';
import { DataService } from './data.service';
import { IsAdminService } from './is-admin.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AffiliateComponent } from './dashboard/affiliate/affiliate.component';
import { HomeComponent } from './home/home.component';
import { WindowService } from './window.service';
import { PlayComponent } from './dashboard/play/play.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { ReferralComponent } from './referral/referral.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'referal', component: ReferralComponent},
  {path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'admin', component: AdminComponent, canActivate: [IsAdminService]},
      {path: 'play', component: PlayComponent},
      {path: 'affiliate', component: AffiliateComponent}
    ], canActivate: [GuardService]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AffiliateComponent,
    HomeComponent,
    PlayComponent,
    ForgotPasswordComponent,
    AdminComponent,
    ContactComponent,
    ReferralComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    ParticlesModule
  ],
  providers: [ValidateService, AuthService, GuardService, CookieService, WindowService, Web3Service, DataService, IsAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
