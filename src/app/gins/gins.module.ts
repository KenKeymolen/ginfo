import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GinsRoutingModule } from './gins-routing.module';
import { GinsComponent } from './gins/gins.component';
import { GinsOverviewComponent } from './components/gins-overview/gins-overview.component';
import { GinDetailsComponent } from './components/gin-details/gin-details.component';
import { NgmaterialModule } from '../shared/modules/ngmaterial/ngmaterial.module';

@NgModule({
  declarations: [GinsComponent, GinsOverviewComponent, GinDetailsComponent],
  imports: [
    CommonModule,
    GinsRoutingModule,
    NgmaterialModule
  ]
})
export class GinsModule { }
