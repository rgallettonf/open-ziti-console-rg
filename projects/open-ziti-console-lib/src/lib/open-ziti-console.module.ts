import {NgModule} from '@angular/core';
import {ZacWrapperComponent} from "./zac-wrapper.component";
import {SafePipe} from "./safe.pipe";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ZacRoutingModule} from "./zac-routing.module";
import {ExtendableComponent} from "./features/extendable/extendable.component";
import {ExtensionsNoopService, SHAREDZ_EXTENSION} from "./features/extendable/extensions-noop.service";
import { StringInputComponent } from './features/dynamic-widgets/string/string-input.component';
import { NumberInputComponent } from './features/dynamic-widgets/number/number-input.component';
import { BooleanToggleInputComponent } from './features/dynamic-widgets/boolean/boolean-toggle-input.component';
import { ObjectComponent } from './features/dynamic-widgets/object/object.component';
import { SelectorInputComponent } from './features/dynamic-widgets/selector/selector-input.component';
import { CheckboxListInputComponent } from './features/dynamic-widgets/checkbox-list/checkbox-list-input.component';
import {TextListInputComponent} from "./features/dynamic-widgets/text-list/text-list-input.component";
import {ChipsModule} from "primeng/chips";
import { ProtocolAddressPortInputComponent } from './features/dynamic-widgets/protocol-address-port/protocol-address-port-input.component';
import { SideToolbarComponent } from './features/side-toolbar/side-toolbar.component';
import { SideNavbarComponent } from './features/side-navbar/side-navbar.component';
import { SideBannerComponent } from './features/side-banner/side-banner.component';
import { PasswordInputComponent } from './features/dynamic-widgets/password/password-input.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { ListPageHeaderComponent } from './features/list-page-header/list-page-header.component';
import { ListPageFilterComponent } from './features/list-page-filter/list-page-filter.component';
import { ListPageTableComponent } from './features/list-page-table/list-page-table.component';
import {ConfigurationComponent} from "./features/modals/configuration/configuration.component";
import {MatDialogModule} from "@angular/material/dialog";

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
        ConfigurationsComponent,
        ConfigurationComponent,
        ListPageHeaderComponent,
        ListPageFilterComponent,
        ListPageTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ZacRoutingModule,
        ChipsModule
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
        ConfigurationsComponent,
        MatDialogModule
    ],
    providers: [
        {provide: SHAREDZ_EXTENSION, useClass: ExtensionsNoopService},
    ],
})
export class OpenZitiConsoleModule {
}
