import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileOverviewComponent} from './components/profile-overview/profile-overview.component';
import {ProfileSettingsComponent} from './components/profile-settings/profile-settings.component';
import {GinInventoryComponent} from './components/gin-inventory/gin-inventory.component';

const routes: Routes = [
  {path: '', component: ProfileOverviewComponent, pathMatch: 'full'},
  {path: 'overview', component: ProfileOverviewComponent, pathMatch: 'full'},
  {path: 'settings', component: ProfileSettingsComponent, pathMatch: 'full'},
  {path: 'gin-inventory', component: GinInventoryComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
