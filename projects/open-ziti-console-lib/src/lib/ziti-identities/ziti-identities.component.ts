import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {SettingsService} from "../services/settings.service";
import {ZitiIdentitiesService} from "./ziti-identities.service";
import {TableHeaderDefaultComponent} from "../data-table/table-header-default/table-header-default.component";

@Component({
  selector: 'lib-ziti-identities',
  templateUrl: './ziti-identities.component.html',
  styleUrls: ['./ziti-identities.component.scss']
})
export class ZitiIdentitiesComponent implements OnInit {

  columnDefs: any = [];
  columnFilters: any = {
    name: '',
  }

  rowData = [];

  constructor(
    private settings: SettingsService,
    private svc: ZitiIdentitiesService
  ) {
    this.initTableColumns();
  }

  ngOnInit() {
    this.svc.getZitiIdentities().then((data: any) => {
      this.rowData = data.data;
    });
  }

  initTableColumns() {
    const columnFilters = this.columnFilters;
    const headerComponentParams = {
      filterType: 'TEXTINPUT',
      columnFilters,
    };
    this.columnDefs = [
      {
        field: 'name',
        headerComponent: TableHeaderDefaultComponent,
        headerComponentParams,
        resizable: true,
        cellClass: 'nf-cell-vert-align tCol',
      },
      { field: 'type.name', headerName: 'Type' },
      { field: 'isAdmin' },
      { field: 'createdAt' },
      { field: 'token' },
      { field: 'mfa', headerName: 'Type' }
    ];
  }
}
