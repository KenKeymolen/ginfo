import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { GinInventoryComponent } from './components/gin-inventory/gin-inventory.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ProfileOverviewComponent } from './components/profile-overview/profile-overview.component';

@NgModule({
  declarations: [ProfileComponent, GinInventoryComponent, ProfileSettingsComponent, ProfileOverviewComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
