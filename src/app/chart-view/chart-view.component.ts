import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';

import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorZigzag from 'highcharts/indicators/zigzag';
import { StocksService } from '../services/stocks.service';
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);

@Component({
  selector: 'app-chart-view',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss'],
})
export class ChartViewComponent {
  private stockService = inject(StocksService);
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      height: 500,
      width: 1000,
    },
    series: [
      {
        type: 'ohlc',
        id: 'base',
        pointInterval: 24 * 3600 * 1000,
        data: this.stockService.getStockChartData(),
      },
      {
        type: 'zigzag',
        showInLegend: false,
        linkedTo: 'base',
        name: 'PETR4.SA',
      },
    ],
  };
}
