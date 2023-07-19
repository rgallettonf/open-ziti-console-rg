import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-text-list',
  template: `
    <label for="schema_{{parentName?parentName+'_':''}}{{_idName}}"  [ngStyle]="{'color': labelColor}">{{_fieldName}}</label>
    <p-chips id="schema_{{parentName?parentName+'_':''}}{{_idName}}"
        (keyup)="onKeyup()"
        [(ngModel)]="fieldValue"
        [allowDuplicate]="false"
        [placeholder]="placeholder"
        [addOnBlur]="true"
        separator=",">
    </p-chips>
 `,
  styleUrls:['./text-list.component.scss'  ]
})
export class TextListComponent {
  _fieldName = 'Field Label';
  _idName = 'fieldname';
  @Input() set fieldName(name: string) {
    this._fieldName = name;
    this._idName = name.replace(/\s/g, '').toLowerCase();
  }
  @Input() fieldValue = '';
  @Input() placeholder = '';
  @Input() parentName = '';
  @Input() labelColor = '#000000';
  @Output() fieldValueChange = new EventEmitter<string>();
  valueChange = new Subject<string> ();

  onKeyup() {
    debounce(() => {
      this.fieldValueChange.emit(this.fieldValue);
      this.valueChange.next(this.fieldValue);
    }, 500)();
  }
}
