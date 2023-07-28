import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZitiIdentitiesComponent } from './ziti-identities.component';

describe('ZitiIdentitiesComponent', () => {
  let component: ZitiIdentitiesComponent;
  let fixture: ComponentFixture<ZitiIdentitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZitiIdentitiesComponent]
    });
    fixture = TestBed.createComponent(ZitiIdentitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
