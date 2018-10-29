import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPanelComponent } from './side-bar-panel.component';

describe('SideBarPanelComponent', () => {
  let component: SideBarPanelComponent;
  let fixture: ComponentFixture<SideBarPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
