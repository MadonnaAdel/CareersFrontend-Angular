import { TestBed } from '@angular/core/testing';

import { RegistrationDataServiceService } from './registration-data-service.service';

describe('RegistrationDataServiceService', () => {
  let service: RegistrationDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
