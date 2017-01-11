import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'about',
  styleUrls: ['./about.css'],
  template: `
    <h1>About</h1>
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
    <div>
      <h3>
        patrick@AngularClass.com
      </h3>
    </div>
    <pre>this.localState = {{ localState | json }}</pre>
    <div class="misc1">misc1</div>
    <div class="miscGlobal">miscGlobal</div>
    <div class="miscAbout">miscAbout</div>
  `
})
export class AboutComponent implements OnInit {
  private static merge(object: {[name: string]: any}, array: Array<any>): void {
    array.forEach((item) => $.extend(object, item));
  }

  public localState: {[name: string]: any} = {};

  constructor(public route: ActivatedRoute) {
    console.log('constructor AboutComponent');
  }

  public ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(`resolved data: ${JSON.stringify(data)}`);
      // your resolved data from route
      // this.localState['fromResolver'] = data;
      $.extend(this.localState, data);
    });

    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }

  private asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then((json) => {
          console.log(`async mockData: ${JSON.stringify(json)}`);
          // this.localState['asyncData'] = json;
          if (json instanceof Array) {
            AboutComponent.merge(this.localState, <Array<any>> json);
          } else {
            $.extend(this.localState, json);
          }
        });

    });
  }

}
