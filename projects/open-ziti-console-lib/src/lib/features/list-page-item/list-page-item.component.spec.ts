import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageItemComponent } from './list-page-item.component';

describe('ListPageItemComponent', () => {
  let component: ListPageItemComponent;
  let fixture: ComponentFixture<ListPageItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageItemComponent]
    });
    fixture = TestBed.createComponent(ListPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
