import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AppUser} from './app-user';

@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {
  }

  save(user: firebase.User) {
    const afsUser = this.afs.doc<AppUser>('users/' + user.uid);

    let appUser: AppUser;
    appUser = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
//      isAdmin: true

    };
   afsUser.update(appUser).catch(() => afsUser.set(appUser));
 }

  get(uid: string): Observable<AppUser> {
    const afsUser = this.afs.doc<AppUser>('users/' + uid);

    return afsUser.valueChanges();
  }

}
