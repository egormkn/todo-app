import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpStatusComponent } from './http-status.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpStatusRoutingModule } from './http-status-routing.module';

@NgModule({
  // eslint-disable-next-line prettier/prettier
  declarations: [
    HttpStatusComponent
  ],
  // eslint-disable-next-line prettier/prettier
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpStatusRoutingModule,
  ]
})
export class HttpStatusModule {}
