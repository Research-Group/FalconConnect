import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import {AngularFireStorage} from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  enteredChat = new Subject();
  currentChatUser;
  firstDocId: string;
  secondDocId: string;

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) { }

 enterChat(user) {
    this.currentChatUser = user;
    this.enteredChat.next(true);
  }
  addNewMsg(newMsg) {
    const collRef = this.afs.collection('conversations').ref;
    const queryRef = collRef.where('myemail', '==', this.afauth.auth.currentUser.email)
                          .where('withWhom', '==', this.currentChatUser.email);
    queryRef.get().then((snapShot) => {
      // first message if chat is not theere
      if (snapShot.empty) {
        this.afs.collection('conversations').add ({
          myemail: this.afauth.auth.currentUser.email,
          withWhom: this.currentChatUser.email
        }) .then((firstDocRef) => {
            this.firstDocId = firstDocRef.id;
            this.afs.collection('conversations').add({
              myemail: this.currentChatUser.email,
              withWhom: this.afauth.auth.currentUser.email
            }) .then((secondDocRef) => {
              this.secondDocId = secondDocRef.id;
              this.afs.collection('messages').add({
                key: Math.floor(Math.random() * 1000000)
              }).then((docRef) => {
                console.log(this.afs.collection);
                this.afs.collection('messages').doc(docRef.id).collection('msgs').add({
                  message: newMsg,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  sentby: this.afauth.auth.currentUser.email

                }).then(() => {
                  console.log(this.afs.collection);
                  this.afs.collection('conversations').doc(this.firstDocId).update({
                    messageId: docRef.id
                  }).then(() => {
                    this.afs.collection('conversations').doc(this.secondDocId).update({
                      messageId: docRef.id
                    }).then(() => {
                      console.log('Check Firestore');
                    });
                  });
                });
              });
            });
        });
      } else {
         this.afs.collection('messages').doc(snapShot.docs[0].data().messageId).collection('msgs').add({
           message: newMsg,
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           sentby: this.afauth.auth.currentUser.email
         }).then(() => {
           console.log('Done from else');
         });
        }
    });
   }
   // gets messages in one on one convo
   getAllMessages() {
     return new Promise((resolve) => {
       const collRef = this.afs.collection('conversations').ref;
       const queryRef = collRef.where('myemail', '==', this.afauth.auth.currentUser.email)
       .where('withWhom', '==', this.currentChatUser.email);

       queryRef.get().then((snapShot) => {
         if (snapShot.empty) {
           resolve(false);
         } else {
           resolve(this.afs.collection('messages').doc(snapShot.docs[0].data().messageId)
           .collection('msgs', ref => ref.orderBy('timestamp')).valueChanges());
         }
       });
     });
   }
}
