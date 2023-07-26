import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {OpenZitiConsoleLibModule, SettingsService, ZITI_DOMAIN_CONTROLLER} from "open-ziti-console-lib";
import {AppRoutingModule} from "./app-routing.module";
import {SimpleZitiDomainControllerServic} from "./services/simple-ziti-domain-controller.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        AppRoutingModule,
        OpenZitiConsoleLibModule,
    ],
    exports: [],
    providers: [SettingsService,
        {provide: ZITI_DOMAIN_CONTROLLER, useClass: SimpleZitiDomainControllerServic}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
