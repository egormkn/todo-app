import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@app/auth/auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCodeBranch, faCubes, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  authSubscription?: Subscription;

  isAuthorized = false;

  constructor(
    private authService: AuthService,
    private titleService: Title,
    library: FaIconLibrary,
  ) {
    library.addIcons(faCubes, faCodeBranch, faTerminal);
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe((isAuthorized) => {
      this.updateAuthStatus(isAuthorized);
    });
    this.titleService.setTitle('ToDo');
  }

  updateAuthStatus(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
