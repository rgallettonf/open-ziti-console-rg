import {Component, ElementRef, ViewChild} from '@angular/core';
import {IHeaderAngularComp} from 'ag-grid-angular';
import {IHeaderParams} from 'ag-grid-community';

@Component({
  selector: 'app-table-header-select',
  templateUrl: './table-header-select.component.html',
  styleUrls: ['./table-header-select.component.scss'],
})
export class TableHeaderSelectComponent implements IHeaderAngularComp {
  headerParams: any;
  gridApi: any = {
    nfAllToggled: undefined,
  };

  @ViewChild('toggleButton') toggleButton: ElementRef;

  agInit(headerParams: IHeaderParams): void {
    this.headerParams = headerParams;
    this.gridApi = headerParams.api;
  }

  refresh(params: IHeaderParams): boolean {
    return true;
  }

  toggleAll(): void {
    this.gridApi.nfAllToggled = !this.gridApi.nfAllToggled;
    if (this.headerParams.toggleAll) {
      this.headerParams.toggleAll(this.gridApi.nfAllToggled, this.headerParams);
    }
  }
}
