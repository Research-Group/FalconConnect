import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassmatesComponent } from './classmates.component';

describe('ClassmatesComponent', () => {
  let component: ClassmatesComponent;
  let fixture: ComponentFixture<ClassmatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassmatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassmatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
