import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolAddressPortComponent } from './protocol-address-port.component';

describe('ProtocolAddressPortComponent', () => {
  let component: ProtocolAddressPortComponent;
  let fixture: ComponentFixture<ProtocolAddressPortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtocolAddressPortComponent]
    });
    fixture = TestBed.createComponent(ProtocolAddressPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
