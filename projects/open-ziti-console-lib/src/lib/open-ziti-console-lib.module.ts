import {APP_INITIALIZER, InjectionToken, Injector, NgModule} from '@angular/core';
import {ZacWrapperComponent} from "./features/wrappers/zac-wrapper.component";
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
import {MatDialogModule} from "@angular/material/dialog";
import {ConfigurationFormComponent} from "./features/projectable-forms/configuration/configuration-form.component";
import {ListPageFormComponent} from './features/list-page-features/list-page-form/list-page-form.component';
import {DataTableComponent} from "./features/data-table/data-table.component";
import {TableCellSelectComponent} from "./features/data-table/cells/table-cell-select/table-cell-select.component";
import {TableColumnSelectComponent} from "./features/data-table/column-headers/table-column-select/table-column-select.component";
import {TableCellMenuComponent} from "./features/data-table/cells/table-cell-menu/table-cell-menu.component";
import {TableColumnMenuComponent} from "./features/data-table/column-headers/table-column-menu/table-column-menu.component";
import {TableColumnDefaultComponent} from "./features/data-table/column-headers/table-column-default/table-column-default.component";
import {TableColumnFilterComponent} from "./features/data-table/column-headers/table-column-filter/table-column-filter.component";
import {IdentityFormComponent} from "./features/projectable-forms/identity/identity-form.component";
import {HiddenColumnsBarComponent} from "./features/data-table/table-hidden-columns-bar/hidden-columns-bar.component";
import {FilterBarComponent} from "./features/data-table/table-filter-bar/filter-bar.component";
import {AgGridModule} from "ag-grid-angular";
import {IdentitiesPageComponent} from "./pages/identities/identities-page.component";
import {ZITI_NAVIGATOR} from "./open-ziti.constants";
import { GrowlerComponent } from './features/messaging/growler.component';
import { ConfirmComponent } from './features/confirm/confirm.component';
import {onAppInit} from "./app.initializer";
import {ClickOutsideModule} from "ng-click-outside";
import {NgJsonEditorModule} from "ang-jsoneditor";

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
        FilterBarComponent,
        ListPageFormComponent,
        IdentitiesPageComponent,
        DataTableComponent,
        TableCellSelectComponent,
        TableColumnSelectComponent,
        TableCellMenuComponent,
        TableColumnMenuComponent,
        TableColumnDefaultComponent,
        TableColumnFilterComponent,
        IdentityFormComponent,
        HiddenColumnsBarComponent,
        FilterBarComponent,
        ExtendableComponent,
        GrowlerComponent,
        ConfirmComponent,
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
        ClickOutsideModule,
        NgJsonEditorModule,
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
        GrowlerComponent,
    ],
    providers: [
        {provide: SHAREDZ_EXTENSION, useClass: ExtensionsNoopService},
        {provide: ZITI_NAVIGATOR, useValue: {}},
        {
            provide: APP_INITIALIZER,
            useFactory: onAppInit,
            deps: [Injector],
            multi: true
        },
    ],
})
export class OpenZitiConsoleLibModule {
}
