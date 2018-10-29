import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    })
   }

  ngOnInit() {
  }

  updateName() {

  }

  chooseImage() {

  }

}
