import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageFilterComponent } from './list-page-filter.component';

describe('ListPageFilterComponent', () => {
  let component: ListPageFilterComponent;
  let fixture: ComponentFixture<ListPageFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageFilterComponent]
    });
    fixture = TestBed.createComponent(ListPageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
