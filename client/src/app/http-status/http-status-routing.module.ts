import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpStatusComponent } from './http-status.component';

const routes: Routes = [
  { path: '', component: HttpStatusComponent, data: { code: 404, message: 'Not Found' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpStatusRoutingModule {}
