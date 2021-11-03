import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <div class="container py-5">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class UsersComponent {}
