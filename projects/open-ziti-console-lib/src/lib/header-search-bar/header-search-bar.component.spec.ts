import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearchBarComponent } from './header-search-bar.component';

describe('HeaderSearchBarComponent', () => {
  let component: HeaderSearchBarComponent;
  let fixture: ComponentFixture<HeaderSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSearchBarComponent]
    });
    fixture = TestBed.createComponent(HeaderSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
