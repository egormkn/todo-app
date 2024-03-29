import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutFormComponent } from './logout-form.component';

xdescribe('LogoutFormComponent', () => {
  let component: LogoutFormComponent;
  let fixture: ComponentFixture<LogoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
