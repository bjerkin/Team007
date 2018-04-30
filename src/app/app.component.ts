import {Component} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {FirebaseApp} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public authService: AuthService) {
    this.authService = authService;
  }



  logout() {
    console.log('logging out');
    // if (this.authService.isUserEmailLoggedIn) {
    this.authService.signOut();
    //  }
  }
}
