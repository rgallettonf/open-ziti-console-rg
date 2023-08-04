import { Injectable } from '@angular/core';
import {FilterObj} from "../../features/data-table/data-table-filter.service";
import {isEmpty} from "lodash";
import moment from "moment/moment";
import {ListPageServiceClass} from "../../shared/list-page-service.class";
import {
  TableColumnDefaultComponent
} from "../../features/data-table/column-headers/table-column-default/table-column-default.component";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsPageService extends ListPageServiceClass {

  private paging = this.DEFAULT_PAGING;

  constructor() {
    super();
  }

  initTableColumns(): any {
    const createdAtFormatter = (row) => {
      return moment(row?.data?.createdAt).local().format('M/D/YYYY H:MM A');
    }

    return [
      {
        colId: 'name',
        field: 'name',
        headerName: 'Name',
        headerComponent: TableColumnDefaultComponent,
        headerComponentParams: this.headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
        sortable: true,
        filter: true,
        sortColumn: this.sort.bind(this)
      },
      {
        colId: 'type',
        field: 'configType.name',
        headerName: 'Type',
        headerComponent: TableColumnDefaultComponent,
        headerComponentParams: this.headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
        sortable: true,
        filter: true,
        sortColumn: this.sort.bind(this)
      },
      {
        colId: 'createdAt',
        field: 'createdAt',
        headerName: 'Created At',
        headerComponent: TableColumnDefaultComponent,
        headerComponentParams: this.headerComponentParams,
        valueFormatter: createdAtFormatter,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      }
    ];
  }

  getData(filters?: FilterObj[], sort?: any) {
    // we can customize filters or sorting here before moving on...
    return super.getTableData('configs', this.paging, filters, sort)
        .then((results: any) => {
          return this.processData(results);
        });
  }

  private processData(results: any) {
    if (!isEmpty(results?.data)) {
      //pre-process data before rendering
      results.data = this.addActionsPerRow(results);
    }
    return results;
  }

  private addActionsPerRow(results: any) {
    return results.data.map((row) => {
      row.actionList = ['update', 'override', 'delete'];
      if (row?.enrollment?.ott) {
        if (row?.enrollment?.ott?.expiresAt) {
          const difference = moment(row?.enrollment?.ott?.expiresAt).diff(moment(new Date()));
          if (difference > 0) {
            row.actionList.push('download-enrollment');
            row.actionList.push('qr-code');
          }
        } else {
          row.actionList.push('download-enrollment');
          row.actionList.push('qr-code');
        }
      } else if (row?.enrollment?.updb) {
        if (row?.enrollment?.updb?.expiresAt != null) {
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
  }}
