import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsPageComponent } from './configurations-page.component';

describe('ConfigurationsComponent', () => {
  let component: ConfigurationsPageComponent;
  let fixture: ComponentFixture<ConfigurationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationsPageComponent]
    });
    fixture = TestBed.createComponent(ConfigurationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
