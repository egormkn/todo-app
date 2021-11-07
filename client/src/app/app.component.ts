import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="flex-shrink-0">
      <router-outlet></router-outlet>
    </main>
    <app-footer class="mt-auto"></app-footer>
  `,
})
export class AppComponent {}
