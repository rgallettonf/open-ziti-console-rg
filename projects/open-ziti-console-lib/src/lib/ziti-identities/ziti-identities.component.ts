import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {SettingsService} from "../services/settings.service";
import {ZitiIdentitiesService} from "./ziti-identities.service";
import {TableHeaderDefaultComponent} from "../data-table/table-header-default/table-header-default.component";

import {invoke, isEmpty, defer} from 'lodash';
import moment from 'moment';
import {TableFilterService} from "../services/table-filter.service";

@Component({
  selector: 'lib-ziti-identities',
  templateUrl: './ziti-identities.component.html',
  styleUrls: ['./ziti-identities.component.scss']
})
export class ZitiIdentitiesComponent implements OnInit {

  startCount = '-';
  endCount = '-';
  totalCount = '-';
  filters = [];
  filterString = '';
  itemsSelected = false;
  columnDefs: any = [];
  columnFilters: any = {
    name: '',
  }

  rowData = [];

  constructor(
    private settings: SettingsService,
    private svc: ZitiIdentitiesService,
    private filterService: TableFilterService,
  ) {
    this.initTableColumns();
  }

  ngOnInit() {
    this.svc.getZitiIdentities().then((data: any) => {
      this.rowData = data.data;
      this.startCount = 1 + '';
      this.endCount = data.meta.pagination.totalCount + '';
      this.totalCount = data.meta.pagination.totalCount + '';
    });
    this.filterService.filterChanged.subscribe(event => {
      let filterAdded = false;
      this.filters = this.filters.map((filter) => {
        if (filter.columnId === event.columnId) {
          filter = event;
          filterAdded = true;
          this.filterString = event.value;
          filter.value = event.value;
          filter.label = event.label;
        }
        return filter;
      });
      this.filters = this.filters.filter((filter) => {
        return !isEmpty(filter.value);
      })
      if (!filterAdded && !isEmpty(event.value)) {
        this.filters.push(event);
      }

      this.svc.getZitiIdentities(event).then((data: any) => {
        this.rowData = data.data
        this.startCount = 1 + '';
        this.endCount = data.meta.pagination.totalCount;
        this.totalCount = data.meta.pagination.totalCount;
      });;
    });
  }

  initTableColumns() {
    const columnFilters = this.columnFilters;
    const headerComponentParams = {
      filterType: 'TEXTINPUT',
      enableSorting: true,
      columnFilters,
    };
    const nameRenderer = (row) => {
      return `<div class="col" data-id="${row?.data?.id}">
                <span class="circle ${row?.data?.hasApiSession}" title="Api Session"></span>
                <span class="circle ${row?.data?.hasEdgeRouterConnection}" title="Edge Router Connected"></span>
                <strong>${row?.data?.name}</strong>
              </div>`
    }

    const osRenderer = (row) => {
      let os = "other";
      let osDetails = "";
      if (row?.data?.envInfo) {
        if (row?.data?.envInfo?.osVersion&&row?.data?.envInfo?.osVersion.toLowerCase().indexOf("windows")>=0) os = "windows";
        else {
          if (row?.data?.envInfo?.os&&row?.data?.envInfo?.os.toLowerCase().indexOf("darwin")>=0) os = "apple";
          else if (row?.data?.envInfo?.os&&row?.data?.envInfo?.os.toLowerCase().indexOf("linux")>=0) os = "linux";
          else if (row?.data?.envInfo?.os&&row?.data?.envInfo?.os.toLowerCase().indexOf("android")>=0) os = "android";
          else if (row?.data?.envInfo?.os&&row?.data?.envInfo?.os.toLowerCase().indexOf("windows")>=0) os = "windows";
        }
        if (row?.data?.envInfo?.os) osDetails += "OS: "+row?.data?.envInfo?.os;
        if (row?.data?.envInfo?.arch) osDetails += "&#10;Arch: "+row?.data?.envInfo?.arch;
        if (row?.data?.envInfo?.osRelease) osDetails += "&#10;Release: "+row?.data?.envInfo?.osRelease;
        if (row?.data?.envInfo?.osVersion) osDetails += "&#10;Version: "+row?.data?.envInfo?.osVersion;
      }
      return `<div class="col desktop" data-id="${row?.data?.id}" style="overflow: unset;">
                <span class="os ${os}" data-balloon-pos="up" aria-label="${osDetails}"></span>
              </div>`
    }

    const sdkRenderer = (row) => {
      let sdk = "";
      let version = "-";
      const sdkInfo = row?.data?.sdkInfo;
      if (sdkInfo) {
        version = "";
        if (sdkInfo?.version) version += sdkInfo?.version;
        if (sdkInfo?.appId) sdk += sdkInfo?.appId;
        if (sdkInfo?.appVersion) sdk += sdkInfo?.appVersion;
        if (sdkInfo?.type) sdk += sdkInfo?.type;
        if (sdkInfo?.type) sdk += "&#10;"+sdkInfo?.branch;
        if (sdkInfo?.revision) sdk += " - "+sdkInfo?.revision;
      }
      return`<div class="col desktop" data-id="${row?.data?.id}" style="overflow: unset;" data-balloon-pos="up" aria-label="${sdk}">
                <span class="oneline">${version}</span>
             </div>`;
    }

    const tokenRenderer = (row) => {
      let enrollment = "N/A";
      const enrollmentData = row?.data?.enrollment;
      if (enrollmentData&&enrollmentData?.ott&&enrollmentData?.ott?.jwt) {
        if (enrollmentData?.ott?.expiresAt!=null) {
          var difference = moment(enrollmentData?.ott?.expiresAt).diff(moment(new Date()));
          if (difference>0) enrollment = '<span class="cert" data-id="'+row?.data?.id+'"></span><span class="qr icon-qr" data-id="'+row?.data?.id+'"></span>';
        } else {
          enrollment = '<span class="cert" data-id="'+row?.data?.id+'"></span><span class="qr icon-qr" data-id="'+row?.data?.id+'"></span>';
        }
      } else {
        if (enrollmentData.updb) {
          if (enrollmentData?.updb?.expiresAt!=null) {
            var difference = moment(enrollmentData?.updb?.expiresAt).diff(moment(new Date()));
            if (difference>0) enrollment = '<span class="cert" data-id="'+row?.data?.id+'"></span><span class="qr icon-qr" data-id="'+row?.data?.id+'"></span>';
          } else {
            enrollment = '<span class="cert" data-id="'+row?.data?.id+'"></span><span class="qr icon-qr" data-id="'+row?.data?.id+'"></span>';
          }
        }
      }

      return `<div class="col desktop notitle">${enrollment}</div>`
    };

    const createdAtFormatter = (row) => {
      return moment(row?.data?.createdAt).local().format('M/D/YYYY H:MM A');
    }

    this.columnDefs = [
      {
        colId: 'name',
        field: 'name',
        headerName: 'Name',
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        resizable: true,
        cellRenderer: nameRenderer,
        cellClass: 'nf-cell-vert-align tCol',
        sortable: true
      },
      {
        colId: 'os',
        field: 'os',
        headerName: 'O/S',
        width: 100,
        cellRenderer: osRenderer,
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      },
      {
        colId: 'sdk',
        field: 'sdk',
        headerName: 'SDK',
        cellRenderer: sdkRenderer,
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      },
      {
        colId: 'type',
        field: 'type.name',
        headerName: 'Type',
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      },
      {
        colId: 'isAdmin',
        field: 'isAdmin',
        headerName: 'Is Admin',
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      },
      {
        colId: 'createdAt',
        field: 'createdAt',
        headerName: 'Created At',
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        valueFormatter: createdAtFormatter,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      },
      {
        colId: 'token',
        field: 'token',
        headerName: 'Token',
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        cellRenderer: tokenRenderer,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      }
    ];
  }

  tableAction(event) {
    switch(event?.action) {
      case 'toggleItem':
        this.toggleItem(event.item)
        break;
      case 'update':
        this.editItem(event.item)
        break;
      case 'toggleItem':
        this.overrideItem(event.item)
        break;
      case 'toggleItem':
        this.deleteItem(event.item)
        break;
      default:
        break;
    }
  }

  toggleItem(item: any) {
    item.selected = !item.selected;
    if (isEmpty(this.rowData)) {
      this.itemsSelected = false;
      return;
    }
    let itemSelected = false;
    this.rowData.forEach((item) => {
      if (item.selected) {
        itemSelected = true;
      }
    });
    this.itemsSelected = itemSelected;
    defer(() => {
      window['app'].setAction();
    });
  }

  editItem(item: any) {
    window['page']['edit'](item.id);
  }

  overrideItem(item: any) {
    window['page']['addOveride'](item.id);
  }

  deleteItem(item: any) {
    window['page']['delete'](item.id);
  }

  actionButtonClicked() {
    window['modal']['show']('AddModal');
  }

  removeFilter(filter) {
    this.updateAppliedFilters();
  }

  updateAppliedFilters() {

  }
}
