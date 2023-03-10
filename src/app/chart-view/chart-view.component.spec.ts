import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StocksService } from '../services/stocks.service';

import { ChartViewComponent } from './chart-view.component';

describe('ChartViewComponent', () => {
  let component: ChartViewComponent;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<ChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartViewComponent, HttpClientTestingModule, MatSnackBarModule],
      providers: [StocksService, HttpClient],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
