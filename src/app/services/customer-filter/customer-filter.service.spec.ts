import { TestBed } from '@angular/core/testing';

import { CustomerFilterService } from './customer-filter.service';

describe('CustomerFilterService', () => {
  let service: CustomerFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
