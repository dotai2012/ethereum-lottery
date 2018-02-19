import { TestBed, inject } from '@angular/core/testing';

import { IsAdminService } from './is-admin.service';

describe('IsAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAdminService]
    });
  });

  it('should be created', inject([IsAdminService], (service: IsAdminService) => {
    expect(service).toBeTruthy();
  }));
});
