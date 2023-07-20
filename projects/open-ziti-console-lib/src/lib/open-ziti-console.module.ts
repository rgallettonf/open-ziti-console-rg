import {NgModule} from '@angular/core';
import {ZacWrapperComponent} from "./zac-wrapper.component";
import {SafePipe} from "./safe.pipe";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ZacRoutingModule} from "./zac-routing.module";
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
import { SideToolbarComponent } from './features/side-toolbar/side-toolbar.component';
import { SideNavbarComponent } from './features/side-navbar/side-navbar.component';
import { SideBannerComponent } from './features/side-banner/side-banner.component';

@NgModule({
    declarations: [
        ZacWrapperComponent,
        SafePipe,
        ConfigurationComponent,
        ExtendableComponent,
        StringComponent,
        NumberComponent,
        BooleanComponent,
        ObjectComponent,
        SelectorComponent,
        TextListComponent,
        CheckboxListComponent,
        ProtocolAddressPortComponent,
        SideToolbarComponent,
        SideNavbarComponent,
        SideBannerComponent
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
        ConfigurationComponent,
        ExtendableComponent,
        SideToolbarComponent,
        SideNavbarComponent,
        SideBannerComponent
    ],
    providers: [
        {provide: SHAREDZ_EXTENSION, useClass: ExtensionsNoopService},
    ],
})
export class OpenZitiConsoleModule {
}
