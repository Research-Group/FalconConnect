import { ClassesComponent } from './../classes/classes.component';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { app } from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import { SideBarPanelComponent } from '../side-bar-panel/side-bar-panel.component';
import { UserService } from '../../services/user.service';
import { faUsers, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  private element;

  user = {
    displayName: '',
    photoURL: ''
  };

  faUsers = faUsers;
  faUser = faUser;
  faCog = faCog;

  constructor(private sideBarPanel: SideBarPanelComponent, private userService: UserService) {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  toggle(panel: string) {

    this.sideBarPanel.toggle(panel);

    if (this.sideBarPanel.toggle(panel) !== true) {
      this.element = document.getElementById(panel);
      const els = document.getElementsByClassName('orange');

      if (!this.element.classList.contains('selected')) {
        for (let i = 0; i < els.length; i++) {
          els[i].classList.remove('selected');
        }
        this.element.classList.add('selected');
      }
    }

    return;
  }
}
