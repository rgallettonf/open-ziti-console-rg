import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-text-list',
  template: `
    <label for="{{parentName?parentName+'_':''}}schema_{{fieldName}}" [ngStyle]="{'color': labelColor}">{{fieldName}}</label>
    <input id="{{parentName?parentName+'_':''}}schema_{{fieldName}}"
           type="text" class="jsonEntry"
           [placeholder]="placeholder" [(ngModel)]="fieldValue" (keyup)="onKeyup()"/>
  `
})
export class TextListComponent {

  @Input() fieldName = 'Field Label';
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
