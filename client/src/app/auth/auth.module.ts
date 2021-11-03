import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './signup-form/signup-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialComponent } from './social/social.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LogoutFormComponent } from './logout-form/logout-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectAccountFormComponent } from './connect-account-form/connect-account-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    SignUpFormComponent,
    SocialComponent,
    AuthComponent,
    LogoutFormComponent,
    ConnectAccountFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
