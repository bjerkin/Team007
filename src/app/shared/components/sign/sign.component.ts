import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {resolve} from 'q';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  form: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    this.form = this.fb.group({
      'email': ['ahmadsadia47@gmail.com', [Validators.required, Validators.email]],
      'password': ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }
  logout(){
    this.authService.signOut();
  }
  // loginGoogle() {
  //   const redirectUrl = this.route.snapshot.queryParamMap.get('about') || '/';
  //   this.authService.loginGoogle().then((result) => {
  //     this.router.navigateByUrl(redirectUrl);
  //   });
  // }
  //  onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
  loginByGo() {
    this.authService.loginWithGo();
  }
//   logByGoogle(){
//     // Build Firebase credential with the Google ID token.
//     var user = firebase.auth().currentUser;
//
//     var id_token = user.getAuthResponse().id_token;
//     var credential = firebase.auth.GoogleAuthProvider.credential(id_token);
//
// // Sign in with credential from the Google user.
//     firebase.auth().signInWithCredential(credential).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
//   }
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
/*  loginGoogle(){
    let redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.auth.loginGoogle().then((result) => {
      this.router.navigateByUrl(redirectUrl)
    });
  }
*/
}
