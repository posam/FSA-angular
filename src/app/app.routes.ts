import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';
import { Counter } from './counter/counter';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'counter', component: Counter },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound },
];
