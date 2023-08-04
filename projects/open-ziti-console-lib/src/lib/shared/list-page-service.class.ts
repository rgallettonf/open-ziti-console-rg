import {inject} from '@angular/core';
import {ZitiDataService} from "../services/ziti-data.service";
import {FilterObj} from "../features/data-table/data-table-filter.service";

export abstract class ListPageServiceClass {

    abstract initTableColumns(): any[];
    abstract getData(filters?: FilterObj[], sort?: any): Promise<any[]>

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

    sort(sortBy, ordering= 'desc') {
        if(this.refreshData) this.refreshData({sortBy, ordering});
    }
}
