import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, of, throwError } from 'rxjs';
import { getElement } from '@testing/utilities';
import { AuthService } from '../auth.service';
import { LoginFormComponent } from './login-form.component';
import { Logger } from '@app/logger/logger';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const queryParamsSource = new Subject<Params>();

  beforeEach(async () => {
    const spyRouter = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    const spyAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['logIn']);
    // const spyActivatedRoute = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', [], {
    //   queryParams: of(),
    // });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fakeLogger = { log: () => {} };

    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, ReactiveFormsModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: AuthService, useValue: spyAuthService },
        { provide: Router, useValue: spyRouter },
        { provide: Logger, useValue: fakeLogger },
        { provide: ActivatedRoute, useValue: { queryParams: queryParamsSource.asObservable() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // authServiceSpy = fixture.debugElement.injector.get(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its properties', () => {
    const redirectTo = '/test-route';
    queryParamsSource.next({ to: redirectTo });

    expect(component.isReady).toBeTruthy();
    expect(component.redirectTo).toEqual(redirectTo);
  });

  it('should be empty', () => {
    const data = {
      username: '',
      password: '',
    };

    expect(component.loginForm.value).toEqual(data);
  });

  it('is invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('is valid with user data', () => {
    const data = {
      username: 'user',
      password: 'password',
    };
    for (const [name, value] of Object.entries(data)) {
      const input = getElement(fixture, `input[name=${name}]`).nativeElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }

    expect(component.loginForm.valid).toBeTrue();
    expect(component.loginForm.value).toEqual(data);
  });

  it('submits the form successfully', () => {
    const redirectTo = '/test-route';
    const authResponse = { access_token: 'DUMMY_TOKEN' };
    queryParamsSource.next({ to: redirectTo });
    authServiceSpy.logIn.and.returnValue(of(authResponse));

    const data = {
      username: 'user',
      password: 'password',
    };

    for (const [name, value] of Object.entries(data)) {
      const input = getElement(fixture, `input[name=${name}]`).nativeElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }

    getElement(fixture, `form`).triggerEventHandler('submit', {});

    expect(authServiceSpy.logIn).toHaveBeenCalledOnceWith(component.loginForm.value);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith(redirectTo);
    expect(component.isReady).toBeTrue();
  });

  it('shows an error message if something goes wrong', () => {
    const redirectTo = '/test-route';
    const error = { message: 'DUMMY_ERROR_MESSAGE' };
    queryParamsSource.next({ to: redirectTo });
    authServiceSpy.logIn.and.returnValue(throwError({ error }));

    const data = {
      username: 'user',
      password: 'password',
    };

    for (const [name, value] of Object.entries(data)) {
      const input = getElement(fixture, `input[name=${name}]`).nativeElement;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }

    getElement(fixture, `form`).triggerEventHandler('submit', {});

    expect(authServiceSpy.logIn).toHaveBeenCalledOnceWith(component.loginForm.value);
    expect(component.errors).toContain(error.message);
    expect(component.isReady).toBeTrue();
  });
});
