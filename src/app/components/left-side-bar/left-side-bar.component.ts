import { ClassesComponent } from './../classes/classes.component';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { app } from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import { SideBarPanelComponent } from '../side-bar-panel/side-bar-panel.component';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  user = {
    displayName: '',
    photoURL: ''
  };
 
  constructor(private sideBarPanel: SideBarPanelComponent, private userService: UserService) { 
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    })
  }

  ngOnInit() {
  }

  toggle(panel) {
    this.sideBarPanel.toggle(panel);
  }

}
