import { HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_PREFIX } from '@app/api';
import { Logger } from '@app/logger/logger';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { AuthResponse, AuthService, LogInDto, SignUpDto } from './auth.service';

describe('AuthService', () => {
  const api = '/test-api';
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let jwtHelperServiceSpy: jasmine.SpyObj<JwtHelperService>;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spyJwtHelperService = jasmine.createSpyObj<JwtHelperService>('JwtHelperService', [
      'isTokenExpired',
      'decodeToken',
    ]);
    const spyLocalStorage = jasmine.createSpyObj<Storage>('Storage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fakeLogger = { log: () => {} };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: JwtHelperService, useValue: spyJwtHelperService },
        { provide: Logger, useValue: fakeLogger },
        { provide: API_PREFIX, useValue: api },
        { provide: LOCAL_STORAGE, useValue: spyLocalStorage },
      ],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    jwtHelperServiceSpy = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;
    localStorageSpy = TestBed.inject(LOCAL_STORAGE) as jasmine.SpyObj<Storage>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('#setToken', () => {
    it('saves the token to localStorage and emits the status', (done: DoneFn) => {
      const token = 'DUMMY_TOKEN';

      authService.setToken(token);

      expect(localStorageSpy.setItem).toHaveBeenCalledOnceWith('access_token', token);
      authService.authStatus$.subscribe((value) => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('clears the token from localStorage and emits the status', (done: DoneFn) => {
      authService.setToken(null);

      expect(localStorageSpy.removeItem).toHaveBeenCalledOnceWith('access_token');
      authService.authStatus$.subscribe((value) => {
        expect(value).toBeFalse();
        done();
      });
    });
  });

  it('#logIn sends username and password and receives access token', () => {
    const logInDto: LogInDto = { username: 'user', password: 'pass' };
    const testData: AuthResponse = { access_token: 'DUMMY_TOKEN' };
    spyOn(authService, 'setToken');

    authService.logIn(logInDto).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne({ method: 'POST', url: `${api}/auth/login` });
    req.flush(testData);
    expect(authService.setToken).toHaveBeenCalledOnceWith(testData.access_token);
  });

  it('#signUp sends user data and receives access token', () => {
    const signUpDto: SignUpDto = {
      username: 'user',
      password: 'pass',
      name: 'User',
      email: 'user@example.com',
    };
    const testData: AuthResponse = { access_token: 'DUMMY_TOKEN' };

    authService.signUp(signUpDto).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${api}/auth/signup`);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('#connect forwards url parameters and receives access token', () => {
    const type = 'DUMMY_TYPE';
    const parameters: Record<string, any> = {
      code: 'DUMMY_CODE',
      scope: 'DUMMY_SCOPE',
    };
    const testData: AuthResponse = { access_token: 'DUMMY_TOKEN' };

    authService.connect(type, parameters).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const params = new HttpParams().appendAll(parameters);
    const testReq = new HttpRequest('GET', `${api}/auth/${type}`, { params });

    const req = httpTestingController.expectOne(
      (req) => req.method === testReq.method && req.urlWithParams === testReq.urlWithParams,
    );
    req.flush(testData);
  });

  it('#logOut clears the saved token', () => {
    spyOn(authService, 'setToken');

    authService.logOut();

    expect(authService.setToken).toHaveBeenCalledOnceWith(null);
  });

  it('#isLoggedIn returns false if token is expired', () => {
    jwtHelperServiceSpy.isTokenExpired.and.returnValue(true);

    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('#isLoggedIn returns true if token is not expired', () => {
    jwtHelperServiceSpy.isTokenExpired.and.returnValue(false);

    expect(authService.isLoggedIn()).toBeTrue();
  });

  it('#isLoggedOut returns true if user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);

    expect(authService.isLoggedOut()).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('#isLoggedOut returns false if user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    expect(authService.isLoggedOut()).toBeFalse();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('#getUsername returns username property of a JWT payload', () => {
    const username = 'DUMMY_USERNAME';
    jwtHelperServiceSpy.decodeToken.and.returnValue({ username });

    expect(authService.getUsername()).toEqual(username);
  });

  it('#getName returns name property of a JWT payload', () => {
    const name = 'DUMMY_NAME';
    jwtHelperServiceSpy.decodeToken.and.returnValue({ name });

    expect(authService.getName()).toEqual(name);
  });
});
