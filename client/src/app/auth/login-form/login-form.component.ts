import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '@app/logger/logger';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner, faSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  redirectTo?: string;

  errors?: string[];

  isReady = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: Logger,
    library: FaIconLibrary,
  ) {
    library.addIcons(faSquare, faUser, faSpinner);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.redirectTo = params['to'];
    });
    this.isReady = true;
  }

  get f(): Record<string, AbstractControl> {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isReady = false;
      this.authService.logIn(this.loginForm.value).subscribe(
        () => {
          this.logger.log('User is logged in');
          this.isReady = true;
          this.router.navigateByUrl(this.redirectTo ?? '/');
        },
        ({ error }) => {
          this.logger.log(error);
          this.isReady = true;
          if (Array.isArray(error?.message)) {
            this.errors = error.message;
          } else {
            this.errors = [error?.message ?? 'Failed to log in'];
          }
        },
      );
    }
  }
}
