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
import {ClickOutsideModule} from 'ng-click-outside';
import {ZacRoutingModule} from "./zac-routing.module";
import { DataTableComponent } from './data-table/data-table.component';
import {TableCellSelectComponent} from "./data-table/table-cell-select/table-cell-select.component";
import {TableHeaderSelectComponent} from "./data-table/table-header-select/table-header-select.component";
import {TableCellMenuComponent} from "./data-table/table-cell-menu/table-cell-menu.component";
import {TableHeaderMenuComponent} from "./data-table/table-header-menu/table-header-menu.component";
import {TableHeaderDefaultComponent} from "./data-table/table-header-default/table-header-default.component";
import {TableHeaderFilterComponent} from "./data-table/table-header-filter/table-header-filter.component";
import { ZitiIdentityFormComponent } from './ziti-identity-form/ziti-identity-form.component';
import { HiddenColumnsBarComponent } from './hidden-columns-bar/hidden-columns-bar.component';
import { HeaderSearchBarComponent } from './header-search-bar/header-search-bar.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import {ExtendableComponent} from "./features/extendable/extendable.component";
import {ExtensionsNoopService, SHAREDZ_EXTENSION} from "./features/extendable/extensions-noop.service";
import { StringComponent } from './features/dynamic-widgets/string/string.component';
import { NumberComponent } from './features/dynamic-widgets/number/number.component';
import { BooleanComponent } from './features/dynamic-widgets/boolean/boolean.component';
import { ObjectComponent } from './features/dynamic-widgets/object/object.component';
import { SelectorComponent } from './features/dynamic-widgets/selector/selector.component';
import { CheckboxListComponent } from './features/dynamic-widgets/checkbox-list/checkbox-list.component';
import {TextListComponent} from "./features/dynamic-widgets/text-list/text-list.component";
import {ChipsModule} from "primeng/chips";
import { ProtocolAddressPortComponent } from './features/dynamic-widgets/protocol-address-port/protocol-address-port.component';

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
        TableHeaderFilterComponent,
        ZitiIdentityFormComponent,
        HiddenColumnsBarComponent,
        HeaderSearchBarComponent,
        ConfigurationComponent,
        ExtendableComponent,
        StringComponent,
        NumberComponent,
        BooleanComponent,
        ObjectComponent,
        SelectorComponent,
        TextListComponent,
        CheckboxListComponent,
        ProtocolAddressPortComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AgGridModule,
        ZacRoutingModule,
        ClickOutsideModule,
        ChipsModule
    ],
    exports: [
        ZacWrapperComponent,
        SideNavigatorComponent,
        ZitiIdentitiesComponent,
        ZacRoutingModule,
        ConfigurationComponent,
        ExtendableComponent
    ],
    providers: [
        {provide: SHAREDZ_EXTENSION, useClass: ExtensionsNoopService},
    ],
})
export class OpenZitiConsoleModule {
}
