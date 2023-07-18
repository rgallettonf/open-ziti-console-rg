import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {

  filterRemoved: EventEmitter<any> = new EventEmitter();
  showTextInput: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
