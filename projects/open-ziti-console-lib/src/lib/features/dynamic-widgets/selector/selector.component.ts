import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-selector',
  template: `
    <label for="{{parentName?parentName+'_':''}}schema_{{fieldName}}" [ngStyle]="{'color': labelColor}">{{fieldName}}</label>
    <select id="{{parentName?parentName+'_':''}}schema_{{fieldName}}"
           class="jsonEntry"
           [(ngModel)]="fieldValue" (change)="selected()">
        <option value="">{{placeholder}}</option>
        <option *ngFor="let name of valueList" [value]="name">{{name}}</option>
    </select>
`
})
export class SelectorComponent {

  @Input() fieldName = 'Field Label';
  @Input() fieldValue = '';
  @Input() placeholder = '';
  @Input() parentName = '';
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
