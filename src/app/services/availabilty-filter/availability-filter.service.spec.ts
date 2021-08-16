import { TestBed } from '@angular/core/testing';

import { AvailabilityFilterService } from './availability-filter.service';

describe('AvailabilityFilterService', () => {
  let service: AvailabilityFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
