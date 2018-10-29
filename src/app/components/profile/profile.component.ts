import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LeftSideBarComponent } from '../left-side-bar/left-side-bar.component';
import { SideBarPanelComponent } from '../side-bar-panel/side-bar-panel.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    displayName: '',
    photoURL: ''
  };

  constructor() {

   }

  ngOnInit() {
  }

  updateName() {

  }

  chooseImage() {

  }


}
