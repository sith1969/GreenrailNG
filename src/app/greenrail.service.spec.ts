import { TestBed } from '@angular/core/testing';

import { GreenrailService } from './greenrail.service';

describe('GreenrailService', () => {
  let service: GreenrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreenrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
