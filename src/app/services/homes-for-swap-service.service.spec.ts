import { TestBed } from '@angular/core/testing';

import { HomesForSwapServiceService } from './homes-for-swap-service.service';

describe('HomesForSwapServiceService', () => {
  let service: HomesForSwapServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesForSwapServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
