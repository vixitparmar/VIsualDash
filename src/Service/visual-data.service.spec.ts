import { TestBed } from '@angular/core/testing';

import { VisualDataService } from './visual-data.service';

describe('VisualDataService', () => {
  let service: VisualDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
