import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageFormComponent } from './list-page-form.component';

describe('ListPageItemComponent', () => {
  let component: ListPageFormComponent;
  let fixture: ComponentFixture<ListPageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageFormComponent]
    });
    fixture = TestBed.createComponent(ListPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
