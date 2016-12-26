import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

// needed by "doesn't work" code:
// export function loadSubModule(): any {
//   return require('es6-promise-loader!./+detail/index')('DetailModule');
// }

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // Module PRELOAD setup:
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  //     .then((comp: any) => comp.default),
  // },

  // doesn't work
  // { path: 'detail', loadChildren: 'es6-promise-loader?,[name]!./+detail/index#DetailModule' },
  // { path: 'detail', loadChildren: loadSubModule },

  { path: 'detail', loadChildren: () => require('./+detail/index')('DetailModule') },

  { path: '**',    component: NoContentComponent },
];
