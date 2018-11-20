import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RequestsService } from '../../services/requests.service';
import { MatSnackBar } from '@angular/material';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests;

  faCheck = faCheck;
  faBan = faBan;

  constructor(private userService: UserService, private requestsService: RequestsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.requestsService.getMyRequests().subscribe((requests) => {
      this.requests = this.userService.getUsers(requests);
    })
  }

  acceptRequest(request) {
    this.requestsService.acceptRequest(request).then(() => {
      this.snackBar.open('Request Accepted', 'Okay', { duration: 3000 });
    })
  }

  deleteRequest(request) {
    this.requestsService.deleteRequest(request).then(() => {
      this.snackBar.open('Request Deleted', 'Okay', { duration: 3000 });
    })
  }
}
