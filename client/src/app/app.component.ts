import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

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
export class AppComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTags([
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'ToDo Application' },
    ]);
  }
}
