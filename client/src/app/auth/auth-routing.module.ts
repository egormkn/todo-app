import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutFormComponent } from './logout-form/logout-form.component';
import { NoAuthGuard } from './no-auth.guard';
import { SignUpFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginFormComponent, canActivate: [NoAuthGuard] },
      { path: 'signup', component: SignUpFormComponent, canActivate: [NoAuthGuard] },
      { path: 'logout', component: LogoutFormComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
