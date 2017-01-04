/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

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
      <span>
        <a [routerLink]=" ['./login'] ">
          Login
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./detail'] ">
          Detail
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./about'] ">
          About
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
      <div class="miscApp">miscApp</div>
    </main>

    <!-- webpack interpolation with $ { -->
    <img src="${require(`images/reload3.jpg`)}" height="20px">
    [app] using webpack interpolation with &#36;&#123;require(&#96;images/reload3.jpg&#96;)&#125; -> image-uri hash used!!!
    
    <pre class="app-state">[app] this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" height="20px">
        </a> [app] using in component: angularclassLogo = 'assets/img/angularclass-avatar.png'; -> NO image-uri hash used!!!
      </div>
    </footer>
  `
})
export class AppComponent {
  angularclassLogo = 'images/appConfig0Original.jpg';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
