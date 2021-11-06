import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function getPropertyDescriptor<T>(spyObj: jasmine.SpyObj<T>, prop: keyof T) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const descriptor = Object.getOwnPropertyDescriptor(spyObj, prop)!;
  return {
    get: descriptor.get as jasmine.Spy<jasmine.Func>,
    set: descriptor.set as jasmine.Spy<jasmine.Func>,
  };
}

export function getElement<T>(fixture: ComponentFixture<T>, selector: string) {
  return fixture.debugElement.query(By.css(selector));
}

export function fillInput<T>(fixture: ComponentFixture<T>, name: string, value: string) {
  getElement(fixture, `[name="${name}"]`).nativeElement.value = value;
}
