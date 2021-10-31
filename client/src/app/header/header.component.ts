import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faLanguage,
  faSignInAlt,
  faSquare,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;

  collapsed = true;

  isAuthorized = false;

  name?: string;

  constructor(private authService: AuthService, library: FaIconLibrary) {
    this.authSubscription = authService.authStatus$.subscribe((isAuthorized) => {
      this.updateAuthStatus(isAuthorized);
    });
    library.addIcons(faSquare, faLanguage, faUser, faUserPlus, faSignInAlt);
  }

  ngOnInit(): void {
    const isAuthorized = this.authService.isLoggedIn();
    this.updateAuthStatus(isAuthorized);
  }

  updateAuthStatus(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
    if (isAuthorized) {
      this.name = this.authService.getName();
    } else {
      this.name = undefined;
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
