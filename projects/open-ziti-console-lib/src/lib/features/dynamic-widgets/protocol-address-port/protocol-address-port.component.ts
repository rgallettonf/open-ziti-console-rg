import {Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {Subject} from "rxjs";
import {debounce} from "lodash";

@Component({
  selector: 'lib-protocol-address-port',
  templateUrl: './protocol-address-port.component.html',
  styleUrls: ['./protocol-address-port.component.scss']
})
export class ProtocolAddressPortComponent {
  @Input() protocolValue: any;
  @Input() addressValue: any;
  @Input() portValue: any;
  @Input() parentage: string[] = [];
  @Input() labelColor = '#000000';
  @Output() fieldValueChange = new EventEmitter<any>();
  valueChange = new Subject<any> ();

  update() {
    debounce(() => {
      const data = {
        protocol: this.protocolValue,
        address: this.addressValue,
        port: this.portValue
      }
      this.fieldValueChange.emit(data);
      this.valueChange.next(data);
    }, 500)();
  }

  protocolChange(value: string) {
    this.protocolValue = value;
    this.update();
  }

  addressChange(value: string) {
    this.addressValue = value;
    this.update();
  }

  portChange(value: number) {
    this.portValue = value;
    this.update();
  }
}
