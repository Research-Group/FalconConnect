import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfriendsComponent } from './myfriends.component';

describe('MyfriendsComponent', () => {
  let component: MyfriendsComponent;
  let fixture: ComponentFixture<MyfriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
