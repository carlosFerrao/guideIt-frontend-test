import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result, TStockResponse } from './stock.type';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { SnackBarService } from './snack-bar.service';

export interface StockTable {
  day: string;
  date: string;
  value: string;
  variationYesterday: string;
  variationDayOne: string;
}

export interface StockChart {
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
}

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  url = 'http://localhost:4200/api';
  dates: string[] = [];
  values: string[] = [];
  valuesDifference: string[] = [];
  valuesDiffDayOne: string[] = [];
  stockData: StockTable[] = [];
  stockChartData: number[][] = [];
  private vmEmitter$ = new BehaviorSubject<StockTable[]>({} as []);

  vm$ = this.vmEmitter$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  private getStockDataFromApi(): Observable<TStockResponse> {
    return this.httpClient.get<TStockResponse>(this.url);
  }

  private getDateAndFormat(timestamps: number[]) {
    timestamps.forEach((time) => {
      const dayFormated = new Date(time * 1000).toLocaleDateString();
      this.dates.push(dayFormated);
    });
    this.dates = this.dates.slice(this.dates.length - 30, this.dates.length);
  }

  private calculateStockDiference(values: number[]) {
    let percDiff = '';
    values = values.slice(values.length - 30, values.length);
    values.forEach((res, index) => {
      if (index >= 1) {
        const diff = ((res - values[index - 1]) / values[index - 1]) * 100;
        percDiff = `${parseFloat(diff.toString()).toFixed(2)}%`;
      } else {
        percDiff = '';
      }
      this.valuesDifference.push(percDiff?.toString());
    });
  }

  private calculateDiffDayOne(values: number[]) {
    let percDiff = '';
    values = values.slice(values.length - 30, values.length);
    values.forEach((res, index) => {
      if (index >= 1) {
        const diffFirstDay = ((res - values[0]) / values[0]) * 100;
        percDiff = `${parseFloat(diffFirstDay.toString()).toFixed(2)}%`;
      } else {
        percDiff = '';
      }
      this.valuesDiffDayOne.push(percDiff?.toString());
    });
  }

  private setValues(openValues: number[]) {
    openValues = openValues.slice(openValues.length - 30, openValues.length);
    openValues.forEach((val) => {
      this.values.push(parseFloat(val.toString()).toFixed(2));
    });
  }

  private setStockData() {
    this.dates.forEach((res, index) => {
      this.stockData.push({
        day: (index + 1).toString(),
        date: this.dates[index],
        value: this.values[index],
        variationYesterday: this.valuesDifference[index],
        variationDayOne: this.valuesDiffDayOne[index],
      });
    });
    this.vmEmitter$.next(this.stockData);
  }

  getStockChartData() {
    return this.stockChartData;
  }

  fetchData() {
    this.getStockDataFromApi()
      .pipe(
        map((response) => response.chart.result[0]),
        catchError(() => {
          this.snackBarService.handleHttpError();
          return EMPTY;
        })
      )
      .subscribe((res) => {
        this.getDateAndFormat(res.timestamp);
        this.calculateStockDiference(res.indicators.quote[0].open);
        this.calculateDiffDayOne(res.indicators.quote[0].open);
        this.setValues(res.indicators.quote[0].open);
        this.setStockData();
        this.setChartData(res);
      });
  }

  private setChartData(stockData: Result) {
    const timestamps = this.getLastThirtyDays(stockData.timestamp);
    const open = this.getLastThirtyDays(stockData.indicators.quote[0].open);
    const high = this.getLastThirtyDays(stockData.indicators.quote[0].high);
    const low = this.getLastThirtyDays(stockData.indicators.quote[0].low);
    const close = this.getLastThirtyDays(stockData.indicators.quote[0].close);

    for (let j = 0; j < 30; j++) {
      this.stockChartData.push([
        timestamps[j] * 1000,
        open[j],
        high[j],
        low[j],
        close[j],
      ]);
    }
    return this.stockChartData;
  }

  private getLastThirtyDays(datas: number[]) {
    return datas.slice(datas.length - 30, datas.length);
  }
}
