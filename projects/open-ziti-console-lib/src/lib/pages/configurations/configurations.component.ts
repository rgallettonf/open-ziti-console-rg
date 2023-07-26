import {Component} from '@angular/core';

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
    formTitle = '';
    formSubtitle = '';

    constructor(
        ) {
    }

    headerActionClicked(action: string) {
        switch(action) {
            case 'add':
                this.openUpdate();
                break;
            case 'delete':
                this.openBulkDelete()
                break;
            default:
        }
    }

    private openUpdate(model?: any) {
        if(!model) {
            this.formTitle = 'Create Configuration'
            this.formSubtitle = 'Add a New Configuration by completing this form';
        } else {
            this.formTitle = 'Edit Configuration'
            this.formSubtitle = 'Change Configuration details';
        }
        this.showEditForm = true;
    }

    private openBulkDelete() {

    }

    itemUpdate() {

    }

    showEditForm: any;
}
