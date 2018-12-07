import { Component, OnInit } from '@angular/core';
import { ClassmatesService } from '../../services/classmates.service';
import { UserService } from '../../services/user.service';
import { User } from 'firebase';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-myfriends',
  templateUrl: './myfriends.component.html',
  styleUrls: ['./myfriends.component.css']
})
export class MyfriendsComponent implements OnInit {

  constructor(private classmatesService: ClassmatesService, private userService: UserService,
    private messagesService: MessagesService) { }

  users;
  statuses = [];
  hello = 'hi';

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.classmatesService.getMyClassmates().then((friends: any) => {
      friends.subscribe((isThere: any) => {

        if (isThere === 'Exists') {
          this.classmatesService.getClassmateList().subscribe((friends) => {
            this.userService.getUserStatus(friends).then((status: any) => {
              this.statuses = status;
            });
            this.userService.getUserDetails(friends).then((friendDetails) => {
              this.users = friendDetails;
              this.userService.updateStatuses();

            });
          });
        }
      });
    });
    this.userService.statusUpdate.subscribe((value) => {
      if (value === 'StatusUpdated') {
        this.userService.getUserStatus(this.users).then((status: any) => {
          this.statuses = status;
        });
      }
    });
  }
  enterChat(user) {
    this.messagesService.enterChat(user);


  }

}
