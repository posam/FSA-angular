import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { PageNotFound } from './core/component/page-not-found/page-not-found';
import { Counter } from './feature/counter/page/counter/counter';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'counter', component: Counter },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFound },
];
