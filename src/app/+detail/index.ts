import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DetailComponent } from './detail.component';

console.log('`Detail` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
// see https://github.com/AngularClass/webpack-toolkit
export const routes = [
  { path: '', component: DetailComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class DetailModule {
}
