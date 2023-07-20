import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-string',
  template: `
      <label for="schema_{{parentage?parentage+'_':''}}{{_idName}}"  [ngStyle]="{'color': labelColor}">{{_fieldName}}</label>
      <input id="schema_{{parentage?parentage+'_':''}}{{_idName}}"
             type="text" class="jsonEntry"
             [placeholder]="placeholder" [(ngModel)]="fieldValue" (keyup)="onKeyup()"/>
  `
})
export class StringComponent {
    _fieldName = 'Field Label';
    _idName = 'fieldname';
    @Input() set fieldName(name: string) {
        this._fieldName = name;
        this._idName = name.replace(/\s/g, '').toLowerCase();
    }
    @Input() fieldValue = '';
    @Input() placeholder = '';
    @Input() parentage: string[] = [];
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
