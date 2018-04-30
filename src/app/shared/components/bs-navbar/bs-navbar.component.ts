import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import * as admin from 'firebase-admin';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  form: FormGroup;
  rout: Router;
  authState: any = null;

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private sign_in: string;
  private admin: boolean;
  constructor(public angularfire: AngularFireAuth, private fm: FormBuilder,
              public authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private auth: AuthService) {
    this.form = this.fm.group({
      'email' : ['', [Validators.required, Validators.email]],
      'password':  ['', [Validators.required, Validators.minLength(5)]]
    });
    this.angularfire.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.isLoggedIn = true;
          this.user_displayName = user.displayName;
          this.sign_in = 'Sign Out';

        } else {
          this.isLoggedIn = false;
          this.sign_in = 'Sign In';
        }
      }
    );
  }
  ngOnInit() {
  }
  login(email: string, password: string) {
    return this.angularfire.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error)
        throw error;
      });
  }


  onoff(){
    if(this.isLoggedIn == false){
      this.loginByGo();
      // this.loginbyemail();
    }
    else {
      this.logout();
    }
  }
  logout(){
    this.authService.signOut();
  }

  loginByGo() {
    this.authService.loginWithGo();
  }

  // loginbyemail(){
  //   this.authService.loginbymail();
  // }

  signin() {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    this.authService.loginWithEmail(this.form.controls.email.value, this.form.controls.password.value)
      .then(() => this.router.navigate(['/home']));
  }
  // isadmin(){
  //     return this.auth.user.map((user) => {
  //       if (user /*&& user.isAdmin*/) { this.admin = true; }else{ this.admin = false;
  //       }
  //     });
  // }

}
