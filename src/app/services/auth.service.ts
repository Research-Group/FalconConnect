import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { constants } from '../constants';

@Injectable()
export class AuthService {

  private authState: any;

  constructor(private afauth: AngularFireAuth, private afs: AngularFirestore,
    private router: Router) { 
      this.afauth.authState.subscribe((user) => {
        this.authState = user;
      })
    }

    authUser(): boolean {
      return this.authState !== null && this.authState !== undefined ? true : false;
    }

    get currentUserId(): string {
      return this.authState !== null ? this.authState.uid : '';
    }

    signUp(username: string, email: string, password: string) {
      return this.afauth.auth.createUserWithEmailAndPassword(email,
        password).then((user) => {
          this.authState = user;
          this.afauth.auth.currentUser.updateProfile({
            displayName: username,
            photoURL: constants.PROFILE_PICTURE
          }).then(() => {
            this.setUserData(username, email, user.user.photoURL);
          })
        })
    }

    setUserData(username: string, email: string, photoURL: string) {
      const path = `users/${this.currentUserId}`;
      const statuspath = `status/${this.currentUserId}`;
      const userdoc = this.afs.doc(path);
      const status = this.afs.doc(statuspath);
      userdoc.set({
        email: email,
        displayName: username,
        photoURL: photoURL
      });
      status.set({
        email: email,
        status: 'online'
      });
      this.router.navigate(['dashboard']);
    }

    login(email, password) {
      return this.afauth.auth.signInWithEmailAndPassword(email,
        password).then((user) => {
          this.authState = user;
          const status = 'online';
          this.setUserStatus(status);
          const { ipcRenderer } = require('electron');
          ipcRenderer.send('entry-accepted');
          this.router.navigate(["dashboard"]);
        }).catch((error) => {
          console.log(error);
        })
    }

    setUserStatus(status) {
      const statuscollection = this.afs.doc(`status/${this.currentUserId}`);
      const data = {
        status: status
      }
      statuscollection.update(data).catch((error) => {
        console.log(error);
      })
    }
}
