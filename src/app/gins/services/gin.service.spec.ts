import { TestBed } from '@angular/core/testing';

import { GinService } from './gin.service';

describe('GinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GinService = TestBed.get(GinService);
    expect(service).toBeTruthy();
  });
});
