import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_PREFIX } from '@app/api';
import { Logger } from '@app/logger/logger';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
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

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStatusSource = new BehaviorSubject<boolean>(false);

  authStatus$ = this.authStatusSource.asObservable();

  constructor(
    @Inject(API_PREFIX) private api: string,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private jwtService: JwtHelperService,
    private logger: Logger,
    private http: HttpClient,
  ) {
    const isLoggedIn = this.isLoggedIn();
    this.authStatusSource.next(isLoggedIn);
  }

  setToken(token: string | null): void {
    if (token === null) {
      this.localStorage.removeItem('access_token');
      this.authStatusSource.next(false);
    } else {
      this.localStorage.setItem('access_token', token);
      this.authStatusSource.next(true);
    }
  }

  logIn(data: LogInDto): Observable<AuthResponse> {
    const url = `${this.api}/auth/login`;
    return this.http.post<AuthResponse>(url, data).pipe(
      // retry(2), // FIXME: Do not retry on response
      tap((value) => {
        this.logger.log(`Logging in: `, value);
        this.setToken(value['access_token']);
      }),
      // shareReplay(), // FIXME: Do not retry on response
    );
  }

  signUp(data: SignUpDto): Observable<AuthResponse> {
    const url = `${this.api}/auth/signup`;
    return this.http.post<AuthResponse>(url, data).pipe(
      // retry(2),
      tap((value) => {
        this.logger.log(`Signed up: `, value);
        this.setToken(value['access_token']);
      }),
      // shareReplay(),
    );
  }

  getAuthUrl(type: string) {
    const url = `${this.api}/auth/${type}`;
    return this.http.head(url, { observe: 'events' });
  }

  connect(type: string, parameters: Record<string, any>) {
    const url = `${this.api}/auth/${type}`;
    const params = new HttpParams().appendAll(parameters);
    return this.http.get<AuthResponse>(url, { params }).pipe(
      // retry(2),
      tap((value) => {
        this.logger.log(`Connected: `, value);
        this.setToken(value['access_token']);
      }),
      // shareReplay(),
    );
  }

  logOut(): void {
    this.setToken(null);
  }

  isLoggedIn(): boolean {
    return !this.jwtService.isTokenExpired();
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getUsername() {
    const payload = this.jwtService.decodeToken<JwtPayload>();
    return payload.username;
  }

  getName() {
    const payload = this.jwtService.decodeToken<JwtPayload>();
    return payload.name;
  }
}
