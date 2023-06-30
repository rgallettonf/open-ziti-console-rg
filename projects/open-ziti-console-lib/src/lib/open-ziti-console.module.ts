import {NgModule} from '@angular/core';
import {ZacWrapperComponent} from "./zac-wrapper.component";
import {SafePipe} from "./safe.pipe";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SideNavigatorComponent} from './side-navigator/side-navigator.component';
import {RouterModule} from "@angular/router";
import {ZitiIdentitiesComponent} from './ziti-identities/ziti-identities.component';
import {AgGridModule} from "ag-grid-angular";
import {ZacRoutingModule} from "./zac-routing.module";

@NgModule({
    declarations: [
        ZacWrapperComponent,
        SafePipe,
        SideNavigatorComponent,
        ZitiIdentitiesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AgGridModule,
        ZacRoutingModule
    ],
    exports: [
        ZacWrapperComponent,
        SideNavigatorComponent,
        ZitiIdentitiesComponent
    ]
})
export class OpenZitiConsoleModule {
}
