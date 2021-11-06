import { TestBed } from '@angular/core/testing';

import { Logger } from './logger';

describe('LoggerService', () => {
  let logger: Logger;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    logger = TestBed.inject(Logger);
  });

  it('should be created', () => {
    expect(logger).toBeTruthy();
  });
});
