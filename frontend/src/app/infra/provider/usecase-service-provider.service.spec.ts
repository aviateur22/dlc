import { TestBed } from '@angular/core/testing';

import { UsecaseServiceProviderService } from './usecase-service-provider.service';

describe('UsecaseServiceProviderService', () => {
  let service: UsecaseServiceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsecaseServiceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
