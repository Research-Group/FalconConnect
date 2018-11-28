import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { BehaviorSubject } from "rxjs";
import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  currentUser = new BehaviorSubject<firebase.User>(
    this.afauth.auth.currentUser
  );
  statusUpdate = new BehaviorSubject<string>("No");

  constructor(private afauth: AngularFireAuth, private afs: AngularFirestore) {
    this.afauth.authState.subscribe((user: firebase.User) => {
      this.currentUser.next(user);
    });
  }

  getAllUsers() {
    return this.afs
      .collection("users")
      .valueChanges()
      .pipe(
        map(users => {
          users.forEach((element: any, i) => {
            if (element.email == this.afauth.auth.currentUser.email)
              users.splice(i, 1);
          });
          return users;
        })
      );
  }

  getUsers(emails) {
    var userProfiles = [];
    let collRef = this.afs.collection("users").ref;
    emails.forEach(element => {
      const query = collRef.where("email", "==", element.sender);
      query.get().then(snapShot => {
        if (!snapShot.empty) {
          userProfiles.push(snapShot.docs[0].data());
        }
      });
    });
    return userProfiles;
  }

  getUserDetails(users) {
    return new Promise(resolve => {
      var userProfiles = [];
      let collRef = this.afs.collection("users").ref;
      users.forEach((element, i) => {
        const query = collRef.where("email", "==", element.email);
        query.get().then(snapShot => {
          if (!snapShot.empty) {
            userProfiles.push(snapShot.docs[0].data());
          }
        });
      });
      resolve(userProfiles);
    });
  }

  instantSearch(startValue, endValue) {
    return this.afs
      .collection("users", ref =>
        ref
          .orderBy("displayName")
          .startAt(startValue)
          .endAt(endValue)
      )
      .valueChanges()
      .map(users => {
        users.forEach((element: any, i) => {
          if (element.email == this.afauth.auth.currentUser.email)
            users.splice(i, 1);
        });
        return users;
      });
  }

  getUserStatus(users) {
    return new Promise(resolve => {
      let friendStatus = [];
      let statusColl = this.afs.collection("status").ref;

      users.map((element: any, i) => {
          let queryRef = statusColl.where("email", "==", element.email);
          queryRef.get().then(snapShot => {
            friendStatus.push(snapShot.docs[0].data());
            if (i == users.length - 1) {
              resolve(friendStatus);
            }
          });
        })
      });
  }

  updateStatuses() {
    this.afs.collection('status').snapshotChanges(['modified']).subscribe((data) => {
      if (data.length != 0) {
        this.statusUpdate.next('StatusUpdated');
      }
    })
  }
}
