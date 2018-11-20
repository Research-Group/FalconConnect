import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { BehaviorSubject } from "rxjs";
import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { ClassmatesService } from "./classmates.service";

@Injectable({
  providedIn: "root"
})
export class RequestsService {
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private classmatesService: ClassmatesService
  ) {}

  requestRef: firebase.firestore.CollectionReference = this.afs.collection(
    "requests"
  ).ref;
  classmatesRef: firebase.firestore.CollectionReference = this.afs.collection(
    "classmates"
  ).ref;

  addRequest(newrequest) {
    return this.requestRef.add({
      sender: this.afauth.auth.currentUser.email,
      reciever: newrequest
    });
  }

  getMyRequests() {
    return this.afs
      .collection("requests", ref =>
        ref.where("reciever", "==", this.afauth.auth.currentUser.email)
      )
      .valueChanges();
  }

  acceptRequest(request) {
    return new Promise(resolve => {
      const query = this.classmatesRef.where(
        "email",
        "==",
        this.afauth.auth.currentUser.email
      );
      const query2 = this.requestRef.where("email", "==", request.email);
      query
        .get()
        .then(snapShot => {
          if (snapShot.empty) {
            this.classmatesRef
              .add({
                email: this.afauth.auth.currentUser.email
              })
              .then(docRef => {
                this.classmatesRef
                  .doc(docRef.id)
                  .collection("myclassmates")
                  .add({
                    email: request.email
                  });
              })
              .then(() => {
                this.classmatesService.getMyClassmates();
              });
          } else {
            this.afs
              .doc("classmates/" + snapShot.docs[0].id)
              .collection("myclassmates")
              .add({
                email: request.email
              });
          }
        })
        .then(() => {
          query2.get().then(snapShot => {
            if (snapShot.empty) {
              this.classmatesRef
                .add({
                  email: request.email
                })
                .then(docRef => {
                  this.classmatesRef
                    .doc(docRef.id)
                    .collection("myclassmates")
                    .add({
                      email: this.afauth.auth.currentUser.email
                    });
                })
                .then(() => {
                  this.classmatesService.getMyClassmates();
                });
            } else {
              this.afs
                .doc("classmates/" + snapShot.docs[0].id)
                .collection("myclassmates")
                .add({
                  email: this.afauth.auth.currentUser.email
                });
            }
          });
        })
        .then(() => {
          this.deleteRequest(request).then(() => {
            resolve(true);
          });
        });
    });
  }

  deleteRequest(request) {
    return new Promise(resolve => {
      const requestColl = this.requestRef;
      const query = requestColl.where("sender", "==", request.email);
      query.get().then(snapShot => {
        snapShot.docs[0].ref.delete().then(() => {
          resolve(true);
        });
      });
    });
  }

  getSentRequests() {
    return this.afs
      .collection("requests", ref =>
        ref.where("sender", "==", this.afauth.auth.currentUser.email)
      )
      .valueChanges();
  }
}
