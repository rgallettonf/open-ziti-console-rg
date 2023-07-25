import { Component } from '@angular/core';
import {ConfigurationComponent} from "../../features/modals/configuration/configuration.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'lib-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent {
    title = 'Configuration Management'
    tabs: { url: string, label: string }[] = [
        {label: 'Services', url:'/services'},
        {label: 'Configurations', url:'/configs'},
        {label: 'Config Types', url:'/config-types'},
    ];
    model: any = {};

    constructor(
        private dialogForm: MatDialog
        ) {
    }

    headerActionClicked(action: string) {
        switch(action) {
            case 'add':
                this.openCreate();
                break;
            case 'delete':
                this.openBulkDelete()
                break;
            default:
        }
    }

    private openCreate() {
        const dialogRef = this.dialogForm.open(ConfigurationComponent, {
            data: {
                model: this.model,
            },
            minHeight: '100%',
            minWidth: '100%',
            height: '100%',
            width: '100%',
        });

    }

    private openBulkDelete() {

    }
}
