import { ClassesComponent } from './../classes/classes.component';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { app } from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import { SideBarPanelComponent } from '../side-bar-panel/side-bar-panel.component';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {
  events = [];
  opened = [];
  constructor(private sideBarPanel: SideBarPanelComponent) { }

  ngOnInit() {
  }
open() {

}

toggle() {
  this.sideBarPanel.toggle('classes');
}

}
