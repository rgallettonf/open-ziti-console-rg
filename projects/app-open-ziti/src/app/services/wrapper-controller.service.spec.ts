import { TestBed } from '@angular/core/testing';

import { WrapperControllerService } from './wrapper-controller.service';

describe('ZitiControllerService', () => {
  let service: WrapperControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrapperControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
