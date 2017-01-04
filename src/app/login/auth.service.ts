import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  userName: string;
  password: string;
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    console.log('AuthService.login: userName = ' + this.userName);
    return Observable.of(true).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userName = null;
    this.password = null;
  }
}
