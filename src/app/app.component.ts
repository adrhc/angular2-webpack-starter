/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { AuthService } from './login/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
    <span [hidden]="!authService.isLoggedIn">
      <span>
        <a [routerLink]=" ['./login'] " routerLinkActive="active">
          {{ authService.isLoggedIn ? 'Logout' : 'Login' }}
        </a>
      </span>
    </span>
      <span>
        <a [routerLink]=" ['./home'] " routerLinkActive="active">
          Home
        </a>
      </span>
      <span>
        <a [routerLink]=" ['./detail'] " routerLinkActive="active">
          Detail
        </a>
      </span>
      <span>
        <a [routerLink]=" ['./about'] " routerLinkActive="active">
          About
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <div [hidden]="activeUrl === '/login'">
      <div class="miscApp">[app] miscApp, activeUrl: {{activeUrl}}</div>
      
      <img src="../images/fullscreen2.jpg" height="20px">
      [home] &lt;img src="../images/fullscreen2.jpg"&gt; -> NO image-uri hash used!!!<br>
      <img src="assets/img/angularclass-avatar.png" height="20px"> 
      [app] &lt;img src="assets/img/angularclass-avatar.png&gt; -> NO image-uri hash used!!!<br>
      <img src="../assets/img/angularclass-avatar.png" height="20px"> 
      [app] &lt;img src="../assets/img/angularclass-avatar.png&gt; -> NO image-uri hash used!!!<br>
      <img [src]="angularClassLogo" height="20px">
      [app] using in component: angularClassLogo = 'assets/img/angularclass-avatar.png'; -> NO image-uri hash used!!!<br>

      <pre class="app-state">[app] this.appState.state = {{ appState.state | json }}</pre>
    </div>
  `
})
export class AppComponent {
  angularClassLogo = 'assets/img/angularclass-avatar.png';
  subscription: Subscription;
  activeUrl: string;

  constructor(public appState: AppState,
              public authService: AuthService,
              private router: Router) {
    // console.log('[app] constructor');
  }

  ngOnInit() {
    // console.log('[app] ngOnInit, Initial App State', this.appState.state);
    // "this" in "function (s)" is NOT AppComponent.this !!!
    let _this = this;
    this.subscription = this.router.events.subscribe(function (s) {
      if (s instanceof NavigationEnd) {
        // console.log('[app] s: activeUrl = ' + s.urlAfterRedirects);
        // console.log('[app] s: ' + JSON.stringify(s));
        _this.activeUrl = s.urlAfterRedirects;
        _this.appState.set('activeUrl', s.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy() {
    // console.log('[app] ngOnDestroy: ');
    this.subscription.unsubscribe();
  }

}
