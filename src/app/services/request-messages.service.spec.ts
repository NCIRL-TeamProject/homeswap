import { TestBed } from '@angular/core/testing';

import { RequestMessagesService } from './request-messages.service';

describe('RequestMessagesService', () => {
  let service: RequestMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
