import {inject} from '@angular/core';
import {ZitiDataService} from "../services/ziti-data.service";
import {FilterObj} from "../features/data-table/data-table-filter.service";
import {ValidatorCallback} from "../features/list-page-features/list-page-form/list-page-form.component";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../features/confirm/confirm.component";

export abstract class ListPageServiceClass {

    abstract initTableColumns(): any[];
    abstract getData(filters?: FilterObj[], sort?: any): Promise<any[]>
    abstract validate: ValidatorCallback;

    headerComponentParams = {
        filterType: 'TEXTINPUT',
        enableSorting: true
    };
    
    DEFAULT_PAGING: any = {
        filter: "",
        noSearch: true,
        order: "asc",
        page: 1,
        searchOn: "name",
        sort: "name",
        total: 100
    }
    dataService: ZitiDataService;
    refreshData: (sort: {sortBy: string, ordering: string}) => void | undefined;

    menuItems: any = [];

    dialogRef: any;

    constructor() {
        this.dataService = inject(ZitiDataService);
    }

    getTableData(resourceType: string, paging: any, filters?: FilterObj[], sort?: any): Promise<any> {
        paging = {...this.DEFAULT_PAGING};
        if(sort) {
            paging.sort = sort.sortBy;
            paging.order = sort.ordering;
        }
        let nonNameFilters: FilterObj[] = [];
        if(filters) {
            for (let idx = 0; idx < filters.length; idx++) {
                if (filters[idx].columnId === 'name' && filters[idx].value) {
                    paging.noSearch = false;
                    paging.searchOn = 'name'
                    paging.filter = filters[idx].value;
                } else nonNameFilters.push(filters[idx]);
            }
        }
        return this.dataService.get(resourceType, paging, nonNameFilters);
    }

    removeItems(resourceType: string, ids: string[]) {
        const promises = [];
        ids.forEach((id) => {
            const prom = this.dataService.delete('identities', id);
            promises.push(prom);
        });
        return Promise.all(promises);
    }

    sort(sortBy, ordering= 'desc') {
        if(this.refreshData) this.refreshData({sortBy, ordering});
    }
}
