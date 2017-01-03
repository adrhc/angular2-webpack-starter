// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// bootstrap 3.3.7:
import 'bootstrap/dist/css/bootstrap';
import 'bootstrap/dist/css/bootstrap-theme';

import 'css/ie10-viewport-bug-workaround';

// This uses expose-loader of webpack.
// Install expose-loader by npm install expose-loader --save-dev.
//
// Make $ and jQuery available in every module without writing require("jquery"):
// new webpack.ProvidePlugin({
//   jQuery: 'jquery',
//   $: 'jquery',
//   jquery: 'jquery'
// })
//
// See also:
// {test: require.resolve("jquery"), loader: "expose?$!expose?jQuery"}
//
// See also: https://webpack.github.io/docs/shimming-modules.html
//
// require('expose?$!expose?jQuery!jquery');
// require('bootstrap');

// import 'js/ie10-viewport-bug-workaround';

if ('production' === ENV) {
  // Production

} else {
  // Development

}
