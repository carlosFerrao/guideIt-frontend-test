import { TestBed } from '@angular/core/testing';
import { AngularMaterialModule } from '../angular-material.module';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
