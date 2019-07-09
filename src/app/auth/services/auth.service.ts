import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: AuthUser;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.user.subscribe(res => {
      if (res !== null) {
        this.user = {username: '', uId: '', email: ''};
        this.user.username = res.displayName;
        this.user.email = res.email;
        this.user.uId = res.uid;
        console.log(res);
      } else {
        this.user = null;
      }
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.router.navigateByUrl('/');
          resolve(res);
        }, err => reject(err));
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          res.user.updateProfile({displayName: value.username}).then(res => {
            this.router.navigateByUrl('/');
          });
          resolve(res);
        }, err => reject(err));
    });
  }

  isLoggedIn() {
    this.afAuth.user.subscribe(res => {
      console.log('User: ', res);
    });
    this.afAuth.authState.subscribe( res => {
      console.log('AuthState: ', res);
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.router.navigateByUrl('/');
    });
  }
}

export interface AuthUser {
  username: string;
  email: string;
  uId: string;
}
