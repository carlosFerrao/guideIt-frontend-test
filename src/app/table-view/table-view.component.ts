import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, HttpClientModule],
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  private stockService = inject(StocksService);
  displayedColumns: string[] = [
    'day',
    'date',
    'value',
    'variationYesterday',
    'variationDayOne',
  ];
  data$ = this.stockService.vm$;
}
