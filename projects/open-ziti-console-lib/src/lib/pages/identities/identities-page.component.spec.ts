import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentitiesPageComponent } from './identities-page.component';

describe('ZitiIdentitiesComponent', () => {
  let component: IdentitiesPageComponent;
  let fixture: ComponentFixture<IdentitiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentitiesPageComponent]
    });
    fixture = TestBed.createComponent(IdentitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
