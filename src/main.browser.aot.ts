/*
 * Angular bootstraping
 */
import { platformBrowser } from '@angular/platform-browser';
import { decorateModuleRef } from './app/environment';

// bootstrap 3.3.7:
// import 'bootstrap-dist/css/bootstrap.css';
// import 'bootstrap-dist/css/bootstrap-theme.css';

// taken from bootstrap
import 'css/ie10-viewport-bug-workaround.css';

// project global css
// see also head-config.common.js
import 'less/jisr-default-theme.less';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
