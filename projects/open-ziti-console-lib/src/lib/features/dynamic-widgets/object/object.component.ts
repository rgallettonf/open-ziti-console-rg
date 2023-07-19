import {Component, Input, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'lib-object',
  template: `
    <label for="schema_{{parentName?parentName+'_':''}}{{_idName}}"  [ngStyle]="{'color': labelColor}">{{_fieldName}}</label>
    <div id="schema_{{parentName?parentName+'_':''}}{{_idName}}" class="wrapper" [ngStyle]="{'background-color': bcolor}">
      <ng-container #wrappercontents></ng-container>
    </div>
  `,
  styles: ['.wrapper { border-radius: 0.5rem; min-height: 1rem; padding:1rem }']
})
export class ObjectComponent {
  @ViewChild("wrappercontents", {read: ViewContainerRef, static: true}) public wrapperContents!: ViewContainerRef;
  _fieldName = 'Field Label';
  _idName = 'fieldname';
  @Input() set fieldName(name: string) {
    this._fieldName = name;
    this._idName = name.replace(/\s/g, '').toLowerCase();
  }
  @Input() parentName = '';
  @Input() bcolor = '#33aaff'
  @Input() labelColor = '#000000';
}
