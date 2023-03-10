import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./chart-view.component').then((c) => c.ChartViewComponent),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ChartViewModule {}
