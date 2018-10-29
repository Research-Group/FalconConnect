import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-panel',
  templateUrl: './side-bar-panel.component.html',
  styleUrls: ['./side-bar-panel.component.css']
})
export class SideBarPanelComponent implements OnInit {

  private panel;

  constructor() { }

  ngOnInit() {
  }

  toggle(name) {

    console.log(this.panel.name);
    this.panel.name = name;
  }
}
