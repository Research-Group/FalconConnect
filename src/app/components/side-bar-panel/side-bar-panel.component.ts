import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-side-bar-panel',
  templateUrl: './side-bar-panel.component.html',
  styleUrls: ['./side-bar-panel.component.css']
})
export class SideBarPanelComponent implements OnInit {

<<<<<<< HEAD
  profilePanel: boolean = false;
  classes: boolean = false;

=======
>>>>>>> ae798970e8ae37e9d565da9f1aa258fd56f5e8ed
  constructor() {
   }

  ngOnInit() {
  }

  toggle(panel: string) {
<<<<<<< HEAD
    if (panel == 'profilePanel')
      this.profilePanel = !this.profilePanel;
=======
>>>>>>> ae798970e8ae37e9d565da9f1aa258fd56f5e8ed

    var element = document.getElementById(panel);
    element.classList.toggle("show");
  }
}
