import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-table-header-filter',
  templateUrl: './table-header-filter.component.html',
  styleUrls: ['./table-header-filter.component.scss'],
})
export class TableHeaderFilterComponent implements OnInit, AfterViewInit {
  @Input() type = 'TEXTINPUT';
  @Input() filterString = '';
  @Input() filterName = '';
  @Input() columnId;
  @Input() applyFilter;
  @Input() columnFilters;
  @Input() openStatusMenu;
  @Input() dateFilter: any = '24h';
  timeSearch = '24h';

  setFilterDebounced;

  @ViewChild('filterInput') filterInput: ElementRef;

  ngOnInit(): void {
      this.setFilterDebounced = _.debounce(this.setFilter, 500);
      this.filterString = _.get(this.columnFilters, this.columnId);
  }

  setFilter(event): void {
    _.set(this.columnFilters, this.columnId, this.filterString);
    const filterObj = {
      filterName: this.filterName,
      columnId: this.columnId,
      value: this.filterString,
      label: this.filterString,
    };
    this.applyFilter(event, filterObj);
  }


  ngAfterViewInit() {
    this.filterInput.nativeElement.focus();
  }

  statusClicked(event) {
    if (event && this.openStatusMenu) {
      event.statusFilter = true;
      this.openStatusMenu(event);
    }
  }

}
