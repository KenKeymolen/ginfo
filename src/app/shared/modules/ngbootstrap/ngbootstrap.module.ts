import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModalModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NgbPopoverModule,
    NgbModalModule
  ]
})
export class NgbootstrapModule { }
