import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
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
  authSubscription?: Subscription;

  collapsed = true;

  isAuthorized = false;

  name?: string;

  constructor(private authService: AuthService, library: FaIconLibrary) {
    library.addIcons(faSquare, faCheck, faUser, faUserPlus, faSignInAlt);
  }

  ngOnInit(): void {
    console.log('Add header subscription');
    this.authSubscription = this.authService.authStatus$.subscribe((isAuthorized) => {
      console.log('Update header subscription: ', isAuthorized);
      this.updateAuthStatus(isAuthorized);
    });
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
    console.log('Remove header subscription');
    this.authSubscription?.unsubscribe();
  }
}
