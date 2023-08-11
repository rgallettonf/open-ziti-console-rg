import {InjectionToken, NgModule} from '@angular/core';
import {ZacWrapperComponent} from "./zac-wrapper.component";
import {SafePipe} from "./safe.pipe";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ZacRoutingModule} from "./zac-routing.module";
import {ExtendableComponent} from "./features/extendable/extendable.component";
import {ExtensionsNoopService, SHAREDZ_EXTENSION} from "./features/extendable/extensions-noop.service";
import {StringInputComponent} from './features/dynamic-widgets/string/string-input.component';
import {NumberInputComponent} from './features/dynamic-widgets/number/number-input.component';
import {BooleanToggleInputComponent} from './features/dynamic-widgets/boolean/boolean-toggle-input.component';
import {ObjectComponent} from './features/dynamic-widgets/object/object.component';
import {SelectorInputComponent} from './features/dynamic-widgets/selector/selector-input.component';
import {CheckboxListInputComponent} from './features/dynamic-widgets/checkbox-list/checkbox-list-input.component';
import {TextListInputComponent} from "./features/dynamic-widgets/text-list/text-list-input.component";
import {ChipsModule} from "primeng/chips";
import {
    ProtocolAddressPortInputComponent
} from './features/dynamic-widgets/protocol-address-port/protocol-address-port-input.component';
import {SideToolbarComponent} from './features/sidebars/side-toolbar/side-toolbar.component';
import {SideNavbarComponent} from './features/sidebars/side-navbar/side-navbar.component';
import {SideBannerComponent} from './features/sidebars/side-banner/side-banner.component';
import {PasswordInputComponent} from './features/dynamic-widgets/password/password-input.component';
import {ConfigurationsPageComponent} from './pages/configurations/configurations-page.component';
import {ListPageHeaderComponent} from './features/list-page-features/list-page-header/list-page-header.component';
import {ListPageFilterComponent} from './features/list-page-features/list-page-filter/list-page-filter.component';
import {ListPageTableComponent} from './features/list-page-features/list-page-table/list-page-table.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ConfigurationFormComponent} from "./features/projectable-forms/configuration/configuration-form.component";
import {ListPageFormComponent} from './features/list-page-features/list-page-form/list-page-form.component';
import {DataTableComponent} from "./data-table/data-table.component";
import {TableCellSelectComponent} from "./data-table/table-cell-select/table-cell-select.component";
import {TableHeaderSelectComponent} from "./data-table/table-header-select/table-header-select.component";
import {TableCellMenuComponent} from "./data-table/table-cell-menu/table-cell-menu.component";
import {TableHeaderMenuComponent} from "./data-table/table-header-menu/table-header-menu.component";
import {TableHeaderDefaultComponent} from "./data-table/table-header-default/table-header-default.component";
import {TableHeaderFilterComponent} from "./data-table/table-header-filter/table-header-filter.component";
import {IdentityFormComponent} from "./features/projectable-forms/identity/identity-form.component";
import {HiddenColumnsBarComponent} from "./features/list-page-features/hidden-columns-bar/hidden-columns-bar.component";
import {HeaderSearchBarComponent} from "./features/list-page-features/header-search-bar/header-search-bar.component";
import {AgGridModule} from "ag-grid-angular";
import {ClickOutsideModule} from 'ng-click-outside';
import {IdentitiesPageComponent} from "./pages/identities/identities-page.component";

export const ZITI_URLS = new InjectionToken<string>('ZITI_URLS');
export const ZITI_NAVIGATOR = new InjectionToken<string>('ZITI_NAVIGATOR');

@NgModule({
    declarations: [
        ZacWrapperComponent,
        SafePipe,
        ExtendableComponent,
        StringInputComponent,
        NumberInputComponent,
        BooleanToggleInputComponent,
        ObjectComponent,
        SelectorInputComponent,
        TextListInputComponent,
        CheckboxListInputComponent,
        ProtocolAddressPortInputComponent,
        SideToolbarComponent,
        SideNavbarComponent,
        SideBannerComponent,
        PasswordInputComponent,
        ConfigurationFormComponent,
        ConfigurationsPageComponent,
        ListPageHeaderComponent,
        ListPageFilterComponent,
        ListPageTableComponent,
        ListPageFormComponent,
        IdentitiesPageComponent,
        DataTableComponent,
        TableCellSelectComponent,
        TableHeaderSelectComponent,
        TableCellMenuComponent,
        TableHeaderMenuComponent,
        TableHeaderDefaultComponent,
        TableHeaderFilterComponent,
        IdentityFormComponent,
        HiddenColumnsBarComponent,
        HeaderSearchBarComponent,
        ExtendableComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        ZacRoutingModule,
        ChipsModule,
        AgGridModule,
        ChipsModule,
        ClickOutsideModule
    ],
    exports: [
        ZacWrapperComponent,
        ExtendableComponent,
        SideToolbarComponent,
        SideNavbarComponent,
        SideBannerComponent,
        StringInputComponent,
        SelectorInputComponent,
        PasswordInputComponent,
        NumberInputComponent,
        BooleanToggleInputComponent,
        ObjectComponent,
        TextListInputComponent,
        CheckboxListInputComponent,
        ProtocolAddressPortInputComponent,
        ConfigurationsPageComponent,
        ConfigurationFormComponent,
        IdentitiesPageComponent,
        ZacRoutingModule,
    ],
    providers: [
        {provide: SHAREDZ_EXTENSION, useClass: ExtensionsNoopService},
    ],
})
export class OpenZitiConsoleLibModule {
}
