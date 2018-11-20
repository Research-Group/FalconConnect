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
}
