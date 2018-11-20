import { Component, OnInit } from "@angular/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "../../services/user.service";
import { RequestsService } from "../../services/requests.service";
import { MatSnackBar } from "@angular/material";
import { ClassmatesService } from "../../services/classmates.service";
import { Observable, Subject } from "rxjs/Rx";

@Component({
  selector: "app-classmates",
  templateUrl: "./classmates.component.html",
  styleUrls: ["./classmates.component.css"]
})
export class ClassmatesComponent implements OnInit {
  users;
  backupUsers;
  startAt = new Subject();
  endAt = new Subject();
  classmates = [];
  requested = [];
  sent = [];

  myClassmates = [];
  receivedRequests = [];
  sentRequests = [];

  faPlus = faPlus;

  constructor(
    private userService: UserService,
    private requestsService: RequestsService,
    private classmatesService: ClassmatesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: any) => {
      this.backupUsers = users;
      this.classmatesService.getMyClassmates().then((response: any) => {
        response.subscribe(user => {
          if (user == "Exists") {
            this.classmatesService
              .getClassmateList()
              .subscribe((classmates: any) => {
                this.myClassmates = classmates;
                if (classmates) {
                  this.classmates = [];
                  let flag = 0;
                  users.map((userElement, i) => {
                    classmates.forEach(classmateElement => {
                      if (userElement.email == classmateElement.email) {
                        flag += 1;
                      }
                    });
                    if (flag == 1) {
                      this.classmates[i] = true;
                      flag = 0;
                    } else {
                      this.classmates[i] = false;
                      flag = 0;
                    }
                  });
                } else {
                  users.map((userElement, i) => {
                    this.classmates[i] = false;
                  });
                }
              });
          }
        });
      });

      this.requestsService.getMyRequests().subscribe((requests: any) => {
        let flag = 0;
        this.receivedRequests = requests;
        this.requested = [];
        users.forEach((userElement, i) => {
          requests.forEach(requestElement => {
            if (userElement.email == requestElement.sender) {
              flag += 1;
            }
          });
          if (flag == 1) {
            this.requested[i] = true;
            flag = 0;
          } else {
            this.requested[i] = false;
            flag = 0;
          }
        });
      });
      this.requestsService.getSentRequests().subscribe((requests: any) => {
        let flag = 0;
        this.sentRequests = requests;
        this.sent = [];
        users.forEach((userElement, i) => {
          requests.forEach(requestElement => {
            if (userElement.email == requestElement.receiver) {
              flag += 1;
            }
          });
          if (flag == 1) {
            this.sent[i] = true;
            flag = 0;
          } else {
            this.sent[i] = false;
            flag = 0;
          }
        });
      });
      this.users = users;
    });
  }

  addClassmate(user) {
    this.requestsService.addRequest(user.email).then(() => {
      this.snackBar.open("Request Sent", "Okay", { duration: 3000 });
    });
  }

  instantSearchFilter(users) {
    if (this.myClassmates) {
      this.classmates = [];
      this.requested = [];
      this.sent = [];
      let flag1 = 0;
      let flag2 = 0;
      let flag3 = 0;

      users.map((userElement, i) => {
        this.myClassmates.forEach(classmateElement => {
          if (userElement.email == classmateElement.email) {
            flag1 += 1;
          }
        });
        if (flag1 == 1) {
          this.classmates[i] = true;
          flag1 = 0;
        } else {
          this.classmates[i] = false;
          flag1 = 0;
        }
        this.receivedRequests.forEach(requestElement => {
          if (userElement.email == requestElement.sender) {
            flag2 += 1;
          }
        });
        if (flag2 == 1) {
          this.requested[i] = true;
          flag2 = 0;
        } else {
          this.requested[i] = false;
          flag2 = 0;
        }
        this.sentRequests.forEach(requestElement => {
          if (userElement.email == requestElement.sender) {
            flag3 += 1;
          }
        });
        if (flag3 == 1) {
          this.requested[i] = true;
          flag3 = 0;
        } else {
          this.requested[i] = false;
          flag3 = 0;
        }
      });
    } else {
      users.map((userElement, i) => {
        this.classmates[i] = false;
      });
    }
  }

  instantSearch($event) {
    let q = $event.target.value;
    if (q != "") {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
      Observable.combineLatest(this.startAt, this.endAt)
        .take(1)
        .subscribe(value => {
          this.userService
            .instantSearch(value[0], value[1])
            .take(1)
            .subscribe(users => {
              this.instantSearchFilter(users);
              this.users = users;
            });
        });
    } else {
      this.instantSearchFilter(this.backupUsers);
      this.users = this.backupUsers;
    }
  }

  canShow(index) {
    if (this.classmates[index]) return false;
    else if (this.requested[index]) return false;
    else if (this.sent[index]) return false;
    else return true;
  }
}
