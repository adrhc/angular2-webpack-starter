import { Component, ViewEncapsulation }        from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
// import { slideInDownAnimation } from '../animations';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
  // host: { '[@routeAnimation]': 'true' },
  // animations: [slideInDownAnimation]
})
export class LoginComponent {
  // @HostBinding('@routeAnimation') routeAnimation = true;

  message: string;

  constructor(public authService: AuthService,
              public router: Router) {
    console.log('constructor LoginComponent: ' + new Date());
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      console.log(this.message);
      this.setMessage();
      console.log('authService.isLoggedIn = ' + this.authService.isLoggedIn);
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        // let navigationExtras: NavigationExtras = {
        //   preserveQueryParams: true,
        //   preserveFragment: true
        // };

        // Redirect the user
        console.log('router going to ' + redirect);
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
