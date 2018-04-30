// import { Injectable } from '@angular/core';
// import {AngularFireAuth} from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';
// import {Router} from '@angular/router';
//
// //rxjs library
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
//
// @Injectable()
// export class FirebaseService {
//   user: BehaviorSubject<Users> = new BehaviorSubject(null)
//
//   authState: any = null;
//   uid: string[] = ['avM2YmkRm8VzWljLJePyFmrXU5m2'];
//
//   constructor(private afAuth: AngularFireAuth, private appRoutes: Router) {
//     this.afAuth.authState.subscribe((auth) => {
//       this.authState = auth;
//     });
//   }
//
//   get isUserAnonymousLoggedIn(): boolean {
//     return (this.authState !== null) ? this.authState.isAnonymous : false
//   }
//
//   get currentUserId(): string {
//     return (this.authState !== null) ? this.authState.uid : '';
//   }
//
//   get currentUserName(): string {
//     return this.authState['email'];
//   }
//
//   get currentUser(): any {
//     return (this.authState !== null) ? this.authState : null;
//   }
//
//   get isUserEmailLoggedIn(): boolean {
//     if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   signUpWithEmail(email: string, password: string) {
//     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.authState = user;
//       })
//       .catch(error => {
//         console.log('ahmad');
//         throw error;
//       });
//   }
//
//   loginWithEmail(email: string, password: string) {
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.authState = user;
//       })
//       .catch(error => {
//         console.log(error)
//         throw error;
//       });
//   }
//
//   signOut(): void {
//     this.afAuth.auth.signOut();
//    this.appRoutes.navigate(['/']);
//   }
// /*
//   isAdmin() {
//     if (this.fb.user.map(user => {
//     user && uid === 'avM2YmkRm8VzWljLJePyFmrXU5m2'}
//       }
// */
// }
