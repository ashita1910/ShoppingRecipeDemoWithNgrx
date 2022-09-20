import { TestBed } from '@angular/core/testing';

import { FetchDataResolverService } from './fetch-data-resolver.service';

describe('FetchDataResolverService', () => {
  let service: FetchDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
