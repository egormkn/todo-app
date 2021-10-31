import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LogInDto {
  username: string;
  password: string;
}

export interface SignUpDto extends LogInDto {
  name: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
}

export const authApiPrefix = '/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusSource = new Subject<boolean>();

  authStatus$ = this.authStatusSource.asObservable();

  constructor(private jwtService: JwtHelperService, private http: HttpClient) {}

  logIn(data: LogInDto) {
    const url = `${authApiPrefix}/auth/login`;
    return this.http.post<AuthResponse>(url, data).pipe(
      // retry(2), // FIXME: Do not retry on response
      tap((value) => {
        console.log(`Logging in: ${value}`);
        localStorage.setItem('access_token', value['access_token']);
        this.authStatusSource.next(true);
      }),
      // shareReplay(), // FIXME: Do not retry on response
    );
  }

  signUp(data: SignUpDto) {
    const url = `${authApiPrefix}/auth/signup`;
    return this.http.post<AuthResponse>(url, data).pipe(
      // retry(2),
      tap((value) => {
        console.log(`Signed up: ${value}`);
        localStorage.setItem('access_token', value['access_token']);
        this.authStatusSource.next(true);
      }),
      // shareReplay(),
    );
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.authStatusSource.next(false);
  }

  isLoggedIn() {
    return !this.jwtService.isTokenExpired();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getUsername() {
    return this.jwtService.decodeToken<{ username: string }>().username;
  }

  getName() {
    const payload = this.jwtService.decodeToken<{ name: string }>();
    console.log(payload);
    return payload.name;
  }
}
