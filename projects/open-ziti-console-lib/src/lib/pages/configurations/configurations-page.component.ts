import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {DataTableFilterService} from "../../features/data-table/data-table-filter.service";
import {ConfigurationsPageService} from "./configurations-page.service";

@Component({
    selector: 'lib-configurations',
    templateUrl: './configurations-page.component.html',
    styleUrls: ['./configurations-page.component.scss']
})
export class ConfigurationsPageComponent implements OnInit {
    title = 'Configuration Management'
    tabs: { url: string, label: string }[] = [
        {label: 'Services', url: '/services'},
        {label: 'Configurations', url: '/configs'},
        {label: 'Config Types', url: '/config-types'},
    ];
    formTitle = '';
    formSubtitle = '';

    showEditForm = false;
    startCount = '-';
    endCount = '-';
    totalCount = '-';
    itemsSelected = false;
    columnDefs: any = [];
    rowData = [];
    filterApplied = false;

    constructor(
        private settings: SettingsService,
        private svc: ConfigurationsPageService,
        private filterService: DataTableFilterService,
    ) {
    }

    ngOnInit() {
        this.svc.refreshData = this.refreshData;
        this.columnDefs = this.svc.initTableColumns();
        this.filterService.clearFilters();
        this.filterService.filtersChanged.subscribe(filters => {
            this.filterApplied = filters && filters.length > 0;
            this.refreshData();
        });
    }

    headerActionClicked(action: string) {
        switch (action) {
            case 'add':
                this.openUpdate();
                break;
            case 'delete':
                this.openBulkDelete()
                break;
            default:
        }
    }

    itemUpdate() {

    }

    tableAction($event: { action: string; item?: any }) {

    }

    refreshData(sort?:{sortBy: string, ordering: string}) {
        this.svc.getData(this.filterService.filters, sort)
            .then((data: any) => {
                this.rowData = data.data
                this.startCount = 1 + '';
                this.endCount = data.meta.pagination.totalCount;
                this.totalCount = data.meta.pagination.totalCount;
            });
    }

    private openUpdate(model?: any) {
        if (!model) {
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
}
