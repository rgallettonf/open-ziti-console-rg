import {Component, OnInit} from '@angular/core';
import {IdentitiesPageService} from "./identities-page.service";
import {DataTableFilterService} from "../../features/data-table/data-table-filter.service";
import {ListPageComponent} from "../../shared/list-page-component.class";
import {TabNameService} from "../../services/tab-name.service";

import {invoke, isEmpty, defer} from 'lodash';
import moment from 'moment';
import $ from 'jquery';

@Component({
  selector: 'lib-identities',
  templateUrl: './identities-page.component.html',
  styleUrls: ['./identities-page.component.scss']
})
export class IdentitiesPageComponent extends ListPageComponent implements OnInit {

  title = 'Identity Management'
  tabs: { url: string, label: string }[] ;

  constructor(
      svc: IdentitiesPageService,
      filterService: DataTableFilterService,
      private tabNames: TabNameService,
  ) {
    super(filterService, svc);
  }

  override ngOnInit() {
    this.tabs = this.tabNames.getTabs('identities');
    this.svc.refreshData = this.refreshData;
    super.ngOnInit();
  }

  headerActionClicked(action: string) {

    switch(action) {
      case 'add':
        this.openUpdate();
        break;
      case 'delete':
        const selectedItems = this.rowData.filter((row) => {
          return row.selected;
        }).map((row) => {
          return row.id;
        });
        this.openBulkDelete(selectedItems)
        break;
      default:
    }
  }

  private openUpdate() {
    $(".adding").show();
    $(".editing").hide();
    window['modal'].show("AddModal");
  }

  private openBulkDelete(selectedItems: any[]) {

  }

  tableAction(event: any) {
    switch(event?.action) {
      case 'toggleAll':
      case 'toggleItem':
        this.itemToggled(event.item)
        break;
      case 'update':
        this.editItem(event.item)
        break;
      case 'override':
        this.getOverrides(event.item)
        break;
      case 'delete':
        this.deleteItem(event.item)
        break;
      case 'download-enrollment':
        this.downloadJWT(event.item)
        break;
      case 'qr-code':
        this.getQRCode(event.item)
        break;
      default:
        break;
    }
  }

  editItem(item: any) {
    window['page']['edit'](item.id);
  }

  getOverrides(item: any) {
    window['page']['getOverrides'](item.id);
  }

  downloadJWT(item: any) {
    window['page']['getCert'](item);
  }

  getQRCode(item: any) {
    window['page']['genQR'](item);
  }

  deleteItem(item: any) {
    window['page']['filterObject']['delete']([item.id]);
  }

}
