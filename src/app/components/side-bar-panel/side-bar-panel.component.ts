import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-panel',
  templateUrl: './side-bar-panel.component.html',
  styleUrls: ['./side-bar-panel.component.css']
})
export class SideBarPanelComponent implements OnInit {

  public profile: boolean;
  public classes: boolean;

  constructor() {
   }

  ngOnInit() {
  }

  toggle(panel: string) {
    if (panel == 'profile')
      this.profile = true;

    if (panel == 'classes')
      this.classes = true;
  }
}
