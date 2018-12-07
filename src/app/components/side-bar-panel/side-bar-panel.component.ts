import { element } from 'protractor';
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-side-bar-panel',
  templateUrl: './side-bar-panel.component.html',
  styleUrls: ['./side-bar-panel.component.css']
})
export class SideBarPanelComponent implements OnInit {

  private element;

  constructor() {
   }

  ngOnInit() {
    this.element = document.getElementById("myfriends");
    this.element.classList.add("show");
  }

  toggle(panel: string) {

    this.element = document.getElementById(panel);
    const els = document.getElementsByClassName("hidden");

    if (!this.element.classList.contains("show")) {
      for (var i = 0; i < els.length; i++) {
        els[i].classList.remove("show");
      }
      this.element.classList.add("show");
    }
  }
}
