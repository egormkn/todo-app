import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
    library: FaIconLibrary,
  ) {
    library.addIcons(faSquare, faUserPlus);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.redirectTo = params['to'];
    });
    this.isReady = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isReady = false;
      this.authService.signUp(this.signUpForm.value).subscribe(
        () => {
          console.log('User is signed up');
          this.isReady = true;
          this.router.navigateByUrl(this.redirectTo ?? '/');
        },
        ({ error }) => {
          console.log(error);
          this.isReady = true;
          if (Array.isArray(error?.message)) {
            this.errors = error.message;
          } else {
            this.errors = [error?.message ?? 'Failed to sign up'];
          }
        },
      );
    }
  }
}
