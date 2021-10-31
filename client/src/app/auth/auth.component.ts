import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="bg-light">
      <div class="container py-5">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AuthComponent {}
