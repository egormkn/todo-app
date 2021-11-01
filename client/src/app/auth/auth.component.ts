import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="container py-5">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AuthComponent {}
