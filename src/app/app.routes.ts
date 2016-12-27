import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth-guard.service';

// see preloadingStrategy for lazy loaded routes
export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail',
    loadChildren: './+detail/index#DetailModule',
    canActivate: [AuthGuard]
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**',    component: NoContentComponent },
];
