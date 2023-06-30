import {NgModule} from '@angular/core';
import {ZacWrapperComponent} from "./zac-wrapper.component";
import {SafePipe} from "./safe.pipe";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ZacRoutingModule} from "./zac-routing.module";

@NgModule({
    declarations: [
        ZacWrapperComponent,
        SafePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ZacRoutingModule
    ],
    exports: [
        ZacWrapperComponent
    ]
})
export class OpenZitiConsoleModule {
}
