import { TestBed } from '@angular/core/testing';

import { LineItemsService } from './line-items.service';

describe('LineItemsService', () => {
  let service: LineItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
