import { TestBed } from '@angular/core/testing';

import { CompanyBackService } from './company-back.service';

describe('CompanyBackService', () => {
  let service: CompanyBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
