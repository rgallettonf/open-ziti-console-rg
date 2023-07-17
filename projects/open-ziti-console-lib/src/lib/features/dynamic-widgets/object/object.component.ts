import {Component, Input, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'lib-object',
  template: `
    <label for="{{parentName?parentName+'_':''}}schema_{{fieldName}}" [ngStyle]="{'color': labelColor}">{{fieldName}}</label>
    <div id="{{parentName?parentName+'_':''}}schema_{{fieldName}}" class="wrapper" [ngStyle]="{'background-color': bcolor}">
      <ng-container #wrappercontents></ng-container>
    </div>
  `,
  styles: ['.wrapper { border-radius: 0.5rem; min-height: 1rem; padding:1rem }']
})
export class ObjectComponent {
  @ViewChild("wrappercontents", {read: ViewContainerRef}) public wrapperContents!: ViewContainerRef;
  @Input() fieldName = 'Field Label';
  @Input() parentName = '';
  @Input() bcolor = '#33aaff'
  @Input() labelColor = '#000000';
}
