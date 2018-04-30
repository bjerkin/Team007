import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../models/user';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import * as admin from 'firebase-admin';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {AppUser} from './app-user';
import {UserService} from './user.service';
import * as firebase from 'firebase';



@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;

//  admin = require('firebase-admin');
//  serviceAccount = require('team7-aa69c-firebase-adminsdk-3ye7i-db3c5cb816.json');
  provider = new firebase.auth.GoogleAuthProvider();

//  user: BehaviorSubject<User> = new BehaviorSubject(null);

  authState: any = null;

  constructor (private afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,
               private userService: UserService ) {
    this.user = afAuth.authState;
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    /*
  constructor(private firebaseAuth: AngularFireAuth, private userStore: Store<{ order: User }>) {
    this.user = firebaseAuth.authState;
  }
 */

   // const serviceAccount = require('team7-aa69c-firebase-adminsdk-3ye7i-29416d1ea2.json');

    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: 'https://team7-aa69c.firebaseio.com'
    // });
    // this.afAuth.authState.subscribe((auth) => {
    //   this.authState = auth;
    // });
   }
   loginWithGo() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   }
   // loginbymail(){
   //   this.afAuth.auth.signInWithEmailAndPassword(document.getElementById('id1'), password).then(sacaakj);
   // }


  // loginGoogle(){firebase.auth().signInWithPopup(this.provider).then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //    var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // ...
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });}

  // logout() {
  //   this.afAuth
  //     .auth
  //     .signOut().then((res) => {
  //     this.userStore.dispatch(new UserActions.LogoutUser());
  //   });
  // }
  // login() {
  //   this.firebaseAuth
  //     .auth
  //     .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
  //     this.userStore.dispatch(new UserActions.GetUser(response.user));
  //   });
  // }


/*admin.initializeApp({
credential: this.admin.credential.cert({
 projectId: '<team7-aa69c>',
 clientEmail: 'firebase-adminsdk-3ye7i@team7-aa69c.iam.gserviceaccount.com',
 privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLGZik6Z14jrQL\ng4qgOtCGS+kaJIg1WJxEbN1DxQ4nALUcuOFU27dHv9EYxKOT2yPYdIm6MqrMQs1y\ntEcqLUL51ctoO8ZjeeNmGO7rcaEm/VYtXSpk3VAqK0MxTHUIQ6u/ktOeBcCJJHN3\nC6igeBcVAe12A7P3z9QNH4pKlnhSna007fZDffwyHetZ4XwovCjtp+jLSwXOEpw8\nXnZ5IcqPQdnLaPK9EZIatqQnAVRWZxErirDakKRF8jDA+nlol9puytX0kvLWongF\nQXpo4qEgLzVvb4kZ2bEdmeGiVIoSufO17CNEOHr6fbqmZSXxJbezQ+u+SnV3Qj0f\n8tUh2XMHAgMBAAECggEAUAHYUPa6kthccsCx5mbk6FKVFDhZ8/HhNU9RZrYE2jZ8\nIkFuerhHHhuhKkmkSsWj/EwESXZWNDsIpewAsMu9u5+ODpSllWBZxUmDLPrJSgu4\nXAx8e9l3D/WU9aGx5LyLtt8HQBPyAdR7K+VK21QTe7ITsk7JIZEcbsMC/lkCM0C4\nTUU9k3J+/U8AWgmXEPcmG+RO3l+Wa6vX5U6deHXTgfH+IBc6Lc+YvndkzuW1LoIX\n7441BUWbOeP1hkhpfv245Gz6hyYGUR9JF40k4h9sG+AnRxbg1ow8s5O+j+CiU7kh\nPd3tXBVOmQhPoQxtKgTWuW/Ovqe5PM7FrNMHlwUlUQKBgQDsE/Awh/05HGFQNPiy\np1d0YG2iHRY6vZjAbIs0EOVMmASoGO/lcoyYRMtm0x093Jbf+8Lhsh37tZ8+Nf+M\ngbbny2FlyQoYQRSFEJhJRBUNXDVKlq+38IoyUw3mRnTMXu5CbS3b2TJBxbGpUK9x\nEs+M/7dxdseT/K13hxBW0yJ0nwKBgQDcPTn+U2ohKNCrWzq9zJLuxI3zAMMKHgdL\nSQ/8o0hmw8UzV6YyUR2i5uI7sE1vHMJf9CeNSBfnG89PIrbxoLYXnQmFjC4J+yCi\nLpjyAZu6Of5E2fAJ/EWEcfQMYN6jaV846h0c43JmUge+x+5YI9t1oikq6tymoeDA\nwyEtiqZAmQKBgQCnv2MkmPyt4CSlwX4WNCJIZ1x/nPt2sdIgqQAg9wB39G0apN2R\nxFtyty9w2QImOuBaN6K6jL4RZXTJ18TGKkW1XybOFJQ/t77E7o3HQcFTxPl5Dqm9\nogYQzENMJTRJJAtY2AuF9EdpxPgAv3xqdFtWbT4EOcqGtTzteeN6TnxlMQKBgQCW\nXDqmtr5DS0FDa/JruCosVwbue3utAZlLPeNrQPLiLhAJIHL38UdBe03DIHeNP144\n8lC6dRjUkLj1NycdSfJnpq/kfDLGX6wE7bk/p/dwqb09tmjZ+GBhrwbGGLCHch4v\nli4wFdx5nNFq38aKaFihNAfVJClmnif6kn2pQPqGKQKBgQCc8N9ae3Fjjhnjikeo\n1+HsGMzlOebnD6asmMvnGxJyW7jMfxgaJTwZ70WUrm/i4wIAvUuXiWEOOstGNgGs\nEBhEfc8Cv08jAj1lurXVMHzJDJbBFhpHUjxHIMXKJ/XFPxylIC8EhDFPwkw7jDvj\nZvTUl9Gaev/kektu5UqhFqnsWA==\n-----END PRIVATE KEY-----\n',
 }),
   databaseURL: 'https://<team7-aa69c>.firebaseio.com'
 });
*/
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId() {
    return (this.authState !== null) ? this.authState.uid : '9V9MFks4LJOefdHcbGn0KZVzrVG3';
  }

  /*resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }*/


  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    return ((this.authState !== null) && (!this.isUserAnonymousLoggedIn));
  }

  signUpWithEmail(email: string, password: string ) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }


  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        return user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
}
