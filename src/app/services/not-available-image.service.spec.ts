import { TestBed } from '@angular/core/testing';

import { NotAvailableImageService } from './not-available-image.service';

describe('NotAvailableImageService', () => {
  let service: NotAvailableImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotAvailableImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
