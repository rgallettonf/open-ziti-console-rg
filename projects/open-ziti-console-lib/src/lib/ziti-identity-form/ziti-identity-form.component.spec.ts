import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZitiIdentityFormComponent } from './ziti-identity-form.component';

describe('ZitiIdentityFormComponent', () => {
  let component: ZitiIdentityFormComponent;
  let fixture: ComponentFixture<ZitiIdentityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZitiIdentityFormComponent]
    });
    fixture = TestBed.createComponent(ZitiIdentityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
