import { element } from 'protractor';
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
  // toggles everything off then opens by ID, so far you cannot click to close and leave pane empty.
  var profile = document.getElementById('profile');
  var classes = document.getElementById('classes');
  if(profile.classList.toggle("show")==true && classes.classList.toggle("show")==true){
    profile.classList.toggle("show");
    classes.classList.toggle("show");
  }
  else if (profile.classList.toggle("show")==true){
  profile.classList.toggle("show");
  }
  else if (classes.classList.toggle("show")==true){
    classes.classList.toggle("show");
  }

  if (panel == 'profile'){
  var element = document.getElementById(panel);
  element.classList.toggle("show");}

  else if (panel == 'classes') {
   // element = document.getElementById('profile');
   // if(element.classList.toggle("show")==true){
   //  element.classList.toggle("show");
   // }
  element = document.getElementById(panel);
  element.classList.toggle("show");



          }

  }
}
