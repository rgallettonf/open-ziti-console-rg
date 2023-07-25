import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableFilterService} from "../services/table-filter.service";

@Component({
  selector: 'lib-header-search-bar',
  templateUrl: './header-search-bar.component.html',
  styleUrls: ['./header-search-bar.component.scss']
})
export class HeaderSearchBarComponent implements OnInit {

  @Input() startCount: any = '-';
  @Input() endCount: any = '-';
  @Input() totalCount: any = '-';
  @Input() filters: any = [];

  @Output() filterRemoved = new EventEmitter();

  filterString = '';

  constructor(private filterService: TableFilterService) {}

  ngOnInit(): void {
    this.filterService.filterChanged.subscribe((event) => {
      this.filters.forEach((filter) => {
        if (event.columnId === 'name') {
          this.filterString = event.value;
        }
      })
    })
  }

  removeFilter(filter) {
    if (filter.columnId === 'name') {
      this.filterString = '';
    }
    const filterObj = {
      filterName: 'name',
      columnId: 'name',
      value: this.filterString,
      label: this.filterString,
    };
    this.filterService.updateFilter(filterObj);
  }

}
