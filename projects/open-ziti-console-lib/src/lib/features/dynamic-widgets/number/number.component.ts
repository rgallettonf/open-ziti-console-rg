import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-number',
  template: `
    <label for="schema_{{parentName?parentName+'_':''}}{{_idName}}"  [ngStyle]="{'color': labelColor}">{{_fieldName}}</label>
  <input id="schema_{{parentName?parentName+'_':''}}{{_idName}}"
       type="number" class="jsonEntry"
       [placeholder]="placeholder" [(ngModel)]="fieldValue" (keyup)="onKeyup()"/>
`
})
export class NumberComponent {
  _fieldName = 'Field Label';
  _idName = 'fieldname';
  @Input() set fieldName(name: string) {
    this._fieldName = name;
    this._idName = name.replace(/\s/g, '').toLowerCase();
  }
  @Input() fieldValue: number | undefined;
  @Input() placeholder = '';
  @Input() parentName = '';
  @Input() labelColor = '#000000';
  @Output() fieldValueChange = new EventEmitter<number| undefined>();
  valueChange = new Subject<number| undefined> ();

  onKeyup() {
    debounce(() => {
      this.fieldValueChange.emit(this.fieldValue);
      this.valueChange.next(this.fieldValue);
    }, 500)();
  }
}
