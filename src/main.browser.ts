/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';

// bootstrap 3.3.7:
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

// taken from bootstrap
// Positioned here when referencing (not importing) bootstrap's less files.
// import 'css/ie10-viewport-bug-workaround.css';

// project global css
// see also head-config.common.js
import 'less/jisr-default-theme.less';

// taken from bootstrap
// Positioned here when importing (not referencing) bootstrap's less files.
import 'css/ie10-viewport-bug-workaround.css';

/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
