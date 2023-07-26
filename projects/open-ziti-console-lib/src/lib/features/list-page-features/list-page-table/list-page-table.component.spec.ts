import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageTableComponent } from './list-page-table.component';

describe('ListPageTableComponent', () => {
  let component: ListPageTableComponent;
  let fixture: ComponentFixture<ListPageTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageTableComponent]
    });
    fixture = TestBed.createComponent(ListPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
