import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-selector',
  template: `
    <label [ngStyle]="{'color': labelColor}">{{_fieldName}}</label>
    <select id="schema_{{parentage?parentage+'_':''}}{{_idName}}"
           class="jsonEntry"
           [(ngModel)]="fieldValue" (change)="selected()">
        <option value="">{{placeholder}}</option>
        <option *ngFor="let name of valueList" [value]="name">{{name}}</option>
    </select>
`
})
export class SelectorComponent {
  _fieldName = 'Field Label';
  _idName = 'fieldname';
  @Input() set fieldName(name: string) {
    this._fieldName = name;
    this._idName = name.replace(/\s/g, '').toLowerCase();
  }
  @Input() fieldValue = '';
  @Input() placeholder = '';
  @Input() parentage: string[] = [];
  @Input() valueList: string[] = [];
  @Input() labelColor = '#000000';
  @Output() fieldValueChange = new EventEmitter<string>();
  valueChange = new Subject<string> ();

  selected() {
    debounce(() => {
      this.fieldValueChange.emit(this.fieldValue);
      this.valueChange.next(this.fieldValue);
    }, 500)();
  }
}
