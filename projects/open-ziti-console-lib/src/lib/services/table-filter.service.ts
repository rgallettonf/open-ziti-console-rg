import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {

  filterChanged: EventEmitter<any> = new EventEmitter();
  filterRemoved: EventEmitter<any> = new EventEmitter();
  showTextInput: EventEmitter<any> = new EventEmitter();

  constructor() { }

  updateFilter(event) {
    this.filterChanged.emit(event);
  }
}
