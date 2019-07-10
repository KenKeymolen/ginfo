import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgbootstrapModule } from './shared/modules/ngbootstrap/ngbootstrap.module';
import { NgmaterialModule } from './shared/modules/ngmaterial/ngmaterial.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserService} from './services/user.service';
import { HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {AuthService} from './auth/services/auth.service';
import {ToastrModule} from "ngx-toastr";
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomModalComponent } from './shared/components/custom-modal/custom-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminpanelComponent,
    CustomModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbootstrapModule,
    NgmaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [CustomModalComponent],
  exports: []
})
export class AppModule { }
