import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connect-account-form',
  templateUrl: './connect-account-form.component.html',
  styleUrls: ['./connect-account-form.component.scss'],
})
export class ConnectAccountFormComponent implements OnInit {
  isReady = false;

  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    library: FaIconLibrary,
  ) {
    library.addIcons(faSpinner);
  }

  ngOnInit(): void {
    const routeSnapshot = this.route.snapshot;
    const type = routeSnapshot.data.type;
    const params = routeSnapshot.queryParams;
    if (params.code) {
      this.authService.connect(type, params).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        ({ error }) => {
          this.error = error?.message ?? 'Unknown error. Try again.';
        },
      );
    }
  }
}
