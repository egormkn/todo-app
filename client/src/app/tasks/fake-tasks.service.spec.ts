import { TestBed } from '@angular/core/testing';

import { FakeTasksService } from './fake-tasks.service';

describe('FakeTasksService', () => {
  let service: FakeTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
