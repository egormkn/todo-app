import { TestBed } from '@angular/core/testing';

import { FakeWordsService } from './fake-words.service';

describe('FakeWordsService', () => {
  let service: FakeWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
