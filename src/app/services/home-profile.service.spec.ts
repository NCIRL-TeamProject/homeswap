import { TestBed } from '@angular/core/testing';

import { HomeProfileService } from './home-profile.service';

describe('HomeProfileService', () => {
  let service: HomeProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
