import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth-guard.service';
import { DataResolver } from './app.resolver';

// see preloadingStrategy for lazy loaded routes
export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent, resolve: { resolvedData: DataResolver } },
  { path: 'detail', loadChildren: './+detail#DetailModule', canActivate: [AuthGuard] },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
