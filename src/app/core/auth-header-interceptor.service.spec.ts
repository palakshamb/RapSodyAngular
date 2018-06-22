import { TestBed, inject } from '@angular/core/testing';

import { AuthHeaderInterceptorService } from './auth-header-interceptor.service';

describe('AuthHeaderInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHeaderInterceptorService]
    });
  });

  it('should be created', inject([AuthHeaderInterceptorService], (service: AuthHeaderInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
