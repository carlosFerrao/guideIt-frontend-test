import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StocksService } from './stocks.service';
import { SnackBarService } from './snack-bar.service';
import { AngularMaterialModule } from '../angular-material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

const mockStocks = {
  chart: {
    result: [
      {
        meta: {
          currency: 'BRL',
          symbol: 'PETR4.SA',
          exchangeName: 'SAO',
          instrumentType: 'EQUITY',
          firstTradeDate: 946900800,
          regularMarketTime: 1678396078,
          gmtoffset: -10800,
          timezone: 'BRT',
          exchangeTimezoneName: 'America/Sao_Paulo',
          regularMarketPrice: 25.31,
          chartPreviousClose: 25.42,
          priceHint: 2,
          currentTradingPeriod: {
            pre: {
              timezone: 'BRT',
              end: 1678366800,
              start: 1678365900,
              gmtoffset: -10800,
            },
            regular: {
              timezone: 'BRT',
              end: 1678392000,
              start: 1678366800,
              gmtoffset: -10800,
            },
            post: {
              timezone: 'BRT',
              end: 1678395600,
              start: 1678392000,
              gmtoffset: -10800,
            },
          },
          dataGranularity: '1d',
          range: '1d',
          validRanges: [
            '1d',
            '5d',
            '1mo',
            '3mo',
            '6mo',
            '1y',
            '2y',
            '5y',
            '10y',
            'ytd',
            'max',
          ],
        },
        timestamp: [1678396078],
        indicators: {
          quote: [
            {
              close: [25.309999465942383],
              high: [26.229999542236328],
              open: [25.350000381469727],
              volume: [68042300],
              low: [25.280000686645508],
            },
          ],
          adjclose: [{ adjclose: [25.309999465942383] }],
        },
      },
    ],
    error: null,
  },
};

describe('StocksService', () => {
  let service: StocksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksService, SnackBarService],
      imports: [
        HttpClientTestingModule,
        AngularMaterialModule,
        MatSnackBarModule,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(StocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call fetchData', () => {
    spyOn<any>(service, 'getStockDataFromApi').and.returnValue(of(mockStocks));
    service.fetchData();
  });
});
