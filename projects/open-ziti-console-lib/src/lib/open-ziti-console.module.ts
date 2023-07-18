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
import { DataTableComponent } from './data-table/data-table.component';
import {TableCellSelectComponent} from "./data-table/table-cell-select/table-cell-select.component";
import {TableHeaderSelectComponent} from "./data-table/table-header-select/table-header-select.component";
import {TableCellMenuComponent} from "./data-table/table-cell-menu/table-cell-menu.component";
import {TableHeaderMenuComponent} from "./data-table/table-header-menu/table-header-menu.component";
import {TableHeaderDefaultComponent} from "./data-table/table-header-default/table-header-default.component";
import {TableHeaderFilterComponent} from "./data-table/table-header-filter/table-header-filter.component";

@NgModule({
    declarations: [
        ZacWrapperComponent,
        SafePipe,
        SideNavigatorComponent,
        ZitiIdentitiesComponent,
        DataTableComponent,
        TableCellSelectComponent,
        TableHeaderSelectComponent,
        TableCellMenuComponent,
        TableHeaderMenuComponent,
        TableHeaderDefaultComponent,
        TableHeaderFilterComponent
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
        ZitiIdentitiesComponent,
    ]
})
export class OpenZitiConsoleModule {
}
