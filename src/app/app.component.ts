import { Component, OnInit } from '@angular/core';
import { StocksService } from './services/stocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isExpanded = true;
  showSubmenu = false;
  isShowing = false;
  title = 'guide-tradingview-chart';

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    this.stockService.fetchData();
  }
}
