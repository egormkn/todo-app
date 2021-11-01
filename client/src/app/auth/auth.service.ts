import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
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

export interface JwtPayload {
  name: string;
  username: string;
}

export const apiPrefix = '/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusSource = new BehaviorSubject<boolean>(false);

  authStatus$ = this.authStatusSource.asObservable();

  constructor(private jwtService: JwtHelperService, private http: HttpClient) {
    const isLoggedIn = this.isLoggedIn();
    this.authStatusSource.next(isLoggedIn);
  }

  logIn(data: LogInDto): Observable<AuthResponse> {
    const url = `${apiPrefix}/auth/login`;
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

  signUp(data: SignUpDto): Observable<AuthResponse> {
    const url = `${apiPrefix}/auth/signup`;
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

  logOut(): void {
    localStorage.removeItem('access_token');
    this.authStatusSource.next(false);
  }

  isLoggedIn(): boolean {
    return !this.jwtService.isTokenExpired();
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getUsername() {
    const payload = this.jwtService.decodeToken<JwtPayload>();
    console.log('Payload: ', payload);
    return payload.username;
  }

  getName() {
    const payload = this.jwtService.decodeToken<JwtPayload>();
    console.log('Payload: ', payload);
    return payload.name;
  }
}
