import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./table-view.component').then(c => c.TableViewComponent),
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TableViewModule { }
