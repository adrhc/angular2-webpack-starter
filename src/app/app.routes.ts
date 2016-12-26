import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

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
  // { path: 'detail', loadChildren: 'es6-promise-loader?,[name]!./+detail#DetailModule' },
  { path: 'detail', loadChildren: 'es6-promise-loader!./+detail/index#DetailModule' },
  // { path: 'detail', loadChildren: 'es6-promise-loader!./+detail#DetailModule' },

  // doesn't work
  // { path: 'detail', loadChildren: () => require('./+detail/index')('DetailModule') },
  // { path: 'detail', loadChildren: () => require('./+detail')('DetailModule') },
  // {
  //   path: 'detail',
  //   loadChildren: () => require('es6-promise-loader!./+detail/index')('DetailModule')
  // },
  // {
  //   path: 'detail',
  //   loadChildren: () => require('es6-promise-loader!./+detail')('DetailModule')
  // },

  { path: '**',    component: NoContentComponent },
];
