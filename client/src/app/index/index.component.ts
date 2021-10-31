import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;

  isAuthorized = false;

  constructor(private authService: AuthService, library: FaIconLibrary) {
    this.authSubscription = authService.authStatus$.subscribe((isAuthorized) => {
      this.updateAuthStatus(isAuthorized);
    });
    library.addIcons(faBell);
  }

  ngOnInit(): void {
    const isAuthorized = this.authService.isLoggedIn();
    this.updateAuthStatus(isAuthorized);
  }

  updateAuthStatus(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
