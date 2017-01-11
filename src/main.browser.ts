/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';

// bootstrap 3.3.7:
import 'bootstrap/dist/css/bootstrap';
import 'bootstrap/dist/css/bootstrap-theme';

// taken from bootstrap
import 'css/ie10-viewport-bug-workaround';

// project global css
// see also head-config.common.js
import 'less/jisr-default-theme';

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
