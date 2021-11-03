import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [UsersComponent, ProfileComponent],
  imports: [CommonModule, UsersRoutingModule, FontAwesomeModule],
})
export class UsersModule {}
