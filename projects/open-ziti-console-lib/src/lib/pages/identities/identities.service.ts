import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {isEmpty} from 'lodash';
import moment from 'moment';
import {SettingsService} from "../../services/settings.service";
import {ZitiDataService} from "../../services/ziti-data.service";
import {FilterObj} from "../../features/data-table/data-table-filter.service";

@Injectable({
    providedIn: 'root'
})
export class IdentitiesService {

    private DEFAULT_PAGING: any = {
        filter: "",
        noSearch: true,
        order: "asc",
        page: 1,
        searchOn: "name",
        sort: "name",
        total: 100
    }
    private paging = this.DEFAULT_PAGING;

    constructor(
        private httpClient: HttpClient,
        private settingsService: SettingsService,
        private dataService: ZitiDataService
    ) {
    }

    async getIdentities(filters?: FilterObj[], sort?: any) {
        this.paging = {...this.DEFAULT_PAGING};
        if(sort) {
            this.paging.sort = sort.sortBy;
            this.paging.order = sort.ordering;
        }
        let nonNameFilters: FilterObj[] = [];
        if(filters) {
            for (let idx = 0; idx < filters.length; idx++) {
                if (filters[idx].columnId === 'name' && filters[idx].value) {
                    this.paging.noSearch = false;
                    this.paging.searchOn = 'name'
                    this.paging.filter = filters[idx].value;
                } else nonNameFilters.push(filters[idx]);
            }
        }
        return this.dataService.get('identities', this.paging, nonNameFilters)
            .then((results: any) => {
            if (!isEmpty(results?.data)) {
                results.data = results.data.map((row) => {
                    row.actionList = ['update', 'override', 'delete'];
                    if (row?.enrollment?.ott) {
                        if (row?.enrollment?.ott?.expiresAt) {
                            const difference = moment(row?.enrollment?.ott?.expiresAt).diff(moment(new Date()));
                            if (difference>0) {
                                row.actionList.push('download-enrollment');
                                row.actionList.push('qr-code');
                            }
                        } else {
                            row.actionList.push('download-enrollment');
                            row.actionList.push('qr-code');
                        }
                    } else if (row?.enrollment?.updb) {
                        if (row?.enrollment?.updb?.expiresAt!=null) {
                            const difference = moment(row?.enrollment?.updb?.expiresAt).diff(moment(new Date()));
                            if (difference > 0) {
                                row.actionList.push('download-enrollment');
                                row.actionList.push('qr-code');
                            }
                        } else {
                            row.actionList.push('download-enrollment');
                            row.actionList.push('qr-code');
                        }
                    }
                    return row;
                });
            }
            return results;
        });
    }
}
