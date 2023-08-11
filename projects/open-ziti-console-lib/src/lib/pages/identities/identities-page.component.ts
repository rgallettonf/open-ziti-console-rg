import {Component, OnInit} from '@angular/core';
import {IdentitiesPageService} from "./identities-page.service";
import {DataTableFilterService} from "../../features/data-table/data-table-filter.service";
import {ListPageServiceClass} from "../../shared/list-page-service.class";
import {ListPageComponent} from "../../shared/list-page-component.class";
import {TabNameService} from "../../services/tab-name.service";



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

  headerActionClicked(action: string) {
    switch (action) {
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

  private openUpdate() {

  }

  private openBulkDelete(selectedItems: any[]) {

  }
}
