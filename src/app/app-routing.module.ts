import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'table-view',
    loadChildren: () =>
      import('./table-view/table-view.module').then(m => m.TableViewModule),
  },
  {
    path: 'chart-view',
    loadChildren: () =>
      import('./chart-view/chart-view.module').then(m => m.ChartViewModule),
  },
  {
    path: '',
    redirectTo: 'table-view',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
