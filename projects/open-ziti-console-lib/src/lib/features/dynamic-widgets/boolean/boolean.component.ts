import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-boolean',
  template: `
    <label for="{{parentName?parentName+'_':''}}schema_{{fieldName}}"  [ngStyle]="{'color': labelColor}">{{fieldName}}</label>
      <div id="{{parentName?parentName+'_':''}}schema_{{fieldName}}" (click)="toggle()" [ngClass]="{ on: fieldValue }" class="toggle">
        <span class="no" [hidden]="fieldValue">NO</span >
        <span class="yes" [hidden]="!fieldValue">YES</span >
        <div class="switch"></div>
      </div>
  `,
  styles: [
      '.on {background-color: var(--green);}',
      '.toggle .yes, .toggle .no { position: absolute; top:0.4rem; font-size: 0.75rem}',
    '.toggle .yes {left: 0.6rem}',
    '.toggle .no {right: 0.6rem}']
})
export class BooleanComponent {
  @Input() fieldName = 'Field Label';
  @Input() fieldValue = false;
  @Input() parentName = '';
  @Input() labelColor = '#000000';
  @Output() fieldValueChange = new EventEmitter<boolean>();
  valueChange = new Subject<boolean> ();

  toggle() {
    this.fieldValue = !this.fieldValue
    debounce(() => {
      this.fieldValueChange.emit(this.fieldValue);
      this.valueChange.next(this.fieldValue);
    }, 500)();
  }

}
