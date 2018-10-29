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

    signUp(creds) {
      return this.afauth.auth.createUserWithEmailAndPassword(creds.email,
        creds.password).then((user) => {
          this.authState = user;
          this.afauth.auth.currentUser.updateProfile({
            displayName: creds.username,
            photoURL: constants.PROFILE_PICTURE
          }).then(() => {
            this.setUserData(creds.username, creds.email, user.user.photoURL);
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

    login(creds) {
      return this.afauth.auth.signInWithEmailAndPassword(creds.email,
        creds.password).then((user) => {
          this.authState = user;
          const status = 'online';
          this.setUserStatus(status);
          this.router.navigate(['dashboard']);
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

    logout() {
      this.afauth.auth.signOut().then(() => {
        this.router.navigate(['login']);
      }).catch((err) => {
        console.log(err);
      })
    }
}
