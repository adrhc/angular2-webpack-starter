import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
export class AboutComponent {
  localState: any;

  constructor(public route: ActivatedRoute) {
    console.log('constructor DetailComponent');
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-data.json')
        .then(json => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}
