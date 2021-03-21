import { TestBed } from '@angular/core/testing';

import { PatternPlayerService } from './pattern-player.service';

describe('PatternPlayerService', () => {
  let service: PatternPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
