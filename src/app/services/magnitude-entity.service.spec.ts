import { TestBed, inject } from '@angular/core/testing';

import { MagnitudeEntityService } from './magnitude-entity.service';

describe('MagnitudeEntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MagnitudeEntityService]
    });
  });

  it('should be created', inject([MagnitudeEntityService], (service: MagnitudeEntityService) => {
    expect(service).toBeTruthy();
  }));
});
