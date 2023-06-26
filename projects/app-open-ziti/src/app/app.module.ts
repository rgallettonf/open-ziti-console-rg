import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {OpenZitiConsoleModule} from "open-ziti-console";
import {SettingsService} from "open-ziti-console";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        OpenZitiConsoleModule,
        FormsModule
    ],
  exports: [
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
