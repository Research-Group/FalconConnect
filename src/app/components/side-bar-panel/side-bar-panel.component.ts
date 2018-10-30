import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-side-bar-panel',
  templateUrl: './side-bar-panel.component.html',
  styleUrls: ['./side-bar-panel.component.css']
})
export class SideBarPanelComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
  }

  toggle(panel: string) {

    var element = document.getElementById(panel);
    element.classList.toggle("show");
  }
}
