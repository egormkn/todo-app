import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet class="flex-shrink-0"></router-outlet>
    <app-footer class="mt-auto"></app-footer>
  `,
})
export class AppComponent {}
