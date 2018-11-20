import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedClassmatesComponent } from './added-classmates.component';

describe('AddedClassmatesComponent', () => {
  let component: AddedClassmatesComponent;
  let fixture: ComponentFixture<AddedClassmatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedClassmatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedClassmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
