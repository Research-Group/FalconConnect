import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { BehaviorSubject } from "rxjs";
import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ClassmatesService {
  classmatesCollection: firebase.firestore.CollectionReference = this.afs.collection(
    "classmates"
  ).ref;
  classmatesCollTrigger = new BehaviorSubject<string>("Exists");
  docId: string;

  constructor(private afauth: AngularFireAuth, private afs: AngularFirestore) {}

  getMyClassmates() {
    return new Promise(resolve => {
      const query = this.classmatesCollection.where(
        "email",
        "==",
        this.afauth.auth.currentUser.email
      );
      query.get().then(snapShot => {
        if (!snapShot.empty) {
          this.docId = snapShot.docs[0].id;
          this.classmatesCollTrigger.next("Exists");
          resolve(this.classmatesCollTrigger);
        } else {
          this.classmatesCollTrigger.next("Nothing");
          resolve(this.classmatesCollTrigger);
        }
      });
    });
  }

  getClassmateList() {
    return this.afs
      .doc("classmates/" + this.docId)
      .collection("myclassmates")
      .valueChanges();
  }
}
