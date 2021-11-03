import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectAccountFormComponent } from './connect-account-form.component';

describe('ConnectAccountFormComponent', () => {
  let component: ConnectAccountFormComponent;
  let fixture: ComponentFixture<ConnectAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectAccountFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
