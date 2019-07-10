import { TestBed } from '@angular/core/testing';

import { ApplicationmanagementService } from './applicationmanagement.service';

describe('ApplicationmanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationmanagementService = TestBed.get(ApplicationmanagementService);
    expect(service).toBeTruthy();
  });
});
