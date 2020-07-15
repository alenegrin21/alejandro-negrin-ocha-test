import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsListComponent } from './views/reports-list/reports-list.component';


const routes: Routes = [
  {
    path: '',
    component: ReportsListComponent
  },
  {
    path: '**',
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
