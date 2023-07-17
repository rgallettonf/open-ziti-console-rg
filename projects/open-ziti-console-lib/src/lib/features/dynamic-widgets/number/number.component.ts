import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-number',
  template: `
  <label for="{{parentName?parentName+'_':''}}schema_{{fieldName}}" [ngStyle]="{'color': labelColor}">{{fieldName}}</label>
  <input id="{{parentName?parentName+'_':''}}schema_{{fieldName}}"
       type="number" class="jsonEntry"
       [placeholder]="placeholder" [(ngModel)]="fieldValue" (keyup)="onKeyup()"/>
`
})
export class NumberComponent {

  @Input() fieldName = 'Field Label';
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
