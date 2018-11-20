import { TestBed } from '@angular/core/testing';

import { ClassmatesService } from './classmates.service';

describe('ClassmatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassmatesService = TestBed.get(ClassmatesService);
    expect(service).toBeTruthy();
  });
});
