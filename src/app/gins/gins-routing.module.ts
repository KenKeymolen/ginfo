import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GinDetailsComponent} from './components/gin-details/gin-details.component';
import {GinsOverviewComponent} from './components/gins-overview/gins-overview.component';

const routes: Routes = [
  {path: '', component: GinsOverviewComponent, pathMatch: 'full'},
  {path: 'list', component: GinsOverviewComponent, pathMatch: 'full'},
  {path: ':id', component: GinDetailsComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GinsRoutingModule { }
