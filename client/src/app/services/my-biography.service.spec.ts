import { TestBed, inject } from '@angular/core/testing';

import { MyBiographyService } from './my-biography.service';

describe('MyBiographyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyBiographyService]
    });
  });

  it('should be created', inject([MyBiographyService], (service: MyBiographyService) => {
    expect(service).toBeTruthy();
  }));
});
