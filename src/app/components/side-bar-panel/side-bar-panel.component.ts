import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-side-bar-panel',
  templateUrl: './side-bar-panel.component.html',
  styleUrls: ['./side-bar-panel.component.css']
})
export class SideBarPanelComponent implements OnInit {

  profilePanel: boolean = false;
  classes: boolean = false;

  constructor() {
   }

  ngOnInit() {
  }

  toggle(panel: string) {
    if (panel == 'profilePanel')
      this.profilePanel = !this.profilePanel;

    var element = document.getElementById(panel);
    element.classList.toggle("show");
  }
}
